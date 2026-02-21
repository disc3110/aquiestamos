-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ENTREPRENEUR', 'USER', 'RESTRICTED');

-- CreateTable
CREATE TABLE "MetroArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "slug" TEXT NOT NULL,
    "timezone" TEXT,

    CONSTRAINT "MetroArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "pronouns" TEXT,
    "phone" TEXT,
    "metroAreaId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MetroArea_slug_key" ON "MetroArea"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_metroAreaId_fkey" FOREIGN KEY ("metroAreaId") REFERENCES "MetroArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;
