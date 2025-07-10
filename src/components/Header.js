import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import ChatbotModal from './ChatBotModal';

export default function Header({showAISuggestionsLoading}) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);

  // Placeholder handlers for AI buttons
  const handleAISuggestions = () => {
    if(currentPath === '/') {
      showAISuggestionsLoading(true);
    }
  };

  const handleChatbotModal = () => {
    setShowChatbotModal(true);
  };

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-40">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">ECommmerce PDT</h1>

        {/*Menu Button (Mobile Only) */}
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav
          className={`w-full sm:w-auto sm:flex items-center space-x-4 mt-4 sm:mt-0 ${
            isMenuOpen ? 'block' : 'hidden sm:block'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition-colors duration-200 text-center ${
                currentPath === '/' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/favorites"
              className={`px-4 py-2 rounded-md transition-colors duration-200 text-center ${
                currentPath === '/favorites' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Yêu thích
            </Link>
            <button
              onClick={handleAISuggestions}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 text-center min-w-[120px]"
            >
              Gợi ý AI
            </button>
            <button
              onClick={handleChatbotModal}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 text-center min-w-[120px]"
            >
              Chatbot AI
            </button>
          </div>
        </nav>
      </div>
      {showChatbotModal && (
        <ChatbotModal onClose={() => setShowChatbotModal(false)} />
      )}
    </header>
  );
}