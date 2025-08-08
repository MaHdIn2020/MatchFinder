import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        className="rounded-lg overflow-hidden shadow-xl"
      >
        <div className="h-64 md:h-96 lg:h-[500px]">
          <img 
            src="https://i.ibb.co/FQ4ZCcL/pexels-minan1398-758898.jpg" 
            alt="Happy Couple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-4">Find Your Perfect Match</h2>
              <p className="text-black text-lg md:text-xl mb-6">Join thousands of happy couples who found love</p>
              <button className="bg-[#E82933] text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base font-medium hover:bg-[#d11a24] transition">
                Create Your Profile
              </button>
            </div>
          </div>
        </div>

        <div className="h-64 md:h-96 lg:h-[500px]">
          <img 
            src="https://i.ibb.co/twCbTTL7/pexels-jasmin-wedding-photography-619951-1415131.jpg" 
            alt="Wedding Rings"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-4">Serious Relationships</h2>
              <p className="text-black text-lg md:text-xl mb-6">Designed for those seeking marriage</p>
              <button className="bg-[#E82933] text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base font-medium hover:bg-[#d11a24] transition">
                Browse Profiles
              </button>
            </div>
          </div>
        </div>

        <div className="h-64 md:h-96 lg:h-[500px]">
          <img 
            src="https://i.ibb.co/hFjVHRxR/pexels-leeloothefirst-5037175.jpg" 
            alt="Happy Family"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-4">Trusted Matchmaking</h2>
              <p className="text-black text-lg md:text-xl mb-6">Verified profiles for your safety</p>
              <button className="bg-[#E82933] text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base font-medium hover:bg-[#d11a24] transition">
                How It Works
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;