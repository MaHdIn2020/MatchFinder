import React from 'react';
import { useRouteError, Link } from 'react-router';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg text-center">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">Oops!</h1>
        <p className="text-lg text-gray-700 mb-2">Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-500 mb-6">
          <i>{error?.statusText || error?.message || "Page not found"}</i>
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
