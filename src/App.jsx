import React, { useState, useEffect, useCallback } from 'react';
import { Search, Clock, ChevronRight, Newspaper, Cpu, TrendingUp, FlaskConical, Globe } from 'lucide-react';
import { fetchAllNews } from './components/api';

const App = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "general", name: "Top Stories", icon: <Globe size={16} /> },
    { id: "technology", name: "Tech", icon: <Cpu size={16} /> },
    { id: "business", name: "Business", icon: <TrendingUp size={16} /> },
    { id: "science", name: "Science", icon: <FlaskConical size={16} /> },
  ];

  const loadData = useCallback(async (query = "") => {
    setLoading(true);
    try {
      const data = await fetchAllNews(category, query);
      setNewsData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center font-black animate-pulse text-blue-600">
      <Newspaper size={48} className="mb-4" />
      <p className="tracking-widest uppercase">Syncing The Chronicle...</p>
    </div>
  );

  if (!newsData) return null;
  const { heroData, latestNews, trendingNews } = newsData;

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-slate-900 font-sans pb-20">
      {/* 1. Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-black tracking-tighter cursor-pointer" onClick={() => window.location.reload()}>
          THE<span className="text-blue-600 underline">CHRONICLE</span>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${category === cat.id ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2 border">
          <Search size={18} className="text-slate-400" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48" 
            placeholder="Search news..." 
            onKeyDown={(e) => e.key === 'Enter' && loadData(e.target.value)}
          />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* 2. Bento Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <a href={heroData.mainArticle.url} target="_blank" rel="noreferrer" className="lg:col-span-8 group relative rounded-[2.5rem] overflow-hidden h-[550px] shadow-2xl block">
            <img src={heroData.mainArticle.imageUrl} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
              <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-4 uppercase tracking-widest">Featured Story</span>
              <h2 className="text-white text-4xl font-black mb-4 group-hover:underline leading-tight">{heroData.mainArticle.title}</h2>
              <p className="text-slate-300 line-clamp-2 max-w-2xl">{heroData.mainArticle.description}</p>
            </div>
          </a>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <h3 className="text-lg font-black uppercase tracking-widest border-l-4 border-blue-600 pl-4">Trending Now</h3>
            {heroData.sideArticles.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="group flex flex-col gap-4">
                <div className="h-40 rounded-3xl overflow-hidden shadow-md">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-all" alt="side" />
                </div>
                <h4 className="font-bold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{item.title}</h4>
              </a>
            ))}
          </div>
        </div>

        {/* 3. Latest Grid */}
        <div className="space-y-12">
          <h3 className="text-3xl font-black tracking-tighter uppercase border-b pb-4">Recent Feed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {latestNews.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="group block">
                <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-6 bg-slate-200">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="feed" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">{item.category}</div>
                </div>
                <h4 className="font-bold text-lg leading-tight mb-2 group-hover:underline line-clamp-3">{item.title}</h4>
                <div className="flex items-center justify-between mt-4">
                   <span className="text-slate-400 font-bold text-[10px] uppercase">{item.date}</span>
                   <ChevronRight size={16} className="text-blue-600 group-hover:translate-x-2 transition-transform" />
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