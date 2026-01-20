export default async function handler(req, res) {
  const { category = "general" } = req.query;

  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${process.env.GNEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    console.error("Serverless Error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
