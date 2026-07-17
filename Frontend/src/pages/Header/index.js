import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBoxes, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import './index.css'

const Header = () =>{
   const onLogout = () =>{
        localStorage.removeItem('jwt_token')
        window.location.replace('/login')
    }
    return(
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/" className="brand-link">
                        <div className="brand-logo">🛍️</div>
                        <span className="brand-name">ShopHub</span>
                    </Link>
                </div>

                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <FontAwesomeIcon icon={faHome} className="nav-icon" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products" className="nav-link">
                            <span>Products</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/carts" className="nav-link">
                            <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
                            <span>Cart</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/orders" className="nav-link">
                            <FontAwesomeIcon icon={faBoxes} className="nav-icon" />
                            <span>Orders</span>
                        </Link>
                    </li>
                    <li className="nav-item logout-item">
                        <button className="logout-btn" onClick={onLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Header;