import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const BannerSlider = () => {
  const banners = [
    {
      id: 1,
      image: 'https://placehold.co/800x400/FF5733/FFFFFF?text=AI+Course',
      title: 'Khóa học AI Tăng tốc',
      description: 'Khám phá công nghệ AI với các chuyên gia hàng đầu.',
      cta: 'Khám phá ngay',
    },
    {
      id: 2,
      image: 'https://placehold.co/800x400/33FF57/FFFFFF?text=English+Course',
      title: 'Tiếng Anh giao tiếp',
      description: 'Học tiếng Anh với giáo viên bản ngữ.',
      cta: 'Đăng ký ngay',
    },
    {
      id: 3,
      image: 'https://placehold.co/800x400/3357FF/FFFFFF?text=Web+Development',
      title: 'Lập trình từ cơ bản',
      description: 'Bắt đầu hành trình coder với khoá học thực chiến.',
      cta: 'Tham gia ngay',
    },
  ];

  return (
    <div className="w-full pr-8 pl-8 pt-4">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 10000000 }}
        loop={true}
        className="rounded-xl"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="flex items-center justify-between p-8 rounded-xl"
              style={{
                background: 'linear-gradient(to right, #3b82f6,rgb(98, 98, 112))',
              }}
            > 
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>
                <p className="mb-4">{banner.description}</p>
                <button className="px-6 py-2 bg-white text-blue-600 rounded hover:bg-gray-200 transition duration-300">
                  {banner.cta}
                </button>
              </div>
              <img src={banner.image} alt={banner.title} className="w-1/3 h-auto rounded-lg shadow-lg" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
