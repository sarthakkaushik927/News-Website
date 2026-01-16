import React, { useState, useEffect, useCallback } from 'react';
import { Clock, ChevronRight, Zap, AlertCircle, Loader2, Menu, X, TrendingUp } from 'lucide-react';
import { fetchAllNews } from './components/api';

const App = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ['general', 'technology', 'business', 'science', 'sports', 'health'];

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllNews(category);
      if (data) setNewsData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadData();
    setIsMenuOpen(false); 
  }, [loadData]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-blue-600">
      <Loader2 size={40} className="animate-spin mb-4" />
      <p className="font-black text-[10px] uppercase tracking-widest text-slate-400">Updating The Chronicle</p>
    </div>
  );

  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center text-red-500">
      <AlertCircle size={48} className="mb-4" />
      <p className="font-bold mb-4">{error}</p>
      <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Retry Connection</button>
    </div>
  );

  const { heroData, latestNews } = newsData;

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-slate-900 font-sans">
      {/* --- NAVBAR --- */}
      <nav className="bg-white/95 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tighter flex items-center gap-2">
            <div className="bg-blue-600 text-white px-2 py-0.5 rounded">CT</div>
            CHRONO<span className="text-blue-600 underline decoration-2 font-black">TYPE</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-1">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${category === cat ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-slate-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- MOBILE DROPDOWN --- */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-4 gap-1">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-black transition-all ${category === cat ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}
                >
                  {cat.toUpperCase()}
                  {category === cat && <Zap size={14} className="fill-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <a href={heroData.mainArticle.url} target="_blank" rel="noreferrer" className="lg:col-span-8 group relative rounded-[2rem] overflow-hidden h-[350px] md:h-[500px] shadow-xl block bg-slate-100">
            <img src={heroData.mainArticle.imageUrl} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt="hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 md:p-10 flex flex-col justify-end text-white">
              <h2 className="text-xl md:text-4xl font-black mb-3 leading-tight">{heroData.mainArticle.title}</h2>
              <p className="text-slate-300 line-clamp-2 text-xs md:text-base font-medium">{heroData.mainArticle.description}</p>
            </div>
          </a>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 border-l-4 border-blue-600 pl-3 italic">Live Stream</h3>
            {heroData.sideArticles.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="group flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="side" />
                </div>
                <h4 className="font-bold text-xs leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors">{item.title}</h4>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2 italic">
            <TrendingUp size={20} className="text-blue-600" /> Recent Discovery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {latestNews.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-slate-100">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="feed" />
                </div>
                <h4 className="font-bold text-sm leading-snug mb-4 flex-grow line-clamp-3 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                   <div className="flex items-center gap-1.5"><Clock size={10} /> {item.date}</div>
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