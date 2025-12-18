-- CreateTable
CREATE TABLE "authNonce" (
    "id" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authNonce_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authNonce_nonce_key" ON "authNonce"("nonce");
