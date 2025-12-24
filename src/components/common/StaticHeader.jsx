import Image from "next/image";

export default function StaticHeader({
  image = "/mng/images/news1.png",
  alt = "Header Image",
  width = "90rem",
  title = null,
  desc = null,
  className = null,
}) {
  // Next.js Image component auto-applies basePath when optimized
  const imageSrc = image;
  const fallbackImage = "/mng/images/news1.png";
  // Handle responsive width
  const getResponsiveStyle = () => {
    // If width is a percentage or specific mobile value, use it as is
    if (
      typeof width === "string" &&
      (width.includes("%") || width.includes("px"))
    ) {
      return { width: width };
    }
    // For rem values, make them responsive
    return {
      width: width,
      // On mobile, ensure it doesn't overflow
      maxWidth: "100vw",
    };
  };

  return (
    <div
      className={`relative md:p-4 h-full w-full min-h-[250px] md:min-h-[300px] ${className}`}
      style={getResponsiveStyle()}
    >
      <div className="h-full relative flex justify-center items-center w-full">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="md:rounded-xl h-full min-h-[250px] md:min-h-[300px] z-0 absolute"
          priority
          onError={(e) => {
            e.target.src = fallbackImage; // fallback image
          }}
        />
        {title && (
          <>
            {/* Desktop Title Overlay */}
            <div className="hidden md:flex h-full mr-auto bg-black/50 backdrop-blur-lg text-white w-full max-w-xs rounded-xl items-center justify-center p-16 overflow-hidden">
              <h1
                className="text-3xl font-bold font-mongolian text-center max-h-full overflow-y-auto break-words"
                style={{
                  writingMode: "vertical-rl",
                }}
              >
                {title}
              </h1>
              <h1
                className="text-xl font-bold font-mongolian max-h-full overflow-y-auto break-words"
                style={{
                  writingMode: "vertical-rl",
                }}
              >
                {desc}
              </h1>
            </div>

            {/* Mobile Title Overlay - Same layout as BannerSlider mobile caption */}
            <div className="md:hidden absolute h-[250px] w-1/5 top-0 left-0 bg-black/50 backdrop-blur-lg text-white min-w-[120px] overflow-x-auto gap-3 p-4 flex z-0">
              <h1
                className="text-base font-bold font-mongolian mb-2 flex-shrink-0 line-clamp-2"
                style={{
                  writingMode: "vertical-rl",
                }}
              >
                {title}
              </h1>
              {desc && (
                <p
                  className="text-xs text-gray-200 flex-shrink-0 line-clamp-3"
                  style={{
                    writingMode: "vertical-rl",
                  }}
                >
                  {desc}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
