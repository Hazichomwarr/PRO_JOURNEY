import { Link, Outlet } from "react-router-dom";
import { createContext } from "react";

export const PostsContext = createContext();

export const Blog = () => {
  const posts = [
    { id: "1", title: "First Post", content: "Hello world!" },
    { id: "2", title: "React Router is cool", content: "Routing made easy." },
    { id: "3", title: "What's next?", content: "More React fun." },
  ];

  return (
    <PostsContext.Provider value={posts}>
      <div className="p-4">
        <h2 className="font-bold text-2xl mb-6">Blogs Page</h2>
        <ul className="list-decimal list-inside flex flex-col items-left gap-4 shadow-lg p-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`${post.id}`}
              className="list-item hover:underline"
              // state={{ title: post.title, content: post.content }}
            >
              "{post.title}" (Read more...)
            </Link>
          ))}
        </ul>
        <Outlet />
      </div>
    </PostsContext.Provider>
  );
};
