/**
 * Reusable Loading Spinner Component
 * Displays a centered spinner with vertical Mongol Bichig text
 * @param {string} size - Spinner size: 'sm' (h-16 w-16), 'md' (h-24 w-24), 'lg' (h-32 w-32)
 * @param {string} text - Loading text to display (defaults to Mongol loading text)
 * @param {string} spinnerColor - Spinner border color (defaults to gray-900)
 * @param {string} textColor - Text color (defaults to gray-600)
 * @param {boolean} fullScreen - Whether to use full screen height (defaults to true)
 */

export default function LoadingSpinner({
  size = "md",
  text = "ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...",
  spinnerColor = "border-gray-900",
  textColor = "text-gray-600",
  fullScreen = true,
}) {
  // Size configurations
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;

  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center py-8";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Spinner */}
        <div
          className={`animate-spin rounded-full border-b-2 ${spinnerColor} ${spinnerSize} mx-auto`}
        ></div>

        {/* Loading Text - Centered relative to spinner */}
        <div className="flex items-center justify-center">
          <p
            className={`${textColor} text-center leading-tight`}
            style={{
              writingMode: "vertical-lr",
              maxWidth: "120px",
              overflowWrap: "break-word",
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
