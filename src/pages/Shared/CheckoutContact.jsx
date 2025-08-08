import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
const CheckoutContact = () => {
  const { biodataId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [card, setCard] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('https://match-finder-server.vercel.app/contact-requests', {
        userEmail: user.email,
        biodataId,
        name: user.name || 'N/A',
        mobile: user.mobile || 'N/A',
        email: user.email
      });
  
      Swal.fire({
        title: 'Success!',
        text: 'Contact request submitted!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/dashboard/contact-requests');
      });
  
    } catch (err) {
      setError('Failed to submit contact request');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Checkout - Request Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Biodata ID</label>
          <input
            type="text"
            value={biodataId}
            readOnly
            className="border rounded px-3 py-2 w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Your Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="border rounded px-3 py-2 w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Card Number</label>
          <input
            type="text"
            value={card}
            onChange={e => setCard(e.target.value)}
            placeholder="Card Number"
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay $5 & Request Contact Info'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutContact; 