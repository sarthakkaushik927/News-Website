export const NewsCard = ({ article }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
    <div className="relative h-48 overflow-hidden">
      <img 
        src={article.urlToImage || 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071'} 
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
        {article.source.name}
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-red-600 transition">
        {article.title}
      </h3>
      <p className="text-gray-500 text-sm line-clamp-3 mb-4">{article.description}</p>
      <div className="flex justify-between items-center mt-auto border-t pt-4">
        <span className="text-xs text-gray-400 font-medium">{new Date(article.publishedAt).toLocaleDateString()}</span>
        <a href={article.url} target="_blank" className="text-sm font-bold text-black hover:underline">Read Story →</a>
      </div>
    </div>
  </div>
);