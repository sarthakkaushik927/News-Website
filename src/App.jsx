import React, { useState, useEffect, useCallback } from "react";
import {
  Clock,
  ChevronRight,
  Zap,
  AlertCircle,
  Loader2,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";
import { fetchAllNews } from "./components/api";

const App = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "general",
    "technology",
    "business",
    "science",
    "sports",
    "health",
  ];

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

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader2 size={40} className="animate-spin mb-4 text-blue-600" />
        <p className="text-xs tracking-widest text-slate-400">
          Updating The Chronicle
        </p>
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-red-500">
        <AlertCircle size={48} />
        <p className="mt-4">{error}</p>
      </div>
    );

  const { heroData, latestNews } = newsData;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <nav className="border-b sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <h1 className="font-black text-xl">CHRONOTYPE</h1>

          <div className="hidden lg:flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "text-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <a
          href={heroData.mainArticle.url}
          target="_blank"
          rel="noreferrer"
          className="block mb-12"
        >
          <img
            src={heroData.mainArticle.imageUrl}
            className="w-full h-[400px] object-cover rounded-xl"
          />
          <h2 className="text-3xl font-black mt-4">
            {heroData.mainArticle.title}
          </h2>
        </a>

        <h3 className="flex items-center gap-2 font-black mb-6">
          <TrendingUp className="text-blue-600" /> Latest News
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestNews.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="border rounded-xl p-4 hover:shadow-lg"
            >
              <img
                src={item.imageUrl}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />
              <h4 className="font-bold text-sm">{item.title}</h4>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-3">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {item.date}
                </span>
                <ChevronRight className="text-blue-600" />
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
