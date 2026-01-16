// api/news.js

export default async function handler(req, res) {
  // 1. Get the category from the frontend request
  const { category = 'general' } = req.query;
  
  // 2. Your GNews API Key
  const API_KEY = 'cfb24d7a637da32825b1ac9f487e4519'; 

  // 3. Build the external URL
  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // 4. Set headers to allow your React app to read the data (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    // 5. Send the news data back to your React app
    res.status(200).json(data);
  } catch (error) {
    console.error("Serverless Function Error:", error);
    res.status(500).json({ error: "Failed to fetch news from GNews" });
  }
}