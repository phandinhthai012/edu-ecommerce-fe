import React, { memo } from 'react';
import { formatPrice } from '../utils/util';

const ProductCard = ({ product, onDetailClick, onToggleFavorite, isFavorite }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full flex flex-col justify-between">
      {/* Image Section */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-48 md:h-56 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/400x300/CCCCCC/333333?text=${product.name.substring(0, 10)}`;
          }}
          loading="lazy"
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2 min-h-[48px]">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => onToggleFavorite(product.id)}
           className={`p-2 rounded-full transition-colors duration-300 ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
            title={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
              2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3
              19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => onDetailClick(product)}
          className="w-full bg-indigo-500 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-sm sm:text-base"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default memo(ProductCard);
