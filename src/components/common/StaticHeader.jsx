import Image from "next/image";

export default function StaticHeader({
  image = "/images/news1.png",
  alt = "Header Image",
  width = "90rem",
  title = null,
}) {
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
      className="relative md:p-4 h-full w-full min-h-[250px]"
      style={getResponsiveStyle()}
    >
      <div className="h-full relative">
        <Image
          src={image}
          alt={alt}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="md:rounded-xl"
          priority
          onError={(e) => {
            e.target.src = "/images/news1.png"; // fallback image
          }}
        />
        {title && (
          <>
            {/* Desktop Title Overlay */}
            <div className="hidden md:flex absolute h-full top-0 left-0 bg-black/50 backdrop-blur-lg text-white w-full max-w-xs rounded-xl items-center justify-center p-16 overflow-hidden">
              <h1
                className="text-3xl font-bold font-mongolian text-center max-h-full overflow-y-auto break-words"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                }}
              >
                {title}
              </h1>
            </div>

            {/* Mobile Title Overlay */}
            <div className="flex md:hidden absolute inset-0 bg-black/50 backdrop-blur-sm text-white items-center justify-center p-4 z-10 overflow-hidden">
              <div className="max-w-[200px] max-h-[200px] overflow-hidden">
                <h1
                  className="text-sm font-bold font-mongolian text-center px-3 py-2 bg-black/60 rounded-lg backdrop-blur-md shadow-lg overflow-y-auto break-words max-h-[180px]"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                    wordBreak: "break-all",
                    overflowWrap: "break-word",
                  }}
                >
                  {title}
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
