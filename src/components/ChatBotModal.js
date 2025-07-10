
import React, { useState } from 'react';
import { mockProducts } from '../data/products';
import { formatPrice } from '../utils/util';
import { handleChatbotInteraction } from '../mocks/chatbotService';

const ChatbotModal = ({ onClose }) => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Chào bạn! Tôi có thể giúp gì cho bạn về các khóa học?' }]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsSending(true);

    try {
      // const botResponse = await onSendMessage(input);
      const botResponse = await handleChatbotInteraction(input);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Xin lỗi, đã có lỗi xảy ra khi tôi xử lý yêu cầu của bạn.' }]);
    } finally {
      setIsSending(false);
    }
  };


  //  const handleChatbotInteraction = async (message) => {
  //   if (!message.trim()) return "Vui lòng nhập câu hỏi của bạn.";

  //   // Gợi ý sản phẩm dựa trên từ khóa đơn giản
  //   const lower = message.toLowerCase();
  //   let productSuggestions = [];

  //   if (lower.includes("lập trình") || lower.includes("web")) {
  //     productSuggestions = mockProducts.filter(p => p.category === 'Lập trình');
  //   } else if (lower.includes("tiếng anh") || lower.includes("giao tiếp")) {
  //     productSuggestions = mockProducts.filter(p => p.category === 'Ngoại ngữ');
  //   } else if (lower.includes("marketing")) {
  //     productSuggestions = mockProducts.filter(p => p.category === 'Kinh doanh');
  //   } else if (lower.includes("vẽ") || lower.includes("thiết kế")) {
  //     productSuggestions = mockProducts.filter(p => p.category === 'Nghệ thuật');
  //   }

  //   let botResponse = "Tôi đã hiểu yêu cầu của bạn!";
  //   if (productSuggestions.length > 0) {
  //     botResponse += "\n\nDưới đây là một số khóa học gợi ý:\n";
  //     productSuggestions.forEach(p => {
  //       botResponse += `- ${p.name} (${formatPrice(p.price)})\n`;
  //     });
  //   } else {
  //     botResponse += "\nHiện tại tôi chưa tìm được khóa học phù hợp, bạn có thể thử câu hỏi khác nhé.";
  //   }

  //   return botResponse;
  // };



  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full h-[80vh] flex flex-col transform transition-all duration-300 scale-95 animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Chatbot AI Tư vấn</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isSending && (
            <div className="flex justify-start">
              <div className="max-w-[75%] p-3 rounded-lg bg-gray-200 text-gray-800 animate-pulse">
                Đang nhập...
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập tin nhắn của bạn..."
            className="flex-grow p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={isSending}
          />
          <button
            onClick={handleSend}
            className="bg-indigo-500 text-white px-6 py-3 rounded-r-md hover:bg-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={isSending}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;