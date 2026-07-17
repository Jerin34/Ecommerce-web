import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiStatuses } from "../../constants/apiStatuses";
import "./index.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [apiStatus, setApistatus] = useState(apiStatuses.INITIAL);
    const [error, setError] = useState("");

    const fetchProduct = async () => {
        setApistatus(apiStatuses.LOADING);
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`);
            const data = await response.json();

            if (response.ok) {
                setProduct(data.product);
                setApistatus(apiStatuses.SUCCESS);
            } else {
                setApistatus(apiStatuses.ERROR);
                setError(data.message || "Unable to load product details.");
            }
        } catch (err) {
            setError(err.message || "Something went wrong.");
            setApistatus(apiStatuses.ERROR);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (apiStatus === apiStatuses.LOADING || apiStatus === apiStatuses.INITIAL) {
        return (
            <div className="product-details-loading">
                <div className="loader"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (apiStatus === apiStatuses.ERROR) {
        return (
            <div className="product-details-error">
                <div className="error-card">
                    <h1>Oops! Something went wrong</h1>
                    <p>{error}</p>
                    <button type="button" className="retry-btn" onClick={fetchProduct}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const { name, description, price, imageUrl, stock, category } = product;

    return (
        <div className="product-details-page">
            <div className="product-details-card">
                <img className="product-image" src={imageUrl} alt={name} />
                <div className="product-info">
                    <p className="product-category">{category}</p>
                    <h1>{name}</h1>
                    <p className="product-description">{description}</p>
                    <div className="product-price-row">
                        <span className="price">₹{price}</span>
                        <span className={`stock-badge ${stock > 0 ? "in-stock" : "out-of-stock"}`}>
                            {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;