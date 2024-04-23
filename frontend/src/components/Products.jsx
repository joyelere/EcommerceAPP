import styled from "styled-components";
import Product from "./Product";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { data } = useFetch(cat ? `/products?category=${cat}` : "/products");

  useEffect(() => {
    if (!cat && data) {
      setFilteredProducts(data);
    }
  }, [data, cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        data.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [data, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : filteredProducts.map((item) => (
            <Product item={item} key={item._id} />
          ))}
    </Container>
  );
};

export default Products;
