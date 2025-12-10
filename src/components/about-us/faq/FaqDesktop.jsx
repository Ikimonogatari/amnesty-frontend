import React, { useState } from "react";
import { useGetFaqsQuery } from "@/redux/services/apiService";
import StaticHeader from "@/components/common/StaticHeader";
import FullScreenLoader from "@/components/common/FullScreenLoader";

export default function FaqDesktop() {
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
      <div className="w-full min-h-screen bg-white hidden md:flex items-center justify-center">
        <div className="text-center text-red-600">
          <p style={{ writingMode: "vertical-lr" }}>
            ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full hidden sm:flex gap-20 w-auto flex-shrink-0">
      <StaticHeader
        image="/mng/images/faq/header-img.jpg"
        alt="FAQ Page Header"
        width="90rem"
        title="ᠲᠦᠭᠡᠮᠡᠯ ᠠᠰᠤᠤᠯᠲᠠ ᠬᠠᠷᠢᠭᠤᠯᠲᠠ"
      />
      <div className="flex gap-6 max-h-screen overflow-y-auto p-4">
        {faqItems.map((item, index) => {
          const isExpanded = expandedItem === index;
          return (
            <div key={index} className="flex items-start">
              <button
                onClick={() => toggleExpanded(index)}
                className="flex justify-center items-center w-12 h-full py-6 rounded-lg bg-[#FFFF00]"
              >
                <h3
                  className="text-lg font-bold text-black"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {item.title}
                </h3>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ml-2 ${
                  isExpanded
                    ? "max-w-xs opacity-100 translate-x-0"
                    : "max-w-0 opacity-0 -translate-x-4"
                }`}
              >
                <div
                  style={{
                    writingMode: "vertical-lr",
                  }}
                  className="px-4 py-6 bg-white bg-opacity-90 rounded-lg h-full max-h-screen"
                >
                  <p
                    className="text-black leading-relaxed"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
