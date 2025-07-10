import { formatPrice } from "../utils/util";
import { mockProducts } from "../data/products";

const apiKey = process.env.REACT_APP_GEMINI_API
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
export const handleChatbotInteraction = async (message) => {
    if (!message.trim()) return "Vui lòng nhập câu hỏi của bạn.";
    // Simulate AI response using Gemini API
    try {
        const chatHistory = [{ role: "user", parts: [{ text: message }] }];
        const payload = { contents: chatHistory };
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });



        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;

            // Simple product suggestion logic based on keywords
            let productSuggestions = [];
            if (text.toLowerCase().includes('lập trình') || text.toLowerCase().includes('code') || text.toLowerCase().includes('web')) {
                productSuggestions = mockProducts.filter(p => p.category === 'Lập trình' || p.category === 'Khoa học dữ liệu');
            } else if (text.toLowerCase().includes('tiếng anh') || text.toLowerCase().includes('ngoại ngữ')) {
                productSuggestions = mockProducts.filter(p => p.category === 'Ngoại ngữ');
            } else if (text.toLowerCase().includes('marketing') || text.toLowerCase().includes('kinh doanh')) {
                productSuggestions = mockProducts.filter(p => p.category === 'Kinh doanh');
            } else if (text.toLowerCase().includes('thiết kế') || text.toLowerCase().includes('nghệ thuật')) {
                productSuggestions = mockProducts.filter(p => p.category === 'Nghệ thuật' || p.category === 'Thiết kế');
            }

            let botResponse = text;
            if (productSuggestions.length > 0) {
                botResponse += "\n\nDưới đây là một số khóa học có thể bạn quan tâm:\n";
                productSuggestions.forEach(p => {
                    botResponse += `- ${p.name} (${formatPrice(p.price)})\n`;
                });
            }
            return botResponse;
        } else {
            return "Xin lỗi, tôi không thể hiểu yêu cầu của bạn lúc này. Vui lòng thử lại.";
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.";
    }
};