import React from "react";
import usePostCardContext from "../hooks/usePostCardContext";

const PostCard = ({ children }) => {
  return (
    <>
      <div className="m-4 flex w-75 flex-col gap-2 rounded-md bg-neutral-800 p-4 text-white">
        {children}
      </div>
    </>
  );
};

PostCard.Title = function PostCardTitle() {
  const { post } = usePostCardContext();

  return <h2 className="text-lg font-semibold">{post.title}</h2>;
};

export default PostCard;

PostCard.Content = function PostCardContent() {
  const { post } = usePostCardContext();

  return <p>{post.content}</p>;
};

PostCard.User = function PostCardUser() {
  const { post } = usePostCardContext();

  return <p className="text-sm text-neutral-400">By {post.user.name}</p>;
};

PostCard.Buttons = function PostCardButtons() {
  return (
    <div className="mt-1 flex flex-row gap-4">
      <button
        type="button"
        className="cursor-pointer rounded-md border bg-blue-500 px-2 py-1 hover:bg-blue-600"
      >
        Read More
      </button>
      <button
        type="button"
        className="cursor-pointer rounded-md border bg-yellow-500 px-2 py-1 hover:bg-yellow-600"
      >
        Comments
      </button>
    </div>
  );
};
