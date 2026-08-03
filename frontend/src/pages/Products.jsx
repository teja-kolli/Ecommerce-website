import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    axios
      .get("/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort]);

  const fetchProducts = () => {
    let url = "/products/?";

    if (search) url += `search=${search}&`;
    if (category) url += `category=${category}&`;
    if (sort) url += `ordering=${sort}`;

    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="products-page">
      <section className="products-banner">
        <h1>Our Products</h1>
        <p>
          Explore thousands of premium products at the best prices.
        </p>
      </section>

      <section className="filter-section">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price">Price : Low to High</option>
          <option value="-price">Price : High to Low</option>
          <option value="-created_at">Newest</option>
        </select>
      </section>

      <section className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <h2>No Products Found</h2>
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;
