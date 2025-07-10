import React from 'react';
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
             
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">ECommmerce PDT</h2>
                        <img src="/logoNew.png" alt="Logo" className="w-24 h-24 mb-4 justify-self-center" />
                        <p className="text-gray-400">
                            Nền tảng học tập trực tuyến hàng đầu, cung cấp khoá học chất lượng
                            với gợi ý thông minh từ AI.
                            <span className="block mt-2">

                                <span className="text-gray-500">
                                    Make by phandinhthai012
                                    </span>
                            </span>
                            
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/"
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    Trang chủ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/favorites"
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    Yêu thích
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/history"
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    Lịch sử xem
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    Giới thiệu
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                        <p className="text-gray-400">Email: phandinhthai012@gmail.com</p>
                        <p className="text-gray-400">Phone: +0866952340</p>
                        <div className="flex space-x-4 mt-4 justify-content-around">
                            <a
                                href="https://facebook.com"
                                className="text-gray-400 hover:text-white transition duration-300"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    {/* Icon Facebook SVG */}
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com"
                                className="text-gray-400 hover:text-white transition duration-300"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    {/* Icon Twitter SVG */}
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} EduCommerce. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;