// src/components/api.js
const G_API_KEY = 'cfb24d7a637da32825b1ac9f487e4519';

const transformNewsData = (articles) => {
  if (!articles || !Array.isArray(articles) || articles.length === 0) return null;

  const mapArticle = (a, index) => ({
    id: index,
    title: a.title || "Untitled Story",
    description: a.description || "No preview available.",
    imageUrl: a.image || `https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069`,
    url: a.url || "#",
    date: new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    source: a.source?.name || "News",
    // Mock categories for visual variety
    tag: ['Trending', 'Must Read', 'Editor Pick', 'Deep Dive'][index % 4]
  });

  return {
    heroData: {
      mainArticle: mapArticle(articles[0], 0),
      sideArticles: articles.slice(1, 4).map((a, i) => mapArticle(a, i + 1)),
    },
    latestNews: articles.slice(4, 12).map((a, i) => mapArticle(a, i + 4))
  };
};

export const fetchAllNews = async (category = "general") => {
  // Smart Toggle: Use Direct GNews on Localhost, Proxy on Vercel
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  
  const url = isLocal 
    ? `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${G_API_KEY}`
    : `/api/news?category=${category}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.errors) throw new Error(data.errors[0]);
    return transformNewsData(data.articles);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};