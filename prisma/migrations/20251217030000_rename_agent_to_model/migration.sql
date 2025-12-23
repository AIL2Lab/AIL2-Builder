-- Rename physical table "agent" to "model"
ALTER TABLE "agent" RENAME TO "model";

-- Update existing foreign key constraints if needed
ALTER TABLE "task" RENAME COLUMN "agentId" TO "modelId";
ALTER TABLE "task" DROP CONSTRAINT IF EXISTS "task_agentId_fkey";
ALTER TABLE "task" ADD CONSTRAINT "task_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Update creatorId foreign key constraint name (optional, for consistency)
ALTER TABLE "model" DROP CONSTRAINT IF EXISTS "agent_creatorId_fkey";
ALTER TABLE "model" ADD CONSTRAINT "model_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

