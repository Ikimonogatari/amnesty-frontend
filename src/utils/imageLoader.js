/**
 * Custom image loader for Next.js Image component
 * Ensures all images respect the basePath /mng
 * Note: When using custom loader, Next.js basePath is not automatically applied
 */
export default function imageLoader({ src, width, quality }) {
  const basePath = "/mng";
  
  // If src already starts with http/https, return as is (external images)
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  
  // If src already starts with basePath, return as is
  if (src.startsWith(basePath)) {
    return src;
  }
  
  // Handle absolute paths (starting with /)
  if (src.startsWith("/")) {
    return `${basePath}${src}`;
  }
  
  // Handle relative paths
  return `${basePath}/${src}`;
}

