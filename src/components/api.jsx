const transformNewsData = (articles) => {
  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return null;
  }

  const mapArticle = (a, index) => ({
    id: index,
    title: a.title || "No Title",
    description: a.description || "No description available",
    imageUrl:
      a.image ||
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069",
    url: a.url || "#",
    date: new Date(a.publishedAt).toLocaleDateString(),
    source: a.source?.name || "News",
    category: "Latest",
  });

  return {
    heroData: {
      mainArticle: mapArticle(articles[0], 0),
      sideArticles: articles.slice(1, 3).map((a, i) => mapArticle(a, i + 1)),
    },
    latestNews: articles.slice(3, 11).map((a, i) => ({
      ...mapArticle(a, i + 3),
      category: ["Tech", "Crypto", "AI", "Global"][i % 4],
    })),
  };
};

export const fetchAllNews = async (category = "general") => {
  try {
    const response = await fetch(`/api/news?category=${category}`);
    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0]);
    }

    return transformNewsData(data.articles);
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};
