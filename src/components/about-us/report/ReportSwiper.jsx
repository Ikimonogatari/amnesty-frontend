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
import Image from "next/image";
import { useRouter } from "next/router";

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

export default function ReportSwiper({
  title,
  description,
  sectionTitle,
  reports = [],
}) {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const { toMongolianNumeral } = useMongolianNumeral();
  const router = useRouter();

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Convert reports data to slides format
  const slides =
    reports.length > 0
      ? reports.map((report, index) => {
          const imageUrl =
            report.attributes?.cover?.data?.attributes?.url ||
            report.cover_url ||
            "/images/dummy-image.png";

          // Add base URL if the image URL is a relative path from the API
          const fullImageUrl = imageUrl.startsWith("/uploads/")
            ? `${
                process.env.NEXT_PUBLIC_MEDIA_URL || 'http://152.42.244.47:1337'
              }${imageUrl}`
            : imageUrl;

          const pdfUrl =
            report.attributes?.pdf_file?.data?.attributes?.url ||
            report.pdf_url;

          // Add base URL if the PDF URL is a relative path from the API
          const fullPdfUrl =
            pdfUrl && pdfUrl.startsWith("/uploads/")
              ? `${
                  process.env.NEXT_PUBLIC_MEDIA_URL || 'http://152.42.244.47:1337'
                }${pdfUrl}`
              : pdfUrl;

          return {
            id: report.id || index + 1,
            title:
              report.attributes?.title ||
              report.title ||
              `ᠲᠠᠶᠢᠯᠤᠨ ${index + 1}`,
            image: fullImageUrl,
            pdfUrl: fullPdfUrl,
          };
        })
      : [
          // Fallback slides when no reports data
          {
            id: 1,
            title: "ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠲᠠᠶᠢᠯᠤᠨ ᠦᠭᠡᠢ",
            image: "/images/dummy-image.png",
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

  const handleSlideClick = (slide) => {
    if (slide.id) {
      router.push(`/about-us/report/${slide.id}`);
    }
  };

  return (
    <div className="h-full flex flex-col sm:flex-row gap-8 p-4">
      <div className="flex gap-2 sm:gap-8 max-h-[150px] sm:max-h-max">
        {title && (
          <h1
            className="text-[10px] sm:text-2xl font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            {title}
          </h1>
        )}
        {description && (
          <p
            className="text-[10px] sm:text-sm font-bold text-[#848382] sm:text-black"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            {description}
          </p>
        )}
      </div>
      <SectionTitle title={sectionTitle} containerClassName="hidden sm:block" />
      <div className="flex flex-row gap-2">
        {sectionTitle && (
          <p
            className="text-[10px] font-bold block sm:hidden"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            {sectionTitle}
          </p>
        )}
        <Swiper
          direction={isMobile ? "horizontal" : "vertical"}
          slidesPerView={isMobile ? (slides.length === 1 ? 1 : 1.8) : 3}
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
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className={`w-full h-full flex gap-4 cursor-pointer hover:opacity-80 transition-opacity duration-300`}
                onClick={() => handleSlideClick(slide)}
              >
                <div className="flex flex-col items-center gap-4 justify-between">
                  <p
                    className="text-sm font-bold"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {slide.title}
                  </p>
                </div>
                <Image
                  src={slide.image}
                  alt={slide.title || ""}
                  width={200}
                  height={112.5}
                  className={`rounded-lg shadow-lg relative z-0 w-full max-w-[130px] sm:min-w-[200px] sm:max-w-[200px] aspect-[290/204]`}
                  onError={(e) => {
                    e.target.src = "/images/dummy-image.png";
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
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
