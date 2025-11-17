import React from 'react';

const TrendingNews = ({ news }) => {
  return (
    <div className="lg:col-span-1">
      <h2 className="text-2xl font-bold text-white mb-6 border-b-2 border-red-600 inline-block pb-1">
        Trending Headlines
      </h2>
      <div className="space-y-6">
        {news.map((article) => (
          <div key={article.id} className="flex items-start space-x-4">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-20 h-20 object-cover rounded-md flex-shrink-0"
            />
            <div>
              <span className="text-xs font-bold text-red-500 uppercase">
                {article.category}
              </span>
              <h3 className="text-sm font-semibold text-white mt-1 hover:underline">
                {article.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;