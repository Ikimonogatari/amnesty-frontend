import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeaderMobile from "@/components/layout/HeaderMobile";
import FooterMobile from "@/components/layout/FooterMobile";
import DonateFloatingButton from "@/components/common/DonateFloatingButton";

export default function Layout({ children }) {
  const scrollRef = useRef(null);
  const router = useRouter();

  // Pages that need flex-1 instead of h-full for proper layout
  const flexPages = ["/reset-password", "/register"];
  const isFlexPage = flexPages.includes(router.pathname);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault(); // stop vertical scrolling
      el.scrollLeft += e.deltaY; // map vertical scroll to horizontal
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Reset scroll position when route changes (prevents jump/scroll animation)
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    const resetScroll = () => {
      // Reset desktop horizontal scroll immediately
      const el = scrollRef.current;
      if (el) {
        el.scrollLeft = 0;
      }

      // Reset mobile vertical scroll immediately
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    };

    // Reset immediately
    resetScroll();

    // Also reset after a short delay to catch any late updates
    const timeoutId = setTimeout(resetScroll, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router.asPath]); // Use asPath instead of pathname to catch query changes too

  return (
    <>
      {/* Desktop Layout - Horizontal scrolling for Mongolian script */}
      <div
        ref={scrollRef}
        className="h-screen w-screen overflow-x-auto overflow-y-hidden hidden md:block font-mongolian"
        style={{ scrollBehavior: "auto" }}
      >
        <div
          className="flex items-center justify-start h-full"
          style={{ minWidth: "100vw" }}
        >
          <Header />
          <div className={`${isFlexPage ? "flex-1" : "h-full"} flex-shrink-0`}>
            {children}
          </div>
          <Footer />
        </div>
      </div>

      {/* Mobile Layout - Keep vertical scrolling */}
      <div className="flex flex-col md:hidden min-h-screen">
        <HeaderMobile />
        <div className="flex-1">{children}</div>
        <FooterMobile />
      </div>

      {/* Sticky Donation Button - appears on all pages except donation */}
      <DonateFloatingButton />
    </>
  );
}
