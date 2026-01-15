import React, { useState, useEffect, useCallback } from 'react';
import { Search, Clock, ChevronRight, Newspaper, Cpu, TrendingUp, FlaskConical, Globe } from 'lucide-react';

const API_KEY = "95eac2ab9f574d8389906ee1bb844a42";
const FALLBACK_IMG = "https://images.unsplash.com/photo-1504711432869-0cf3b9ecbc11?q=80&w=2070&auto=format&fit=crop";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [query, setQuery] = useState("");

  const categories = [
    { id: "general", name: "Top Stories", icon: <Globe size={16} /> },
    { id: "technology", name: "Tech", icon: <Cpu size={16} /> },
    { id: "business", name: "Business", icon: <TrendingUp size={16} /> },
    { id: "science", name: "Science", icon: <FlaskConical size={16} /> },
  ];

  const fetchNews = useCallback(async (searchQuery = "") => {
    setLoading(true);
    try {
      // Logic: Use 'everything' for search, 'top-headlines' for categories
      const url = searchQuery 
        ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles?.filter(a => a.title !== "[Removed]") || []);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchNews(query);
  }, [category, fetchNews]);

  const SafeImage = ({ src, className }) => (
    <img 
      src={src || FALLBACK_IMG} 
      className={className} 
      onError={(e) => { e.target.src = FALLBACK_IMG; }}
      alt="news"
      referrerPolicy="no-referrer"
    />
  );

  if (loading) return <div className="h-screen flex flex-col items-center justify-center font-black animate-pulse">
    <Newspaper size={48} className="text-blue-600 mb-4" />
    <p className="tracking-widest">FETCHING {category.toUpperCase()} NEWS...</p>
  </div>;

  const mainHero = articles[0];
  const featured = articles.slice(1, 3);
  const bentoGrid = articles.slice(3, 11);

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-slate-900 font-sans">
      {/* 1. NAVIGATION WITH CATEGORIES */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-black tracking-tighter cursor-pointer" onClick={() => {setCategory("general"); setQuery("")}}>
            THE<span className="text-blue-600 underline">CHRONICLE</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => {setCategory(cat.id); setQuery("");}}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${category === cat.id ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2 border border-slate-200">
            <Search size={18} className="text-slate-400" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-32 md:w-56" 
              placeholder="Search news..." 
              onKeyDown={(e) => e.key === 'Enter' && setQuery(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* 2. THE BENTO MAGAZINE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Main Hero Story */}
          <a href={mainHero?.url} target="_blank" rel="noreferrer" className="lg:col-span-8 group relative rounded-[2rem] overflow-hidden h-[550px] shadow-xl block">
            <SafeImage src={mainHero?.urlToImage} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-10 flex flex-col justify-end">
              <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-4 uppercase tracking-[0.2em]">Breaking News</span>
              <h2 className="text-white text-4xl font-black mb-4 group-hover:underline leading-tight">{mainHero?.title}</h2>
              <p className="text-slate-300 line-clamp-2 max-w-2xl">{mainHero?.description}</p>
            </div>
          </a>

          {/* Featured Side Stories */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <h3 className="text-lg font-black uppercase tracking-widest border-l-4 border-blue-600 pl-4 italic">Editor's Picks</h3>
            {featured.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noreferrer" className="group flex flex-col gap-4">
                <div className="h-44 rounded-3xl overflow-hidden shadow-md">
                  <SafeImage src={item.urlToImage} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                </div>
                <div>
                  <h4 className="font-bold leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                  <p className="text-xs text-slate-400 font-bold mt-2 uppercase flex items-center gap-1"><Clock size={12}/> {new Date(item.publishedAt).toDateString()}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 3. LATEST FEED GRID */}
        <div className="space-y-12">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-3xl font-black tracking-tighter uppercase">Recent Feed</h3>
            <span className="text-slate-400 font-bold text-sm">Sorted by newest</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {bentoGrid.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noreferrer" className="group block">
                <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-6 bg-slate-200">
                  <SafeImage src={item.urlToImage} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase">{item.source.name}</div>
                </div>
                <h4 className="font-bold text-lg leading-tight mb-2 group-hover:underline">{item.title}</h4>
                <div className="flex items-center justify-between mt-4">
                   <span className="text-blue-600 font-black text-xs uppercase">Read More</span>
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