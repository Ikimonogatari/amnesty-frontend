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
      className="relative md:p-4 h-full w-full min-h-[250px] md:min-h-[300px]"
      style={getResponsiveStyle()}
    >
      <div className="h-full relative flex justify-center items-center w-full">
        <Image
          src={image}
          alt={alt}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="md:rounded-xl h-full min-h-[250px] md:min-h-[300px] z-0 absolute"
          priority
          onError={(e) => {
            e.target.src = "/images/news1.png"; // fallback image
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
                  textOrientation: "upright",
                }}
              >
                {title}
              </h1>
            </div>

            {/* Mobile Title Overlay */}
            <div className="md:hidden w-full p-4 text-white z-0 h-full">
              <div className="flex items-center justify-center w-full h-full">
                <h1
                  className="text-base font-bold font-mongolian text-center px-4 py-3 bg-black/60 rounded-lg backdrop-blur-md shadow-lg overflow-y-auto break-words max-h-[200px] max-w-[200px] leading-tight"
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
