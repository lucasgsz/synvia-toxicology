-- CreateEnum
CREATE TYPE "StatusReport" AS ENUM ('POSITIVO', 'NEGATIVO');

-- CreateTable
CREATE TABLE "ToxicologyReport" (
    "id" TEXT NOT NULL,
    "codigo_amostra" VARCHAR(8) NOT NULL,
    "cocaina" DOUBLE PRECISION NOT NULL,
    "anfetamina" DOUBLE PRECISION NOT NULL,
    "metanfetamina" DOUBLE PRECISION NOT NULL,
    "mda" DOUBLE PRECISION NOT NULL,
    "mdma" INTEGER NOT NULL,
    "thc" DOUBLE PRECISION NOT NULL,
    "morfina" DOUBLE PRECISION NOT NULL,
    "codeina" DOUBLE PRECISION NOT NULL,
    "heroina" DOUBLE PRECISION NOT NULL,
    "benzoilecgonina" INTEGER NOT NULL,
    "cocaetileno" INTEGER NOT NULL,
    "norcocaina" INTEGER NOT NULL,
    "laudo_status" "StatusReport" NOT NULL DEFAULT E'NEGATIVO',

    CONSTRAINT "ToxicologyReport_pkey" PRIMARY KEY ("id")
);
