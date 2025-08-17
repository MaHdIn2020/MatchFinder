import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);

  // Fetch all users or search
  const fetchUsers = async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://match-finder-server.vercel.app/admin/users${query ? `?search=${encodeURIComponent(query)}` : ''}`);
      setUsers(res.data.users || []);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearching(true);
    fetchUsers(search).finally(() => setSearching(false));
  };

  const makeAdmin = async (uid) => {
    const result = await Swal.fire({
      title: 'Make Admin?',
      text: 'Are you sure you want to promote this user to admin?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, make admin'
    });
  
    if (result.isConfirmed) {
      try {
        await axios.patch(`https://match-finder-server.vercel.app/admin/users/${uid}/make-admin`);
        setUsers(prev => prev.map(u => u._id === uid ? { ...u, role: 'admin' } : u));
  
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User has been promoted to admin.',
          timer: 1500,
          showConfirmButton: false
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: 'Could not promote the user to admin.'
        });
      }
    }
  };
  

  const makePremium = async (uid) => {
    const result = await Swal.fire({
      title: 'Make Premium?',
      text: 'Are you sure you want to grant premium access to this user?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6b46c1',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, make premium'
    });
  
    if (result.isConfirmed) {
      try {
        await axios.patch(`https://match-finder-server.vercel.app/admin/users/${uid}/make-premium`);
        setUsers(prev => prev.map(u => u._id === uid ? { ...u, isPremium: true } : u));
  
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User is now premium.',
          timer: 1500,
          showConfirmButton: false
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: 'Could not update premium status.'
        });
      }
    }
  };
  

  if (loading) return <div className="text-center py-10 text-gray-500">Loading users...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl mt-8 mb-12">
      <h2 className="text-3xl font-bold mb-8 text-blue-900">Manage Users</h2>
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search by username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow" disabled={searching}>
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-blue-100 divide-y divide-blue-100 bg-white rounded-xl shadow">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-base font-semibold text-blue-900 border-r">User Name</th>
              <th className="px-6 py-3 text-left text-base font-semibold text-blue-900 border-r">User Email</th>
              <th className="px-6 py-3 text-center text-base font-semibold text-blue-900 border-r">Make Admin</th>
              <th className="px-6 py-3 text-center text-base font-semibold text-blue-900">Make Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {users.map(user => (
              <tr key={user._id} className="hover:bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap border-r">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center border-r">
                  {user.role === 'admin' ? (
                    <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded">Admin</span>
                  ) : (
                    <button
                      onClick={() => makeAdmin(user._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 font-semibold"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {user.premiumRequested && !user.isPremium ? (
                    <button
                      onClick={() => makePremium(user._id)}
                      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 font-semibold"
                    >
                      Make Premium
                    </button>
                  ) : user.isPremium ? (
                    <span className="text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded">Premium</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers; 