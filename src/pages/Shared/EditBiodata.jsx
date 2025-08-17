import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
const EditBiodata = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    biodataType: '',
    name: '',
    profileImage: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    age: '',
    occupation: '',
    race: '',
    fatherName: '',
    motherName: '',
    permanentDivision: '',
    presentDivision: '',
    expectedPartnerAge: '',
    expectedPartnerHeight: '',
    expectedPartnerWeight: '',
    email: '', // Will be set via useEffect
    mobile: ''
  });

  const [biodataId, setBiodataId] = useState(null);

  useEffect(() => {
    if (user?.email) {
      setForm(prev => ({
        ...prev,
        email: user.email
      }));

      axios.get(`https://match-finder-server.vercel.app/biodata/user/${user.email}`)
        .then(res => {
          if (res.data) {
            setForm(res.data);
            setBiodataId(res.data._id);
          }
        })
        .catch(err => {
          console.log("No existing biodata or error:", err.message);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (biodataId) {
        await axios.patch(`https://match-finder-server.vercel.app/biodata/${biodataId}`, form);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Your biodata has been successfully updated.',
        });
      } else {
        await axios.post('https://match-finder-server.vercel.app/biodata', form);
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Your biodata has been successfully created.',
        });
      }
    } catch (error) {
      console.error('Error saving biodata:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong while saving your biodata.',
      });
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl mt-8 mb-12 p-0 sm:p-8">
      {/* Profile Preview */}
      <div className="flex flex-col items-center gap-4 py-8 border-b border-blue-100 bg-white rounded-t-2xl">
        <img
          src={form.profileImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-lg"
        />
        <h1 className="text-2xl font-bold text-blue-900">{form.name || 'Your Name'}</h1>
        <p className="text-gray-600">{form.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-blue-50 to-white">
        {/* Personal Details */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">Personal Details</h2>
        </div>
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Biodata Type</label>
          <select name="biodataType" value={form.biodataType} onChange={handleChange} className="border rounded px-3 py-2 w-full" required>
            <option value="">Select Type</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Profile Image URL</label>
          <input type="text" name="profileImage" value={form.profileImage} onChange={handleChange} placeholder="Profile Image URL" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Height (cm)</label>
          <input type="number" name="height" value={form.height} onChange={handleChange} placeholder="Height" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Weight (kg)</label>
          <input type="number" name="weight" value={form.weight} onChange={handleChange} placeholder="Weight" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Occupation</label>
          <input type="text" name="occupation" value={form.occupation} onChange={handleChange} placeholder="Occupation" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Race (Skin color)</label>
          <input type="text" name="race" value={form.race} onChange={handleChange} placeholder="Race" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Mobile Number</label>
          <input type="text" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input type="email" name="email" value={form.email} readOnly className="border rounded px-3 py-2 w-full bg-gray-100" />
        </div>

        {/* Family Details */}
        <div className="md:col-span-2 mt-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">Family Details</h2>
        </div>
        <div>
          <label className="block font-medium mb-1">Father's Name</label>
          <input type="text" name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father's Name" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Mother's Name</label>
          <input type="text" name="motherName" value={form.motherName} onChange={handleChange} placeholder="Mother's Name" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Permanent Division</label>
          <input type="text" name="permanentDivision" value={form.permanentDivision} onChange={handleChange} placeholder="Permanent Division" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Present Division</label>
          <input type="text" name="presentDivision" value={form.presentDivision} onChange={handleChange} placeholder="Present Division" className="border rounded px-3 py-2 w-full" />
        </div>

        {/* Partner Preferences */}
        <div className="md:col-span-2 mt-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">Partner Preferences</h2>
        </div>
        <div>
          <label className="block font-medium mb-1">Expected Partner Age</label>
          <input type="text" name="expectedPartnerAge" value={form.expectedPartnerAge} onChange={handleChange} placeholder="Expected Partner Age" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Expected Partner Height</label>
          <input type="text" name="expectedPartnerHeight" value={form.expectedPartnerHeight} onChange={handleChange} placeholder="Expected Partner Height" className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block font-medium mb-1">Expected Partner Weight</label>
          <input type="text" name="expectedPartnerWeight" value={form.expectedPartnerWeight} onChange={handleChange} placeholder="Expected Partner Weight" className="border rounded px-3 py-2 w-full" />
        </div>

        <button type="submit" className="md:col-span-2 mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition">
          Save & Publish Now
        </button>
      </form>
    </div>
  );
};

export default EditBiodata;