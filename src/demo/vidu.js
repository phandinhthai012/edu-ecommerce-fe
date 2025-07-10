// import React, { useState, useEffect, useCallback } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, query, addDoc, updateDoc } from 'firebase/firestore';

// // Ensure __app_id, __firebase_config, and __initial_auth_token are defined in the environment
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
// const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// // Mock product data
// const mockProducts = [
//   {
//     id: '1',
//     name: 'Khóa học Lập trình Web Toàn diện',
//     price: 850000,
//     image: 'https://placehold.co/400x300/FF5733/FFFFFF?text=Web+Dev',
//     shortDescription: 'Học từ cơ bản đến nâng cao với HTML, CSS, JavaScript, React.',
//     longDescription: 'Khóa học này cung cấp kiến thức toàn diện về phát triển web front-end và back-end. Bạn sẽ học cách xây dựng các ứng dụng web động, tối ưu hiệu suất và triển khai dự án thực tế. Bao gồm các dự án thực hành và hỗ trợ từ giảng viên.',
//     rating: 4.8,
//     reviews: 120,
//     category: 'Lập trình',
//   },
//   {
//     id: '2',
//     name: 'Tiếng Anh Giao tiếp cho Người mới bắt đầu',
//     price: 450000,
//     image: 'https://placehold.co/400x300/33FF57/FFFFFF?text=English+Comm',
//     shortDescription: 'Nâng cao kỹ năng nghe, nói, đọc, viết tiếng Anh cơ bản.',
//     longDescription: 'Khóa học được thiết kế cho những người mới bắt đầu học tiếng Anh hoặc muốn củng cố nền tảng. Tập trung vào các tình huống giao tiếp hàng ngày, phát âm chuẩn và từ vựng thông dụng. Có các bài tập tương tác và buổi học nhóm.',
//     rating: 4.5,
//     reviews: 90,
//     category: 'Ngoại ngữ',
//   },
//   {
//     id: '3',
//     name: 'Giáo trình Marketing Kỹ thuật số',
//     price: 1200000,
//     image: 'https://placehold.co/400x300/3357FF/FFFFFF?text=Digital+Marketing',
//     shortDescription: 'Tìm hiểu các chiến lược và công cụ Marketing Online hiệu quả.',
//     longDescription: 'Giáo trình bao gồm các chủ đề từ SEO, SEM, Social Media Marketing, Content Marketing đến Email Marketing và phân tích dữ liệu. Cung cấp các case study thực tế và bài tập ứng dụng để bạn có thể áp dụng ngay vào công việc.',
//     rating: 4.7,
//     reviews: 75,
//     category: 'Kinh doanh',
//   },
//   {
//     id: '4',
//     name: 'Lớp học Vẽ Kỹ thuật số Cơ bản',
//     price: 600000,
//     image: 'https://placehold.co/400x300/FF33A1/FFFFFF?text=Digital+Art',
//     shortDescription: 'Học cách sử dụng các công cụ và kỹ thuật vẽ trên máy tính.',
//     longDescription: 'Khóa học này dành cho những ai muốn khám phá thế giới nghệ thuật kỹ thuật số. Bạn sẽ được hướng dẫn từng bước về cách sử dụng phần mềm đồ họa, các kỹ thuật vẽ cơ bản, phối màu và tạo ra các tác phẩm độc đáo của riêng mình.',
//     rating: 4.6,
//     reviews: 50,
//     category: 'Nghệ thuật',
//   },
//   {
//     id: '5',
//     name: 'Khóa học Phân tích Dữ liệu với Python',
//     price: 950000,
//     image: 'https://placehold.co/400x300/33FFF1/FFFFFF?text=Data+Analysis',
//     shortDescription: 'Sử dụng Python và thư viện để phân tích và trực quan hóa dữ liệu.',
//     longDescription: 'Tìm hiểu về các khái niệm cơ bản của phân tích dữ liệu, cách thu thập, làm sạch, phân tích và trực quan hóa dữ liệu bằng Python. Khóa học bao gồm các thư viện như Pandas, NumPy, Matplotlib và Seaborn.',
//     rating: 4.9,
//     reviews: 150,
//     category: 'Khoa học dữ liệu',
//   },
//   {
//     id: '6',
//     name: 'Khóa học Thiết kế UI/UX',
//     price: 700000,
//     image: 'https://placehold.co/400x300/A133FF/FFFFFF?text=UI/UX+Design',
//     shortDescription: 'Nắm vững nguyên tắc thiết kế giao diện người dùng và trải nghiệm người dùng.',
//     longDescription: 'Khóa học này sẽ trang bị cho bạn kiến thức và kỹ năng cần thiết để thiết kế các giao diện người dùng trực quan và trải nghiệm người dùng tối ưu. Bạn sẽ học về wireframing, prototyping, user research và usability testing.',
//     rating: 4.7,
//     reviews: 80,
//     category: 'Thiết kế',
//   },
// ];

