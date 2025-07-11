import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "./Blog";

const fakeFetch = (id, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = data.find((p) => p.id === id);
      post ? resolve(post) : reject("Post not Found");
    }, 1000);
  });
};

export const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const data = useContext(PostsContext) || [];

  useEffect(() => {
    fakeFetch(id, data)
      .then((res) => {
        setPost(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center text-2xl my-6">⏳ Loading...</p>;
  if (!post)
    return (
      <p className="text-2xl text-red-400 text-center my-6">
        Post Not found ☹️{" "}
      </p>
    );

  return (
    <div className="pt-4 mt-6 border-t">
      <p className="text-gray-700 text-2xl text-center">
        Post Details:
        <ul className="list-square list-inside mt-6 shadow-lg bg-gray-200">
          <li className="list-item mb-4">
            <span className="text-orange-600">ID: </span> {post.id}
          </li>
          <li className="list-item mb-2">
            <span className="text-orange-600">Title: </span> {post.title}
          </li>
          <li className="list-item mb-2">
            <span className="text-orange-600">Content: </span> {post.content}
          </li>
        </ul>
      </p>
    </div>
  );
};
