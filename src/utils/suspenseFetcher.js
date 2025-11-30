/**
 * Suspense-enabled data fetching utilities
 * Works with React Suspense for modern loading states
 */

// Cache for promises to avoid duplicate requests
const promiseCache = new Map();

/**
 * Creates a suspense-compatible resource that throws a promise while loading
 * @param {Function} fetcher - Async function that fetches data
 * @param {Array} deps - Dependencies for cache key
 * @returns {Object} Resource object with read() method
 */
export function createResource(fetcher, deps = []) {
  const cacheKey = JSON.stringify(deps);

  if (!promiseCache.has(cacheKey)) {
    const promise = fetcher()
      .then((data) => {
        // Mark as resolved
        promiseCache.set(cacheKey, { status: "success", data });
        return data;
      })
      .catch((error) => {
        promiseCache.set(cacheKey, { status: "error", error });
        throw error;
      });

    promiseCache.set(cacheKey, { status: "pending", promise });
  }

  return {
    read() {
      const cached = promiseCache.get(cacheKey);

      if (!cached) {
        throw new Error("Resource not found");
      }

      switch (cached.status) {
        case "pending":
          throw cached.promise;
        case "error":
          throw cached.error;
        case "success":
          return cached.data;
        default:
          throw new Error("Unknown status");
      }
    },

    // Method to clear cache if needed
    clear() {
      promiseCache.delete(cacheKey);
    },
  };
}

/**
 * Hook for creating suspense-compatible data fetching
 * @param {Function} fetcher - Async function that fetches data
 * @param {Array} deps - Dependencies that trigger refetch
 * @returns {Object} Resource object
 */
export function useSuspenseData(fetcher, deps = []) {
  const resource = createResource(fetcher, deps);
  return resource;
}

/**
 * Utility to create suspense-compatible API calls
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Function} Suspense-compatible fetcher function
 */
export function createSuspenseFetcher(url, options = {}) {
  return () => {
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY || "70412827041a1cada9c8c234bb111c64704ef4aaf148136f19ffc25e6403f944d8ad25a2f70004eaa8a3c9167f6234676b990608bcfdfbd2d9d7da835a0327fa0b9ad93d64f9331bdfe1a362ce7f546bd3a2ff160f5e3232afc4a5a1ec6533ee07a5bfafda0aaf1126c3f476e0434e623ad50c7842cda7145df959378a4a584e"}`,
        ...options.headers,
      },
      ...options,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
}

/**
 * Wrapper for existing Fetcher utility to work with Suspense
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional options
 * @returns {Function} Suspense-compatible fetcher
 */
export function createSuspenseApiFetcher(endpoint, options = {}) {
  return () => {
    const Fetcher = require("@/utils/fetcher").default;
    return Fetcher(endpoint, options);
  };
}

/**
 * Clear all cached promises (useful for development/testing)
 */
export function clearPromiseCache() {
  promiseCache.clear();
}
