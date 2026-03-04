import Button from "@/components/common/Button";
import VerticalSwiperLayout from "@/components/common/VerticalSwiperLayout";
import { getImageUrl } from "@/utils/fetcher";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function RightSwiper({
  title,
  description,
  sectionTitle,
  data = [],
  needSubSection = true,
  needReadButton = true,
}) {
  const router = useRouter();
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

  const slides = data.map((item, index) => {
    const itemAttrs = item.attributes || item;
    const imageUrl =
      getImageUrl(itemAttrs.thumbnail) ||
      getImageUrl(itemAttrs.cover) ||
      getImageUrl(itemAttrs.image) ||
      getImageUrl(itemAttrs.featured_image) ||
      "/mng/images/dummy-image.png";

    return {
      id: item.id || index + 1,
      title: itemAttrs.title || itemAttrs.name || "ᠦᠨᠡᠨ ᠦ᠋ ᠭᠠᠷᠴᠠᠭ",
      image: imageUrl,
      duration: itemAttrs.duration || itemAttrs.lesson_length || "᠙᠐ ᠮᠢᠨ",
    };
  });

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex + 1);
  };

  const navigateToDetail = (item) => {
    const itemId = item.id;
    let route = "";

    if (sectionTitle.includes("ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ") || sectionTitle.toLowerCase().includes("online lesson")) {
      route = `/online-lessons/${itemId}`;
    } else if (sectionTitle.includes("ᠰᠤᠷᠭᠠᠯᠲᠠ") || sectionTitle.toLowerCase().includes("lesson")) {
      route = `/lessons/${itemId}`;
    } else if (sectionTitle.includes("ᠸᠢᠳᠧᠤ") || sectionTitle.toLowerCase().includes("video")) {
      route = `/videos/${itemId}`;
    } else if (sectionTitle.includes("ᠨᠣᠮ ᠤ᠋ᠨ ᠰᠠᠩ") || sectionTitle.toLowerCase().includes("librar")) {
      route = `/library/${itemId}`;
    } else if (sectionTitle.includes("ᠫᠣᠳ᠋ᠻᠠᠰᠲ") || sectionTitle.toLowerCase().includes("podcast")) {
      route = `/podcasts/${itemId}`;
    } else {
      return;
    }
    router.push(route);
  };

  const navigateToCategoryPage = () => {
    let route = "";
    if (sectionTitle.includes("ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ") || sectionTitle.toLowerCase().includes("online lesson")) {
      route = "/online-lessons";
    } else if (sectionTitle.includes("ᠰᠤᠷᠭᠠᠯᠲᠠ") || sectionTitle.toLowerCase().includes("lesson")) {
      route = "/lessons";
    } else if (sectionTitle.includes("ᠸᠢᠳᠧᠤ") || sectionTitle.toLowerCase().includes("video")) {
      route = "/videos";
    } else if (sectionTitle.includes("ᠣᠨᠴᠠᠯᠠᠬᠤ ᠨᠣᠮ ᠲᠣᠪᢈᠢᠮᠠᠯ ᠤ᠋ᠳ") || sectionTitle.toLowerCase().includes("librar")) {
      route = "/library";
    } else if (sectionTitle.includes("ᠣᠨᠴᠠᠯᠠᠬᠤ ᠫᠣᠳ᠋ᠻᠠᠰᠲ ᠤ᠋ᠳ") || sectionTitle.toLowerCase().includes("podcast")) {
      route = "/podcasts";
    } else {
      return;
    }
    router.push(route);
  };

  if (!slides.length) {
    return (
      <VerticalSwiperLayout
        title={title}
        description={description}
        sectionTitle={sectionTitle}
        currentSlide={0}
        totalSlides={0}
      >
        <div className="flex items-center justify-center p-8 h-full">
          <p className="text-sm text-gray-500 font-mongolian" style={{ writingMode: "vertical-lr" }}>
            ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠦᠭᠡᠢ ᠪᠠᠶᠢᠨ᠎ᠠ
          </p>
        </div>
      </VerticalSwiperLayout>
    );
  }

  return (
    <VerticalSwiperLayout
      title={needSubSection ? title : null}
      description={needSubSection ? description : null}
      sectionTitle={sectionTitle}
      currentSlide={currentSlide}
      totalSlides={slides.length}
      onPrevSlide={() => swiperRef.current?.slidePrev()}
      onNextSlide={() => swiperRef.current?.slideNext()}
      onNavigateAll={needSubSection ? navigateToCategoryPage : undefined}
    >
      <div className="flex flex-col gap-4 h-full">
        <Swiper
          direction={isMobile ? "horizontal" : "vertical"}
          slidesPerView={isMobile ? 1 : 3}
          spaceBetween={isMobile ? 10 : 40}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          modules={[Navigation, Pagination]}
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="w-full h-full flex gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigateToDetail({ id: slide.id })}
              >
                <div className="flex flex-col items-center justify-center h-full sm:h-auto w-fit">
                  <div className="flex items-center justify-center">
                    <p
                      className="text-[10px] sm:text-base font-medium text-center overflow-visible max-h-[140px] sm:max-h-[200px] flex-shrink-0 font-mongolian"
                      style={{
                        writingMode: "vertical-lr",
                        lineHeight: "1.3",
                        wordBreak: "keep-all",
                        whiteSpace: "nowrap",
                        transform: "translateZ(0)",
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                      }}
                      title={slide.title}
                    >
                      {slide.title.length > 15 ? `${slide.title.substring(0, 15)}...` : slide.title}
                    </p>
                  </div>
                </div>
                <div className="relative z-0 aspect-square w-full">
                  <Image src={slide.image} alt={slide.title} fill className="rounded-lg object-cover" />
                  <Button text={"ᠳᠡᠯᢉᠡᠷᠡᠩᢈᠦᠢ"} type="details" />
                </div>
                {needReadButton && (
                  <div className="flex items-end justify-center">
                    <p
                      className="text-[9px] sm:text-sm cursor-pointer hover:text-blue-600 transition-colors font-mongolian h-fit"
                      style={{
                        writingMode: "vertical-lr",
                        transform: "translateZ(0)",
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToDetail({ id: slide.id });
                      }}
                    >
                      ᠤᠩᠰᠢᠬᠤ
                    </p>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </VerticalSwiperLayout>
  );
}
