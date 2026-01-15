import React, { useState, useEffect, useCallback } from 'react';
import { Search, Globe, TrendingUp, Cpu, FlaskConical, ChevronRight, Clock, AlertCircle } from 'lucide-react';

const API_KEY = "95eac2ab9f574d8389906ee1bb844a42";
const FALLBACK_IMG = "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNews = useCallback(async (query = "") => {
    setLoading(true);
    try {
      const url = query 
        ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      // Filter out removed articles
      const validArticles = (data.articles || []).filter(a => a.title !== "[Removed]");
      setArticles(validArticles);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  // Component to handle broken images
  const SafeImage = ({ src, alt, className }) => {
    const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMG);
    return (
      <img 
        src={imgSrc} 
        alt={alt} 
        className={className} 
        onError={() => setImgSrc(FALLBACK_IMG)} 
        referrerPolicy="no-referrer" 
      />
    );
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-indigo-600 animate-bounce text-2xl">THE CHRONICLE...</div>;

  const [hero, ...others] = articles;
  const secondary = others.slice(0, 2);
  const remaining = others.slice(2);

  return (
    <div className="bg-[#fdfdfd] min-h-screen pb-20">
      {/* HEADER */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tighter cursor-pointer" onClick={() => window.location.reload()}>
            THE <span className="text-indigo-600 underline decoration-4">CHRONICLE</span>
          </h1>
          <div className="hidden md:flex gap-6 font-bold text-sm uppercase tracking-widest text-slate-500">
            {['business', 'technology', 'science'].map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`hover:text-black ${category === cat ? 'text-indigo-600' : ''}`}>{cat}</button>
            ))}
          </div>
          <div className="flex bg-slate-100 rounded-full px-4 py-2 items-center">
            <Search size={16} className="text-slate-400" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-32 md:w-48" 
              placeholder="Search..." 
              onKeyDown={(e) => e.key === 'Enter' && fetchNews(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        {/* MAGAZINE LAYOUT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. LARGE HERO (Main Story) */}
          <div className="lg:col-span-8 group cursor-pointer">
            <div className="relative overflow-hidden rounded-3xl h-[500px]">
              <SafeImage src={hero?.urlToImage} alt={hero?.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-black mb-4 w-fit uppercase">{hero?.source.name}</span>
                <h2 className="text-white text-4xl font-bold leading-tight mb-4 group-hover:underline">{hero?.title}</h2>
                <p className="text-slate-300 line-clamp-2 max-w-2xl">{hero?.description}</p>
              </div>
            </div>
          </div>

          {/* 2. SECONDARY FEATURE COLUMN */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-xl font-black border-l-4 border-indigo-600 pl-4 uppercase tracking-tighter">Must Read</h3>
            {secondary.map((article, i) => (
              <div key={i} className="group flex gap-4 items-start">
                <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden">
                  <SafeImage src={article.urlToImage} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
                </div>
                <div>
                  <h4 className="font-bold leading-tight text-sm line-clamp-2 group-hover:text-indigo-600">{article.title}</h4>
                  <span className="text-[10px] text-slate-400 mt-2 block font-bold">{new Date(article.publishedAt).toDateString()}</span>
                </div>
              </div>
            ))}
            <div className="mt-4 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
              <h5 className="font-black text-indigo-900 mb-2">Editor's Choice</h5>
              <p className="text-sm text-indigo-700 leading-relaxed">Join 50,000+ readers and get the best of tech and science news delivered weekly.</p>
              <button className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition">Subscribe Now</button>
            </div>
          </div>
        </div>

        {/* 3. THE BENTO GRID (Remaining Articles) */}
        <div className="mt-20">
          <h3 className="text-2xl font-black mb-10 flex items-center gap-2">
            <TrendingUp size={24} className="text-indigo-600" />
            LATEST UPDATES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {remaining.slice(0, 12).map((article, i) => (
              <article key={i} className="group cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-200">
                  <SafeImage src={article.urlToImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                </div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{article.source.name}</span>
                <h4 className="font-bold mt-2 leading-snug line-clamp-2 group-hover:underline">{article.title}</h4>
                <div className="flex items-center gap-2 mt-4 text-slate-400 text-[10px] font-bold">
                  <Clock size={12} /> {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;