import React from "react";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import { useInfiniteQuery } from "react-query";

const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
};

export default function PostList() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      //Return the next page number or false if there are no more pages
      return lastPage.length === 10 ? pages.length + 1 : false;
    },
  });

  if (isLoading) return <ThreeCircles />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="my-8 mx-auto w-1/2 shadow-md p-6">
      <h1 className="text-xl font-bold text-yellow-500 mb-6 ">Posts</h1>
      <ul>
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <p className="text-green-700 text-lg font-medium">
          Page {data.pages.length}
        </p>
        {isFetchingNextPage ? (
          <span>
            <ThreeDots />
          </span>
        ) : (
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 ml-2 hover:bg-blue-400"
          >
            {hasNextPage ? "Load More" : "No more posts"}
          </button>
        )}
      </div>
    </div>
  );
}
