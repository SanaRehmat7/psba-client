import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login ,user} = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(()=>{
  //   if(user.role==='superadmin'){
  //     navigate('/pending-approval')
  //   }
  // },[user])

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);


    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      toast.error('Email and password are required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format');
      toast.error('Invalid email format');
      return;
    }

    try {
      const user = await login(formData.email, formData.password);
      toast.success('Login successful!');
      const redirectTo = user.role === 'superadmin' ? '/admin-dashboard' : '/dashboard';
      navigate(redirectTo, { replace: true, state: { from: location.state?.from } });
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.msg || 'Login failed';

      if (status === 403) {
        setError('Account pending approval. Please wait for admin approval.');
        toast.warning('Account pending approval. Please wait for admin approval.');
      } else if (status === 401) {
        setError('Invalid password.');
        toast.error('Invalid password.');
      } else if (status === 400) {
        setError('User not found.');
        toast.error('User not found.');
      } else {
        setError(msg);
        toast.error(msg);
      }
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
       <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-green-600">
          Login to Your Account
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
          <span
            onClick={togglePassword}
            className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-green-600 hover:underline font-medium"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;