import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import MovieComponent from "./MovieComponent";

const Home = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleScrollInfinite = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch API");
        }

        const data = await res.json();

        setCard((prev) => [...prev, ...data]);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollInfinite);
    return () => window.removeEventListener("scroll", handleScrollInfinite);
  }, []);

  return (
    <>
      <MovieComponent movieInfo={card} />
      {loading && <Loading />}
    </>
  );
};

export default Home;
