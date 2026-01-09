import { Role } from '@prisma/client';


import { UserEntity } from "../entities/users.entity"


describe('UserEntity - Regras de negócio', () => {
    it('ADMIN pode criar ADMIN', async () => {
        const user = UserEntity.create( {
            nome: 'Admin',
            email: 'admin@email.com',
            senha: 'senhaHash',
            role: Role.ADMIN,
            },
            Role.ADMIN,
        );
         
        expect((await user).role).toBe(Role.ADMIN);
    });

    it('EDITOR não pode criar ADMIN', () => {
        expect(() =>
            UserEntity.create(
                {
                nome: 'User',
                email: 'user@email.com',
                senha: 'hash',
                role: Role.ADMIN,
                },
                Role.EDITOR,
            ),
        ).toThrow('Você não pode criar um usuário ADMIN');
    });
});