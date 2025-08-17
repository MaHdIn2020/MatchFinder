import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router'; // <-- use react-router-dom here
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
import StickyBox from 'react-sticky-box'; // ✅ import sticky-box

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://match-finder-server.vercel.app/users?email=${encodeURIComponent(
            user.email
          )}`
        )
        .then((res) => {
          if (res.data?.users?.length > 0) {
            setUserInfo(res.data.users[0]);
          }
        })
        .catch(() => setUserInfo(null));
    } else {
      setUserInfo(null);
    }
  }, [user]);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success('Signed out successfully');
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Signed out failed');
      });
  };

  const dashboardLink =
    userInfo?.role === 'admin' ? '/admin-dashboard' : '/dashboard';

  return (
    <StickyBox offsetTop={0} className="z-50"> {/* ✅ Sticky wrapper */}
      <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md py-4 px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#E82933]">
            MatchFinder
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              <Link to="/" className="hover:text-[#E82933] transition">
                Home
              </Link>
              <Link to="/biodatas" className="hover:text-[#E82933] transition">
                Biodatas
              </Link>
              <Link to="/about" className="hover:text-[#E82933] transition">
                About Us
              </Link>
            </div>
            {user ? (
              <>
                <Link
                  to={dashboardLink}
                  className="hover:text-[#E82933] transition"
                >
                  Dashboard
                </Link>
                <button
                  className="bg-[#E82933] text-white px-4 py-2 rounded hover:bg-[#d11a24] transition"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-[#E82933] text-white px-4 py-2 rounded hover:bg-[#d11a24] transition"
              >
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-[#E82933]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link to="/" className="block hover:text-[#E82933]">
              Home
            </Link>
            <Link to="/biodatas" className="block hover:text-[#E82933]">
              Biodatas
            </Link>
            <Link to="/about" className="block hover:text-[#E82933]">
              About Us
            </Link>
            <Link to={dashboardLink} className="block hover:text-[#E82933]">
              Dashboard
            </Link>
            {user ? (
              <button
                className="block bg-[#E82933] text-white px-4 py-2 rounded w-fit mx-auto"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="block bg-[#E82933] text-white px-4 py-2 rounded w-fit mx-auto"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </StickyBox>
  );
};

export default Navbar;
