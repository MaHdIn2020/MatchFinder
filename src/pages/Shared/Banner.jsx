import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
  const slides = [
    {
      img: 'https://i.ibb.co/FQ4ZCcL/pexels-minan1398-758898.jpg',
      title: 'Find Your Perfect Match',
      desc: 'Join thousands of happy couples who found love',
      btnText: 'Create Your Profile',
    },
    {
      img: 'https://i.ibb.co/twCbTTL7/pexels-jasmin-wedding-photography-619951-1415131.jpg',
      title: 'Serious Relationships',
      desc: 'Designed for those seeking marriage',
      btnText: 'Browse Profiles',
    },
    {
      img: 'https://i.ibb.co/hFjVHRxR/pexels-leeloothefirst-5037175.jpg',
      title: 'Trusted Matchmaking',
      desc: 'Verified profiles for your safety',
      btnText: 'How It Works',
    },
  ];

  return (
    <div className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        className="relative"
        dynamicHeight={false}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="h-[500px] md:h-[600px] lg:h-[700px] relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center px-4">
              <div className="text-center text-white max-w-2xl">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg lg:text-xl mb-6">{slide.desc}</p>
                <button className="bg-[#E82933] text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium hover:bg-[#d11a24] transition">
                  {slide.btnText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
