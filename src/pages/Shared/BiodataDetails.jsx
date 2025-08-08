import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const BiodataDetails = () => {
  const { biodataId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [biodata, setBiodata] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingFav, setAddingFav] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://match-finder-server.vercel.app/biodata/${biodataId}`)
      .then(res => {
        setBiodata(res.data);
        setError('');
        // Fetch similar biodatas
        return axios.get('https://match-finder-server.vercel.app/biodatas', {
          params: {
            biodataType: res.data.biodataType,
            exclude: biodataId,
            limit: 3
          }
        });
      })
      .then(res => setSimilar(res.data.biodatas || []))
      .catch(() => setError('Failed to load biodata'))
      .finally(() => setLoading(false));
  }, [biodataId]);

  const handleAddToFavourites = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setAddingFav(true);
    try {
      await axios.post('https://match-finder-server.vercel.app/favorites', { userEmail: user.email, biodataId });
      Swal.fire({
        icon: 'success',
        title: 'Biodata Details',
        text: 'Added to favourites!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Biodata Details',
        text: 'Failed to add to favourites',
      });
    } finally {
      setAddingFav(false);
    }
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${biodataId}`);
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading biodata...</div>;
  if (error || !biodata) return <div className="text-center py-10 text-red-600">{error || 'Biodata not found.'}</div>;

  // Determine if user is premium
  const isPremium = user && user.isPremium;

  return (
    <div className="max-w-3xl mx-auto p-0 sm:p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl mt-8 mb-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 border-b border-blue-100 bg-white rounded-t-2xl">
        <img
          src={biodata.profileImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow-lg mb-4 md:mb-0"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{biodata.name}</h1>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-gray-700 text-lg mb-2">
            <span><b>Age:</b> {biodata.age}</span>
            <span><b>Height:</b> {biodata.height} cm</span>
            <span><b>Occupation:</b> {biodata.occupation}</span>
            <span><b>Biodata ID:</b> {biodata.biodataId}</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-gray-600 text-base">
            <span><b>Division:</b> {biodata.permanentDivision}</span>
            <span><b>Type:</b> {biodata.biodataType}</span>
            <span><b>Status:</b> <span className={"inline-block px-2 py-1 rounded text-xs " + (biodata.premiumStatus === 'approved' || biodata.premiumStatus === 'premium' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-600')}>{biodata.premiumStatus}</span></span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center py-6 bg-white border-b border-blue-100">
        <button
          onClick={handleAddToFavourites}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold shadow"
          disabled={addingFav}
        >
          {addingFav ? 'Adding...' : 'Add to Favourites'}
        </button>
        {!isPremium && (
          <button
            onClick={handleRequestContact}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
          >
            Request Contact Information
          </button>
        )}
      </div>

      {/* Details Sections */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-blue-50 to-white">
        {/* Personal Details */}
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">Personal Details</h2>
          <ul className="space-y-2 text-gray-800">
            <li><b>Date of Birth:</b> {biodata.dateOfBirth}</li>
            <li><b>Weight:</b> {biodata.weight} kg</li>
            <li><b>Race (Skin color):</b> {biodata.race}</li>
            <li><b>Present Division:</b> {biodata.presentDivision}</li>
            <li><b>Status:</b> {biodata.status}</li>
          </ul>
        </div>
        {/* Family Details */}
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">Family Details</h2>
          <ul className="space-y-2 text-gray-800">
            <li><b>Father's Name:</b> {biodata.fatherName}</li>
            <li><b>Mother's Name:</b> {biodata.motherName}</li>
          </ul>
        </div>
        {/* Partner Preferences */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">Partner Preferences</h2>
          <ul className="space-y-2 text-gray-800">
            <li><b>Expected Partner Age:</b> {biodata.expectedPartnerAge}</li>
            <li><b>Expected Partner Height:</b> {biodata.expectedPartnerHeight}</li>
            <li><b>Expected Partner Weight:</b> {biodata.expectedPartnerWeight}</li>
          </ul>
        </div>
        {/* Contact Info for Premium Users */}
        {isPremium && (
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">Contact Information</h2>
            <ul className="space-y-2 text-gray-800">
              <li><b>Contact Email:</b> {biodata.contactEmail || biodata.email}</li>
              <li><b>Mobile Number:</b> {biodata.mobileNumber || biodata.mobile}</li>
            </ul>
          </div>
        )}
      </div>

      {/* Similar Profiles */}
      <div className="p-8">
        <h3 className="text-xl font-semibold text-blue-800 mb-6">Similar Profiles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {similar.map(sim => (
            <div key={sim.biodataId} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center border border-blue-100 hover:shadow-lg transition">
              <img
                src={sim.profileImage || 'https://via.placeholder.com/100'}
                alt={`Profile ${sim.biodataId}`}
                className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-blue-400"
              />
              <p className="font-semibold text-blue-900">{sim.name}</p>
              <p className="text-gray-700 text-sm">Age: {sim.age}</p>
              <button
                onClick={() => navigate(`/biodata/${sim.biodataId}`)}
                className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails; 