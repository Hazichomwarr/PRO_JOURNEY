//index.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     email: "test@example.com",
  //     name: "Hamza",
  //   },
  // });

  // const user = await prisma.user.create({
  //   data: {
  //     email: "issa@example.com",
  //     name: "Issa",
  //     posts: {
  //       create: [
  //         { title: "1st post", content: "Hello prisma world!" },
  //         { title: "2nd post", content: "I'm Glad to be here!" },
  //       ],
  //     },
  //   },
  // });

  const user = await prisma.user.create({
    data: {
      email: "abdiel@example.com",
      name: "Abdiel",
      posts: {
        create: [
          {
            title: "learning JS",
            content: "Js is really hard to learn",
            comments: {
              create: [
                { text: "I agree with you" },
                { text: "I find it easy though" },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("new-User:", user);

  const users = await prisma.user.findMany({
    include: { posts: { include: { comments: true } } },
  });
  console.log("users-list:", users);
  console.dir(users, { depth: null });
}

main();
