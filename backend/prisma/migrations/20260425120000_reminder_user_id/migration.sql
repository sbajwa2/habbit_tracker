-- Add user linkage to reminders
ALTER TABLE "Reminder"
ADD COLUMN "userId" TEXT NOT NULL DEFAULT 'legacy-user';

-- Remove default after backfill behavior for new rows
ALTER TABLE "Reminder"
ALTER COLUMN "userId" DROP DEFAULT;

-- Add index for per-user reminder lookups
CREATE INDEX "Reminder_userId_idx" ON "Reminder"("userId");
