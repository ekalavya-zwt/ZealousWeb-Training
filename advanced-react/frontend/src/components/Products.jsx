import React from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const page = searchParams.get("page");

  function changeCategory() {
    setSearchParams({ category: "clothings", page: "3" });
  }
  return (
    <div>
      <h2>Products</h2>
      <p>Category: {category}</p>
      <p>Page: {page}</p>
      <button type="button" onClick={changeCategory}>
        Change Category
      </button>
    </div>
  );
};

export default Products;
