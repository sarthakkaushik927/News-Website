import React, { useState, useEffect, useCallback } from 'react';
import { Clock, ChevronRight, Globe, Zap, AlertTriangle, RefreshCw, Menu, X } from 'lucide-react';
import { fetchAllNews } from './components/api';

const App = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  // New state for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ['general', 'technology', 'business', 'science', 'sports', 'health'];

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllNews(category);
      if (!data) {
        setError("No articles found for this category.");
      } else {
        setNewsData(data);
      }
    } catch (err) {
      setError(err.message || "Failed to connect to the news server.");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => { 
    loadData(); 
    setIsMenuOpen(false); // Close menu automatically when category changes
  }, [loadData]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <RefreshCw size={48} className="text-blue-600 animate-spin mb-4" />
      <p className="font-bold uppercase tracking-widest text-slate-400">Updating Feed...</p>
    </div>
  );

  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <AlertTriangle size={64} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-black mb-2 text-slate-900">Oops! Something went wrong</h2>
      <p className="text-slate-500 mb-6 max-w-md">{error}</p>
      <button 
        onClick={loadData}
        className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  );

  const { heroData, latestNews } = newsData;

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-slate-900 pb-20">
      
      {/* Updated Navbar with Dropdown */}
      <nav className="bg-white border-b sticky top-0 z-50 px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
        <div className="font-black text-xl md:text-2xl tracking-tighter cursor-pointer" onClick={() => window.location.reload()}>
          CHRONO<span className="text-blue-600 underline">TYPE</span>
        </div>

        {/* Desktop View: Horizontal Scroll */}
        <div className="hidden md:flex gap-4">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${category === cat ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-900'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile View: Hamburger Button */}
        <button 
          className="md:hidden p-2 rounded-lg bg-slate-50 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown Panel */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-b shadow-xl md:hidden animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-4 gap-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Categories</p>
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${category === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-600 active:bg-slate-50'}`}
                >
                  {cat.toUpperCase()}
                  {category === cat && <Zap size={14} className="fill-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Main Hero Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <a href={heroData.mainArticle.url} target="_blank" rel="noreferrer" className="lg:col-span-8 group relative rounded-[2rem] overflow-hidden h-[400px] md:h-[550px] block shadow-lg">
            <img src={heroData.mainArticle.imageUrl} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 md:p-10 flex flex-col justify-end">
              <h2 className="text-white text-2xl md:text-4xl font-black mb-3 leading-tight tracking-tight">{heroData.mainArticle.title}</h2>
              <p className="text-slate-300 line-clamp-2 text-sm md:text-base font-medium">{heroData.mainArticle.description}</p>
            </div>
          </a>

          {/* Sidebar Pulse Feed */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-widest border-l-4 border-blue-600 pl-4 flex items-center gap-2">
              <Zap size={14} className="text-blue-600" /> Pulse Feed
            </h3>
            {heroData.sideArticles.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="group flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="side" />
                </div>
                <h4 className="font-bold text-xs leading-tight group-hover:text-blue-600 transition-colors line-clamp-3">{item.title}</h4>
              </a>
            ))}
          </div>
        </div>

        {/* Latest Discovery Feed */}
        <div className="space-y-10">
          <h3 className="text-2xl font-black tracking-tighter uppercase">Latest Updates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestNews.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-50 hover:shadow-xl transition-all group flex flex-col h-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="feed" />
                </div>
                <h4 className="font-bold text-sm leading-tight mb-4 flex-grow line-clamp-3 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                   <span className="flex items-center gap-1 uppercase tracking-widest text-[9px] font-bold text-slate-400"><Clock size={10} /> {item.date}</span>
                   <ChevronRight size={14} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;