// // Helper to format price
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
// };

// // Toast Notification Component
// const ToastNotification = ({ message, type, onClose }) => {
//   if (!message) return null;

//   const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

//   return (
//     <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up`}>
//       <span>{message}</span>
//       <button onClick={onClose} className="ml-4 font-bold">X</button>
//     </div>
//   );
// };

// // Loading Skeleton Component
// const LoadingSkeleton = () => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
//     {[...Array(4)].map((_, i) => (
//       <div key={i} className="bg-gray-200 rounded-lg shadow-md overflow-hidden">
//         <div className="h-48 w-full bg-gray-300"></div>
//         <div className="p-4">
//           <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//           <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
//           <div className="h-10 bg-gray-300 rounded w-full"></div>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// // Product Card Component
// const ProductCard = ({ product, onDetailClick, onToggleFavorite, isFavorite }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg">
//     <img
//       src={product.image}
//       alt={product.name}
//       className="w-full h-48 object-cover"
//       onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/CCCCCC/333333?text=${product.name.substring(0, 10)}` }}
//     />
//     <div className="p-4">
//       <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
//       <p className="text-gray-600 text-sm mb-2 h-12 overflow-hidden">{product.shortDescription}</p>
//       <div className="flex justify-between items-center mb-4">
//         <span className="text-xl font-bold text-indigo-600">{formatPrice(product.price)}</span>
//         <button
//           onClick={() => onToggleFavorite(product.id)}
//           className={`p-2 rounded-full transition-colors duration-300 ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
//           title={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
//         >
//           <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//           </svg>
//         </button>
//       </div>
//       <button
//         onClick={() => onDetailClick(product)}
//         className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//       >
//         Xem chi tiết
//       </button>
//     </div>
//   </div>
// );

// // Product Detail Modal Component
// const ProductDetailModal = ({ product, onClose }) => {
//   if (!product) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-fade-in">
//         <div className="flex justify-end p-4">
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//           >
//             &times;
//           </button>
//         </div>
//         <div className="p-6">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-64 object-cover rounded-lg mb-6"
//             onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x400/CCCCCC/333333?text=${product.name.substring(0, 10)}` }}
//           />
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
//           <p className="text-2xl font-bold text-indigo-600 mb-4">{formatPrice(product.price)}</p>
//           <p className="text-gray-700 mb-4 leading-relaxed">{product.longDescription}</p>
//           <div className="flex items-center text-gray-600 mb-4">
//             <span className="flex items-center mr-4">
//               <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
//               </svg>
//               {product.rating} ({product.reviews} đánh giá)
//             </span>
//             <span className="text-gray-500">Thể loại: {product.category}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// function App() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [priceFilter, setPriceFilter] = useState('');
//   const [favorites, setFavorites] = useState({}); // {productId: true}
//   const [viewHistory, setViewHistory] = useState([]); // [{productId, timestamp}]
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [activeView, setActiveView] = useState('home'); // 'home' or 'favorites'
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');
//   const [showAISuggestionsLoading, setShowAISuggestionsLoading] = useState(false);
//   const [showChatbotModal, setShowChatbotModal] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [db, setDb] = useState(null);
//   const [auth, setAuth] = useState(null);
//   const [isAuthReady, setIsAuthReady] = useState(false);

//   // Initialize Firebase and set up auth listener
//   useEffect(() => {
//     try {
//       const app = initializeApp(firebaseConfig);
//       const firestore = getFirestore(app);
//       const authentication = getAuth(app);
//       setDb(firestore);
//       setAuth(authentication);

//       const unsubscribe = onAuthStateChanged(authentication, async (user) => {
//         if (user) {
//           setUserId(user.uid);
//           setIsAuthReady(true);
//         } else {
//           // Sign in anonymously if no initial token or user
//           if (!initialAuthToken) {
//             await signInAnonymously(authentication);
//           }
//           setIsAuthReady(true); // Mark ready even if anonymous
//         }
//       });

