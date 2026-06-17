# 📰 NOVAPRESS — Premium News Curation Portal

**NOVAPRESS** is a high-performance, visually stunning news website designed to deliver global headlines and breaking news with a futuristic, clean interface. 

The application utilizes a Node.js/Express backend proxy paired with a React and Tailwind CSS v4 frontend, ensuring smooth user interactions, fast page loads, and secure API requests.

---

## 🚀 Features

- **Modern Bento Grid Layout**: Highlights the main featured story with high-resolution imagery and sets up a trending sidebar stack for other top stories.
- **Smart Category Filtering**: Seamlessly switches between news feeds (General, Technology, Business, Science, Sports, Health) with animated active indicator states.
- **Adaptive API Routing**:
  - **Local Development**: Fetches news headlines directly from GNews API in the browser to facilitate rapid UI updates.
  - **Production Deployment**: Routes API calls through an Express backend proxy `/api/news` to keep sensitive credentials secure.
- **Vivid Animations**: Employs `framer-motion` for loading screens ("Curating Intelligence"), content entries, hover highlights, and slide-in mobile navigation.
- **Responsive Navigation**: Includes a mobile-optimized header overlay navigation menu.
- **Secure Deployment Configuration**: Contains configuration templates (`vercel.json`) ready for serverless hosting.

---

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/Proxy Server**: [Express](https://expressjs.com/) (Node.js)
- **API Fetching**: `node-fetch` for backend queries, browser Fetch API for frontend
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
NewsLetter/
├── src/
│   ├── assets/              # Icons and public images
│   ├── components/          # Custom widgets and UI wrappers
│   │   ├── AuthContext.jsx  # Authentication context provider
│   │   ├── Header.jsx       # Custom header elements
│   │   ├── Navbar.jsx       # Standard navigation menu
│   │   ├── api.jsx          # Dual-environment GNews API client
│   │   └── Signup.jsx       # Optional newsletter sign-up screens
│   ├── index.css            # Tailwind directives
│   ├── main.jsx             # React initialization script
│   └── App.jsx              # Application dashboard layout & bento feeds
├── server.js                # Express API proxy & production assets server
├── vercel.json              # Vercel deployment routes config
├── vite.config.js           # Vite and Tailwind CSS plugins configuration
├── .env                     # GNews API key configuration
└── package.json             # NPM package scripts & dependencies
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended) along with `npm`.

### 2. Clone the Repository
```bash
git clone https://github.com/sarthakkaushik927/News-Website.git
cd News-Website
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Obtain an API Key
Sign up at [GNews.io](https://gnews.io/) to get a free API Key.

### 5. Configure Environment Variables
Create a `.env` file in the root of the project:
```env
GNEWS_API_KEY=your_gnews_api_key
```

### 6. Run the Project

#### Development (Vite Dev Server)
This starts the local frontend development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. (In local environment, the client fetches news directly from GNews to bypass the local proxy server).

#### Production (Express Server)
To run the full app locally with the backend Express proxy:
```bash
# Build the React production assets
npm run build

# Start the Express server
npm run start
```
Open `http://localhost:3000` in your browser.

---

## 🤝 Contributing
Feel free to open pull requests or issues. Please ensure you update the mock API helpers in `src/components/api.jsx` if you change payload structures.
