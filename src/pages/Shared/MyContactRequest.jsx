import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from './../../hooks/useAuth';
import { toast } from 'react-toastify';
const MyContactRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch contact requests for logged-in user
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios.get(`https://match-finder-server.vercel.app/contact-requests/user/${user.email}`)
        .then(res => {
          setRequests(res.data.requests || []);
          setError('');
        })
        .catch(() => {
          setError('Failed to load contact requests');
        })
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  // Delete a contact request
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    try {
      await axios.delete(`https://match-finder-server.vercel.app/contact-requests/${id}`);
      setRequests(prev => prev.filter(req => req._id !== id));
      toast.success('Request deleted successfully');
    } catch {
      toast.error('Failed to delete request');
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  if (requests.length === 0) {
    return <div className="text-center py-10 text-gray-500">No contact requests found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl mt-8 mb-12">
      <h2 className="text-3xl font-bold mb-8 text-blue-900">My Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-blue-100 divide-y divide-blue-100 bg-white rounded-xl shadow">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-base font-semibold text-blue-900 border-r">Name</th>
              <th className="px-6 py-3 text-left text-base font-semibold text-blue-900 border-r">Biodata ID</th>
              <th className="px-6 py-3 text-left text-base font-semibold text-blue-900 border-r">Status</th>
              <th className="px-6 py-3 text-left text-base font-semibold text-blue-900 border-r">Mobile No</th>
              <th className="px-6 py-3 text-left text-base font-semibold text-blue-900 border-r">Email</th>
              <th className="px-6 py-3 text-center text-base font-semibold text-blue-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {requests.map(({ _id, name, biodataId, status, mobile, email }) => (
              <tr key={_id} className="hover:bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap border-r">{name || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r">{biodataId}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r">
                  {status === 'approved' ? (
                    <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded">Approved</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold bg-yellow-100 px-3 py-1 rounded">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r">{status === 'approved' ? mobile : '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r">{status === 'approved' ? email : '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleDelete(_id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                    title="Delete Request"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequests;
