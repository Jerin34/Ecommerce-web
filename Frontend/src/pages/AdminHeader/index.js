import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";

const AdminHeader = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <header className="admin-header">
            <div className="admin-logo">
                🛒 <span>Admin Panel</span>
            </div>

            <nav className="admin-nav">
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
                <NavLink to="/admin/products">Products</NavLink>
            </nav>

            <div className="admin-right">
                <button className="notification-btn">
                    🔔
                </button>

                <div className="admin-profile">
                    👤 Admin
                </div>

                <button
                    className="logout-btn"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;