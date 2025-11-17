import React, { useState, useContext, createContext } from 'react';

// --- 2. Page Context ---
// Manages app navigation (simulating a router)

const PageContext = createContext(null);

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState('home'); // 'home', 'login', 'signup'

  const navigateTo = (pageName) => {
    setPage(pageName);
  };

  const value = { page, navigateTo };

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};