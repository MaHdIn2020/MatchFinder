import React from 'react';

const HowItWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">How MatchFinder Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#E82933] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">1</div>
          </div>
          <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
          <p className="text-gray-600">
            Register and complete your biodata with essential details about yourself and your partner preferences.
          </p>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#E82933] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">2</div>
          </div>
          <h3 className="text-xl font-semibold mb-3">Find Compatible Matches</h3>
          <p className="text-gray-600">
            Browse verified profiles and use our smart matching system to find potential life partners.
          </p>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#E82933] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">3</div>
          </div>
          <h3 className="text-xl font-semibold mb-3">Connect & Communicate</h3>
          <p className="text-gray-600">
            Express interest and communicate safely through our platform to take things forward.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;