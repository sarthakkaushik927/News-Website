import React from 'react';

const HeroSection = ({ data }) => {
  const { mainArticle, sideArticles, bottomArticles } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Main Article */}
      <div className="lg:col-span-2">
        <div className="relative rounded-lg overflow-hidden h-full">
          <img
            src={mainArticle.imageUrl}
            alt={mainArticle.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
            <span className="text-sm font-bold text-red-500 uppercase">
              {mainArticle.category}
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">
              {mainArticle.title}
            </h2>
            <p className="text-gray-300 text-sm mt-2">
              By {mainArticle.author} | {mainArticle.date}
            </p>
          </div>
        </div>
      </div>

      {/* Side Articles */}
      <div className="flex flex-col space-y-6">
        {sideArticles.map((article) => (
          <div key={article.id} className="bg-gray-900 rounded-lg overflow-hidden flex-1">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-white">
                {article.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom Tickers */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
        {bottomArticles.map(article => (
          <div key={article.id}>
             <span className="text-xs font-bold text-red-500 uppercase">
              {article.category}
            </span>
            <h4 className="font-semibold text-white mt-1 hover:underline">
              {article.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;