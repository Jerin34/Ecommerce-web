import { Link } from 'react-router-dom'
import Header from '../Header'
import Chatbot from '../../components/Chatbot'
import './index.css'
const Home = () => (
  <div className="home-page">
    <Header />
    <main className="home-main container">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-eyebrow">Fresh arrivals · best sellers · limited offers</span>
          <h1 className="hero-title">
            Shop smarter, live better.
          </h1>
          <p className="hero-description">
            Discover curated collections across electronics, fashion, books, and lifestyle. Enjoy fast delivery, secure checkout, and easy returns.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="hero-button primary">
              Start Shopping
            </Link>
            <Link to="/wishlist" className="hero-button secondary">
              View Wishlist
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="promo-card">
            <p className="promo-label">Deal of the day</p>
            <h2>Up to 40% off on top electronics</h2>
            <p>Headphones, smartwatches, and gadgets with fast shipping.</p>
          </div>
          <div className="mini-gallery">
            <div className="mini-card">New arrivals</div>
            <div className="mini-card">Stylish fashion</div>
            <div className="mini-card">Best selling books</div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-card">
          <span className="feature-icon">🚚</span>
          <h3>Free delivery</h3>
          <p>On orders above ₹999 with real-time tracking.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔒</span>
          <h3>Secure checkout</h3>
          <p>Encrypted payments and trusted payment partners.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">↩️</span>
          <h3>Easy returns</h3>
          <p>Hassle-free returns within 7 days.</p>
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by category</h2>
        <div className="category-grid">
          <Link to="/products" className="category-card">
            <span className="category-icon">💻</span>
            <p>Electronics</p>
          </Link>
          <Link to="/products" className="category-card">
            <span className="category-icon">👗</span>
            <p>Fashion</p>
          </Link>
          <Link to="/products" className="category-card">
            <span className="category-icon">📚</span>
            <p>Books</p>
          </Link>
          <Link to="/products" className="category-card">
            <span className="category-icon">🏡</span>
            <p>Home & Living</p>
          </Link>
        </div>
      </section>

      <section className="assistant-section">
        <div className="assistant-content">
          <h2>Need help finding the perfect product?</h2>
          <p>Use our chatbot anytime to get product suggestions, order updates, or shopping help.</p>
        </div>
        <div className="assistant-widget">
          <Chatbot />
        </div>
      </section>
    </main>
  </div>
)

export default Home;