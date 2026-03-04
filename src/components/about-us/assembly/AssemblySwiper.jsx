import VerticalSwiperLayout from "@/components/common/VerticalSwiperLayout";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function AssemblySwiper() {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = [
    { id: 1, image: "https://www.youtube.com/watch?v=aCi-sflmu2Y" },
    { id: 2, image: "https://www.youtube.com/watch?v=a0w2NjR8iUU" },
    { id: 3, image: "https://www.youtube.com/watch?v=WCgBkzwGxtQ" },
    { id: 4, image: "https://www.youtube.com/watch?v=YsLw5PNtJV8" },
    { id: 5, image: "https://www.youtube.com/watch?v=sLAliIBTZtI" },
    { id: 6, image: "https://www.youtube.com/watch?v=NqvasOvgYwo" },
    { id: 7, image: "https://www.youtube.com/watch?v=a4z8D-jl07g" },
  ];

  return (
    <VerticalSwiperLayout
      currentSlide={currentSlide}
      totalSlides={slides.length}
      onPrevSlide={() => swiperRef.current?.slidePrev()}
      onNextSlide={() => swiperRef.current?.slideNext()}
    >
      <Swiper
        direction={isMobile ? "horizontal" : "vertical"}
        slidesPerView={isMobile ? 1.3 : 3}
        spaceBetween={20}
        navigation={false}
        pagination={false}
        modules={[Navigation, Pagination]}
        className="h-full w-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
      >
        {slides.map((slide) => {
          const videoId = getYouTubeVideoId(slide.image);
          return (
            <SwiperSlide key={slide.id}>
              <div className="w-full h-full flex gap-4">
                <div className={`relative z-20 ${isMobile ? "w-full" : "aspect-square h-full"}`}>
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Video ${slide.id}`}
                      className="rounded-lg shadow-lg relative z-30 w-full h-full aspect-square"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="rounded-lg shadow-lg aspect-square w-full h-full bg-gray-200 flex items-center justify-center">
                      <p>Invalid video URL</p>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </VerticalSwiperLayout>
  );
}
