import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const ApprovedContactRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('https://match-finder-server.vercel.app/contact-requests/pending')
      .then(res => setRequests(res.data.requests || []))
      .catch(() => setError('Failed to load contact requests'))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this contact request?')) return;
    try {
      await axios.patch(`https://match-finder-server.vercel.app/contact-requests/approve/${id}`);
      setRequests(prev => prev.filter(req => req._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Approved!',
        text: 'Contact request approved',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to approve contact request',
      });
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading contact requests...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  if (requests.length === 0) {
    return <div className="text-center py-10 text-gray-500">No pending contact requests found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl mt-8 mb-12">
      <h2 className="text-3xl font-bold mb-8 text-blue-900">Pending Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-blue-100 divide-y divide-blue-100 bg-white rounded-xl shadow">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-base font-semibold text-blue-900 border-r">Name</th>
              <th className="px-6 py-3 text-left text-base font-semibold text-blue-900 border-r">Email</th>
              <th className="px-6 py-3 text-left text-base font-semibold text-blue-900 border-r">Biodata ID</th>
              <th className="px-6 py-3 text-center text-base font-semibold text-blue-900">Approve Contact Request</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {requests.map(({ _id, name, email, biodataId }) => (
              <tr key={_id} className="hover:bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap border-r">{name}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r">{email}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r">{biodataId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleApprove(_id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 shadow"
                  >
                    Approve
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

export default ApprovedContactRequest;