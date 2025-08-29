import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import StaticHeader from "@/components/common/StaticHeader";
import Button from "@/components/common/Button";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import GridLayout from "@/components/common/GridLayout";
import apiService from "@/services/apiService";
import { getImageUrl, formatMongolianDate } from "@/utils/fetcher";

export default function CampaignDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [campaign, setCampaign] = useState(null);
  const [campaignFeatures, setCampaignFeatures] = useState([]);

  const [relatedNews, setRelatedNews] = useState([]);
  const [campaignPosts, setCampaignPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // First try to fetch by static_id, then by database ID
        let campaignData;
        try {
          const campaignById = await apiService.campaigns.getCompanyWorkById(
            id
          );
          campaignData = Array.isArray(campaignById)
            ? campaignById[0]
            : campaignById;
        } catch (err) {
          // If not found by static_id, try by database ID
          campaignData = await apiService.companyWorks.getCompanyWorkById(id);
        }

        setCampaign(campaignData);

        // Fetch campaign features if campaign found
        if (campaignData?.static_id) {
          try {
            const featuresData =
              await apiService.campaigns.getCompanyWorkFeatures(
                campaignData.static_id
              );
            setCampaignFeatures(
              Array.isArray(featuresData) ? featuresData : []
            );
          } catch (featErr) {
            console.log("No features found for campaign");
          }
        }

        // Fetch related news posts
        try {
          const newsData = await apiService.posts.getPostsList({
            pageSize: 9,
            sort: "publishedAt:desc",
          });
          const allNews = Array.isArray(newsData)
            ? newsData
            : newsData?.data || [];
          setRelatedNews(allNews);
        } catch (newsErr) {
          console.log("Could not fetch related news:", newsErr);
        }

        // Get campaign posts if available
        if (campaignData?.posts) {
          setCampaignPosts(
            Array.isArray(campaignData.posts) ? campaignData.posts : []
          );
        }
      } catch (err) {
        console.error("Error fetching campaign:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" />
      </Layout>
    );
  }

  // Error state
  if (error || !campaign) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-2xl font-bold text-red-600 mb-4"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p
              className="text-gray-600 mb-4"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠤ᠋ᠯᠠᠭ᠎ᠠ ᠦᠵᠡᠭᠳᠡᠵᠤ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </p>
            <Button
              text="ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠨᠢᠭᠤᠷ ᠳ᠋ᠤ ᠪᠤᠴᠠᠬᠤ"
              onClick={() => router.push("/campaign")}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // Get cover image - use static images like old web based on campaign ID
  const getCampaignHeaderImage = (campaignId, campaignData) => {
    // Map campaign IDs to specific static header images like old web
    const campaignHeaders = {
      1: "/images/campaign/climate/zorigton_cover.png",
      2: "/images/campaign/covers/tech.jpg",
      3: "/images/campaign/covers/eruudenshuuh.jpg",
      4: "/images/campaign/covers/oronbairtaibaih.jpg",
      5: "/images/campaign/covers/huniierhiinbolovsrol.jpg",
      6: "/images/campaign/covers/tsaaziinyal.jpg",
      7: "/images/campaign/covers/miniibiyminiierh.jpg",
      8: "/images/campaign/covers/huniighundel.jpeg",
      9: "/images/campaign/covers/ersdeldbui.jpg",
      10: "/images/campaign/covers/uuramisgal.jpg",
      11: "/images/campaign/covers/eznseCover.jpg",
      12: "/images/campaign/covers/ednse-header.jpg",
    };

    return (
      campaignHeaders[campaignId] ||
      campaignHeaders[campaignData?.static_id] ||
      "/images/campaign/header-img.png"
    );
  };

  const coverImage = getCampaignHeaderImage(id, campaign);

  // Get custom content for each campaign like old web
  const getCampaignContent = (campaignId) => {
    const campaigns = {
      1: {
        title: "ᠵᠣᠷᠢᠭᠲᠤᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ",
        video: "https://www.youtube.com/embed/rZ5xdIfk8NE?si=VjJ3F8SE1iwMVSjM",
        sections: [
          {
            title:
              "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠬᠠᠮᠢᠶᠠᠯᠠᠭᠴᠢ ᠶᠢ ᠬᠠᠮᠢᠶᠠᠯᠠᠬᠤ ᠵᠣᠷᠢᠭᠲᠤᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ",
            content:
              "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠬᠠᠮᠢᠶᠠᠯᠠᠭᠴᠢ ᠶᠢ ᠭᠦᠵᠢᠷᠳᠡᠵᠦ᠂ ᠭᠦᠲᠠᠨ ᠳᠤᠷᠤᠮᠵᠢᠯᠠᠵᠦ᠂ ᠬᠣᠷᠢᠵᠦ ᠵᠠᠷᠢᠮ ᠲᠣᠬᠢᠶᠠᠯᠳᠠ ᠳᠡᠭᠡᠳᠦ ᠲᠡᠳᠡᠨᠢ ᠠᠮᠢ ᠡᠷᠰᠢᠳᠡᠵᠦ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠪᠢᠳ ᠦᠦᠨᠢ ᠲᠠᠰᠯᠠᠨ ᠵᠣᠭᠰᠤᠬᠤ ᠶᠢᠨ ᠡᠰᠦᠷᠭᠦ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠶᠠᠪᠤᠯᠳᠠᠭ᠃",
          },
          {
            title: "ᠬᠤᠪᠢ ᠬᠦᠮᠦᠨ ᠦ ᠬᠡᠷᠡᠭ",
            content:
              "ᠲᠥᠷᠦ ᠶᠢᠨ ᠨᠡᠷ᠎ᠡ ᠪᠠᠷᠢᠰᠠᠨ ᠡᠷᠬ᠎ᠡ ᠮᠡᠳᠡᠯ ᠪᠦᠬᠦᠢ ᠡᠲᠭᠡᠳᠦ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠲᠡᠮᠰᠡᠬᠦᠯ ᠵᠤᠷᠢᠭᠯᠠᠭᠰᠠᠨ ᠬᠦᠮᠦᠨ᠂ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠬᠠᠮᠢᠶᠠᠯᠠᠭᠴᠢ ᠶᠢ ᠠᠢᠯᠭᠠᠨ ᠰᠦᠷᠳᠦᠦᠯᠵᠦ᠂ ᠵᠠᠨᠠᠯᠬᠢᠶᠠᠯᠵᠦ᠂ ᠭᠦᠲᠭᠡᠵᠦ᠂ ᠳᠠᠷᠠᠮᠲ᠎ᠠ ᠰᠠᠬᠠᠯᠲ᠎ᠠ ᠦᠵᠦᠦᠯᠵᠦ᠂ ᠵᠦᠢ ᠪᠦᠰᠦ ᠬᠠᠷᠢᠴᠠᠵᠦ ᠲᠦᠦᠨᠴᠢᠯᠡᠨ ᠬᠤᠤᠯᠢ ᠪᠦᠰᠠᠭᠠᠷ ᠪᠠᠷᠢᠪᠴᠢᠯᠠᠨ ᠬᠣᠷᠢᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃",
          },
          {
            title: "ᠡᠰᠦᠷᠭᠦᠴᠦ ᠡᠷ᠎ᠡ",
            content:
              "ᠳᠡᠯᠬᠢᠶ᠎ᠡ ᠳᠠᠶᠠᠭᠠᠷ ᠤᠯᠠᠨ ᠤᠷᠨᠤ ᠵᠠᠰᠠᠭ ᠤᠨ ᠭᠠᠵᠠᠷ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢᠨ ᠡᠰᠦᠷᠭᠦ ᠠᠪᠤᠵᠤ ᠶᠠᠪᠤᠭᠤᠯᠤᠵᠤ ᠪᠠᠶᠢᠭ᠎ᠠ ᠠᠷᠭ᠎ᠠ ᠬᠡᠮᠵᠢᠶᠠ ᠶᠢᠨ ᠨᠢᠭᠡ ᠬᠡᠰᠦᠭ ᠪᠣᠯᠭᠠᠨ ᠬᠦᠮᠦᠨ ᠦ ᠲᠠᠢᠪᠠᠨ ᠵᠠᠮᠠᠭᠠᠷ ᠡᠰᠦᠷᠭᠦᠴᠦ ᠡᠷ᠎ᠡ ᠶᠢ ᠤᠳᠠᠭᠠᠨ ᠬᠤᠭᠤᠴᠠᠭ᠎ᠠ ᠳᠤ ᠬᠢᠵᠠᠭᠠᠷᠯᠠᠬᠤ ᠶᠢ ᠵᠤᠷᠢᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃",
          },
        ],
      },
      2: {
        title: "ᠲᠧᠺᠨ᠋ᠣᠯᠣᠭᠢ ᠪᠠ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ",
        video: "https://www.youtube.com/embed/L9gu9P9BuUI?si=cdl53mc6mezLMCOh",
        sections: [
          {
            title:
              "ᠲᠧᠺᠨ᠋ᠣᠯᠣᠭᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢ ᠵᠥᠷᠴᠢᠬᠦ ᠰᠢᠨ᠎ᠡ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮᠤᠳ ᠢ ᠪᠢᠶ᠎ᠡ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ",
            content:
              "ᠲᠧᠺᠨ᠋ᠣᠯᠣᠭᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢ ᠵᠥᠷᠴᠢᠬᠦ ᠰᠢᠨ᠎ᠡ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮᠤᠳ ᠢ ᠪᠢᠶ᠎ᠡ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠶᠠᠯᠭᠠᠪᠠᠷᠯᠠᠨ ᠭᠠᠳᠤᠤᠷᠬᠠᠯᠲ᠎ᠠ ᠶᠢ ᠳᠡᠯᠭᠡᠷᠦᠦᠯᠵᠦ᠂ ᠵᠠᠰᠠᠭ ᠤᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠺᠣᠮᠫᠠᠨᠢᠳ ᠪᠢᠳᠨᠢ ᠬᠤᠪᠢᠶᠠᠨ ᠤᠷᠤᠨ ᠵᠠᠢ᠂ ᠬᠤᠪᠢᠶᠠᠨ ᠨᠢᠭᠤᠴ᠎ᠠ ᠳᠤ ᠬᠠᠯᠠᠳᠬᠤ ᠪᠣᠯᠣᠮᠵᠢ ᠶᠢ ᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃",
          },
        ],
      },
      6: {
        title: "ᠴᠠᠭᠠᠵᠠᠷ ᠠᠪᠬᠤ ᠶᠠᠯ ᠤᠨ ᠡᠰᠦᠷᠭᠦ",
        video: "https://www.youtube.com/embed/PkGxNZK7cQ0?si=FFZPdVM4Ll0tWedr",
        sections: [
          {
            title: "",
            content:
              "2017 ᠣᠨᠳᠤ ᠳᠡᠯᠬᠢᠶ᠎ᠡ ᠳᠠᠶᠠᠭᠠᠷ 607 ᠬᠦᠮᠦᠨ ᠲᠥᠷᠦ ᠵᠠᠰᠠᠭ᠎ᠠ ᠦᠬᠡᠬᠦ ᠶᠠᠯᠠᠭᠠᠷ ᠰᠢᠶᠢᠳᠭᠦᠦᠯᠦᠭᠰᠡᠨ᠃ ᠴᠠᠭᠠᠵᠠᠷ ᠠᠪᠬᠤ ᠶᠠᠯ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢ ᠲᠦᠢᠯ ᠤᠨ ᠪᠠᠶᠢᠳᠠᠯ ᠦᠭᠦᠢᠰᠦᠭᠡᠳᠡᠭ ᠲᠤᠯ ᠡᠮᠨᠡᠰᠲᠢ ᠢᠨᠲᠧᠷᠨ᠋ᠠᠰ᠋ᠢᠨᠠᠯ ᠨᠢ ᠪᠦᠬᠦ ᠲᠣᠬᠢᠶᠠᠯᠳᠠ ᠡᠨ᠎ᠡ ᠶᠠᠯ ᠢ ᠡᠰᠦᠷᠭᠦᠴᠦᠳᠡᠭ ᠪᠠ ᠬᠠᠯᠠᠬᠤ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃",
          },
        ],
      },
    };

    return (
      campaigns[campaignId] ||
      campaigns[campaign?.static_id] || {
        title: campaign?.title || "ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ",
        video: campaign?.video_url,
        sections: [
          {
            title: "",
            content: campaign?.description || "ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠤᠨ ᠲᠠᠢᠯᠪᠤᠷᠢ",
          },
        ],
      }
    );
  };

  const campaignContent = getCampaignContent(id);

  return (
    <Layout>
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col w-full">
        {/* Mobile Hero Section */}
        <div className="relative h-[200px] w-full flex-shrink-0">
          <Image
            src={coverImage}
            alt={campaign.title || "Campaign cover"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="p-4 text-white text-lg font-bold text-center"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {campaignContent.title}
            </h1>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex flex-col gap-6 p-4">
          {/* Campaign Content Sections - Mobile */}
          {campaignContent.sections.map((section, index) => (
            <div key={index} className="flex flex-row gap-2">
              {section.title && (
                <h2
                  className="text-xl font-bold mb-4 min-w-max"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {section.title}
                </h2>
              )}
              <div
                className="text-base text-gray-800 flex-1"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {section.content}
              </div>
            </div>
          ))}

          {/* Mobile Video */}
          {campaignContent.video && (
            <div>
              <h2
                className="text-xl font-bold mb-4"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠪᠢᠳᠢᠶᠣ
              </h2>
              <div className="w-full aspect-video relative">
                <iframe
                  width="300"
                  height="200"
                  src={campaignContent.video}
                  title="Campaign Video"
                  className="border-0 rounded w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Mobile Campaign Posts */}
          {campaignPosts && campaignPosts.length > 0 && (
            <div className="flex flex-row gap-2">
              <h2
                className="text-xl font-bold"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠬᠠᠮᠠᠭ᠎ᠠᠷᠠᠯᠲᠠᠢ ᠮᠡᠳᠡᢉᠡ
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {campaignPosts.slice(0, 3).map((post, index) => (
                  <div
                    key={post.id || index}
                    className="flex gap-4 max-h-[150px] cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => router.push(`/news/${post.id}`)}
                  >
                    <h3
                      className="text-sm font-medium line-clamp-3 mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      {post.title?.length > 40
                        ? `${post.title.substring(0, 40)}...`
                        : post.title}
                    </h3>
                    <div className="relative aspect-square w-[150px] h-[150px] flex-shrink-0">
                      <Image
                        src={getImageUrl(post.cover) || "/images/news1.png"}
                        alt={post.title || "Post image"}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Features */}
          {campaignFeatures && campaignFeatures.length > 0 && (
            <div>
              <h2
                className="text-xl font-bold mb-4"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᢈᠢᠨᠠᠷ
              </h2>
              <div className="flex flex-col gap-4">
                {campaignFeatures.map((feature, index) => (
                  <div
                    key={feature.id || index}
                    className="flex flex-col items-center gap-2"
                  >
                    {feature.image && (
                      <div className="w-16 h-16 relative">
                        <Image
                          src={
                            getImageUrl(feature.image) ||
                            "/images/campaign/feature.png"
                          }
                          alt={feature.title || "Feature image"}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <h3
                      className="text-sm font-semibold"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p
                        className="text-xs text-gray-600 text-center"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: feature.description,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="h-full p-4 hidden sm:flex gap-7 overflow-x-auto w-auto flex-shrink-0 max-h-screen min-w-screen">
        {/* Campaign Title Header */}
        <StaticHeader
          image={coverImage}
          alt="Campaign Page Header"
          width="90rem"
          title={campaignContent.title}
        />

        {/* Campaign Content Sections - Desktop */}
        {campaignContent.sections.map((section, index) => (
          <div key={index} className="flex gap-4">
            {section.title && (
              <h2
                className="text-2xl font-bold min-w-max"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {section.title}
              </h2>
            )}
            <div
              className="text-lg text-gray-800 max-w-[600px] flex-1"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {section.content}
            </div>
          </div>
        ))}

        {/* Video Section */}
        {campaignContent.video && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠪᠢᠳᠢᠶᠣ
            </h2>
            <div className="w-[570px] h-[315px] relative">
              <iframe
                width="570"
                height="315"
                src={campaignContent.video}
                title="Campaign Video"
                className="border-0 rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Campaign Features Section */}
        {campaignFeatures && campaignFeatures.length > 0 && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠶ᠋ᠢᠨ ᢈᠢᠨᠠᠷ
            </h2>
            <div className="max-h-[600px] overflow-y-auto">
              <div className="grid gap-6">
                {campaignFeatures.map((feature, index) => (
                  <div
                    key={feature.id || index}
                    className="flex gap-6 p-6 bg-gray-50 rounded-lg border"
                  >
                    {feature.image && (
                      <div className="w-32 h-32 flex-shrink-0 relative">
                        <Image
                          src={
                            getImageUrl(feature.image) ||
                            "/images/campaign/feature.png"
                          }
                          alt={feature.title || "Feature image"}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold mb-4"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        {feature.title}
                      </h3>
                      {feature.description && (
                        <div
                          className="text-base text-gray-700"
                          style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: feature.description,
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Campaign Posts Section */}
        {campaignPosts && campaignPosts.length > 0 && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠬᠠᠮᠠᠭ᠎ᠠᠷᠠᠯᠲᠠᠢ ᠮᠡᠳᠡᢉᠡ
            </h2>
            <GridLayout
              items={campaignPosts}
              basePath="/news"
              categoryButtonText="ᠮᠡᠳᠡᢉᠡ"
              emptyStateText="ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠮᠡᠳᠡᢉᠡ ᠦᠭᠡᠢ"
              getImageUrl={(item) =>
                getImageUrl(item.cover) || "/images/news1.png"
              }
              getTitle={(item) => item.title}
              itemType="news"
            />
          </div>
        )}

        {/* Related News Section */}
        {relatedNews && relatedNews.length > 0 && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠮᠡᠳᠡᢉᠡ
            </h2>
            <GridLayout
              items={relatedNews}
              basePath="/news"
              categoryButtonText="ᠮᠡᠳᠡᢉᠡ"
              emptyStateText="ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠮᠡᠳᠡᢉᠡ ᠦᠭᠡᠢ"
              getImageUrl={(item) =>
                getImageUrl(item.cover) || "/images/news1.png"
              }
              getTitle={(item) => item.title}
              itemType="news"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
