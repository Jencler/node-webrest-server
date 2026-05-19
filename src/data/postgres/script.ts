import { prisma } from "./index";

const todos = [
    {
        text: "Buy milk",
    },
    {
        text: "Buy bread",
    },
    {
        text: "Buy butter",
    }
]

async function main() {

    //Delete all todos
    await prisma.todo.deleteMany()

    // Create a new todos
    const newTodos = await prisma.todo.createMany({ data: todos });

    console.log("Created todos:", newTodos.count);

    // Fetch all todos 
    const allTodos = await prisma.todo.findMany();
    console.log("All todos:", JSON.stringify(allTodos, null, 2));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });