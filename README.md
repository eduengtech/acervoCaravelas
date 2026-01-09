# ⚓ Acervo Caravelas

#### O **Acervo Caravelas** é uma plataforma digital dedicada à preservação, catalogação e difusão do patrimônio cultural da cidade de Caravelas. O sistema oferece uma solução robusta para curadoria técnica e uma interface intuitiva para consulta pública.
---

## 🏛️ Arquitetura do Sistema
O projeto é estruturado como um Monorepo, garantindo consistência entre a API e a interface:

- **Backend**: API REST desenvolvida com NestJS, focada em alta escalabilidade e segurança.
- **Frontend**: Interface moderna em **React + TypeScript**, utilizando SASS para uma estilização personalizada e fiel à identidade visual do projeto.

## 🛠️ Tecnologias e Ferramentas

### **Backend**

- **Framework:** [NestJS](https://nestjs.com/) (NodeJS)
- **ORM:** Prisma 7+ (Utilizando @prisma/adapter-pg para performance nativa)
- **Banco de Dados:** PostgreSQL
- **Segurança:** Passport.js + JWT (JSON Web Token)
- **Validação:** class-validator + DTOs
- **Documentação:** Swagger (OpenAPI)
- **Hospedagem:** Supabase (banco de dados)
- **Linguagem:** TypeScript

### **Frontend (Em desenvolvimento)**
- **Framework:** React (Vite) + TypeScript
- **Estilização:** SASS (SCSS) com arquitetura modular

## 🔐 Segurança e Governança

O acesso ao sistema é controlado por níveis de permissão (Roles):

- **ADMIN:** Gestão total de usuários e configurações do sistema.
- **EDITOR:** Responsável pela inserção e edição de itens do acervo cultural.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (LTS)

### Instalação
```bash
# Clone o repositório
git clone https://github.com/eduengtech/acervo-caravelas.git
cd acervo-caravelas

# Configuração do Backend
cd backend
npm install
cp .env.example .env  # Configure suas URLs de conexão e segredos JWT
npx prisma generate
npx prisma migrate dev
npx prisma db seed    # Inicializa o Superusuário de forma segura
npm run start:dev 
```

## 🌐 Documentação Swagger
Com o backend em execução, a documentação interativa fica disponível em: `http://localhost:3000/api`

### 📝 Variáveis de Ambiente Essenciais
- `DATABASE_URL` e`DIRECT_URL` : Conexão com o PostgreSQL.
- `JWT_SECRET` : Chave privada para assinatura dos tokens.
- `INITIAL_ADMIN_EMAIL` e `INITIAL_ADMIN_PASSWORD` : Credenciais para o Seed inicial.

## 📝 Licença

Projeto desenvolvido para fins acadêmicos e de portfólio. Sinta-se livre para estudar e adaptar.
