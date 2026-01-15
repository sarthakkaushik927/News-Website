const API_KEY = '95eac2ab9f574d8389906ee1bb844a42';

const transformNewsData = (articles) => {
  if (!articles || articles.length === 0) return null;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  const mapArticle = (a, index) => ({
    id: index,
    title: a.title || 'No Title Available',
    category: 'News',
    imageUrl: a.urlToImage || `https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop`,
    author: a.author || 'Staff Writer',
    date: formatDate(a.publishedAt),
    description: a.description || '',
    url: a.url,
    source: a.source?.name || "Global News"
  });

  return {
    heroData: {
      mainArticle: mapArticle(articles[0], 0),
      sideArticles: articles.slice(1, 3).map((a, i) => mapArticle(a, i + 1)),
    },
    latestNews: articles.slice(3, 11).map((a, i) => ({
      ...mapArticle(a, i + 3),
      category: ['Tech', 'Travel', 'Business', 'Science'][i % 4]
    })),
    trendingNews: articles.slice(11, 16).map((a, i) => mapArticle(a, i + 11))
  };
};

export const fetchAllNews = async (category = "general", query = "") => {
  // Use Vercel Proxy path if in production, or direct NewsAPI if on localhost
  const isLocal = window.location.hostname === "localhost";
  const baseUrl = isLocal ? "https://newsapi.org/v2" : "/api";
  
  const url = query 
    ? `${baseUrl}/everything?q=${query}&apiKey=${API_KEY}`
    : `${baseUrl}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== "ok") throw new Error(data.message || "Failed to fetch");
    
    const validArticles = data.articles.filter(a => a.title !== "[Removed]");
    return transformNewsData(validArticles);
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};