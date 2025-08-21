import { getImageUrl } from "@/utils/fetcher";
import Image from "next/image";

export default function MerchItem({ merchItem }) {
  // Fix: The data is flattened, so images is directly on merchItem, not under attributes
  const hasImage = Boolean(merchItem?.images?.data?.attributes?.url);

  let imageUrl;
  if (hasImage) {
    // Try direct URL first
    const directUrl = merchItem.images.data.attributes.url;
    imageUrl = directUrl.startsWith("http")
      ? directUrl
      : `${process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:1337'}${directUrl}`;
  } else {
    imageUrl = "/images/no-image-icon.png";
  }

  let price = merchItem?.price;

  if (price == null) {
    price = 0;
  } else {
    price = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const title = merchItem?.title || "";
  const shopLink = merchItem?.shop_link || "#";

  return (
    <div className="flex flex-row items-end gap-3">
      <div className="min-h-[270px] flex flex-col justify-between flex-1 gap-2 h-full">
        <div
          className="text-sm font-medium flex-1"
          style={{
            writingMode: "vertical-lr",
            textOrientation: "upright",
            minHeight: "80px",
          }}
        >
          {title}
        </div>
        <div
          className="text-sm font-bold"
          style={{
            writingMode: "vertical-lr",
            textOrientation: "upright",
          }}
        >
          {price} ₮
        </div>
      </div>
      <Image
        src={imageUrl}
        alt={title}
        width={270}
        height={270}
        className="w-full h-full aspect-square min-w-[270px] min-h-[270px] rounded-xl shadow-md"
      />
      <div className="mt-2 flex items-center justify-center">
        <a
          className="border border-gray-300 py-3 px-2 text-sm font-[Oswald] rounded-md hover:bg-gray-100 transition-colors"
          href={shopLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className="pl-1"
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
}
