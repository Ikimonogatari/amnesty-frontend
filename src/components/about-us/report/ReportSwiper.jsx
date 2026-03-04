import Button from "@/components/common/Button";
import VerticalSwiperLayout from "@/components/common/VerticalSwiperLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ReportSwiper({
  title,
  description,
  sectionTitle,
  reports = [],
}) {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const validReports = reports && Array.isArray(reports)
    ? reports
      .filter((report) => report && report.id)
      .filter((report, index, self) =>
        index === self.findIndex((r) => r.id?.toString() === report.id?.toString())
      )
    : [];

  const slides = validReports.map((report, index) => {
    const imageUrl = report?.cover?.data?.attributes?.url || "/mng/images/dummy-image.png";
    const fullImageUrl = imageUrl.startsWith("/uploads/")
      ? `${process.env.NEXT_PUBLIC_MEDIA_URL || "https://cms.amnesty.mn"}${imageUrl}`
      : imageUrl;

    return {
      id: report.id || index + 1,
      title: report?.title || `ᠲᠠᠶᠢᠯᠤᠨ ${index + 1}`,
      image: fullImageUrl,
    };
  });

  return (
    <VerticalSwiperLayout
      title={title}
      description={description}
      sectionTitle={sectionTitle}
      currentSlide={currentSlide}
      totalSlides={slides.length}
      onPrevSlide={() => swiperRef.current?.slidePrev()}
      onNextSlide={() => swiperRef.current?.slideNext()}
    >
      <div className="flex flex-col gap-4 h-full">
        <Swiper
          direction={isMobile ? "horizontal" : "vertical"}
          slidesPerView={isMobile ? (slides.length === 1 ? 1 : 1.8) : 3}
          spaceBetween={isMobile ? 10 : 40}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
          modules={[Navigation, Pagination]}
          className="h-full w-full"
          observer={true}
          observeParents={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={`${slide.id}-${index}`}>
              <div
                className="w-full h-full flex gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => slide.id && router.push(`/about/3/${slide.id}`)}
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
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = "/mng/images/dummy-image.png";
                    }}
                  />
                  <Button text={"ᠳᠡᠯᢉᠡᠷᠡᠩᢈᠦᠢ"} type="details" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </VerticalSwiperLayout>
  );
}
