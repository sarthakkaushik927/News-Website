// src/components/api.js
const G_API_KEY = 'cfb24d7a637da32825b1ac9f487e4519'; 

const transformNewsData = (articles) => {
  if (!articles || !Array.isArray(articles) || articles.length === 0) return null;

  const mapArticle = (a, index) => ({
    id: index,
    title: a.title || "No Title",
    description: a.description || "No description available.",
    imageUrl: a.image || `https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069`,
    url: a.url || "#",
    date: new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    source: a.source?.name || "News",
  });

  return {
    heroData: {
      mainArticle: mapArticle(articles[0], 0),
      sideArticles: articles.slice(1, 3).map((a, i) => mapArticle(a, i + 1)),
    },
    latestNews: articles.slice(3, 11).map((a, i) => mapArticle(a, i + 3))
  };
};

export const fetchAllNews = async (category = "general") => {
  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${G_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.errors) throw new Error(data.errors[0]);
    return transformNewsData(data.articles);
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};