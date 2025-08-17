import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const GotMarried = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    selfBiodataId: '',
    partnerBiodataId: '',
    coupleImage: '',
    review: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coupleImage' && files && files[0]) {
      // For simplicity, use a URL input. For file upload, you would upload to a storage service.
      // Here, just set the file name as a placeholder.
      setForm(prev => ({ ...prev, coupleImage: files[0].name }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await axios.post('/success-stories', {
        ...form,
        userEmail: user?.email || ''
      });
      setSuccess(true);
      setForm({ selfBiodataId: '', partnerBiodataId: '', coupleImage: '', review: '' });
    } catch {
      setError('Failed to submit success story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Share Your Success Story</h2>
      {success && <div className="text-green-600 mb-4">Thank you for sharing your story!</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Your Biodata ID</label>
          <input
            type="text"
            name="selfBiodataId"
            value={form.selfBiodataId}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Partner Biodata ID</label>
          <input
            type="text"
            name="partnerBiodataId"
            value={form.partnerBiodataId}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Couple Image (URL)</label>
          <input
            type="text"
            name="coupleImage"
            value={form.coupleImage}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            placeholder="https://image-link.com/photo.jpg"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Success Story Review</label>
          <textarea
            name="review"
            value={form.review}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            rows={4}
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Success Story'}
        </button>
      </form>
    </div>
  );
};

export default GotMarried; 