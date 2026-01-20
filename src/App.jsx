import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, ArrowUpRight, Zap, AlertCircle, 
  Loader2, Menu, X, Globe, Sparkles, ChevronRight 
} from "lucide-react";
import { fetchAllNews } from "./components/api";

const App = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ["general", "technology", "business", "science", "sports", "health"];

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

  // --- LOADING SCREEN ---
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full" />
        <Loader2 size={48} className="text-slate-900 animate-spin relative z-10" />
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 font-black text-xs uppercase tracking-[0.3em] text-slate-400"
      >
        Curating Intelligence
      </motion.p>
    </div>
  );

  // --- ERROR SCREEN ---
  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-3xl shadow-2xl shadow-red-100/50 max-w-md w-full"
      >
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Connection Interrupted</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">{error}</p>
        <button 
          onClick={loadData}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Retry Connection
        </button>
      </motion.div>
    </div>
  );

  const { heroData, latestNews } = newsData;

  // --- ANIMATION VARIANTS ---
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 selection:bg-blue-600 selection:text-white font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.location.reload()}
          >
            <div className="bg-slate-900 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Sparkles size={18} fill="currentColor" />
            </div>
            <span className="font-black text-xl tracking-tighter">
              NOVA<span className="text-blue-600">PRESS</span>
            </span>
          </motion.div>

          {/* Desktop Categories */}
          <div className="hidden lg:flex bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  category === cat 
                    ? "bg-white text-blue-600 shadow-sm scale-105" 
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="p-6 grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`p-4 rounded-2xl text-xs font-black uppercase tracking-widest text-left border transition-all ${
                      category === cat ? "bg-blue-50 border-blue-200 text-blue-600" : "border-slate-100 text-slate-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* --- BENTO HERO SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20"
        >
          {/* Main Hero Card */}
          <a 
            href={heroData.mainArticle.url} 
            target="_blank" 
            rel="noreferrer"
            className="lg:col-span-8 group relative h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/5 bg-slate-900"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
              src={heroData.mainArticle.imageUrl} 
              className="absolute inset-0 w-full h-full object-cover opacity-80" 
              alt="hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 lg:p-12 w-full">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">
                  Featured Story
                </span>
                <span className="text-slate-300 text-xs font-bold flex items-center gap-2">
                  <Clock size={12} /> {heroData.mainArticle.date}
                </span>
              </motion.div>
              
              <h2 className="text-3xl lg:text-5xl font-black text-white leading-[1.1] mb-6 max-w-3xl group-hover:underline decoration-blue-500 decoration-4 underline-offset-8 transition-all">
                {heroData.mainArticle.title}
              </h2>
              <p className="text-slate-300 text-lg line-clamp-2 max-w-2xl font-medium">
                {heroData.mainArticle.description}
              </p>
            </div>
          </a>

          {/* Side Stack */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Trending Now</h3>
            </div>
            
            {heroData.sideArticles.map((item, idx) => (
              <motion.a 
                key={idx}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
                href={item.url}
                target="_blank" 
                rel="noreferrer"
                className="group flex-1 bg-white p-4 rounded-[2rem] border border-slate-100 flex gap-4 hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-100 transition-all duration-300"
              >
                <div className="w-24 h-full shrink-0 rounded-2xl overflow-hidden bg-slate-100">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="side" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2">{item.tag}</span>
                  <h4 className="font-bold text-sm leading-snug text-slate-800 line-clamp-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* --- DISCOVERY GRID --- */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <Globe className="text-slate-300" />
              Global Feed
            </h3>
            <button className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <motion.div 
            variants={containerVars}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {latestNews.map((item) => (
              <motion.a
                variants={itemVars}
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] rounded-[1.8rem] overflow-hidden mb-5 bg-slate-100">
                  <img 
                    src={item.imageUrl} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="feed" 
                  />
                  <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.source}</span>
                </div>
                
                <h4 className="font-bold text-lg leading-tight text-slate-900 mb-4 flex-grow line-clamp-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                
                <div className="pt-4 mt-auto border-t border-slate-50 flex justify-between items-center text-xs font-bold text-slate-400">
                  <span>{item.date}</span>
                  <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase text-[10px] tracking-widest">Read Now</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="mt-32 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tighter">NOVA<span className="text-blue-600">PRESS</span></span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Designed for the Future of News
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;