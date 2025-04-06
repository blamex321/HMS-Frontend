import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">{user?.name} ({user?.role})</span>
        <button onClick={handleLogout} className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