//       // Attempt to sign in with custom token if available
//       const signIn = async () => {
//         if (initialAuthToken) {
//           try {
//             await signInWithCustomToken(authentication, initialAuthToken);
//           } catch (error) {
//             console.error("Error signing in with custom token:", error);
//             await signInAnonymously(authentication); // Fallback to anonymous
//           }
//         } else {
//           await signInAnonymously(authentication);
//         }
//       };
//       signIn();

//       return () => unsubscribe();
//     } catch (error) {
//       console.error("Error initializing Firebase:", error);
//       showToastMessage("Lỗi khi khởi tạo Firebase.", "error");
//     }
//   }, []);

//   // Fetch products from Firestore (or use mock data if Firestore fails)
//   useEffect(() => {
//     if (!db) return;

//     const productsCollectionRef = collection(db, `artifacts/${appId}/public/data/products`);
//     const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
//       if (snapshot.empty) {
//         console.log("No products in Firestore, using mock data.");
//         setProducts(mockProducts);
//         setFilteredProducts(mockProducts);
//         // Optionally, add mock products to Firestore if empty for future use
//         mockProducts.forEach(async (product) => {
//           try {
//             await setDoc(doc(db, `artifacts/${appId}/public/data/products`, product.id), product);
//           } catch (e) {
//             console.error("Error adding mock product to Firestore: ", e);
//           }
//         });
//       } else {
//         const fetchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setProducts(fetchedProducts);
//         setFilteredProducts(fetchedProducts);
//       }
//     }, (error) => {
//       console.error("Error fetching products from Firestore:", error);
//       setProducts(mockProducts); // Fallback to mock data on error
//       setFilteredProducts(mockProducts);
//       showToastMessage("Không thể tải danh sách sản phẩm từ máy chủ. Đang sử dụng dữ liệu mẫu.", "error");
//     });

//     return () => unsubscribe();
//   }, [db]);

//   // Fetch user-specific data (favorites, view history)
//   useEffect(() => {
//     if (!db || !userId || !isAuthReady) return;

//     const favoritesDocRef = doc(db, `artifacts/${appId}/users/${userId}/favorites`, 'userFavorites');
//     const viewHistoryDocRef = doc(db, `artifacts/${appId}/users/${userId}/viewHistory`, 'userViewHistory');

//     const unsubscribeFavorites = onSnapshot(favoritesDocRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setFavorites(docSnap.data().items || {});
//       } else {
//         setFavorites({});
//       }
//     }, (error) => {
//       console.error("Error fetching favorites:", error);
//       showToastMessage("Không thể tải danh sách yêu thích.", "error");
//     });

//     const unsubscribeViewHistory = onSnapshot(viewHistoryDocRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setViewHistory(docSnap.data().items || []);
//       } else {
//         setViewHistory([]);
//       }
//     }, (error) => {
//       console.error("Error fetching view history:", error);
//       showToastMessage("Không thể tải lịch sử xem.", "error");
//     });

//     return () => {
//       unsubscribeFavorites();
//       unsubscribeViewHistory();
//     };
//   }, [db, userId, isAuthReady]);

//   // Apply search and filter
//   useEffect(() => {
//     let currentFiltered = products.filter(product =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (priceFilter) {
//       currentFiltered = currentFiltered.filter(product => {
//         if (priceFilter === '<500K') return product.price < 500000;
//         if (priceFilter === '500K-1M') return product.price >= 500000 && product.price <= 1000000;
//         if (priceFilter === '>1M') return product.price > 1000000;
//         return true;
//       });
//     }
//     setFilteredProducts(currentFiltered);
//   }, [searchTerm, priceFilter, products]);

//   const showToastMessage = (message, type = 'success') => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => {
//       setShowToast(false);
//       setToastMessage('');
//     }, 3000);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePriceFilterChange = (e) => {
//     setPriceFilter(e.target.value);
//   };

//   const handleDetailClick = useCallback(async (product) => {
//     setSelectedProduct(product);
//     setShowDetailModal(true);

//     // Add to view history
//     if (db && userId) {
//       const historyDocRef = doc(db, `artifacts/${appId}/users/${userId}/viewHistory`, 'userViewHistory');
//       try {
//         const docSnap = await getDoc(historyDocRef);
//         let currentHistory = [];
//         if (docSnap.exists()) {
//           currentHistory = docSnap.data().items || [];
//         }

