import Button from "@/components/common/Button";
import { toMongolianNumeral } from "@/utils/mongolian-numerals";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";

/**
 * A shared layout component for swiper-based sections with vertical Mongolian text.
 * Safely handles Safari rendering bugs by separating flex containers from vertical text.
 */
export default function VerticalSwiperLayout({
  title,
  description,
  sectionTitle,
  currentSlide,
  totalSlides,
  onPrevSlide,
  onNextSlide,
  onNavigateAll,
  children,
  isLoading = false,
  error = null,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-full flex flex-col sm:flex-row gap-4 sm:gap-8 overflow-x-auto sm:overflow-auto p-4">
      {/* Sidebar with title and description */}
      <div className="flex flex-row gap-4 sm:gap-8">
        <div className="flex gap-2 sm:gap-8 h-full min-h-[150px] sm:h-auto overflow-visible">
          {title && (
            <div className="flex items-center justify-center">
              <h1
                className="text-xs sm:text-2xl font-bold max-h-[300px] overflow-y-auto font-mongolian text-black"
                style={{
                  writingMode: "vertical-lr",
                  wordBreak: "keep-all",
                  lineHeight: "1.2",
                  transform: "translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
              >
                {title}
              </h1>
            </div>
          )}
          {description && (
            <div className="flex items-center justify-center">
              <p
                className="text-[10px] sm:text-sm font-bold max-h-[400px] overflow-y-auto font-mongolian text-[#848382] sm:text-black"
                style={{
                  writingMode: "vertical-lr",
                  wordBreak: "keep-all",
                  lineHeight: "1.2",
                  transform: "translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
              >
                {description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section Title */}
      {sectionTitle && (
        <SectionTitle
          title={sectionTitle}
          containerClassName="hidden sm:block"
        />
      )}

      {/* Swiper Content Area */}
      <div className="flex flex-row gap-2 h-full min-h-[200px] overflow-hidden flex-1">
        {sectionTitle && (
          <div className="flex items-center justify-center">
            <p
              className="text-[10px] font-bold block sm:hidden max-h-[200px] overflow-y-auto font-mongolian"
              style={{
                writingMode: "vertical-lr",
                wordBreak: "keep-all",
                transform: "translateZ(0)",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
              }}
            >
              {sectionTitle}
            </p>
          </div>
        )}
        
        <div className="flex-1 h-full min-w-0">
          {children}
        </div>
      </div>

      {/* See All Button Column */}
      {onNavigateAll && (
        <div className="hidden sm:flex items-start justify-center">
          <Button text={"ᠪᠦᢉᠦᠳᠡ ᠶ᠋ᠢ ᠦᠵᠡᢈᠦ"} type="secondary" onClick={onNavigateAll} />
        </div>
      )}

      {/* Navigation and Pagination */}
      <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center gap-2 mt-4 sm:mt-0">
        <Button
          text={isMobile ? <ChevronLeft /> : <ChevronUp />}
          type="chevron"
          onClick={onPrevSlide}
          disabled={currentSlide === 1 || isLoading}
        />
        <div className="text-sm font-bold flex flex-row sm:flex-col items-center justify-center gap-0">
          <span
            style={{
              transform: "translateZ(0)",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            {toMongolianNumeral(currentSlide)}
          </span>
          <span className="text-xs">/</span>
          <span
            style={{
              transform: "translateZ(0)",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            {totalSlides > 0 ? toMongolianNumeral(totalSlides) : toMongolianNumeral(0)}
          </span>
        </div>
        <Button
          text={isMobile ? <ChevronRight /> : <ChevronDown />}
          type="chevron"
          onClick={onNextSlide}
          disabled={currentSlide === totalSlides || isLoading}
        />
      </div>
    </div>
  );
}
