/**
 * Reusable Page Introduction Component
 * Used for desktop and mobile introduction sections across different pages
 * @param {string} title - Main title text
 * @param {string} description - Description text
 * @param {string} variant - 'desktop' or 'mobile' for different layouts
 * @param {React.ReactNode} children - Optional additional content
 */

export default function PageIntroduction({
  title,
  description,
  variant = "desktop",
  children,
}) {
  if (variant === "desktop") {
    return (
      <div className="flex-shrink-0 bg-gray-50 p-8 overflow-y-auto">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
        >
          {title}
        </h2>
        <p
          className="text-gray-700 leading-relaxed"
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
        >
          {description}
        </p>
        {children}
      </div>
    );
  }

  // Mobile variant
  return (
    <div className="mb-6 bg-gray-50 p-4 rounded-lg flex flex-row gap-2 max-h-[200px] overflow-x-auto">
      <h2
        className="text-lg font-bold mb-3"
        style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
      >
        {title}
      </h2>
      <p
        className="text-gray-700 text-sm"
        style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
      >
        {description}
      </p>
      {children}
    </div>
  );
}
