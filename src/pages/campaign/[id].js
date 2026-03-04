import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import StaticHeader from "@/components/common/StaticHeader";
import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import GridLayout from "@/components/common/GridLayout";
import apiService from "@/services/apiService";
import { getImageUrl, formatMongolianDate } from "@/utils/fetcher";
import { getCampaignHeaderImage, getCampaignContent } from "@/utils/campaignUtils";
import CampaignHeader from "@/components/campaign/CampaignHeader";
import CampaignContent from "@/components/campaign/CampaignContent";
import CampaignVideo from "@/components/campaign/CampaignVideo";
import CampaignFeatures from "@/components/campaign/CampaignFeatures";
import CampaignPosts from "@/components/campaign/CampaignPosts";


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
  const isStaticCampaign = (campaignId) => {
    const idInt = parseInt(campaignId);
    return idInt >= 1 && idInt <= 14;
  };

  if ((error || !campaign) && !isStaticCampaign(id)) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-2xl font-bold text-red-600 mb-4"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p
              className="text-gray-600 mb-4"
              style={{ writingMode: "vertical-lr" }}
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

  const coverImage = getCampaignHeaderImage(id, campaign);
  const campaignContent = getCampaignContent(id, campaign);

  return (
    <Layout>
      {/* Mobile & Tablet Layout (up to 1024px) */}
      <div className="lg:hidden flex flex-col w-full">
        {/* Mobile Hero Section */}
        <CampaignHeader coverImage={coverImage} title={campaignContent.title} isMobile />

        {/* Mobile Content */}
        <div className="flex flex-col gap-6 p-4">
          <CampaignContent sections={campaignContent.sections} isMobile />
          <CampaignVideo video={campaignContent.video} isMobile />
          <CampaignPosts posts={campaignPosts} isMobile />
          <CampaignFeatures features={campaignFeatures} isMobile />

          {/* Related News Section */}
          {relatedNews && relatedNews.length > 0 && (
            <div className="flex flex-col gap-4 w-full">
              <h2
                className="text-xl font-bold"
                style={{
                  writingMode: "vertical-lr",
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
                  getImageUrl(item.cover) || "/mng/images/news1.png"
                }
                getTitle={(item) => item.title}
                itemType="news"
              />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout (1024px and above) */}
      <div className="h-full p-4 hidden lg:flex gap-7 overflow-x-auto w-auto flex-shrink-0 max-h-screen min-w-screen">
        {/* Campaign Title Header */}
        <StaticHeader
          image={coverImage}
          alt="Campaign Page Header"
          width="90rem"
          title={campaignContent.title}
        />

        <CampaignContent sections={campaignContent.sections} />
        <CampaignVideo video={campaignContent.video} />
        <CampaignFeatures features={campaignFeatures} />
        <CampaignPosts posts={campaignPosts} />

        {/* Related News Section */}
        {relatedNews && relatedNews.length > 0 && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
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
                getImageUrl(item.cover) || "/mng/images/news1.png"
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
