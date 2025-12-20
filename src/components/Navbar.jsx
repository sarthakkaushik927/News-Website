export const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
      <div className="text-2xl font-black tracking-tighter text-red-600">TESLA<span className="text-black">HUB</span></div>
      <div className="hidden md:flex space-x-8 font-medium text-gray-600">
        <a href="#" className="hover:text-red-600 transition">Latest</a>
        <a href="#" className="hover:text-red-600 transition">Market</a>
        <a href="#" className="hover:text-red-600 transition">Energy</a>
      </div>
      <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800">Stay Updated</button>
    </div>
  </nav>
);