import Image from "next/image";

export default function CampaignHeader({ coverImage, title, isMobile = false }) {
  if (isMobile) {
    return (
      <div className="relative h-[200px] w-full flex-shrink-0">
        <Image
          src={coverImage}
          alt={title || "Campaign cover"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="p-4 text-white text-lg font-bold text-center"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    );
  }

  return null; // Desktop uses StaticHeader component
}
