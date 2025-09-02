import { useRouter } from "next/router";
import Image from "next/image";
import Button from "./Button";
import { getImageUrl } from "../../utils/fetcher";

export default function RelatedItems({
  items,
  sectionTitle,
  primaryButtonText,
  itemType, // 'lessons', 'online-lessons', 'library', 'videos'
  maxItems = 3,
}) {
  const router = useRouter();

  if (!items || items.length === 0) {
    return null;
  }

  const handleItemClick = (itemId) => {
    router.push(`/${itemType}/${itemId}`);
  };

  return (
    <div className="h-full flex gap-10 w-auto flex-shrink-0">
      <div className="h-full flex flex-col items-center gap-4">
        <div
          className="w-full h-full flex justify-center items-center text-center text-2xl font-bold rounded-xl p-8 text-black bg-white border border-[#E3E3E3]"
          style={{
            writingMode: "vertical-lr",
            textOrientation: "upright",
          }}
        >
          {sectionTitle}
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between">
        {items.slice(0, maxItems).map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => handleItemClick(item.id)}
            className="flex space-x-4 max-h-[400px] h-full cursor-pointer hover:opacity-80 transition-opacity"
          >
            <h3
              className="max-w-16 line-clamp-3 h-full text-sm"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
              title={item.title || item.name}
            >
              {(item.title || item.name)?.length > 50
                ? `${(item.title || item.name).substring(0, 50)}...`
                : item.title || item.name}
            </h3>
            <div className="relative">
              <Image
                src={
                  getImageUrl(item.thumbnail || item.cover || item.image) ||
                  "/images/news1.png"
                }
                alt={item.title || item.name || "Related item image"}
                width={400}
                height={400}
                className="object-cover rounded-xl shadow-md w-[400px] h-[400px]"
              />
              <Button
                text={primaryButtonText}
                type="primary"
                className="absolute top-0 right-0 text-black cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleItemClick(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
