import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { FaCrown } from 'react-icons/fa';

const ViewBiodata = () => {
  const { biodataId } = useParams();
  const [biodata, setBiodata] = useState(null);

  useEffect(() => {
    axios.get(`https://match-finder-server.vercel.app/biodata/${biodataId}`)
      .then(res => setBiodata(res.data))
      .catch(() => {});
  }, [biodataId]);

  if (!biodata) return <div className="text-center py-10 text-gray-500">Loading...</div>;

  const isPremium = biodata.premiumStatus === 'approved' || biodata.premiumStatus === 'premium';

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl mt-8 mb-12 p-0 sm:p-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 border-b border-blue-100 bg-white rounded-t-2xl">
        <div className="relative">
          <img
            src={biodata.profileImage || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow-lg mb-4 md:mb-0"
          />
          {isPremium && (
            <span className="absolute top-0 right-0 bg-yellow-400 text-white rounded-full p-2 shadow-lg">
              <FaCrown className="w-6 h-6" title="Premium" />
            </span>
          )}
        </div>
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
            <span><b>Status:</b> <span className={"inline-block px-2 py-1 rounded text-xs " + (isPremium ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-600')}>{biodata.premiumStatus}</span></span>
          </div>
        </div>
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
        {/* Contact Info */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">Contact Information</h2>
          <ul className="space-y-2 text-gray-800">
            <li><b>Email:</b> {biodata.email}</li>
            <li><b>Mobile:</b> {biodata.mobile}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewBiodata;