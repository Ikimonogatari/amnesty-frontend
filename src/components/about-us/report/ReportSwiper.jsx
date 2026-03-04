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
          spaceBetween={isMobile ? 20 : 30}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
          modules={[Navigation, Pagination]}
          className="report-swiper h-full w-full"
          observer={true}
          observeParents={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={`${slide.id}-${index}`}>
              <div
                className="w-full h-full flex gap-7 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                onClick={() => slide.id && router.push(`/about/3/${slide.id}`)}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center">
                    <p
                      className="text-sm font-bold overflow-x-auto font-mongolian"
                      style={{
                        writingMode: "vertical-lr",
                        transform: "translateZ(0)",
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {slide.title}
                    </p>
                  </div>
                </div>
                <div className="relative w-40 h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="rounded-lg shadow-lg object-cover"
                    onError={(e) => {
                      e.target.src = "/mng/images/dummy-image.png";
                    }}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </VerticalSwiperLayout>
  );
}
