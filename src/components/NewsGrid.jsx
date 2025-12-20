import { NewsCard } from './NewsCard';

export const NewsGrid = ({ articles }) => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((item, index) => (
        <NewsCard key={index} article={item} />
      ))}
    </div>
  </div>
);