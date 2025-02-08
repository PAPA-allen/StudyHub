import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <p className="text-gray-400">
              We provide top-quality study resources for students worldwide. Whether you’re learning programming, design, or marketing, we have something for you.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/about" className="hover:text-gray-300">About</a></li>
              <li><a href="/courses" className="hover:text-gray-300">Courses</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">
              <strong>Email:</strong> support@studyhub.com
            </p>
            <p className="text-gray-400">
              <strong>Phone:</strong> +123-456-7890
            </p>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Study Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
