import StaticHeader from "@/components/common/StaticHeader";
import GridLayout from "@/components/common/GridLayout";
import SectionTitle from "../common/SectionTitle";
import { getImageUrl } from "@/utils/fetcher";

// Helper functions for GridLayout component
const getMerchImageUrl = (merch) => {
  if (!merch?.images?.data?.attributes?.url) {
    return "/images/no-image-icon.png";
  }

  const directUrl = merch.images.data.attributes.url;
  return directUrl.startsWith("http")
    ? directUrl
    : `${
        process.env.NEXT_PUBLIC_MEDIA_URL || "https://cms.amnesty.mn"
      }${directUrl}`;
};

const getMerchTitle = (merch) => {
  return merch?.title || "ᠠᠳᠠᠯᠢᠬᠠᠨ ᠪᠠᠷᠠᠭ᠎ᠠ";
};

const renderMerchPrice = (merch) => {
  let price = merch?.price;

  if (price == null) {
    price = "᠐";
  } else if (typeof price === "string") {
    // Price is already formatted (traditional Mongolian numerals)
    price = price;
  } else {
    // Price is a number, format it with commas
    price = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="flex flex-col gap-2 justify-between h-full">
      <div
        className="text-sm font-bold text-center"
        style={{
          writingMode: "vertical-lr",
        }}
      >
        {price} ₮
      </div>
      <div className="flex items-center justify-center">
        <a
          className="border border-gray-300 py-2 px-3 text-xs font-mongolian rounded-md hover:bg-gray-100 transition-colors"
          href={merch?.shop_link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // Prevent grid item click
        >
          <span
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠵᠠᠬᠢᠶᠠᠯᠠᠬᠤ
          </span>
        </a>
      </div>
    </div>
  );
};

export default function ShopDesktop({ merchandise = [] }) {
  return (
    <div className="h-full hidden sm:flex gap-10 flex-shrink-0 p-4">
      <StaticHeader
        image="/images/merch/header-img-amnestyshop.jpg"
        alt="Shop Page Header"
        width="90rem"
        title="ᠡᠮᠨᠧᠰᠲᠢ ᠳᠡᠯᠭᠦᠦᠷ"
      />
      <div className="h-full p-4">
        <div className="h-full flex gap-10">
          <div className="flex gap-7">
            <h2
              className="text-sm font-bold"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ᠃ ᠲᠠ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠱᠣᠫ ᠤ᠋ᠨ ᠪᠠᠷᠠᠭ᠎ᠠ ᠪᠦᠲᠦᢉᠡᢉᠳᠡᢈᠦᠨ ᠡᠴᠡ
              ᠬᠤᠳᠠᠯᠳᠤᠨ ᠠᠪᠴᠤ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡᠰ ᠲᠦ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ
              ᠪᠡᠨ
            </h2>
            <p
              className="text-sm text-[#848382]"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠣᠯᠭᠤᠬᠤ ᠲᠥᠰᠦᠯ ᢈᠥᠲᠦᠯᠪᠦᠷᠢ ᠨᠦ᠋ᢉᠦᠳ ᠢ᠋ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᢈᠦ ᠳ᠋ᠦ
              ᠵᠠᠷᠤᠴᠠᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ᠃ ᠲᠠᠨ ᠤ᠋ ᢈᠢᢉᠰᠡᠨ ᠬᠤᠳᠠᠯᠳᠤᠨ ᠠᠪᠤᠯᠲᠠ ᠶ᠋ᠢᠨ ᠣᠷᠤᠯᠭ᠎ᠠ ᠨᠢ
              ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲᠧᠷᠨᠡᠰᠢᠨᠯ ᠤ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ
              ᠠᠵᠢᠯ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ
            </p>
          </div>
          <SectionTitle title={`${merchandise.length} ᠪᠦᠲᠦᢉᠡᢉᠳᠡᢈᠦᠨ`} />

          {/* Products Section using GridLayout */}
          <GridLayout
            items={merchandise}
            isLoading={false}
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}} // No pagination for shop
            basePath="/shop" // Shop items don't have individual pages, but we need this for consistency
            categoryButtonText="ᠪᠠᠷᠠᠭ᠎ᠠ"
            emptyStateText="ᠪᠠᠷᠠᠭ᠎ᠠ ᠪᠦᠲᠡᠭᠡᠳᠬᠦᠦᠨ ᠣᠯᠣᠭᠰᠠᠨ ᠦᠭᠡᠢ᠃"
            getImageUrl={getMerchImageUrl}
            getTitle={getMerchTitle}
            itemType="merchandise"
            renderAdditionalContent={renderMerchPrice}
            hideCategoryButton={true}
          />
        </div>
      </div>
    </div>
  );
}
