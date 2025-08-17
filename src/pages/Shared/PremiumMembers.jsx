import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './../../hooks/useAuth';
import Swal from 'sweetalert2';

const PremiumMembersSection = () => {
  const [premiumBiodatas, setPremiumBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://match-finder-server.vercel.app/biodatas/premium')
      .then(res => {
        setPremiumBiodatas(res.data.premiumBiodatas || []);
      })
      .catch(err => {
        console.error('Failed to load premium biodatas:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleViewProfile = (biodataId) => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please login to view the profile.',
        showCancelButton: true,
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
    navigate(`/biodata/${biodataId}`);
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading premium members...</div>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Premium Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {premiumBiodatas.map(({ biodataId, biodataType, profileImage, permanentDivision, age, occupation }) => (
          <div key={biodataId} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt={`Profile ${biodataId}`}
              className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-blue-600"
            />
            <p><strong>Biodata ID:</strong> {biodataId}</p>
            <p><strong>Type:</strong> {biodataType}</p>
            <p><strong>Division:</strong> {permanentDivision}</p>
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Occupation:</strong> {occupation}</p>
            <button
              onClick={() => handleViewProfile(biodataId)}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumMembersSection;
