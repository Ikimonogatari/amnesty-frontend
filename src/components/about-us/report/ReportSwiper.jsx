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
import { getImageUrl } from "@/config/api";

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
  // Remove duplicates and invalid data first
  const validReports =
    reports && Array.isArray(reports)
      ? reports
          .filter((report) => report && report.id) // Remove invalid entries
          .filter(
            (report, index, self) =>
              index ===
              self.findIndex((r) => r.id?.toString() === report.id?.toString())
          ) // Remove duplicates
      : [];

  const slides =
    validReports.length > 0
      ? validReports.map((report, index) => {
          // RTK Query flattens attributes, but cover is still nested
          const imageUrl =
            report?.cover?.data?.attributes?.url || "/mng/images/dummy-image.png";

          // Add base URL if the image URL is a relative path from the API
          const fullImageUrl = imageUrl.startsWith("/uploads/")
            ? `${
                process.env.NEXT_PUBLIC_MEDIA_URL || "https://cms.amnesty.mn"
              }${imageUrl}`
            : imageUrl;

          // RTK Query flattens attributes, but pdf_file is still nested
          const pdfUrl = report?.pdf_file?.data?.attributes?.url;

          // Handle PDF URL exactly like old web
          let fullPdfUrl = pdfUrl;
          if (pdfUrl && !pdfUrl.includes("https:")) {
            fullPdfUrl = `https://${pdfUrl}`;
          }

          // RTK Query flattens attributes, so title is directly accessible
          const reportTitle = report?.title || `ᠲᠠᠶᠢᠯᠤᠨ ${index + 1}`;

          return {
            id: report.id || index + 1,
            title: reportTitle,
            image: fullImageUrl,
            pdfUrl: fullPdfUrl,
          };
        })
      : [
          // Fallback slides when no reports data
          {
            id: 1,
            title: "ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠲᠠᠶᠢᠯᠤᠨ ᠦᠭᠡᠢ",
            image: "/mng/images/dummy-image.png",
          },
        ];

  console.log("🔧 ReportSwiper - Final slides array:", slides);

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
      router.push(`/about/3/${slide.id}`);
    }
  };

  return (
    <div className="h-full flex flex-col sm:flex-row gap-8 p-4">
      <div className="flex gap-2 sm:gap-8 max-h-[150px] sm:max-h-max">
        {title && (
          <h1
            className="text-[10px] sm:text-2xl font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            {title}
          </h1>
        )}
        {description && (
          <p
            className="text-[10px] sm:text-sm font-bold text-[#848382] sm:text-black"
            style={{ writingMode: "vertical-lr" }}
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
            style={{ writingMode: "vertical-lr" }}
          >
            {sectionTitle}
          </p>
        )}
        <Swiper
          direction={isMobile ? "horizontal" : "vertical"}
          slidesPerView={isMobile ? (slides.length === 1 ? 1 : 1.8) : 3}
          spaceBetween={isMobile ? 20 : 30}
          navigation={false}
          pagination={false}
          modules={[Navigation, Pagination]}
          className="h-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={`${slide.id}-${index}`}>
              <div
                className={`w-full h-full flex gap-7 cursor-pointer hover:opacity-80 transition-opacity duration-300`}
                onClick={() => handleSlideClick(slide)}
              >
                <div className="flex flex-col items-center gap-4">
                  <p
                    className="text-sm font-bold overflow-x-auto"
                    style={{
                      writingMode: "vertical-lr",
                      maxHeight: "",
                    }}
                  >
                    {slide.title}
                  </p>
                </div>
                <Image
                  src={slide.image}
                  alt={""}
                  width={200}
                  height={112.5}
                  className={`rounded-lg shadow-lg relative z-0 w-full aspect-[204/290]`}
                    onError={(e) => {
                      e.target.src = "/mng/images/dummy-image.png";
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
          disabled={currentSlide === 1}
        />
        <div className="text-center space-y-2">
          <div className="text-sm font-bold flex flex-row sm:flex-col items-center justify-center gap-0">
            <span>{toMongolianNumeral(currentSlide)}</span>
            <span className="text-xs">/</span>
            <span>{toMongolianNumeral(slides.length)}</span>
          </div>
          {slides.length > 5 && (
            <p
              className="text-xs text-gray-500"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠦᠷᠭᠦᠯᠵᠢᠯᠡᢉᠦ
            </p>
          )}
        </div>
        <Button
          text={isMobile ? <ChevronRight /> : <ChevronDown />}
          type="chevron"
          onClick={handleNextSlide}
          disabled={currentSlide === slides.length}
        />
      </div>
    </div>
  );
}
