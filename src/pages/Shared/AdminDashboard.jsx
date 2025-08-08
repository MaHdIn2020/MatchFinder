import { Outlet, NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const AdminDashboardLayout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `py-2 px-3 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
            end
          >
            Dashboard Home
          </NavLink>
          <NavLink
            to="/admin-dashboard/manage-users"
            className={({ isActive }) =>
              `py-2 px-3 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/admin-dashboard/approved-premium"
            className={({ isActive }) =>
              `py-2 px-3 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Approved Premium
          </NavLink>
          <NavLink
            to="/admin-dashboard/approved-contact-requests"
            className={({ isActive }) =>
              `py-2 px-3 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Approved Contact Requests
          </NavLink>

          <button
            onClick={handleLogout}
            className="mt-auto bg-red-600 hover:bg-red-700 py-2 px-3 rounded font-semibold"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
