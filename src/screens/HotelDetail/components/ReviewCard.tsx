import { Star } from 'lucide-react';

interface ReviewCardProps {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export default function ReviewCard({ author, rating, date, comment }: ReviewCardProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-900">{author}</span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-gray-900">{rating}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
}
