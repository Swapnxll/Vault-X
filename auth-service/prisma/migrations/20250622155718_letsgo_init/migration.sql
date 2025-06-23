-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "subscription" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExposedData" (
    "id" SERIAL NOT NULL,
    "site" TEXT,
    "description" TEXT,
    "domain" TEXT,
    "industry" TEXT,
    "logo" TEXT,
    "passwordRisk" TEXT,
    "references" TEXT,
    "searchable" TEXT,
    "verified" TEXT,
    "xposedData" TEXT,
    "xposedDate" TEXT,
    "xposedRecords" INTEGER,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ExposedData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- AddForeignKey
ALTER TABLE "ExposedData" ADD CONSTRAINT "ExposedData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
