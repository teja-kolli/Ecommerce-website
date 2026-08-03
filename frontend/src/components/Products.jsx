import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

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

      {/* Banner */}

      <section className="products-banner">

        <h1>Our Products</h1>

        <p>
          Explore thousands of premium products at the best prices.
        </p>

      </section>

      {/* Filters */}

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

          <option value="1">Electronics</option>

          <option value="2">Fashion</option>

          <option value="3">Mobiles</option>

          <option value="4">Home</option>

        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >

          <option value="">Sort By</option>

          <option value="price">
            Price : Low to High
          </option>

          <option value="-price">
            Price : High to Low
          </option>

          <option value="-created_at">
            Newest
          </option>

        </select>

      </section>

      {/* Products */}

      <section className="product-grid">

        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
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