import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import axios, { isLoggedIn } from "../api/axios";
import ProductCard from "../components/ProductCard";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));

    axios
      .get("/products/")
      .then((res) => setRelatedProducts(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = async () => {
    if (!isLoggedIn()) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("/cart/add/", {
        product: product.id,
        quantity,
      });
      alert("Added to cart!");
    } catch (error) {
      alert("Failed to add to cart.");
    }
  };

  const addToWishlist = async () => {
    if (!isLoggedIn()) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("/wishlist/add/", { product: product.id });
      alert("Added to wishlist!");
    } catch (error) {
      alert("Failed to add to wishlist.");
    }
  };

  if (!product) return <h2 className="loading">Loading...</h2>;

  return (
    <>
      <section className="details-container">
        <div className="details-image">
          <img
            src={product.image || "https://via.placeholder.com/500x500"}
            alt={product.name}
          />
        </div>

        <div className="details-info">
          <h1>{product.name}</h1>

          <div className="rating">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <span>(250 Reviews)</span>
          </div>

          <h2 className="price">₹{product.price}</h2>

          <p className="stock">
            {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
          </p>

          <p className="description">{product.description}</p>

          <div className="quantity-box">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <FaMinus />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() =>
                quantity < product.stock && setQuantity(quantity + 1)
              }
            >
              <FaPlus />
            </button>
          </div>

          <div className="buttons">
            <button
              className="cart-btn"
              onClick={addToCart}
              disabled={product.stock === 0}
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button className="wish-btn" onClick={addToWishlist}>
              <FaHeart />
              Wishlist
            </button>
          </div>
        </div>
      </section>

      <section className="related">
        <h2>Related Products</h2>

        <div className="related-grid">
          {relatedProducts
            .filter((item) => item.id !== product.id)
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
