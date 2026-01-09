import { Injectable, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/service/prisma.service';
import { CreateUsersDto } from '../dto/create-users.dto';
import { UserEntity } from '../entities/users.entity';
import { Role } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, senhaPlana: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(senhaPlana, user.senhaHash);
    if (!isMatch) return null;

    const { senhaHash, ...result } = user;
    return result;
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUsersDto, userLoggedRole: Role) {
    
    const emailExists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (emailExists) throw new ConflictException('Este e-mail já está cadastrado.');

    const userEntity = await UserEntity.create(data, userLoggedRole);

    return this.prisma.user.create({
      data: {
        nome: userEntity.nome,
        email: userEntity.email,
        senhaHash: userEntity.senhaHash,
        role: userEntity.role,
      },
    });
  }

  async findMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, nome: true, email: true, role: true },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: string, data: UpdateUserDto, userLoggedId: string, userLoggedRole: Role) {

    const userToUpdate = await this.prisma.user.findUnique({ where: { id } });
    if (!userToUpdate) throw new NotFoundException('Usuário não encontrado');

    if (userLoggedRole !== Role.ADMIN && id !== userLoggedId) {
      throw new ForbiddenException('Você só pode atualizar seu próprio perfil.');
    }

    const updateData: any = {
      nome: data.nome,
      email: data.email,
    };

    
    if (data.senha) { updateData.senhaHash = await bcrypt.hash(data.senha, 10); }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string, userLoggedRole: Role) {

    if (userLoggedRole !== Role.ADMIN) {
      throw new ForbiddenException('Somente administradores podem remover usuários.');
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado para remoção.');

    return this.prisma.user.delete({ where: { id } });
  }
}