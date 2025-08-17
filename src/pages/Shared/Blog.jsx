import React from 'react';

const BlogSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Relationship Advice</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <img
            src="https://i.ibb.co/XYZ/blog1.jpg"
            alt="5 Tips for a Perfect Profile"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-xl mb-2">5 Tips for a Perfect Profile</h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              Learn how to make your profile stand out and attract the right matches.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <img
            src="https://i.ibb.co/XYZ/blog2.jpg"
            alt="How to Communicate Effectively"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-xl mb-2">How to Communicate Effectively</h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              Discover ways to start meaningful conversations with potential matches.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <img
            src="https://i.ibb.co/XYZ/blog3.jpg"
            alt="Choosing the Right Partner"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-xl mb-2">Choosing the Right Partner</h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              Guidance on selecting a partner that aligns with your values and goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
