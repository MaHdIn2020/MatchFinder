import React from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import registerAnimation from './../../assets/Register.json';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const BACKEND_URL = 'https://match-finder-server.vercel.app';

  const getAndStoreJWT = async (email) => {
    try {
      let res = await fetch(`${BACKEND_URL}/jwt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      let data = {};
      try {
        data = await res.json();
      } catch { /* ignore non-JSON */ }
      if (!data.token) {
        toast.error('Registration failed: Could not get token');
        return;
      }
      localStorage.setItem('token', data.token);
      // Fetch user info and redirect based on role
      const userRes = await fetch(`${BACKEND_URL}/users?email=${encodeURIComponent(email)}`);
      let userData = {};
      try {
        userData = await userRes.json();
      } catch { /* ignore non-JSON */ }
      if (userData && userData.users && userData.users.length > 0) {
        const user = userData.users[0];
        if (user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } catch (err) {
      toast.error('Registration failed: ' + (err.message || 'Unknown error'));
    }
  };

  const onSubmit = async (data) => {
    try {
      // 1. Create user in Firebase Auth
      const firebaseUserCredential = await createUser(data.email, data.password);
      const user = firebaseUserCredential.user;
      // 2. Save additional data to MongoDB
      const response = await fetch(`${BACKEND_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          name: data.name,
          email: data.email,
          photoURL: data.photoURL
        })
      });
      let result = {};
      try {
        result = await response.json();
      } catch { /* ignore non-JSON */ }
      if (!response.ok && result.error !== 'User already exists') {
        throw new Error(result.error || 'Failed to save user data');
      }
      toast.success('Registration successful!');
      // Log the user in and redirect based on role
      await getAndStoreJWT(data.email);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row">
        {/* Lottie Animation Section - Hidden on mobile */}
        <div className="hidden sm:block lg:w-1/2 bg-gray-100 p-4">
          <div className="h-full flex items-center justify-center">
            <Lottie 
              animationData={registerAnimation} 
              loop={true}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>

        {/* Registration Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
            Create Your Account
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters"
                  }
                })}
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              />
              {errors.name && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              />
              {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              />
              {errors.password && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="photoURL" className="block text-sm sm:text-base font-medium text-gray-700">
                Photo URL 
              </label>
              <input
                id="photoURL"
                type="url"
                {...register('photoURL', {
                  pattern: {
                    value: /^(https?:\/\/).+$/i,
                    message: "Please enter a valid URL starting with http:// or https://"
                  }
                })}
                className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                placeholder="https://example.com/photo.jpg"
              />
              {errors.photoURL && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.photoURL.message}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6 sm:mt-8 text-center text-sm sm:text-base">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;