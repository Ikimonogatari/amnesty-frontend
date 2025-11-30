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
