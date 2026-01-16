export default async function handler(req, res) {
  const { category = 'general' } = req.query;
  // Your working GNews Key
  const API_KEY = 'cfb24d7a637da32825b1ac9f487e4519'; 

  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // This tells the browser "It's okay to show this data"
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news from server" });
  }
}