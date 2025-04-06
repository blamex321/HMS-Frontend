import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(form);
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-teal-500 to-green-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input name="name" placeholder="Name" className="input-style" onChange={handleChange} />
        <input name="email" placeholder="Email" className="input-style" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="input-style" onChange={handleChange} />
        <select name="role" className="input-style" onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn-primary w-full mt-4">Register</button>
      </form>
    </div>
  );
};

export default Register;
