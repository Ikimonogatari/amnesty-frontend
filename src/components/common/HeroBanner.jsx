import Image from "next/image";

export default function HeroBanner({
  backgroundImage,
  title,
  description = null,
  showButton = false,
  buttonText = "ДЭЛГЭРЭНГҮЙ",
  buttonHref = "#",
}) {
  return (
    <div className="relative w-full h-screen max-w-[900px] mx-auto overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title Overlay - Left side, 1/3 width, vertical spanning */}
      <div
        className="absolute left-0 top-0 h-full w-1/3 flex items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div className="text-center px-4">
          <h1
            className="text-white font-bold text-4xl md:text-5xl lg:text-6xl uppercase font-mongolian"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              lineHeight: "1.2",
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </h1>

          {description && (
            <p
              className="text-white text-lg md:text-xl mt-4 font-mongolian"
              style={{
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                lineHeight: "1.4",
              }}
            >
              {description}
            </p>
          )}

          {showButton && (
            <div className="mt-6">
              <a
                href={buttonHref}
                className="inline-block px-6 py-3 bg-yellow-400 text-black font-bold uppercase hover:bg-yellow-300 transition-colors font-mongolian"
              >
                {buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
