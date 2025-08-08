import React from 'react';
import { useForm } from 'react-hook-form';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Lottie from 'lottie-react';
import animationData from './../../assets/Login.json';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInWithGoogle, signIn } = useAuth();
  const navigate = useNavigate();

  const BACKEND_URL = 'https://match-finder-server.vercel.app';

  const getAndStoreJWT = async (email, userInfo, isGoogle = false) => {
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
      // If Google login and JWT fails, create user then try again
      if (isGoogle && !data.token && userInfo) {
        const upsertRes = await fetch(`${BACKEND_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: userInfo.uid || userInfo.sub || userInfo.id || '',
            name: userInfo.displayName || userInfo.name || '',
            email: userInfo.email,
            photoURL: userInfo.photoURL || userInfo.picture || ''
          })
        });
        if (!upsertRes.ok) {
          toast.error('Login failed: Could not update user info');
          return;
        }
        // Try JWT again
        res = await fetch(`${BACKEND_URL}/jwt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        try {
          data = await res.json();
        } catch { /* ignore non-JSON */ }
      }
      if (!data.token) {
        toast.error('Login failed: Could not get token');
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
      toast.error('Login failed: ' + (err.message || 'Unknown error'));
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        getAndStoreJWT(result.user.email, result.user, true);
        toast.success('Login successful');
      })
      .catch(() => {
        toast.error('Login failed');
      });
  };

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(result => {
        getAndStoreJWT(result.user.email, null, false);
        toast.success("Login Successful!");
      })
      .catch(() => {
        
        toast.error('Login failed');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row">

        <div className="hidden sm:block lg:w-1/2 bg-gray-100 p-4">
          <div className="h-full flex items-center justify-center">
            <Lottie 
              animationData={animationData} 
              loop={true}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>


        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">Welcome Back</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">Email</label>
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
              <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700">Password</label>
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

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6 sm:mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-gray-500 text-xs sm:text-sm">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center py-2 sm:py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                  <g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.86-6.86C36.68 2.7 30.7 0 24 0 14.82 0 6.73 5.06 2.69 12.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M9.67 28.65c-1.13-3.36-1.13-6.99 0-10.35l-7.98-6.2C-1.13 17.13-1.13 30.87 1.69 37.56l7.98-6.2z"/><path fill="#EA4335" d="M24 46c6.7 0 12.68-2.7 17.05-7.44l-7.19-5.6c-2.01 1.35-4.6 2.14-7.86 2.14-6.38 0-11.87-3.63-14.33-8.94l-7.98 6.2C6.73 42.94 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g>
                </svg>
                Sign in with Google
              </button>
            </div>

            <div className="mt-4 sm:mt-6 text-center text-sm sm:text-base">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;