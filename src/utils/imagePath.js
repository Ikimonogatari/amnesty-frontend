/**
 * Utility function to get image path with basePath prefix
 * Ensures all image paths respect the basePath /mng
 */
export function getImagePath(path) {
  const basePath = "/mng";
  
  // If path already starts with http/https, return as is (external images)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  // If path already starts with basePath, return as is
  if (path.startsWith(basePath)) {
    return path;
  }
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  // Prepend basePath to the path
  return `${basePath}/${cleanPath}`;
}


