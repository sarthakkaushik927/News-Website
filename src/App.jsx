import React from 'react';
import { AuthProvider } from './components/AuthContext.jsx';
import { PageProvider, usePage } from './components/PageContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

// --- Main App Component ---

const AppContent = () => {
  const { page } = usePage();

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] font-sans">
      <Header />
      <div className="pt-4">{renderPage()}</div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PageProvider>
        <AppContent />
      </PageProvider>
    </AuthProvider>
  );
}