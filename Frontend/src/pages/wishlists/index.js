import './index.css'
import { useEffect, useState } from 'react';
import { showToast } from '../../components/Toast';
import Header from '../Header';
import './index.css';

const WishList = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWishList = async () => {
        setLoading(true); 
        setError('');

        try {
            const token = localStorage.getItem('jwt_token');
            const url = "http://localhost:5000/api/wishlist";
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            
            if (response.ok) {
                setWishlist(data.wishList);
            } else {
                setError(data.message);
                showToast(data.message); // FIX 4: Utilizing unused import
            }
        } catch (err) {
            setError(err.message); // FIX 2: Set string, not object
            showToast(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishList();
    }, []);

    const removeWishlistItem = async (wishlistId) => {
        try {
            const token = localStorage.getItem('jwt_token');
            const url = `http://localhost:5000/api/wishlist/${wishlistId}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            
            const response = await fetch(url, options);
            const data = await response.json();
            
            if (response.ok) {
                showToast('Item removed from wishlist');
                setWishlist((prevWishlist) => prevWishlist.filter((each) => each.product._id !== wishlistId));
            } else {
                setError(data.message);
                showToast(data.message);
            }
        } catch (err) {
            setError(err.message);
            showToast(err.message);
        }
    };

    // FIX 3: Display UI for loading and error states
    if (loading) return <div><h1>Loading...</h1></div>;
    if (error) return <div><h1>Error: {error}</h1></div>;

    return (
        <div className="wishlist-page">
            <Header/>
            <div className="wishlist-page__header">
                <div>
                    <p className="wishlist-page__eyebrow">Saved favorites</p>
                    <h1>My Wishlist</h1>
                </div>
                <span className="wishlist-page__count">
                    {wishlist.length} item{wishlist.length === 1 ? '' : 's'}
                </span>
            </div>

            {wishlist.length === 0 ? (
                <div className="wishlist-empty">
                    <div className="wishlist-empty__icon">♡</div>
                    <h2>No items in wishlist yet</h2>
                    <p>Save products you love and revisit them anytime.</p>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((each) => (
                        <article key={each._id} className="wishlist-card">
                            <img className="wishlist-card__image" src={each.product.imageUrl} alt={each.product.name} />
                            <div className="wishlist-card__content">
                                <div>
                                    <h3>{each.product.name}</h3>
                                    <p className="wishlist-card__price">₹{each.product.price}</p>
                                    <p className={`wishlist-card__stock ${each.product.stock > 0 ? '' : 'wishlist-card__stock--out'}`}>
                                        {each.product.stock > 0 ? 'In stock' : 'Out of stock'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="wishlist-card__remove"
                                    onClick={() => removeWishlistItem(each.product._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishList;