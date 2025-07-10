import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../mocks/axios'
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';

import { mockProducts } from '../data/products'; // Assuming you have a mockProducts data file
import Footer from '../components/Footer';
import BannerSlider from '../components/BannerSlider';
import { LoadingSkeleton } from '../utils/util';
import { ToastNotification } from '../utils/util';
import { useFavorites } from '../context/Provider';


function Home() {

    const { favorites, toggleFavorite, user, updateUser } = useFavorites();

    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('');


    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success'); // 'success' or 'error'
    const [showToast, setShowToast] = useState(false);


    const [showAISuggestionsLoading, setShowAISuggestionsLoading] = useState(false); // For AI suggestions loading state
    const [productsAISuggestions, setProductsAISuggestions] = useState([]); // For AI suggestions products

    const [filteredProducts, setFilteredProducts] = useState(mockProducts); // Initially show all products

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePriceFilterChange = (e) => {
        setPriceFilter(e.target.value);
    };

    // Apply search and filter
    useEffect(() => {
        let currentFiltered = mockProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (priceFilter) {
            currentFiltered = currentFiltered.filter(product => {
                if (priceFilter === '<500K') return product.price < 500000;
                if (priceFilter === '500K-1M') return product.price >= 500000 && product.price <= 1000000;
                if (priceFilter === '>1M') return product.price > 1000000;
                return true;
            });
        }
        setFilteredProducts(currentFiltered);
    }, [searchTerm, priceFilter, mockProducts]);

    const handleToggleFavorite = (productId) => {
        console.log("Toggling favorite for product ID:", productId);
        console.log("Current favorites:", favorites);
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
    const handleDetailClick = (product) => {
        setSelectedProduct(product);
        setShowDetailModal(true);

    }
    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedProduct(null);
    };


    const handleAISuggestions = async (loading) => {
        console.log("Fetching AI suggestions...");
        setShowAISuggestionsLoading(loading);
        try {
            const response = await axios.get('/api/suggestions'); // Replace with your actual API endpoint
            console.log("AI suggestions response:", response.data);
            setProductsAISuggestions(response.data);
            setFilteredProducts(response.data); // Update filtered products with AI suggestions
        } catch (error) {
            console.error("Error fetching AI suggestions:", error);
            setToastMessage('Lỗi khi tải gợi ý AI');
            setToastType('error');
            setShowToast(true);

            setTimeout(() => {
                setToastMessage('');
                setShowToast(false);
            }, 3000);
        } finally {
            setTimeout(() => {
                setShowAISuggestionsLoading(false);
            }, 3000);
        }
    };

    return (
        <div className="home-page">
            <Header showAISuggestionsLoading={handleAISuggestions} />
            {/* banner slider */}
            <BannerSlider />
            {/* Main Content */}

            <main className="container mx-auto p-6 flex-grow">
                <div className="mb-8 bg-white p-2 rounded-lg">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        />
                        <select
                            value={priceFilter}
                            onChange={handlePriceFilterChange}
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        >
                            <option value="">Lọc theo giá</option>
                            <option value="<500K">Dưới 500.000 VNĐ</option>
                            <option value="500K-1M">500.000 VNĐ - 1.000.000 VNĐ</option>
                            <option value=">1M">Trên 1.000.000 VNĐ</option>
                        </select>
                    </div>
                    {user && (
                        <div className="text-sm text-gray-600 text-left">
                            ID người dùng của bạn: <span className="font-mono bg-gray-200 p-1 rounded">{user}</span>
                        </div>
                    )}
                </div>
                {/* Recently Viewed Products */}
                <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {showAISuggestionsLoading ? 'Đang tải gợi ý...' : (searchTerm || priceFilter ? 'Kết quả tìm kiếm' : 'Tất cả sản phẩm')}
                    </h2>
                </>
                {showAISuggestionsLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <>
                        
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onDetailClick={handleDetailClick}
                                    onToggleFavorite={handleToggleFavorite}
                                    isFavorite={!!favorites.includes(product.id)}
                                />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-600">Không tìm thấy sản phẩm nào.</p>
                        )}
                        </>
                        <ProductDetailModal
                        product={selectedProduct}
                        onClose={handleCloseDetailModal}
                    />
                    </div>
                    
                )}
            </main>
            {/* Toast Notification */}
            {showToast && (
                <ToastNotification
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
            {/* Footer */}
            <Footer />
        </div>

    );
}

export default Home