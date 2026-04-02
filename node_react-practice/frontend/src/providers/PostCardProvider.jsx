import PostCardContext from "../context/PostCardContext";

const PostCardProvider = ({ children }) => {
  const post = {
    id: 1,
    title: "Hello World!",
    content: "This is the first post on our new blog.",
    user: {
      id: 1,
      name: "John Doe",
    },
  };

  return (
    <PostCardContext.Provider value={post}>{children}</PostCardContext.Provider>
  );
};

export default PostCardProvider;
