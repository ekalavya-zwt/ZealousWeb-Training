import { useContext } from "react";
import PostCardContext from "../context/PostCardContext";

const usePostCardContext = () => {
  const post = useContext(PostCardContext);

  return { post };
};

export default usePostCardContext;
