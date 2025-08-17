import React from 'react';

const BenefitsSection = () => {
  const benefits = [
    "Verified Profiles for Safety",
    "Access to Premium Members",
    "Smart Match Suggestions",
    "24/7 Customer Support",
    "Detailed Profile Insights",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-center">Membership Benefits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex items-center justify-center text-center"
          >
            <p className="text-gray-700 dark:text-gray-200 font-medium">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
