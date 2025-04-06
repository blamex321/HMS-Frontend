import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" className="input-style" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input-style" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn-primary w-full mt-4">Login</button>
      </form>
    </div>
  );
};

export default Login;
