import React, { useEffect, useRef } from 'react';
import { formatPrice } from '../utils/util';

const ProductDetailModal = ({ product, onClose }) => {
  const modalRef = useRef(null);

  // Đóng modal khi click ngoài phần modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-fade-in relative"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/800x400/CCCCCC/333333?text=${product.name.substring(0, 10)}`;
            }}
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
          <p className="text-2xl font-bold text-indigo-600 mb-4">{formatPrice(product.price)}</p>
          <p className="text-gray-700 mb-4 leading-relaxed">{product.longDescription}</p>
          <div className="flex items-center text-gray-600 mb-4">
            <span className="flex items-center mr-4">
              <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              {product.rating} ({product.reviews} đánh giá)
            </span>
            <span className="text-gray-500">Thể loại: {product.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
