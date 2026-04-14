const prisma = require('../lib/prisma')

const main = async () => {
    // Create users
    const admin = await prisma.user.create({
        data: {
            username: "admin",
            password: "password",
            isAdmnin: true
        }
    })

    const user1 = await prisma.user.create({
        data: {
            username: "user1",
            password: "pass1",
            isAdmnin: false
        }
    })

    const user2 = await prisma.user.create({
        data: {
            username: "user2",
            password: "pass2",
            isAdmnin: false
        }
    })

    // Create tags
    const tag1 = await prisma.tag.create({
        data: {
            name: "Node.js"
        }
    })

    const tag2 = await prisma.tag.create({
        data: {
            name: "JavaScript"
        }
    })

    const tag3 = await prisma.tag.create({
        data: {
            name: "Database"
        }
    })

    const tag4 = await prisma.tag.create({
        data: {
            name: "API"
        }
    })

    const tag5 = await prisma.tag.create({
        data: {
            name: "Async"
        }
    })

    const tag6 = await prisma.tag.create({
        data: {
            name: "Best Practices"
        }
    })

    // Create posts by admin
    const post1 = await prisma.post.create({
        data: {
            title: "Getting Started with Node.js",
            abstract: "An introduction to Node.js basics for building server-side applications with JavaScript.",
            content: "Node.js is a powerful JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable server-side applications using JavaScript, which was traditionally a client-side language. This guide covers the fundamentals of Node.js, including installation, basic concepts like modules and npm, and how to create your first server. You'll learn about asynchronous programming, event-driven architecture, and the ecosystem of packages available through npm. By the end of this tutorial, you'll have a solid foundation to start building your own Node.js applications.",
            isPublished: true,
            userId: admin.id,
            tags: {
                connect: [{ id: tag1.id }, { id: tag2.id }]
            }
        }
    })

    const post2 = await prisma.post.create({
        data: {
            title: "Understanding Async/Await",
            abstract: "A comprehensive guide to asynchronous programming patterns and async/await in JavaScript.",
            content: "Asynchronous programming is a cornerstone of modern JavaScript development, especially in Node.js environments. This article delves deep into the evolution of async patterns, from callbacks to promises, and finally to the async/await syntax introduced in ES2017. You'll learn how async/await simplifies promise handling, making asynchronous code look and behave like synchronous code. We cover error handling with try/catch, parallel execution techniques, and best practices for writing clean, maintainable async code. Real-world examples demonstrate how to handle API calls, file operations, and database queries asynchronously.",
            isPublished: true,
            userId: admin.id,
            tags: {
                connect: [{ id: tag2.id }, { id: tag5.id }]
            }
        }
    })

    const post3 = await prisma.post.create({
        data: {
            title: "Database Design Best Practices",
            abstract: "Key principles for designing efficient and scalable database schemas.",
            content: "Effective database design is crucial for building performant and maintainable applications. This comprehensive guide explores fundamental principles of relational database design, including normalization techniques, indexing strategies, and data modeling best practices. Learn about entity-relationship diagrams, primary and foreign keys, and how to avoid common pitfalls like data redundancy and update anomalies. We discuss different database paradigms, query optimization techniques, and how to design schemas that scale with your application's growth. Real-world case studies illustrate how proper database design impacts application performance and user experience.",
            isPublished: true,
            userId: admin.id,
            tags: {
                connect: [{ id: tag3.id }, { id: tag6.id }]
            }
        }
    })

    const post4 = await prisma.post.create({
        data: {
            title: "RESTful API Design",
            abstract: "Guidelines for building clean, maintainable REST APIs following industry standards.",
            content: "RESTful API design is essential for creating web services that are scalable, maintainable, and easy to consume. This article provides comprehensive guidelines for designing REST APIs that follow industry best practices. You'll learn about HTTP methods, status codes, resource naming conventions, and HATEOAS principles. We cover authentication and authorization strategies, versioning techniques, and error handling patterns. The guide includes practical examples of API endpoints, request/response formats, and documentation standards. Whether you're building public APIs or internal services, these principles will help you create APIs that developers love to use and maintain.",
            isPublished: true,
            userId: admin.id,
            tags: {
                connect: [{ id: tag4.id }, { id: tag6.id }]
            }
        }
    })

    // Create comments for every user except admin
    await prisma.comment.createMany({
        data: [
            {
                content: "Great introduction to Node.js!",
                postId: post1.id,
                userId: user1.id
            },
            {
                content: "Very helpful for beginners.",
                postId: post1.id,
                userId: user2.id
            },
            {
                content: "Async/await makes coding so much easier.",
                postId: post2.id,
                userId: user1.id
            },
            {
                content: "Thanks for the detailed explanation.",
                postId: post2.id,
                userId: user2.id
            },
            {
                content: "Database design is crucial for performance.",
                postId: post3.id,
                userId: user1.id
            },
            {
                content: "These best practices will save time.",
                postId: post3.id,
                userId: user2.id
            },
            {
                content: "RESTful APIs are the way to go.",
                postId: post4.id,
                userId: user1.id
            },
            {
                content: "Clear guidelines for API design.",
                postId: post4.id,
                userId: user2.id
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