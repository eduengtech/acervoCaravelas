import { Role } from "@prisma/client";

export interface CreateUserProps {
    nome: string;
    email: string;
    senha: string;
    role?: Role;
}