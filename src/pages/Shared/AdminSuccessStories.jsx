import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ open: false, story: null });

  useEffect(() => {
    setLoading(true);
    axios.get('/success-stories')
      .then(res => setStories(res.data.stories || []))
      .catch(() => setError('Failed to load success stories'))
      .finally(() => setLoading(false));
  }, []);

  const openModal = (story) => setModal({ open: true, story });
  const closeModal = () => setModal({ open: false, story: null });

  if (loading) return <div className="text-center py-10 text-gray-500">Loading success stories...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Success Stories</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r">Male Biodata ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r">Female Biodata ID</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">View Story</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stories.map(story => (
              <tr key={story._id || story.selfBiodataId + '-' + story.partnerBiodataId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap border-r">{story.selfBiodataId}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r">{story.partnerBiodataId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => openModal(story)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&times;</button>
            <h3 className="text-xl font-bold mb-4">Success Story</h3>
            {modal.story.coupleImage && (
              <img src={modal.story.coupleImage} alt="Couple" className="w-full h-48 object-cover rounded mb-4" />
            )}
            <div className="mb-2"><b>Review:</b></div>
            <div className="text-gray-700 mb-2">{modal.story.review}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSuccessStories; 