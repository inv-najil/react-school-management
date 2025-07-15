import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAdmin, getUserRole } from "../utils/auth";

export default function AuthWarapper({ allowedRole, children }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (
        (allowedRole === "admin" && !isAdmin()) ||
        (allowedRole !== "admin" && getUserRole() !== allowedRole)
    ) {
        return <Navigate to={`/${getUserRole()}`} />;
    }

    return children;
}