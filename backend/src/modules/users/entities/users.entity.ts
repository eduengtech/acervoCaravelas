import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { CreateUserProps } from './createUserProps';


export class UserEntity {
  nome: string;
  email: string;
  senhaHash: string;
  role: Role;

  private constructor(
    nome: string,
    email: string,
    senhaHash: string,
    role: Role,
  ) {
    this.nome = nome;
    this.email = email;
    this.senhaHash = senhaHash;
    this.role = role;
  }

  static async create(
    props: CreateUserProps,
    userLoggedRole: Role,
  ): Promise<UserEntity> {
    // Regra de negócio
    if (props.role === Role.ADMIN && userLoggedRole !== Role.ADMIN) {
      throw new Error('Você não tem permissão para criar um ADMIN');
    }

    const senhaHash = await bcrypt.hash(props.senha, 12);

    return new UserEntity(
      props.nome,
      props.email,
      senhaHash,
      props.role ?? Role.EDITOR,
    );
  }
}
