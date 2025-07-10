import React from 'react';
import { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";

import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { ToastNotification } from '../utils/util';
import { useFavorites } from '../context/Provider';
import { mockProducts } from '../data/products'; // Assuming you have a mockProducts data file
function Favorites() {

    const { favorites, toggleFavorite } = useFavorites();

    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success'); // 'success' or 'error'
    const [showToast, setShowToast] = useState(false);

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);



    const [favoriteProductIds, setFavoriteProductIds] = useState(favorites);
    const filteredProducts = mockProducts.filter(product => favoriteProductIds.includes(product.id.toString()));

    useEffect(() => {
        setFavoriteProductIds(favorites);
    }, [favorites]);

    const handleDetailClick = (product) => {
        setSelectedProduct(product);
        setShowDetailModal(true);

    }
    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedProduct(null);
    };

    const handleToggleFavorite = (productId) => {
        if (favorites[productId]) {
            setToastMessage('Đã bỏ yêu thích khóa học');
            setToastType('success');
            setShowToast(true);
        } else {
            setToastMessage('Đã thêm khóa học vào yêu thích');
            setToastType('success');
            setShowToast(true);
        }
        toggleFavorite(productId);
        setTimeout(() => {
            setToastMessage('');
            setShowToast(false);
        }, 3000); // Hide toast after 3 seconds
    }

    return (
        <div className="favorites-page">
            <Header />
            <main className="container mx-auto p-6 flex-grow">
                <h1 className="text-3xl font-bold mb-6">Khóa học yêu thích của bạn</h1>
                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg p-6">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m6.364-7.636a9 9 0 11-12.728 12.728A9 9 0 0118.364 4.364z" />
                        </svg>
                        <p className="text-gray-600">Bạn chưa có khóa học nào trong danh sách yêu thích.</p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                        >
                            Quay lại trang chủ
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-xl px-4">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onDetailClick={handleDetailClick}
                                onToggleFavorite={handleToggleFavorite}
                                isFavorite={!!favorites.includes(product.id.toString())}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
            {showToast && (
                <ToastNotification
                    message={toastMessage}
                    type={toastType}
                    onClose={() => {
                        setShowToast(false);
                        setToastMessage('');
                    }}
                />
            )}
            {showDetailModal && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={handleCloseDetailModal}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={!!favorites.includes(selectedProduct?.id.toString())}
                />
            )}
        </div>
    );
}

export default Favorites;