const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.execution.count();
        console.log("Execution count:", count);
        const first = await prisma.execution.findFirst();
        console.log("First execution:", JSON.stringify(first, null, 2));
    } catch (err) {
        console.error("Prisma error:", err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
