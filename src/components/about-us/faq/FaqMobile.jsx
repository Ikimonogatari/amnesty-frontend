import React, { useState } from "react";
import { useGetFaqsQuery } from "@/redux/services/apiService";
import { getImageUrl } from "@/config/api";
import StaticHeader from "@/components/common/StaticHeader";
import FullScreenLoader from "@/components/common/FullScreenLoader";

export default function FaqMobile() {
  const [expandedItem, setExpandedItem] = useState(null);

  // Fetch FAQs from API
  const {
    data: faqsData,
    error: faqsError,
    isLoading: faqsLoading,
  } = useGetFaqsQuery({
    pageSize: 10,
    sort: "publishedAt:desc",
  });

  // Convert FAQs data to the format expected by the component
  const faqItems = faqsData
    ? faqsData.map((faq) => ({
        id: faq.id,
        title: faq.question || "ᠠᠰᠠᠭᠤᠯᠲᠠ",
        description: faq.answer || "ᠬᠠᠷᠢᠭᠤᠯᠲᠠ ᠦᠭᠡᠢ",
      }))
    : [];

  const toggleExpanded = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  // Loading state
  if (faqsLoading) {
    return <FullScreenLoader />;
  }

  // Error state
  if (faqsError) {
    return (
      <div className="w-full min-h-screen bg-white md:hidden flex items-center justify-center">
        <div className="text-center text-red-600">
          <p style={{ writingMode: "vertical-lr" }}>
            ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full block sm:hidden">
      <StaticHeader
        image="/mng/images/faq/header-img.jpg"
        alt="FAQ Page Header"
        width="100%"
        title="ᠲᠦᠭᠡᠮᠡᠯ ᠠᠰᠤᠤᠯᠲᠠ ᠬᠠᠷᠢᠭᠤᠯᠲᠠ"
      />
      <div className="flex flex-col gap-4 p-4">
        {faqItems.map((item, index) => {
          const isExpanded = expandedItem === index;
          return (
            <div key={index} className="flex items-center gap-2">
              <button
                onClick={() => toggleExpanded(index)}
                className="flex justify-center items-center max-h-[150px] px-3 rounded-lg bg-[#FFFF00]"
              >
                <h3
                  className="text-[10px] font-bold text-black py-3"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {item.title}
                </h3>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded
                    ? "max-w-full opacity-100 translate-x-0"
                    : "max-w-0 opacity-0 -translate-x-4"
                }`}
              >
                <p
                  className="text-[10px] max-h-[150px] w-full overflow-x-auto"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const bannerImages = [
  getImageUrl("banner1.jpg"),
  getImageUrl("banner2.jpg"),
  getImageUrl("banner3.jpg"),
];
