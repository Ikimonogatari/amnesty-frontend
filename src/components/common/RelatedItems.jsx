import Image from "next/image";
import { useRouter } from "next/router";
import { getImageUrl } from "../../utils/fetcher";
import Button from "./Button";

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
    <div className="h-full flex gap-4 w-auto">
      <div className="h-full flex flex-col items-center">
        <div
          className="w-full h-full flex justify-center items-center text-center text-xl font-bold rounded-xl p-4 text-black bg-white border border-[#E3E3E3] min-h-0"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          {sectionTitle}
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-start h-full">
        {items.slice(0, maxItems).map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => handleItemClick(item.id)}
            className="flex space-x-3 cursor-pointer hover:opacity-80 transition-opacity h-1/3"
          >
            <h3
              className="w-10 text-xs flex-shrink-0 text-center"
              style={{
                writingMode: "vertical-lr",
              }}
              title={item.title || item.name}
            >
              {(item.title || item.name)?.length > 30
                ? `${(item.title || item.name).substring(0, 30)}...`
                : item.title || item.name}
            </h3>
            <div className="relative w-[250px] h-full flex-shrink-0">
              <Image
                src={
                  getImageUrl(item.thumbnail || item.cover || item.image) ||
                  "/mng/images/news1.png"
                }
                alt={item.title || item.name || "Related item image"}
                fill
                className="object-cover shadow-md"
              />
              <Button
                text={primaryButtonText}
                type="primary"
                className="absolute top-1 right-1 text-black cursor-pointer hover:opacity-80 transition-opacity text-xs px-2 py-1"
                onClick={() => handleItemClick(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
