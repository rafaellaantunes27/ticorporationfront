-- EMPREST.AI - instalação inicial segura no Supabase PostgreSQL.
-- Aplicar UMA VEZ somente em projeto novo e vazio; não reaplicar em banco existente.
-- Autorização de acesso à API fica no NestJS + Supabase Auth.
BEGIN;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE "UserRole" AS ENUM ('COLLABORATOR', 'OPERATIONS');
CREATE TYPE "EquipmentStatus" AS ENUM ('AVAILABLE', 'BORROWED', 'MAINTENANCE');
CREATE TYPE "LoanStatus" AS ENUM ('ACTIVE', 'OVERDUE', 'RETURNED');

CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'COLLABORATOR',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key"
    ON "users" ("email");

CREATE TABLE "equipment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "asset_tag" TEXT,
    "status" "EquipmentStatus" NOT NULL DEFAULT 'AVAILABLE',
    "observations" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "equipment_asset_tag_key"
    ON "equipment" ("asset_tag");

CREATE TABLE "loans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "equipment_id" UUID NOT NULL,
    "borrowed_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "due_date" TIMESTAMPTZ NOT NULL,
    "returned_at" TIMESTAMPTZ,
    "status" "LoanStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "loans_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
    CONSTRAINT "loans_equipment_id_fkey"
        FOREIGN KEY ("equipment_id") REFERENCES "equipment" ("id") ON DELETE CASCADE
);

CREATE INDEX "loans_user_id_idx"
    ON "loans" ("user_id");

CREATE INDEX "loans_equipment_id_idx"
    ON "loans" ("equipment_id");

CREATE INDEX "loans_status_idx"
    ON "loans" ("status");

ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "equipment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "loans" ENABLE ROW LEVEL SECURITY;

-- Sem políticas permissivas iniciais: regras restritivas são instaladas na migration 002.

-- Ajuste aditivo de segurança para o PostgreSQL/Supabase.
-- IMPORTANTE: avaliar em banco de testes isolado; NÃO aplicado nesta entrega.
-- O Prisma do backend deve operar via papel SQL restrito e autorizado ao modelo de acesso da API.
-- A API aplica ainda autorização por token Supabase em todos os endpoints /api/.

DROP POLICY IF EXISTS "users_select_own_profile" ON public."users";
DROP POLICY IF EXISTS "equipment_select_all" ON public."equipment";
DROP POLICY IF EXISTS "loans_select_all" ON public."loans";
DROP POLICY IF EXISTS "users_modify_for_operations" ON public."users";
DROP POLICY IF EXISTS "equipment_modify_for_operations" ON public."equipment";
DROP POLICY IF EXISTS "loans_modify_for_operations" ON public."loans";

-- Clientes REST do Supabase não podem consultar esses dados como anônimos.
-- O frontend usa exclusivamente a API Nest para operações de negócio.
CREATE POLICY "users_read_self" ON public."users"
  FOR SELECT TO authenticated
  USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

CREATE POLICY "equipment_read_authenticated" ON public."equipment"
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "loans_read_self" ON public."loans"
  FOR SELECT TO authenticated
  USING (user_id IN (
    SELECT id FROM public."users"
    WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  ));

-- Nenhuma política para INSERT/UPDATE/DELETE é oferecida ao navegador.
-- Escritas passam pelo backend autenticado. Não expor sua conexão SQL.

COMMIT;
