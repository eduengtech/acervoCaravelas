-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItensAcervo" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3),
    "tipoItemId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "autorId" TEXT,
    "criadoPorId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publicado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ItensAcervo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDeItem" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "TipoDeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArquivoDigital" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "ArquivoDigital_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "ItensAcervo_titulo_idx" ON "ItensAcervo"("titulo");

-- CreateIndex
CREATE INDEX "ItensAcervo_dataCriacao_idx" ON "ItensAcervo"("dataCriacao");

-- CreateIndex
CREATE UNIQUE INDEX "TipoDeItem_nome_key" ON "TipoDeItem"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- AddForeignKey
ALTER TABLE "ItensAcervo" ADD CONSTRAINT "ItensAcervo_tipoItemId_fkey" FOREIGN KEY ("tipoItemId") REFERENCES "TipoDeItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensAcervo" ADD CONSTRAINT "ItensAcervo_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensAcervo" ADD CONSTRAINT "ItensAcervo_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensAcervo" ADD CONSTRAINT "ItensAcervo_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArquivoDigital" ADD CONSTRAINT "ArquivoDigital_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ItensAcervo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
