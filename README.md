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
- **Autenticaçao:** Passport.js + JWT (Access Token + Refresh Token via cookie HTTP-only)
- **Autorização:** RBAC (Role-BAsed Access Control)
- **Validação:** class-validator + DTOs
- **Documentação:** Swagger (OpenAPI)
- **Hospedagem:** Supabase (banco de dados)
- **Linguagem:** TypeScript

### **Frontend**
- **Framework:** React (Vite) + TypeScript
- **Estilização:** SASS (SCSS Modular).
- **Comunicação HTTP:** Axios com interceptors.
- **Autenticação:** Sessão baseada em cookies HTTP-only com refresh automatico.

## 🔐 Segurança e Controle de Acesso

O sistema implementa autenticação moderna baseada em sessão segura.

- Login com cokkie HTTP-only.
- Refresh automatico de sessão
- Proteção de rotas via guards no backend
- Controle de acesso por perfil (RBAC)

| Role | |Permissões |
| :--- |  :--- | ---: |
| ADMIN |  | Gerenciamento completo do sistema|
| EDITOR |  |Inserção e edição de itens do acervo |

## ✨ Funcionalidades Implementadas

- Autenticação segura com persistência de sessão

- Refresh automático de token

- Proteção de rotas sensíveis no backend

- Controle de acesso por nível de usuário (RBAC)

- Logout com invalidação de sessão

- Dashboards diferenciados por perfil (ADMIN / EDITOR)(em desenvolvimento)

- Arquitetura frontend preparada para rotas protegidas

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
