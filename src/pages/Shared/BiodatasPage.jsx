import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { FaCrown } from 'react-icons/fa';

const divisions = [
  'Dhaka', 'Chattagra', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'
];

const BiodatasPage = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    minAge: '',
    maxAge: '',
    biodataType: '',
    division: ''
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios.get('https://match-finder-server.vercel.app/biodatas', {
      params: {
        minAge: filters.minAge,
        maxAge: filters.maxAge,
        biodataType: filters.biodataType,
        division: filters.division,
        page,
        limit: 20
      }
    })
      .then(res => {
        setBiodatas(res.data.biodatas || []);
        setTotal(res.data.total || 0);
        setError('');
      })
      .catch(() => setError('Failed to load biodatas'))
      .finally(() => setLoading(false));
  }, [filters, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleViewProfile = (biodataId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/biodata/${biodataId}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-8">
      {/* Filter Section */}
      <aside className="w-full md:w-72 bg-white rounded-2xl shadow-lg p-8 h-fit border border-blue-100">
        <h3 className="text-2xl font-bold mb-6 text-blue-900">Filter Profiles</h3>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Age Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minAge"
              value={filters.minAge}
              onChange={handleFilterChange}
              placeholder="Min"
              className="border rounded px-2 py-1 w-20"
            />
            <span>-</span>
            <input
              type="number"
              name="maxAge"
              value={filters.maxAge}
              onChange={handleFilterChange}
              placeholder="Max"
              className="border rounded px-2 py-1 w-20"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Biodata Type</label>
          <select
            name="biodataType"
            value={filters.biodataType}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Division</label>
          <select
            name="division"
            value={filters.division}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="">All</option>
            {divisions.map(div => (
              <option key={div} value={div}>{div}</option>
            ))}
          </select>
        </div>
      </aside>

      {/* Biodata List Section */}
      <section className="flex-1">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">All Matrimony Profiles</h2>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading biodatas...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {biodatas.map(bio => (
                <div
                  key={bio.biodataId}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-blue-100 hover:shadow-2xl transition"
                >
                  <div className="relative">
                    <img
                      src={bio.profileImage || 'https://via.placeholder.com/150'}
                      alt={`Profile ${bio.biodataId}`}
                      className="w-28 h-28 rounded-full object-cover mb-3 border-4 border-blue-400 shadow"
                    />
                    {(bio.premiumStatus === 'approved' || bio.premiumStatus === 'premium') && (
                      <span className="absolute top-0 right-0 bg-yellow-400 text-white rounded-full p-2 shadow-lg">
                        <FaCrown className="w-5 h-5" title="Premium" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-1">{bio.name}</h3>
                  <div className="flex flex-wrap gap-2 justify-center text-gray-700 text-base mb-2">
                    <span><b>Age:</b> {bio.age}</span>
                    <span><b>Type:</b> {bio.biodataType}</span>
                  </div>
                  <div className="text-gray-600 text-sm mb-2">
                    <span><b>Division:</b> {bio.permanentDivision}</span>
                  </div>
                  <div className="text-gray-600 text-sm mb-2">
                    <span><b>Occupation:</b> {bio.occupation}</span>
                  </div>
                  <div className="text-gray-500 text-xs mb-2">
                    <b>Biodata ID:</b> {bio.biodataId}
                  </div>
                  <button
                    onClick={() => handleViewProfile(bio.biodataId)}
                    className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1 || loading}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.ceil(total / 20) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  disabled={loading}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === Math.ceil(total / 20) || loading}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default BiodatasPage;