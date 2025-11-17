import React from 'react';

const LatestNews = ({ news }) => {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl font-bold text-white mb-6 border-b-2 border-red-600 inline-block pb-1">
        Latest News
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Large cards (left side) */}
        <div className="space-y-8">
          {news.filter((_,i) => i % 2 === 0 && i < 4).map(article => (
             <div key={article.id} className="bg-gray-900 p-4 rounded-lg">
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover rounded-md mb-4" />
              )}
              <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
              {article.description && (
                <p className="text-gray-400 text-sm mb-3">{article.description}</p>
              )}
              <span className="text-xs font-bold text-red-500 uppercase">{article.category}</span>
            </div>
          ))}
        </div>
        
        {/* Small cards (right side) */}
        <div className="space-y-8">
          {news.filter((_,i) => i % 2 !== 0 && i < 4).map(article => (
             <div key={article.id} className="bg-gray-900 p-4 rounded-lg">
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover rounded-md mb-4" />
              )}
              <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
              {article.description && (
                <p className="text-gray-400 text-sm mb-3">{article.description}</p>
              )}
              <span className="text-xs font-bold text-red-500 uppercase">{article.category}</span>
            </div>
          ))}
        </div>
      </div>
      
       {/* Bottom row cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {news.slice(4).map(article => (
             <div key={article.id} className="bg-gray-900 p-4 rounded-lg">
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover rounded-md mb-4" />
              )}
              <h3 className="text-lg font-bold text-white mb-2">{article.title}</h3>
              {article.description && (
                <p className="text-gray-400 text-sm mb-3">{article.description.substring(0, 100)}...</p>
              )}
              <span className="text-xs font-bold text-red-500 uppercase">{article.category}</span>
            </div>
          ))}
       </div>
    </div>
  );
};

export default LatestNews;