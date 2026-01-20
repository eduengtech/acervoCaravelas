import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/service/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateUsersDto } from "../dto/create-users.dto";
import { Role } from "@prisma/client";
import { UserEntity } from "../entities/users.entity";
import { UpdateUserDto } from "../dto/update-users.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async validateUser(email: string, senha: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    const isMatch = await bcrypt.compare(senha, user.senhaHash);

    if (!isMatch) return null;

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    };
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUsersDto, userLoggedRole: Role) {
    try {
      const emailExists = await this.prisma.user.findUnique({ where: { email: data.email } });

      if (emailExists) throw new ConflictException("Este e-mail já está cadastrado.");

      const userEntity = await UserEntity.create(data, userLoggedRole);

      return await this.prisma.user.create({
        data: {
          nome: userEntity.nome,
          email: userEntity.email,
          senhaHash: userEntity.senhaHash,
          role: userEntity.role,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) throw error;

      throw new Error("Erro inesperado ao criar usuário");
    }
  }

  async findMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, nome: true, email: true, role: true },
    });

    if (!user) throw new NotFoundException("Usuário não encontrado");

    return user;
  }

  async update(id: string, data: UpdateUserDto, userLoggedId: string, userLoggedRole: Role) {
    const userToUpdate = await this.prisma.user.findUnique({ where: { id } });

    if (!userToUpdate) throw new NotFoundException("Usuário não encontrado");

    if (userLoggedRole !== Role.ADMIN && id !== userLoggedId) {
      throw new ForbiddenException("Você só pode atualizar seu próprio perfil.");
    }

    const updateData: Parameters<typeof this.prisma.user.update>[0]["data"] = {
      nome: data.nome,
      email: data.email,
    };

    if (data.senha) {
      updateData.senhaHash = await bcrypt.hash(data.senha, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string, userLoggedRole: Role) {
    if (userLoggedRole !== Role.ADMIN) {
      throw new ForbiddenException("Somente administradores podem remover usuários.");
    }

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException("Usuário nao encontrado para remoção.");

    return this.prisma.user.delete({ where: { id } });
  }
}
