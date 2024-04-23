import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const location = useLocation();
  // const cat = capitalize(location.pathname.split("/")[2]);
  const pathParts = location.pathname.split("/");
  const cat = pathParts.length >= 3 ? capitalize(pathParts[2]) : null; // Default to "Category" if path doesn't have category
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);

  // const { data } = useFetch(cat ? `/products?category=${cat}` : "/products");
  const { data } = useFetch("/products");

  useEffect(() => {
    if (data) {
      const allCategories = data.reduce((acc, product) => {
        if (product.categories) {
          acc.push(...product.categories);
        }
        return acc;
      }, []);

      // Use Set to remove duplicates
      const uniqueCategoriesArray = [...new Set(allCategories)];

      setUniqueCategories(uniqueCategoriesArray);
    }
  }, [data]);

  const handleFilter = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    // Update the URL with the selected category
    window.location.href = selectedCategory
      ? `/products/${selectedCategory}`
      : "/products";
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>All Categories</FilterText>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            <Option value="">All Categories</Option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Filter>
        {cat && (
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select name="color" onChange={handleFilter}>
              <Option disabled>Color</Option>
              <Option>White</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Yellow</Option>
              <Option>Green</Option>
            </Select>
            <Select name="size" onChange={handleFilter}>
              <Option disabled>Size</Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
          </Filter>
        )}
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} data={data} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
