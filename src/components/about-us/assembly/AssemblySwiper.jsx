import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "@/components/common/Button";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import SectionTitle from "@/components/common/SectionTitle";

// Custom hook for Mongolian numeral conversion
const useMongolianNumeral = () => {
  const toMongolianNumeral = (num) => {
    const mongolianNumerals = {
      0: "᠐",
      1: "᠑",
      2: "᠒",
      3: "᠓",
      4: "᠔",
      5: "᠕",
      6: "᠖",
      7: "᠗",
      8: "᠘",
      9: "᠙",
    };
    return num
      .toString()
      .split("")
      .map((digit) => mongolianNumerals[digit])
      .join("");
  };

  return { toMongolianNumeral };
};

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function AssemblySwiper({ title, description, sectionTitle }) {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const { toMongolianNumeral } = useMongolianNumeral();

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = [
    {
      id: 1,
      image: "https://www.youtube.com/watch?v=aCi-sflmu2Y",
    },
    {
      id: 2,
      image: "https://www.youtube.com/watch?v=a0w2NjR8iUU",
    },
    {
      id: 3,
      image: "https://www.youtube.com/watch?v=WCgBkzwGxtQ",
    },
    {
      id: 4,
      image: "https://www.youtube.com/watch?v=YsLw5PNtJV8",
    },
    {
      id: 5,
      image: "https://www.youtube.com/watch?v=sLAliIBTZtI",
    },
    {
      id: 6,
      image: "https://www.youtube.com/watch?v=NqvasOvgYwo",
    },
    {
      id: 7,
      image: "https://www.youtube.com/watch?v=a4z8D-jl07g",
    },
  ];

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex + 1);
  };

  return (
    <div className="h-full flex flex-col sm:flex-row gap-7 p-4 relative z-10">
      <div className="flex gap-2 sm:gap-8 max-h-[150px] sm:max-h-max">
        <h1
          className="text-[10px] sm:text-2xl font-bold"
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
        >
          {title}
        </h1>
        <p
          className="text-[10px] sm:text-sm font-bold text-[#848382] sm:text-black"
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
        >
          {description}
        </p>
      </div>
      {sectionTitle && (
        <SectionTitle
          title={sectionTitle}
          containerClassName="hidden sm:block"
        />
      )}
      <div className="flex flex-row gap-2">
        <p
          className="text-[10px] font-bold block sm:hidden"
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
        >
          {sectionTitle}
        </p>
        <Swiper
          direction={isMobile ? "horizontal" : "vertical"}
          slidesPerView={isMobile ? 1.3 : 3}
          spaceBetween={isMobile ? 20 : 40}
          navigation={false}
          pagination={false}
          modules={[Navigation, Pagination]}
          className="h-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
        >
          {slides.map((slide) => {
            const videoId = getYouTubeVideoId(slide.image);
            return (
              <SwiperSlide key={slide.id}>
                <div className={`w-full h-full flex gap-4`}>
                    <div
                      className={`relative z-20 ${
                        isMobile ? "max-w-[300px]" : "min-w-[270px] aspect-square"
                      }`}
                    >
                    {videoId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`Video ${slide.id}`}
                        className={`rounded-lg shadow-lg relative z-30 ${
                          isMobile
                            ? "w-full"
                            : "aspect-square min-h-[270px] h-full"
                        }`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div
                        className={`rounded-lg shadow-lg ${
                          isMobile
                            ? "w-full aspect-[16/9]"
                            : "aspect-square min-h-[270px]"
                        } relative z-30 bg-gray-200 flex items-center justify-center`}
                      >
                        <p>Invalid video URL</p>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center gap-2">
        <Button
          text={isMobile ? <ChevronLeft /> : <ChevronUp />}
          type="chevron"
          onClick={handlePrevSlide}
        />
        <p className="text-sm">
          {toMongolianNumeral(currentSlide)}/{toMongolianNumeral(slides.length)}
        </p>
        <Button
          text={isMobile ? <ChevronRight /> : <ChevronDown />}
          type="chevron"
          onClick={handleNextSlide}
        />
      </div>
    </div>
  );
}
