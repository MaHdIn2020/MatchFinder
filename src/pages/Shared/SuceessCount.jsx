import React from 'react';

const SuccessCount = () => {
  return (
    <div className="text-left py-12 px-4 sm:px-6">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-4 text-center"> Our Success Stories</h2>
        <p className="text-gray-700">
          MatchFinder simplifies your search for a life partner. Create your biodata, browse profiles, and connect with potential matches. Our platform ensures privacy and security, making your journey smooth and enjoyable.
        </p>
      </div>

      <div className='grid grid-cols-3 gap-3 sm:gap-4'>
         <div className='bg-[#F5F0F0] rounded-xl p-6'>
            <h1 className='text-xl pb-2'>Total Biodatas</h1>
            <h1 className='font-bold text-2xl'>10,000+</h1>
         </div>
         <div className='bg-[#F5F0F0] rounded-xl p-6'>
            <h1 className='text-xl pb-2'>Male</h1>
            <h1 className='font-bold text-2xl'>5,500+</h1>
         </div>
         <div className='bg-[#F5F0F0] rounded-xl p-6'>
            <h1 className='text-xl pb-2'>Female</h1>
            <h1 className='font-bold text-2xl'>4,500+</h1>
         </div>
         <div className='bg-[#F5F0F0] rounded-xl p-6 col-span-3'>
            <h1 className='text-xl pb-2'>Marriages Completed</h1>
            <h1 className='font-bold text-2xl'>2000+</h1>
         </div>     
      </div>
    </div>
  );
};

export default SuccessCount;