//         // Remove if already exists to move to front
//         currentHistory = currentHistory.filter(item => item.productId !== product.id);
//         currentHistory.unshift({ productId: product.id, timestamp: Date.now() });

//         // Keep only the last 10 viewed items
//         currentHistory = currentHistory.slice(0, 10);

//         await setDoc(historyDocRef, { items: currentHistory });
//         setViewHistory(currentHistory); // Update local state immediately
//       } catch (e) {
//         console.error("Error updating view history:", e);
//       }
//     }
//   }, [db, userId]);

//   const handleCloseDetailModal = () => {
//     setShowDetailModal(false);
//     setSelectedProduct(null);
//   };

//   const handleToggleFavorite = useCallback(async (productId) => {
//     if (!db || !userId) {
//       showToastMessage("Vui lòng đăng nhập để sử dụng tính năng yêu thích.", "error");
//       return;
//     }

//     const favoritesDocRef = doc(db, `artifacts/${appId}/users/${userId}/favorites`, 'userFavorites');
//     const newFavorites = { ...favorites };

//     if (newFavorites[productId]) {
//       delete newFavorites[productId];
//       showToastMessage("Đã bỏ yêu thích sản phẩm.", "success");
//     } else {
//       newFavorites[productId] = true;
//       showToastMessage("Đã thêm vào danh sách yêu thích!", "success");
//     }

//     setFavorites(newFavorites); // Update local state immediately
//     try {
//       await setDoc(favoritesDocRef, { items: newFavorites });
//     } catch (e) {
//       console.error("Error updating favorites:", e);
//       showToastMessage("Không thể cập nhật danh sách yêu thích.", "error");
//     }
//   }, [favorites, db, userId]);

//   const handleAISuggestions = async () => {
//     setShowAISuggestionsLoading(true);
//     try {
//       // Mock API call to /api/suggestions
//       // In a real app, this would send user behavior (view history, favorites)
//       // to a backend AI service.
//       const response = await fetch('/api/suggestions?userId=' + (userId || 'guest'), {
//         method: 'GET', // Or POST if sending user data
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       // Hardcoded mock suggestions based on user behavior
//       // For demonstration, let's suggest products related to 'Lập trình' if user viewed 'Web Dev'
//       // or 'Ngoại ngữ' if user viewed 'English Comm'
//       let suggestedProductIds = [];
//       const viewedProductIds = viewHistory.map(item => item.productId);

//       if (viewedProductIds.includes('1') || viewedProductIds.includes('5')) { // Web Dev or Data Analysis
//         suggestedProductIds = ['1', '5', '6'].filter(id => !viewedProductIds.includes(id));
//       } else if (viewedProductIds.includes('2')) { // English Comm
//         suggestedProductIds = ['2'].filter(id => !viewedProductIds.includes(id)); // No other mock English courses
//       } else if (viewedProductIds.includes('3')) { // Digital Marketing
//         suggestedProductIds = ['3'].filter(id => !viewedProductIds.includes(id)); // No other mock Marketing courses
//       } else {
//         // Default suggestions if no specific history or to fill up
//         suggestedProductIds = ['1', '2', '3', '4', '5', '6'].filter(id => !viewedProductIds.includes(id));
//       }

//       // Limit to 3 suggestions
//       suggestedProductIds = suggestedProductIds.slice(0, 3);

//       const suggestedProducts = mockProducts.filter(p => suggestedProductIds.includes(p.id));

//       if (suggestedProducts.length > 0) {
//         setFilteredProducts(suggestedProducts);
//         showToastMessage("Đã tải gợi ý sản phẩm phù hợp!", "success");
//       } else {
//         setFilteredProducts(products); // Show all if no specific suggestions
//         showToastMessage("Không có gợi ý mới dựa trên hành vi của bạn. Đang hiển thị tất cả sản phẩm.", "info");
//       }

//     } catch (error) {
//       console.error("Error fetching AI suggestions:", error);
//       showToastMessage("Không thể lấy gợi ý lúc này. Vui lòng thử lại.", "error");
//       setFilteredProducts(products); // Fallback to all products
//     } finally {
//       setShowAISuggestionsLoading(false);
//     }
//   };

//   const handleChatbotInteraction = async (message) => {
//     if (!message.trim()) return "Vui lòng nhập câu hỏi của bạn.";

