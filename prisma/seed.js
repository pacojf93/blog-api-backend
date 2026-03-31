const prisma = require('../lib/prisma')

const main = async () => {
    await prisma.post.createMany({
        data: [
            {
                title: "Getting Started with Node.js",
                content: "Learn the basics of Node.js and how to build server-side applications with JavaScript."
            },
            {
                title: "Understanding Async/Await",
                content: "A deep dive into asynchronous programming patterns and how async/await simplifies promise handling."
            },
            {
                title: "Database Design Best Practices",
                content: "Explore key principles for designing efficient and scalable database schemas."
            },
            {
                title: "RESTful API Design",
                content: "Guidelines for building clean, maintainable REST APIs that follow industry standards."
            }
        ]
    })
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