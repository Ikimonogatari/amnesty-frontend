import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import apiService from "@/services/apiService";
import { getImageUrl, formatMongolianDate } from "@/utils/fetcher";
import Button from "@/components/common/Button";
import Layout from "@/components/layout/Layout";
import RelatedItems from "@/components/common/RelatedItems";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Share2, Facebook } from "lucide-react";
import StaticHeader from "@/components/common/StaticHeader";

export default function SingleNews() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch single post
        const postData = await apiService.posts.getPostById(id);
        setPost(postData);

        // If post has featured topic, fetch related news (like old web)
        if (postData?.featured_topic?.id) {
          const relatedData = await apiService.posts.getPostsList({
            pageSize: 6,
            filters: {
              "filters[post_topics][id][$eq]": postData.featured_topic.id,
              "filters[id][$ne]": id, // Exclude current post
            },
          });
          setRecommended(relatedData?.data || []);
        } else {
          // Fallback to general recommended posts if no featured topic
          const recommendedData = await apiService.posts.getRecommendedPosts({
            limit: 6,
          });
          setRecommended(
            Array.isArray(recommendedData)
              ? recommendedData
              : recommendedData?.data || []
          );
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Wait for images to load and adjust their sizes
  useEffect(() => {
    if (!post?.body) {
      setContentReady(false);
      return;
    }

    setContentReady(false);

    let isCleanedUp = false;
    let fallbackTimer = null;
    const imageHandlers = [];

    // Function to adjust all image sizes
    const adjustAllImages = () => {
      if (isCleanedUp) return;

      try {
        const contentContainer = document.querySelector('[data-content-body]');
        if (!contentContainer) return;

        const images = contentContainer.querySelectorAll('img');
        if (images.length === 0) return;

        const isMobile = window.innerWidth < 640;
        const maxHeight = isMobile ? 400 : 500;

        // Get container dimensions
        const containerWidth = contentContainer.clientWidth || contentContainer.offsetWidth || window.innerWidth;
        const availableWidth = Math.min(containerWidth * 0.9, window.innerWidth * 0.8);

        images.forEach((img) => {
          try {
            // Skip if image doesn't have natural dimensions yet
            if (!img || !img.naturalWidth || !img.naturalHeight || img.naturalWidth === 0 || img.naturalHeight === 0) {
              return;
            }

            // Remove inline attributes that might interfere
            if (img.hasAttribute('width')) img.removeAttribute('width');
            if (img.hasAttribute('height')) img.removeAttribute('height');

            // Calculate aspect ratio
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            if (!isFinite(aspectRatio) || aspectRatio <= 0) {
              return;
            }

            // Calculate dimensions - prioritize max height
            let targetHeight = maxHeight;
            let targetWidth = targetHeight * aspectRatio;

            // If width is too large, scale down
            if (targetWidth > availableWidth && availableWidth > 0) {
              targetWidth = availableWidth;
              targetHeight = targetWidth / aspectRatio;
            }

            // Validate dimensions
            if (!isFinite(targetWidth) || !isFinite(targetHeight) || targetWidth <= 0 || targetHeight <= 0) {
              return;
            }

            // Apply styles safely
            img.style.width = `${targetWidth}px`;
            img.style.height = `${targetHeight}px`;
            img.style.maxWidth = '100%';
            img.style.maxHeight = `${maxHeight}px`;
            img.style.objectFit = 'contain';
            img.style.display = 'block';
            img.style.margin = '1.5rem auto';
            img.style.boxSizing = 'border-box';
            img.style.verticalAlign = 'middle';
            img.style.flexShrink = '0';
            img.style.flexGrow = '0';
            img.style.clear = 'both';

            // Force reflow
            void img.offsetHeight;
          } catch (err) {
            console.warn('Error adjusting image size:', err);
          }
        });

        // Force container reflow
        if (contentContainer) {
          void contentContainer.offsetHeight;
          void contentContainer.scrollHeight;
        }
      } catch (err) {
        console.warn('Error in adjustAllImages:', err);
      }
    };

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const contentContainer = document.querySelector('[data-content-body]');
      if (!contentContainer) {
        if (!isCleanedUp) {
          setContentReady(true);
        }
        return;
      }

      const images = contentContainer.querySelectorAll('img');
      if (images.length === 0) {
        if (!isCleanedUp) {
          setContentReady(true);
        }
        return;
      }

      let loadedCount = 0;
      const totalImages = images.length;

      const handleImageLoad = () => {
        if (isCleanedUp) return;
        loadedCount++;

        // Adjust sizes after each image loads
        setTimeout(() => {
          if (!isCleanedUp) {
            adjustAllImages();
          }
        }, 100);

        // When all images are loaded
        if (loadedCount === totalImages) {
          setTimeout(() => {
            if (!isCleanedUp) {
              adjustAllImages();
              setTimeout(() => {
                if (!isCleanedUp) {
                  adjustAllImages();
                  setContentReady(true);
                }
              }, 300);
            }
          }, 200);
        }
      };

      const handleImageError = () => {
        if (isCleanedUp) return;
        loadedCount++;
        if (loadedCount === totalImages) {
          setTimeout(() => {
            if (!isCleanedUp) {
              adjustAllImages();
              setContentReady(true);
            }
          }, 200);
        }
      };

      // Check each image
      images.forEach((img) => {
        try {
          if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            loadedCount++;
          } else if (img) {
            const loadHandler = () => handleImageLoad();
            const errorHandler = () => handleImageError();

            img.addEventListener('load', loadHandler, { once: true });
            img.addEventListener('error', errorHandler, { once: true });
            imageHandlers.push({ img, load: loadHandler, error: errorHandler });
          }
        } catch (err) {
          console.warn('Error setting up image listeners:', err);
          loadedCount++;
        }
      });

      // If all images are already loaded
      if (loadedCount === totalImages && !isCleanedUp) {
        setTimeout(() => {
          if (!isCleanedUp) {
            adjustAllImages();
            setTimeout(() => {
              if (!isCleanedUp) {
                adjustAllImages();
                setContentReady(true);
              }
            }, 300);
          }
        }, 200);
      }

      // Fallback timeout
      fallbackTimer = setTimeout(() => {
        if (!isCleanedUp) {
          adjustAllImages();
          setContentReady(true);
        }
      }, 3000);
    }, 150);

    return () => {
      isCleanedUp = true;
      clearTimeout(timer);
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
      imageHandlers.forEach(({ img, load, error }) => {
        try {
          if (img && load) {
            img.removeEventListener('load', load);
          }
          if (img && error) {
            img.removeEventListener('error', error);
          }
        } catch (err) {
          // Ignore cleanup errors
        }
      });
    };
  }, [post?.body]);

  // Recalculate layout when content is ready
  useEffect(() => {
    if (!contentReady) return;

    const recalculateLayout = () => {
      try {
        const contentContainer = document.querySelector('[data-content-body]');
        if (!contentContainer) return;

        const images = contentContainer.querySelectorAll('img');
        if (images.length === 0) return;

        const isMobile = window.innerWidth < 640;
        const maxHeight = isMobile ? 400 : 500;

        // Get container dimensions
        const containerWidth = contentContainer.clientWidth || contentContainer.offsetWidth || window.innerWidth;
        const availableWidth = Math.min(containerWidth * 0.9, window.innerWidth * 0.8);

        images.forEach((img) => {
          try {
            // Skip if image doesn't have natural dimensions
            if (!img || !img.naturalWidth || !img.naturalHeight || img.naturalWidth === 0 || img.naturalHeight === 0) {
              return;
            }

            // Remove inline attributes
            if (img.hasAttribute('width')) img.removeAttribute('width');
            if (img.hasAttribute('height')) img.removeAttribute('height');

            // Calculate aspect ratio
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            if (!isFinite(aspectRatio) || aspectRatio <= 0) {
              return;
            }

            // Calculate dimensions
            let targetHeight = maxHeight;
            let targetWidth = targetHeight * aspectRatio;

            // If width is too large, scale down
            if (targetWidth > availableWidth && availableWidth > 0) {
              targetWidth = availableWidth;
              targetHeight = targetWidth / aspectRatio;
            }

            // Validate dimensions
            if (!isFinite(targetWidth) || !isFinite(targetHeight) || targetWidth <= 0 || targetHeight <= 0) {
              return;
            }

            // Apply styles safely
            img.style.width = `${targetWidth}px`;
            img.style.height = `${targetHeight}px`;
            img.style.maxWidth = '100%';
            img.style.maxHeight = `${maxHeight}px`;
            img.style.objectFit = 'contain';
            img.style.display = 'block';
            img.style.margin = '1.5rem auto';
            img.style.boxSizing = 'border-box';
            img.style.verticalAlign = 'middle';
            img.style.flexShrink = '0';
            img.style.flexGrow = '0';
            img.style.clear = 'both';

            // Force reflow
            void img.offsetHeight;
          } catch (err) {
            console.warn('Error recalculating image layout:', err);
          }
        });

        // Force container reflow
        if (contentContainer) {
          void contentContainer.offsetHeight;
          void contentContainer.scrollHeight;
        }
      } catch (err) {
        console.warn('Error in recalculateLayout:', err);
      }
    };

    // Recalculate multiple times
    recalculateLayout();
    const timer1 = setTimeout(recalculateLayout, 200);
    const timer2 = setTimeout(recalculateLayout, 500);
    const timer3 = setTimeout(recalculateLayout, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [contentReady]);

  const handleShare = (platform) => {
    const url = `${window.location.origin}/news/${id}`;
    const title = post?.title || "ᠮᠡᠳᠡᢉᠡ";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "general":
        if (navigator.share) {
          navigator.share({
            title,
            url,
          });
        } else {
          navigator.clipboard.writeText(url);
          alert("ᠯᠢᠩᠺ ᠬᠤᠪᠢᠶᠠᠯᠠᠪᠠ");
        }
        break;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" />
      </Layout>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-600">
            <p
              style={{ writingMode: "vertical-lr" }}
            >
              ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ᠪᠤᠴᠠᠬᠤ
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const publishedAt = formatMongolianDate(post.publishedAt);
  const coverImage = getImageUrl(post.cover) || "/mng/images/news1.png";

  return (
    <Layout>
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col w-full">
        {/* Mobile StaticHeader */}
        <StaticHeader
          image={coverImage}
          alt={post.title}
          title={post.title}
          width="100%"
        />

        {/* Mobile Content */}
        <div className="flex flex-col gap-6 p-4">
          {/* Mobile Date and Share */}
          <div className="flex flex-row gap-2">
            <div
              className="text-lg font-semibold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {publishedAt}
            </div>
            <div className="flex gap-2">
              <button
                style={{
                  writingMode: "vertical-lr",
                }}
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-2 bg-[#385898] text-white px-2 py-2 text-xs font-semibold hover:bg-[#2d4373] transition-colors"
              >
                <Facebook size={12} />
                ᠬᠤᠪᠢᠶᠠᠯᠴᠠᠬᠤ
              </button>
              <button
                style={{
                  writingMode: "vertical-lr",
                }}
                onClick={() => handleShare("general")}
                className="flex items-center gap-2 bg-gray-600 text-white px-2 py-2 text-xs font-semibold hover:bg-gray-700 transition-colors"
              >
                <Share2 size={12} />
                ᠬᠤᠪᠢᠶᠠᠯᠠᠬᠤ
              </button>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="flex flex-row gap-2">
            {post.short_description && (
              <h2
                className="text-xl font-bold mb-4 font-mongolian max-h-[400px]"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {post.short_description}
              </h2>
            )}
            <div
              data-content-body
              className={`max-h-[400px] prose prose-lg text-base overflow-x-auto [&_img]:max-w-full [&_img]:max-h-[400px] [&_img]:h-auto [&_img]:object-contain [&_img]:block [&_img]:mx-auto [&_img]:my-4 ${!contentReady ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
              style={{
                writingMode: "vertical-lr",
                fontFamily: '"MongolianScript"!important',
              }}
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>

          {/* Mobile Topics */}
          {post.post_topics && post.post_topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.post_topics.map((topic) => (
                <span
                  key={topic.id}
                  className="bg-gray-200 px-3 py-1 text-sm text-black hover:bg-gray-300 cursor-pointer font-mongolian"
                  onClick={() => router.push(`/news?topic=${topic.slug}`)}
                >
                  {topic.title_mn || topic.title}
                </span>
              ))}
            </div>
          )}

          {/* Mobile Related News */}
          {recommended && recommended.length > 0 && (
            <RelatedItems
              items={recommended.slice(0, 6)}
              sectionTitle="ᠰᠠᠨᠠᠭᠤᠯᠬᠤ ᠮᠡᠳᠡᢉᠡ"
              primaryButtonText="ᠤᠩᠰᠢᠬᠤ"
              itemType="news"
              maxItems={6}
            />
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="h-full p-4 hidden sm:flex gap-7 overflow-x-auto w-auto">
        {/* News Title Header */}
        <StaticHeader
          image={coverImage}
          alt="News Page Header"
          width="90rem"
          title={post.title}
        />
        {/* Published Date Section */}
        <div className="flex gap-4">
          <h2
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠣᠭᠲᠠᠷᠭᠤᠯ
          </h2>
          <div className="flex flex-col justify-between">
            <div
              className="text-xl text-gray-600 mx-auto"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {publishedAt}
            </div>
            <div className="flex flex-col gap-4">
              <button
                style={{
                  writingMode: "vertical-lr",
                }}
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-2 bg-[#385898] text-white px-4 py-3 text-sm font-semibold hover:bg-[#2d4373] transition-colors"
              >
                <Facebook size={16} />
                {/* Facebook */}
              </button>
              <button
                style={{
                  writingMode: "vertical-lr",
                }}
                onClick={() => handleShare("general")}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-3 text-sm font-semibold hover:bg-gray-700 transition-colors"
              >
                <Share2 size={16} />
                {/* ᠬᠤᠪᠢᠶᠠᠯᠠᠬᠤ */}
              </button>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="flex gap-4">
          <h2
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠬᠤᠪᠢᠶᠠᠯᠠᠬᠤ
          </h2>
        </div>

        {/* Short Description Section */}
        {post.short_description && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold flex-shrink-0"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠲᠣᠪᠴᠢᠶᠠᠨ ᠲᠠᠢᠯᠪᠤᠷᠢ
            </h2>
            <div
              className="text-lg text-gray-800 font-mongolian"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {post.short_description}
            </div>
          </div>
        )}

        {/* Main Content Section */}
        <div className="flex gap-4">
          <h2
            className="text-2xl font-bold flex-shrink-0"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠠᠭᠤᠯᠭ᠎ᠠ
          </h2>
          <div
            data-content-body
            className={`prose prose-lg text-base break-words [&_img]:max-w-full [&_img]:max-h-[500px] [&_img]:h-auto [&_img]:object-contain [&_img]:block [&_img]:mx-auto [&_img]:my-4 ${!contentReady ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
            style={{
              writingMode: "vertical-lr",
              fontFamily: '"MongolianScript"!important',
            }}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>

        {/* Topics Section */}
        {post.post_topics && post.post_topics.length > 0 && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold flex-shrink-0"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠰᠡᠳᠡᠪ
            </h2>
            <div className="flex flex-col gap-2">
              {post.post_topics.map((topic) => (
                <span
                  key={topic.id}
                  style={{
                    writingMode: "vertical-lr",
                  }}
                  className="bg-gray-200 px-3 py-1 text-sm text-black hover:bg-gray-300 cursor-pointer inline-block font-mongolian"
                  onClick={() => router.push(`/news?topic=${topic.slug}`)}
                >
                  {topic.title_mn || topic.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related News Section */}
        {recommended && recommended.length > 0 && (
          <RelatedItems
            items={recommended.slice(0, 3)}
            sectionTitle="ᠰᠠᠨᠠᠭᠤᠯᠬᠤ ᠮᠡᠳᠡᢉᠡ"
            primaryButtonText="ᠤᠩᠰᠢᠬᠤ"
            itemType="news"
            maxItems={3}
          />
        )}
      </div>
    </Layout>
  );
}