//     // Simulate AI response using Gemini API
//     try {
//       const chatHistory = [{ role: "user", parts: [{ text: message }] }];
//       const payload = { contents: chatHistory };
//       const apiKey = ""; // Canvas will provide this at runtime
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       const result = await response.json();
//       if (result.candidates && result.candidates.length > 0 &&
//           result.candidates[0].content && result.candidates[0].content.parts &&
//           result.candidates[0].content.parts.length > 0) {
//         const text = result.candidates[0].content.parts[0].text;

//         // Simple product suggestion logic based on keywords
//         let productSuggestions = [];
//         if (text.toLowerCase().includes('lập trình') || text.toLowerCase().includes('code') || text.toLowerCase().includes('web')) {
//           productSuggestions = mockProducts.filter(p => p.category === 'Lập trình' || p.category === 'Khoa học dữ liệu');
//         } else if (text.toLowerCase().includes('tiếng anh') || text.toLowerCase().includes('ngoại ngữ')) {
//           productSuggestions = mockProducts.filter(p => p.category === 'Ngoại ngữ');
//         } else if (text.toLowerCase().includes('marketing') || text.toLowerCase().includes('kinh doanh')) {
//           productSuggestions = mockProducts.filter(p => p.category === 'Kinh doanh');
//         } else if (text.toLowerCase().includes('thiết kế') || text.toLowerCase().includes('nghệ thuật')) {
//             productSuggestions = mockProducts.filter(p => p.category === 'Nghệ thuật' || p.category === 'Thiết kế');
//         }

//         let botResponse = text;
//         if (productSuggestions.length > 0) {
//           botResponse += "\n\nDưới đây là một số khóa học có thể bạn quan tâm:\n";
//           productSuggestions.forEach(p => {
//             botResponse += `- ${p.name} (${formatPrice(p.price)})\n`;
//           });
//         }
//         return botResponse;
//       } else {
//         return "Xin lỗi, tôi không thể hiểu yêu cầu của bạn lúc này. Vui lòng thử lại.";
//       }
//     } catch (error) {
//       console.error("Error calling Gemini API:", error);
//       return "Đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.";
//     }
//   };

//   const getFavoriteProducts = () => {
//     return products.filter(p => favorites[p.id]);
//   };

