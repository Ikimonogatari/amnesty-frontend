/**
 * Example: News List Component using React Suspense
 * Demonstrates modern loading patterns with Suspense
 */

import { useMemo } from "react";
import { createSuspenseApiFetcher } from "@/utils/suspenseFetcher";
import { getImageUrl } from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";

// Suspense-enabled data fetching component
function NewsListContent({ category = null }) {
  // Create suspense-compatible fetcher
  const fetcher = useMemo(() => {
    const endpoint = category
      ? `/posts?populate=deep&sort[publishedAt]=desc&filters[post_categories][slug][$eq]=${category}&pagination[pageSize]=12`
      : `/posts?populate=deep&sort[publishedAt]=desc&pagination[pageSize]=12`;

    return createSuspenseApiFetcher(endpoint);
  }, [category]);

  // Create resource - this will throw a promise while loading
  const resource = useMemo(() => {
    const { createResource } = require("@/utils/suspenseFetcher");
    return createResource(fetcher, [category]);
  }, [fetcher, category]);

  // Read data - this will throw the promise if not ready
  const data = resource.read();

  // If we get here, data is loaded
  const posts = data?.data || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => {
        const coverImage = getImageUrl(post.cover) || "/images/news1.png";
        const formattedDate = new Date(post.publishedAt).toLocaleDateString(
          "mn-MN"
        );

        return (
          <Link
            key={post.id}
            href={`/news/${post.id}`}
            className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="p-4">
              <h3
                className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {post.title}
              </h3>
              <p
                className="text-sm text-gray-600 mb-3 line-clamp-3"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {post.short_description || post.body?.substring(0, 100) + "..."}
              </p>
              <div
                className="text-xs text-gray-500"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {formattedDate}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// Main component with Suspense wrapper
export default function SuspenseNewsList({ category = null }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2
        className="text-2xl font-bold text-gray-900 mb-8 text-center"
        style={{
          writingMode: "vertical-lr",
          textOrientation: "upright",
        }}
      >
        ᠰᠣᠨᠢᠨ ᠮᠡᠳᠡᠭᠡᠯ{category ? ` - ${category}` : ""}
      </h2>

      <NewsListContent category={category} />
    </div>
  );
}
