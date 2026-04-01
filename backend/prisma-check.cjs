require("dotenv").config();

const { prisma } = require("./dist/db/prisma.js");

async function main() {
  const habits = await prisma.habit.findMany();
  console.log("HABITS_OK", habits.length);
  const reminders = await prisma.reminder.findMany();
  console.log("REMINDERS_OK", reminders.length);
}

main()
  .catch((error) => {
    console.error("PRISMA_ERROR", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
