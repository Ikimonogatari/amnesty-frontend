import Image from "next/image";

export default function FullScreenLoader() {
  return (
    <>
      {/* Desktop Loader - Horizontal layout */}
      <div className="hidden md:flex fixed inset-0 bg-white z-50 items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          {/* Amnesty Logo */}
          <div className="relative w-[152px] h-[60px]">
            <Image
              src="/images/amnesty-wide-logo.png"
              alt="Amnesty International Mongolia"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Loading Animation */}
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#FFD700]"></div>
          </div>

          {/* Loading Text in Traditional Mongolian */}
          <p
            className="text-gray-600 text-lg font-medium"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              letterSpacing: "0.1em",
            }}
          >
            ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...
          </p>
        </div>
      </div>

      {/* Mobile Loader - Vertical layout */}
      <div className="flex md:hidden fixed inset-0 bg-white z-50 items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Amnesty Logo */}
          <div className="relative w-[152px] h-[60px]">
            <Image
              src="/images/amnesty-wide-logo.png"
              alt="Amnesty International Mongolia"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Loading Animation */}
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#FFD700]"></div>
          </div>

          {/* Loading Text in Traditional Mongolian - Mobile optimized */}
          <p
            className="text-gray-600 text-base font-medium text-center"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              letterSpacing: "0.05em",
            }}
          >
            ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...
          </p>
        </div>
      </div>
    </>
  );
}
