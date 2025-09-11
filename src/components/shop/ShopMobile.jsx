import StaticHeader from "../common/StaticHeader";
import GridLayout from "@/components/common/GridLayout";
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
        process.env.NEXT_PUBLIC_MEDIA_URL || "http://152.42.244.47:1337"
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
    <div className="flex flex-col gap-1 mt-1">
      <div
        className="text-xs font-bold text-center"
        style={{
          writingMode: "vertical-lr",
          textOrientation: "upright",
        }}
      >
        {price} ₮
      </div>
      <div className="flex items-center justify-center">
        <a
          className="border border-gray-300 py-1 px-2 text-[10px] font-mongolian rounded-md hover:bg-gray-100 transition-colors"
          href={merch?.shop_link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // Prevent grid item click
        >
          <span
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠵᠠᠬᠢᠶᠠᠯᠠᠬᠤ
          </span>
        </a>
      </div>
    </div>
  );
};

export default function ShopMobile({ merchandise = [] }) {
  return (
    <div className="h-full flex flex-col sm:hidden gap-7">
      <StaticHeader
        image="/images/merch/header-img-amnestyshop.jpg"
        alt="Shop Page Header"
        width="100%"
        title="ᠡᠮᠨᠧᠰᠲᠢ ᠳᠡᠯᠭᠦᠦᠷ"
      />
      <div className="h-full p-4">
        <div className="h-full flex flex-col gap-7">
          <div className="flex gap-2 max-h-[200px] overflow-x-auto">
            <h1
              className="text-xs font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠡᠮᠨᠧᠰᠲᠢ ᠳᠡᠯᠭᠦᠦᠷ
            </h1>
            <p
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠲᠠ ᠡᠮᠨᠧᠰᠲᠢ ᠰᠣᠫᠢᠨ ᠪᠠᠷᠠᠭ᠎ᠠ ᠪᠦᠲᠡᠭᠡᠳᠬᠦᠦᠨ ᠡᠴᠡ ᠬᠤᠳᠠᠯᠳᠠᠨ ᠠᠪᠤᠵᠤ᠂ ᠬᠦᠮᠦᠨ ᠦ
              ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠶᠢᠨ ᠦᠢᠯᠡᠳᠡᠳ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠡᠭᠡᠨ ᠣᠷᠣᠭᠤᠯᠠᠷᠠᠢ᠃
            </p>
            <p
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠲᠠᠨ ᠤ ᠬᠢᠶᠠᠭᠰᠠᠨ ᠬᠤᠳᠠᠯᠳᠠᠨ ᠠᠪᠤᠯᠭ᠎ᠠ ᠶᠢᠨ ᠣᠷᠠᠯᠢᠭᠣ ᠨᠢ ᠡᠮᠨᠧᠰᠲᠢ
              ᠢᠨᠲᠧᠷᠨᠠᠰᠢᠣᠨᠠᠯ ᠤᠨ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠶᠢᠨ ᠺᠠᠮᠫᠠᠨᠢᠲ ᠠᠵᠢᠯ᠂ ᠬᠦᠮᠦᠨ
              ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠣᠯᠭᠠᠬᠤ ᠲᠥᠰᠥᠯ ᠬᠥᠲᠥᠯᠪᠦᠷᠢ ᠶᠢ ᠬᠡᠷᠡᠭᠵᠢᠭᠦᠯᠬᠦ ᠳᠦ
              ᠵᠠᠷᠴᠢᠭᠤᠯᠠᠭᠳᠠᠭ᠃
            </p>
            <div
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              {merchandise.length} ᠪᠦᠲᠡᠭᠡᠳᠬᠦᠦᠨ
            </div>
          </div>

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
