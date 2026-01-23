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

  // const user = await prisma.user.create({
  //   data: {
  //     email: "abdiel@example.com",
  //     name: "Abdiel",
  //     posts: {
  //       create: [
  //         {
  //           title: "learning JS",
  //           content: "Js is really hard to learn",
  //           comments: {
  //             create: [
  //               { text: "I agree with you" },
  //               { text: "I find it easy though" },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });
  // console.log("new-User:", user);

  // const users = await prisma.user.findMany({
  //   include: { posts: { include: { comments: true } } },
  // });
  // console.log("users-list:", users);
  // console.dir(users, { depth: null });

  //lesson-3 task-A (many-to-many)
  // const tags = await prisma.tag.createMany({
  //   data: [
  //     { tagName: "Javascript", slug: "js" },
  //     { tagName: "Python", slug: "py" },
  //     { tagName: "SQL", slug: "sql" },
  //   ],
  // });

  // console.dir(tags, { depth: null });

  // const post_tags = await prisma.post.update({
  //   where: { id: "29ccc24d-f59c-4202-82cd-9b2a0dd3478f" },
  //   data: {
  //     tags: {
  //       create: [
  //         { tagId: "063e7546-2fe3-42dc-afdf-8dc1f7629fa5" },
  //         { tagId: "71439835-d080-496e-b07e-b418b8e4eee8" },
  //       ],
  //     },
  //   },
  // });

  // console.log("post_tags:", post_tags);

  // const postsWithTags = await prisma.post.findMany({
  //   include: {
  //     tags: {
  //       include: { tag: true },
  //     },
  //   },
  // });
  // console.dir(postsWithTags, { depth: null });

  //Lesson-3 task-B (Enum)
  // const post_status1 = await prisma.user.create({
  //   data: {
  //     email: "email@example.com",
  //     name: "Achille Hector",
  //     posts: {
  //       create: [
  //         {
  //           title: "railing on ruby",
  //           content: "Looove my journey learning ryby",
  //           comments: { create: [{ text: "You're not alone, i agree too!" }] },
  //           tags: {
  //             create: [
  //               {
  //                 tag: {
  //                   create: { tagName: "Ruby on Rail", slug: "ruby" },
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });
  // console.dir(post_status1, { depth: null });

  // const post_status2 = await prisma.post.create({
  //   data: {
  //     title: "Java boredom",
  //     content: "Who's up right now?",
  //     status: "PUBLISHED",
  //     authorId: "e4cba333-0148-406b-94bb-3b1ec0204961",
  //     comments: {
  //       create: [{ text: "I'm Up" }, { text: "Me Too!" }],
  //     },
  //     tags: {
  //       create: [
  //         {
  //           tag: {
  //             create: { tagName: "JAVA", slug: "java" },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });

  // console.dir(post_status2, { depth: null });

  //lesson-4 tasks
  // A. Query Published posts
  const published_posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true },
      },
      tags: {
        select: {
          tag: {
            select: {
              tagName: true,
            },
          },
        },
      },
      _count: { select: { comments: true } },
    },
  });

  console.dir(published_posts, { depth: null });

  //B.at least one post where at least one post is published
  // const usersWith_onePost = await prisma.user.findMany({
  //   where: {
  //     _count: {
  //       posts: { gte: 1 },
  //     },
  //     posts: { some: { PUBLISHED: true } },
  //   },
  // });
  // console.log("B1 ->", usersWith_onePost);

  //B
  const usersWithPublishedPost = await prisma.user.findMany({
    where: {
      posts: {
        some: { status: "PUBLISHED" },
      },
    },
    include: {
      posts: {
        where: { status: "PUBLISHED" },
      },
    },
  });
  console.dir(usersWithPublishedPost, { depth: null });

  //Pagination
  const lastId = undefined;
  const next10PublishedPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    take: 10,
    cursor: lastId ? { id: lastId } : undefined, //why explicitly undefined
    skip: lastId ? 1 : 0,
    orderBy: { createdAt: "desc" },
  });

  console.dir(next10PublishedPosts, { depth: null });
}

main();
