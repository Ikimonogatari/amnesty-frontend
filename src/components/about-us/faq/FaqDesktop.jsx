import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useGetFaqsQuery } from "@/redux/services/apiService";
import { getImageUrl } from "@/config/api";
import Image from "next/image";
import Button from "@/components/common/Button";
import StaticHeader from "@/components/common/StaticHeader";

export default function FaqDesktop() {
  const [expandedItem, setExpandedItem] = useState(null);
  const contentRefs = useRef({});

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
    return (
      <div className="w-full min-h-screen bg-white hidden md:flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p
            className="mt-4 text-gray-600"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (faqsError) {
    return (
      <div className="w-full min-h-screen bg-white hidden md:flex items-center justify-center">
        <div className="text-center text-red-600">
          <p style={{ writingMode: "vertical-lr", textOrientation: "upright" }}>
            ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full hidden sm:flex gap-20 w-auto flex-shrink-0">
      <StaticHeader
        image="/images/faq/header-img.jpg"
        alt="FAQ Page Header"
        width="90rem"
        title="ᠲᠦᠭᠡᠮᠡᠯ ᠠᠰᠤᠤᠯᠲᠠ ᠬᠠᠷᠢᠭᠤᠯᠲᠠ"
      />
      <div className="flex gap-6 max-h-screen overflow-y-auto p-4">
        {faqItems.map((item, index) => (
          <div key={index} className="flex">
            <button
              onClick={() => toggleExpanded(index)}
              className="flex justify-center items-center w-12 h-full py-6 rounded-lg transition-colors duration-200 bg-[#FFFF00]"
            >
              <h3
                className="text-lg font-bold text-black pl-2"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {item.title}
              </h3>
            </button>
            {expandedItem === index && (
              <div
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
                className="max-w-xs h-full max-h-screen overflow-hidden transition-all duration-500 ease-in-out ml-2 px-4 py-6 bg-white bg-opacity-90 rounded-lg"
              >
                <p
                  className="text-black leading-relaxed"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {item.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
