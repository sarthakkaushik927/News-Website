import React, { useState, useEffect } from 'react';
import { fetchAllNews } from '../components/api';
import HeroSection from '../components/HeroSection';
import LatestNews from '../components/LatestNews';
import TrendingNews from '../components/TrendingNews';

// --- Page Components ---

const Home = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const data = await fetchAllNews();
        setNewsData(data);
      } catch (error) {
        console.error("Failed to load news:", error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-white text-2xl">Loading news...</p>
      </div>
    );
  }

  if (!newsData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 text-2xl">Failed to load news.</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection data={newsData.heroData} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        <LatestNews news={newsData.latestNews} />
        <TrendingNews news={newsData.trendingNews} />
      </div>
       <div className="text-center mt-12">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md">
          View More
        </button>
      </div>
    </main>
  );
};

export default Home;