/**
 * src/components/api.js
 * This file handles all data fetching for the News Website.
 */

const API_KEY = '79da0ed268ed4145ab0e8967b4c6253b';
const NEWS_URL = `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=${API_KEY}`;

/**
 * Transforms raw NewsAPI articles into the structure required by the UI.
 * @param {Array} articles 
 */
const transformNewsData = (articles) => {
  if (!articles || articles.length === 0) return null;

  // Helper to format date
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  // Map raw article to our internal Article format
  const mapArticle = (a, index) => ({
    id: index,
    title: a.title || 'No Title Available',
    category: 'News', // NewsAPI doesn't always provide a single category string like this
    imageUrl: a.urlToImage || `https://placehold.co/600x400/333/fff?text=No+Image`,
    author: a.author || 'Staff Writer',
    date: formatDate(a.publishedAt),
    description: a.description || '',
    url: a.url
  });

  return {
    heroData: {
      mainArticle: mapArticle(articles[0], 0),
      sideArticles: articles.slice(1, 3).map((a, i) => mapArticle(a, i + 1)),
      bottomArticles: articles.slice(3, 7).map((a, i) => ({
        ...mapArticle(a, i + 3),
        category: i % 2 === 0 ? 'Politics' : 'World' // Mocking categories for visual variety
      }))
    },
    latestNews: articles.slice(7, 15).map((a, i) => ({
      ...mapArticle(a, i + 7),
      category: ['World', 'Travel', 'Food', 'Business', 'Health', 'Science'][i % 6]
    })),
    trendingNews: articles.slice(15, 23).map((a, i) => mapArticle(a, i + 15))
  };
};

/**
 * Fetches real news from the provided NewsAPI endpoint.
 */
export const fetchAllNews = async () => {
  console.log("Fetching live news from NewsAPI...");
  try {
    const response = await fetch(NEWS_URL);
    
    if (!response.ok) {
      throw new Error(`NewsAPI error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== "ok") {
      throw new Error(data.message || "Failed to fetch news");
    }

    // Transform the articles array into our structured hero/latest/trending format
    return transformNewsData(data.articles);

  } catch (error) {
    console.error("News fetch failed:", error);
    throw error;
  }
};

/**
 * Placeholder for user login. 
 * Hook this up to your backend login endpoint later.
 */
export const apiLogin = async (email, password) => {
  console.log("Simulating API call to login...", { email });
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulating network lag
  
  // Real implementation example:
  /*
  const response = await fetch('YOUR_LOGIN_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await response.json();
  */

  if (email === "user@example.com" && password === "password123") {
    return { user: { name: 'Demo User', email: 'user@example.com' }, token: 'fake-jwt-token' };
  } else {
    throw new Error('Invalid credentials. Use user@example.com / password123');
  }
};

/**
 * Placeholder for user signup.
 * Hook this up to your backend signup endpoint later.
 */
export const apiSignup = async (name, email, password) => {
  console.log("Simulating API call to signup...", { name, email });
  await new Promise(resolve => setTimeout(resolve, 800));

  // Real implementation example:
  /*
  const response = await fetch('YOUR_SIGNUP_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return await response.json();
  */

  return { user: { name, email }, token: 'fake-jwt-token-new-user' };
};