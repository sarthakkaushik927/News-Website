import React from 'react';

const Footer = () => {
  const footerLinks = {
    Company: ['Privacy', 'Term', 'About', 'Help', 'Accessibility'],
    Categories: ['World', 'Politics', 'Business', 'Science', 'Tech', 'Travel', 'Climate', 'Food', 'Sports'],
  };

  return (
    <footer className="bg-[#1a1a1a] text-gray-400 mt-12 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wider">NEWSLETTER</h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.Company.map(link => (
                  <li key={link}><a href="#" className="hover:text-white text-sm">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                 {footerLinks.Categories.map(link => (
                  <li key={link}><a href="#" className="hover:text-white text-sm">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; 2025 NEWSLETTER. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;