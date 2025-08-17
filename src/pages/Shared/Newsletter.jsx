import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Call your API or service for subscription
    alert(`Subscribed with ${email}`);
    setEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-100 dark:bg-gray-900 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Stay Updated</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Subscribe to our newsletter to get the latest matches and updates
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-lg w-full sm:w-80 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#E82933] text-white px-6 py-2 rounded-lg hover:bg-[#d11a24] transition w-full sm:w-auto"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
