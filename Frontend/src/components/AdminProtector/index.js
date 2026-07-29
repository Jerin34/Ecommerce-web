const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("jwt_token");
    const role = localStorage.getItem("role");

    if (!token) {
        window.location.replace("/login");
    }

    if (role !== "admin") {
        window.location.replace("/");
    }

    return children;
};
export default AdminRoute;