import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { apiStatuses } from "../../constants/apiStatuses";
import "./index.css";
import { showToast } from "../../components/Toast";
import Header from '../Header'

const ProductDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [apiStatus, setApistatus] = useState(apiStatuses.INITIAL);
  const [error, setError] = useState("");
  const [reviews, setReview] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/review/${id}`);
      const data = await response.json();
      if (response.ok) {
        setReview(data.reviews);
      } else {
        setReview(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchProduct = async () => {
    setApistatus(apiStatuses.LOADING);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
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
  const SubmitFunc = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product:id, rating, comment }),
      });
      const data = await response.json();
      if (response.ok) {
        await fetchReviews();
        setRating(5);
        setComment("");
        showToast(data.message);
      } else {
        setError(data.message);
        showToast(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const addToWishlist = async (productId) => {
    try{
      const token = localStorage.getItem("jwt_token");
      if(!token){
        showToast("Please Login First")
         return ;
      }
      const url = `${process.env.REACT_APP_API_URL}/api/wishlist`
      const options = {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({product:productId})
      }
      const response = await fetch(url,options)
      const data = await response.json();
      if(response.ok){
        showToast(data.message)
        setIsWishlisted(true)
       
      }
      else{
        showToast(data.message)
      }
    }
    catch(e){
      setError(e.message)
    }
  }
  const checkWishlistStatus = async() =>{
    try{
    const token = localStorage.getItem('jwt_token')
    if(!token){
      return ;
    }
    const url = `${process.env.REACT_APP_API_URL}/api/wishlist`
    const options = {
method:'GET',
headers:{
  'Authorization':`Bearer ${token}`
}
    }
    const response = await fetch(url, options)
    const data = await response.json();
    if(response.ok){
    const exists = data.wishList.some((item) => {
      const wishlistProductId = item.product?._id ?? item.product;
      return wishlistProductId?.toString() === id;
    });
setIsWishlisted(exists);

    } 
  }catch(err){
    setError(err.message)
  }
  }
  useEffect(() => {
    fetchProduct();
    fetchReviews();
    checkWishlistStatus();
  }, [id]);
  const addToCart = async(productId) =>{
    try{
      
    const token = localStorage.getItem("jwt_token");
    if(!token){
      showToast("Please Login First")
       return ;
    }
    const url = `${process.env.REACT_APP_API_URL}/api/cart`
    const options = {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
      body:JSON.stringify({
        productId:productId,
      }),
    };
    const response = await fetch(url,options)
    const data = await response.json();
    if(response.ok){
      showToast(data.message);
    }else{
      showToast(data.message);
    }
  }
  catch(err){
    setError(err.message)
    showToast(err.message)
  }

  }
  const removeFromWishlist = async (productId) => {
    try{
      const token = localStorage.getItem("jwt_token");
      if(!token){
        showToast("Please Login First")
         return ;
      }
      const url = `${process.env.REACT_APP_API_URL}/api/wishlist/${productId}`
      const options = {
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      }
      const response = await fetch(url, options)
      const data = await response.json();
      if(response.ok){
        showToast(data.message)
        setIsWishlisted(false)
      }
      else{
        showToast(data.message)
      }
    }
    catch(e){
      setError(e.message)
    }
  }

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
  const renderStars = (rating) => {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? "★" : "☆";
    }

    return stars;
  };
  
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;
  const { name, description, price, imageUrl, stock, category } = product;

  return (
    <div className="product-details-page">
      <Header />
      <div className="product-details-card">
        <img className="product-details-card__image" src={imageUrl} alt={name} />
        <div className="product-details-card__content">
          <p className="product-details-card__category">{category}</p>
          <h1 className="product-details-card__title">{name}</h1>
          <p className="product-details-card__description">{description}</p>
          <div className="product-details-card__meta">
            <span className="product-details-card__price">₹{price}</span>
            <span
              className={`product-details-card__stock ${
                stock > 0
                  ? "product-details-card__stock--available"
                  : "product-details-card__stock--soldout"
              }`}
            >
              {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
            </span>
          </div>
          <div className="product-details-card__actions">
            <button
              type="button"
              className={`wishlist-toggle-btn ${isWishlisted ? "wishlist-toggle-btn--active" : ""}`}
              onClick={() => {
                if (isWishlisted) {
                  removeFromWishlist(product._id);
                } else {
                  addToWishlist(product._id);
                }
              }}
            >
              <span className="wishlist-toggle-btn__icon">{isWishlisted ? "♥" : "♡"}</span>
              <span>{isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}</span>
            </button>
            <button className="addtoCart" onClick={() => addToCart(product._id)}>
              Add to Cart
            </button>
            <button
  type="button"
  className="wishlist-page-btn"
  onClick={() => navigate("/wishlist")}
>
  Go to Wishlist
</button>
          </div>
        </div>
      </div>

      <section className="product-details-section product-details-reviews">
        <div className="section-heading">
          <div>
            <h2>Customer Reviews</h2>
            <p className="section-subtitle">
              {reviews.length > 0
                ? `${averageRating} stars · ${reviews.length} ${
                    reviews.length === 1 ? "review" : "reviews"
                  }`
                : "Be the first to share your experience."}
            </p>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="empty-state">
            <p>No reviews yet for this product.</p>
          </div>
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article key={review._id} className="review-card">
                <div className="review-card__header">
                  <div>
                    <h3 className="review-card__author">{review.user.name}</h3>
                    <p className="review-card__date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="review-card__rating">
                    {renderStars(review.rating)}
                  </span>
                </div>
                <p className="review-card__comment">{review.comment}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="product-details-section product-details-review-form">
        <div className="section-heading">
          <div>
            <h2>Write a Review</h2>
            <p className="section-subtitle">Share your feedback and help other shoppers.</p>
          </div>
        </div>

        <form className="review-form" onSubmit={SubmitFunc}>
          <div className="review-form__field">
            <label className="review-form__label" htmlFor="rating">
              Rating
            </label>
            <select
              id="rating"
              className="review-form__select"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <div className="review-form__field">
            <label className="review-form__label" htmlFor="comment">
              Comment
            </label>
            <textarea
              id="comment"
              className="review-form__textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
              rows="5"
            />
          </div>

          <button type="submit" className="review-form__submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProductDetails;
