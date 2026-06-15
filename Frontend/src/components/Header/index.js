import {Link} from 'react-router-dom'
import './index.css'
const Header = () =>{
    return(
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <img src="/logo.png" alt="logo"/>
                </div>
                <ul className="lists">

                    <li className="home"><Link to ="/">Home</Link></li>
                    <li className="products"><Link to="/products">Products</Link></li>
                    <li className="btn"><button className="btn">Logout</button></li>
                </ul>
            </div>

        </nav>
    )
}
export default Header;