export default async function handler(req, res) {
  const { category = 'general', q } = req.query;
  const API_KEY = "95eac2ab9f574d8389906ee1bb844a42";
  const url = q 
    ? `https://newsapi.org/v2/everything?q=${q}&apiKey=${API_KEY}`
    : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}