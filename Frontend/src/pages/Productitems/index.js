import { showToast } from "../../components/Toast";
import { Link } from "react-router-dom";
import "./index.css";
const Productitems = (props) => {
  const { products } = props;
  const { name, price, description, imageUrl, category, stock } = products;

  const addtoCart = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const token = localStorage.getItem("jwt_token");
    const cartItem = {
      productId: products._id,
      quantity: 1,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${process.env.REACT_APP_API_URL}/api/cart`;
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      showToast(data.message, "success");
    } else {
      showToast(data.message, "error");
    }
  };

  return (
    <li>
      <Link to={`/products/${products._id}`} className="product-item-link">
        <div className="product-item-container">
          <div className="product-item-image-wrapper">
            <img src={imageUrl} alt={name} className="product-item-image" />
          </div>

          <div className="product-item-info">
            <h3 className="product-item-name">{name}</h3>

            <div className="product-item-category">
              <span className="category-label">Category:</span>
              <span className="category-value">{category}</span>
            </div>

            <p className="product-item-description">{description}</p>

            <div className="product-item-footer">
              <div className="product-item-price-stock">
                <div className="product-item-price">
                  <span className="price-label">Price:</span>
                  <span className="price-value">${price}</span>
                </div>

                <div className="product-item-stock">
                  <span
                    className={`stock-badge ${stock > 0 ? "in-stock" : "out-of-stock"}`}
                  >
                    {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
                  </span>
                </div>
              </div>

              <button
                className="product-item-btn"
                disabled={stock === 0}
                onClick={addtoCart}
              >
                {stock > 0 ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Productitems;
