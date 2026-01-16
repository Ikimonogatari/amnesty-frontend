import Image from "next/image";

export default function CampaignSection({ section, isMobile = false }) {
  if (isMobile) {
    return (
      <div className="flex flex-row overflow-auto gap-4 w-full">
        {section.title && (
          <h2
            className="text-xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {section.title}
          </h2>
        )}
        {section.image && (
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={section.image}
              alt={section.title || "Section image"}
              fill
              className="object-cover rounded"
            />
          </div>
        )}
        {section.content && (
          <div
            className="text-base text-gray-800 w-full"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {section.content}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-shrink-0">
      {section.title && (
        <h2
          className="text-2xl font-bold min-w-max"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          {section.title}
        </h2>
      )}
      <div
        className="text-lg text-gray-800 max-w-[600px] flex-1"
        style={{
          writingMode: "vertical-lr",
        }}
      >
        {section.content}
      </div>
      {section.image && (
        <div className="relative w-[400px] h-[300px] flex-shrink-0">
          <Image
            src={section.image}
            alt={section.title || "Section image"}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
