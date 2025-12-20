// import React from 'react';
// import { AuthProvider } from './components/AuthContext.jsx';
// import { PageProvider, usePage } from './components/PageContext.jsx';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import Home from './components/Home.jsx';
// import Login from './components/Login.jsx';
// import Signup from './components/Signup.jsx';

// // --- Main App Component ---

// const AppContent = () => {
//   const { page } = usePage();

//   const renderPage = () => {
//     switch (page) {
//       case 'home':
//         return <Home />;
//       case 'login':
//         return <Login />;
//       case 'signup':
//         return <Signup />;
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#121212] font-sans">
//       <Header />
//       <div className="pt-4">{renderPage()}</div>
//       <Footer />
//     </div>
//   );
// };

// export default function App() {
//   return (
//     <AuthProvider>
//       <PageProvider>
//         <AppContent />
//       </PageProvider>
//     </AuthProvider>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { NewsGrid } from './components/NewsGrid';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Note: For NewsAPI free tier, the 'from' date must be within the last 30 days.
  const API_URL = "https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=79da0ed268ed4145ab0e8967b4c6253b";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) setNews(data.articles);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <header className="pt-32 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            The Tesla <span className="text-red-600 underline">Report.</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Inside the mission to accelerate the world's transition to sustainable energy.
          </p>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <NewsGrid articles={news} />
      )}
    </div>
  );
}

export default App;