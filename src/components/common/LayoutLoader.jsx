/**
 * Full Screen Layout Loader Component
 * Displays Amnesty logo with styled loading animation
 * Perfect for initial app loading and major page transitions
 */

import Image from "next/image";

export default function LayoutLoader({
  logoSize = "lg",
  showText = true,
  customText = null,
  backgroundColor = "bg-white",
  logoColor = "text-blue-600"
}) {
  // Logo size configurations
  const logoSizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40"
  };

  const logoSizeClass = logoSizes[logoSize] || logoSizes.lg;

  const loadingText = customText || "ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...";

  return (
    <div className={`fixed inset-0 ${backgroundColor} flex flex-col items-center justify-center z-50`}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Amnesty Logo with Animation */}
        <div className="relative">
          {/* Pulsing background circle */}
          <div className={`absolute inset-0 ${logoSizeClass} bg-blue-100 rounded-full animate-ping opacity-20`}></div>

          {/* Main logo container */}
          <div className={`${logoSizeClass} relative flex items-center justify-center bg-white rounded-full shadow-lg border-4 border-blue-100`}>
            {/* Spinning border */}
            <div className={`${logoSizeClass} absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin`}></div>

            {/* Logo text/icon */}
            <div className={`flex items-center justify-center ${logoSizeClass} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-2xl shadow-inner`}>
              {/* Amnesty logo or icon */}
              <span className="text-white font-bold text-3xl">A</span>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        {showText && (
          <div className="flex flex-col items-center space-y-3">
            <p
              className="text-gray-700 text-lg font-medium text-center max-w-xs"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
                maxWidth: "150px",
                overflowWrap: "break-word"
              }}
            >
              {loadingText}
            </p>

            {/* Animated dots */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