//   const getRecentViewedProducts = () => {
//     const recentIds = viewHistory.map(item => item.productId);
//     return products.filter(p => recentIds.includes(p.id)).sort((a, b) => {
//       const indexA = recentIds.indexOf(a.id);
//       const indexB = recentIds.indexOf(b.id);
//       return indexA - indexB; // Sort by order in viewHistory
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 font-inter flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-md p-4 sticky top-0 z-40">
//         <div className="container mx-auto flex flex-wrap justify-between items-center">
//           <h1 className="text-3xl font-bold text-indigo-600">EduAI</h1>
//           <nav className="flex items-center space-x-4 mt-4 sm:mt-0">
//             <button
//               onClick={() => setActiveView('home')}
//               className={`px-4 py-2 rounded-md transition-colors duration-200 ${activeView === 'home' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
//             >
//               Trang chủ
//             </button>
//             <button
//               onClick={() => setActiveView('favorites')}
//               className={`px-4 py-2 rounded-md transition-colors duration-200 ${activeView === 'favorites' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
//             >
//               Yêu thích
//             </button>
//             <button
//               onClick={handleAISuggestions}
//               className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300"
//             >
//               Gợi ý AI
//             </button>
//             <button
//               onClick={() => setShowChatbotModal(true)}
//               className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
//             >
//               Chatbot AI
//             </button>
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto p-6 flex-grow">
//         {/* Search and Filter */}
//         {activeView === 'home' && (
//           <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
//             <div className="flex flex-col sm:flex-row gap-4 mb-6">
//               <input
//                 type="text"
//                 placeholder="Tìm kiếm khóa học..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//               />
//               <select
//                 value={priceFilter}
//                 onChange={handlePriceFilterChange}
//                 className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//               >
//                 <option value="">Lọc theo giá</option>
//                 <option value="<500K">Dưới 500.000 VNĐ</option>
//                 <option value="500K-1M">500.000 VNĐ - 1.000.000 VNĐ</option>
//                 <option value=">1M">Trên 1.000.000 VNĐ</option>
//               </select>
//             </div>
//             {userId && (
//               <div className="text-sm text-gray-600">
//                 ID người dùng của bạn: <span className="font-mono bg-gray-200 p-1 rounded">{userId}</span>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Product List / Favorites List */}
//         {activeView === 'home' && (
//           <>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//               {showAISuggestionsLoading ? 'Đang tải gợi ý...' : (searchTerm || priceFilter ? 'Kết quả tìm kiếm' : 'Tất cả sản phẩm')}
//             </h2>
//             {showAISuggestionsLoading ? (
//               <LoadingSkeleton />
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map(product => (
//                     <ProductCard
//                       key={product.id}
//                       product={product}
//                       onDetailClick={handleDetailClick}
//                       onToggleFavorite={handleToggleFavorite}
//                       isFavorite={!!favorites[product.id]}
//                     />
//                   ))
//                 ) : (
//                   <p className="col-span-full text-center text-gray-600">Không tìm thấy sản phẩm nào.</p>
//                 )}
//               </div>
//             )}

//             {/* Recently Viewed Products */}
//             {getRecentViewedProducts().length > 0 && (
//               <div className="mt-12">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Lịch sử xem gần đây</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                   {getRecentViewedProducts().map(product => (
//                     <ProductCard
//                       key={product.id}
//                       product={product}
//                       onDetailClick={handleDetailClick}
//                       onToggleFavorite={handleToggleFavorite}
//                       isFavorite={!!favorites[product.id]}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         {activeView === 'favorites' && (
//           <>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Sản phẩm yêu thích của bạn</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {getFavoriteProducts().length > 0 ? (
//                 getFavoriteProducts().map(product => (
//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                     onDetailClick={handleDetailClick}
//                     onToggleFavorite={handleToggleFavorite}
//                     isFavorite={true} // Always true for favorites view
//                   />
//                 ))
//               ) : (
//                 <p className="col-span-full text-center text-gray-600">Bạn chưa có sản phẩm yêu thích nào.</p>
//               )}
//             </div>
//           </>
//         )}
//       </main>

//       {/* Product Detail Modal */}
//       <ProductDetailModal product={selectedProduct} onClose={handleCloseDetailModal} />

//       {/* Chatbot Modal */}
//       {showChatbotModal && (
//         <ChatbotModal onClose={() => setShowChatbotModal(false)} onSendMessage={handleChatbotInteraction} />
//       )}

//       {/* Toast Notification */}
//       <ToastNotification message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
//     </div>
//   );
// }

// // Chatbot Modal Component
// const ChatbotModal = ({ onClose, onSendMessage }) => {
//   const [messages, setMessages] = useState([{ sender: 'bot', text: 'Chào bạn! Tôi có thể giúp gì cho bạn về các khóa học?' }]);
//   const [input, setInput] = useState('');
//   const [isSending, setIsSending] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const newMessage = { sender: 'user', text: input };
//     setMessages(prev => [...prev, newMessage]);
//     setInput('');
//     setIsSending(true);

//     try {
//       const botResponse = await onSendMessage(input);
//       setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
//     } catch (error) {
//       setMessages(prev => [...prev, { sender: 'bot', text: 'Xin lỗi, đã có lỗi xảy ra khi tôi xử lý yêu cầu của bạn.' }]);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-lg w-full h-[80vh] flex flex-col transform transition-all duration-300 scale-95 animate-fade-in">
//         <div className="flex justify-between items-center p-4 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-800">Chatbot AI Tư vấn</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//           >
//             &times;
//           </button>
//         </div>
//         <div className="flex-grow overflow-y-auto p-4 space-y-4">
//           {messages.map((msg, index) => (
//             <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`max-w-[75%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
//                 {msg.text.split('\n').map((line, i) => (
//                   <p key={i}>{line}</p>
//                 ))}
//               </div>
//             </div>
//           ))}
//           {isSending && (
//             <div className="flex justify-start">
//               <div className="max-w-[75%] p-3 rounded-lg bg-gray-200 text-gray-800 animate-pulse">
//                 Đang nhập...
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="p-4 border-t border-gray-200 flex">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             placeholder="Nhập tin nhắn của bạn..."
//             className="flex-grow p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             disabled={isSending}
//           />
//           <button
//             onClick={handleSend}
//             className="bg-indigo-500 text-white px-6 py-3 rounded-r-md hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//             disabled={isSending}
//           >
//             Gửi
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
