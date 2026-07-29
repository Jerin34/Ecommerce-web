import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
    const token = localStorage.getItem("jwt_token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "user") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};

export default UserRoute;