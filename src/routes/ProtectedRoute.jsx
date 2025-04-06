import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  // Optional: check if role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
