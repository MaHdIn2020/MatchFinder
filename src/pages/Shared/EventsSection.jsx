import React from 'react';

const EventsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <img
            src="https://i.ibb.co/XYZ/event1.jpg"
            alt="Virtual Meet & Greet"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-xl mb-1">Virtual Meet & Greet</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Aug 25, 2025</p>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              Join our online meetup and connect with other members.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <img
            src="https://i.ibb.co/XYZ/event2.jpg"
            alt="Relationship Webinar"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-xl mb-1">Relationship Webinar</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Sep 5, 2025</p>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              Learn tips and advice for building lasting relationships.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <img
            src="https://i.ibb.co/XYZ/event3.jpg"
            alt="Premium Members Mixer"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-xl mb-1">Premium Members Mixer</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Sep 15, 2025</p>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              Exclusive event for premium members to meet new people.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
