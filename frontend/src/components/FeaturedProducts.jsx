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

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const { data } = useFetch("/products");

  useEffect(() => {
    // console.log(data);
    if (data) {
      setFeaturedProducts(data.slice(0, 8));
    }
  }, [data]);

  return (
    <Container>
      {featuredProducts.map((product) => (
        <Product key={product._id} item={product} />
      ))}
    </Container>
  );
};

export default FeaturedProducts;
