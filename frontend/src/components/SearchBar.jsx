import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setProducts([]);
      return;
    }

    const timer = setTimeout(() => {
      axios
        .get(`/products/?search=${query}`)
        .then((res) => {
          setProducts(res.data);
          setShowSuggestions(true);
        })
        .catch((err) => console.log(err));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setProducts([]);
    setShowSuggestions(false);
  };

  return (
    <div className="search-wrapper">

      <div className="search-container">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowSuggestions(true)}
        />

        {query && (
          <FaTimes
            className="clear-icon"
            onClick={clearSearch}
          />
        )}

      </div>

      {showSuggestions && products.length > 0 && (

        <div className="search-results">

          {products.map((product) => (

            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="search-item"
              onClick={() => setShowSuggestions(false)}
            >

              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/60"
                }
                alt={product.name}
              />

              <div>

                <h4>{product.name}</h4>

                <p>₹{product.price}</p>

              </div>

            </Link>

          ))}

        </div>

      )}

    </div>
  );
}

export default SearchBar;