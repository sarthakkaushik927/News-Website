import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
const PORT = process.env.PORT || 3000;

// Needed for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 API ROUTE
app.get("/api/news", async (req, res) => {
  const category = req.query.category || "general";

  try {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${process.env.GNEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// 🔹 Serve frontend
app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
