import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from './../../hooks/useAuth';
import Swal from 'sweetalert2';

const FavoritesBiodata = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios.get(`https://match-finder-server.vercel.app/favorites/user/${user.email}`)
        .then(res => {
          setFavorites(res.data.favorites || []);
          setError('');
        })
        .catch(() => {
          setError('Failed to load favorites');
        })
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  const handleDelete = async (biodataId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this favorite biodata?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`https://match-finder-server.vercel.app/favorites/${user.email}/${biodataId}`);
        setFavorites(prev => prev.filter(fav => fav.biodataId !== biodataId));
  
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: 'Favorite biodata has been removed.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: 'Could not remove the favorite.',
        });
      }
    }
  };
  

  if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  if (favorites.length === 0) {
    return <div className="text-center py-10 text-gray-500">No favorites found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Favourites Biodata</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r">Biodata ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r">Permanent Address</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-r">Occupation</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {favorites.map(({ biodataId, name, permanentDivision, occupation }) => (
              <tr key={biodataId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap border-r">{name}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r">{biodataId}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r">{permanentDivision}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r">{occupation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleDelete(biodataId)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                    title="Remove Favorite"
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

export default FavoritesBiodata;