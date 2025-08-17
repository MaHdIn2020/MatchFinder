import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="  pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-5">
            <h3 className="text-2xl font-serif font-medium ">MatchFinder</h3>
            <p className="leading-relaxed">
              A premium matchmaking service helping individuals find meaningful connections since 2015.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>


          <div>
            <h4 className=" font-medium mb-6 text-lg">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Premium Matching</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Personalized Coaching</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Background Verification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wedding Planning</a></li>
            </ul>
          </div>


          <div>
            <h4 className=" font-medium mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>


          <div>
            <h4 className=" font-medium mb-6 text-lg">Contact</h4>
            <address className="not-italic space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                <span>22 Match Point Avenue<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-gray-400" />
                <span>connect@matchfinder.com</span>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} MatchFinder. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;