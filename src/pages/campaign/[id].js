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

  // Get cover image - use static images like old web based on campaign ID
  const getCampaignHeaderImage = (campaignId, campaignData) => {
    // Map campaign IDs to specific static header images like old web
    const campaignHeaders = {
      1: "/images/campaign/climate/zorigton_cover.png", // ЗОРИГТОН КАМПАНИТ АЖИЛ
      2: "/images/campaign/covers/tech.jpg", // ТЕХНОЛОГИ БА ХҮНИЙ ЭРХ
      3: "/images/campaign/covers/ersdeld_bui_000.png", // ЭРСДЭЛД БУЙ ХҮМҮҮС
      4: "/images/campaign/covers/uuramisgal.jpg", // УУР АМЬСГАЛЫН ӨӨРЧЛӨЛТ БА ХҮНИЙ ЭРХ
      5: "/images/campaign/covers/huniierhiinbolovsrol.jpg", // ХҮНИЙ ЭРХИЙН БОЛОВСРОЛ
      6: "/images/campaign/covers/tsaaziinyal.jpg", // Цаазаар авах ялын эсрэг
      7: "/images/campaign/covers/huniighundel.jpeg", // ХҮНИЙГ ХҮНДЭЛ
      8: "/images/campaign/covers/oronbairtaibaih.jpg", // ОРОН БАЙРТАЙ БАЙХ ЭРХ
      9: "/images/campaign/refugee/header-img.png", // Дүрвэгсэд ба цагаачдын эрх
      10: "/images/campaign/header-img.png", // ҮЗЭЛ БОДЛОО ЧӨЛӨӨТЭЙ ИЛЭРХИЙЛЭХ ЭРХ
      11: "/images/campaign/my-right/header-img.png", // МИНИЙ БИЕ МИНИЙ ЭРХ
      12: "/images/campaign/covers/eruudenshuuh.jpg", // ЭРҮҮДЭН ШҮҮХИЙГ ЗОГСООЁ
      13: "/images/campaign/covers/ednse-header.jpg", // ЭДИЙН ЗАСАГ, НИЙГЭМ, СОЁЛЫН ЭРХИЙН ТӨЛӨӨ
      14: "/images/campaign/my-right/header-img.png", // Хүнийг Хүндэл
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
              "ᠲᠥᠷᠦ ᠶᠢᠨ ᠨᠡᠷ᠎ᠡ ᠪᠠᠷᠢᠰᠠᠨ ᠡᠷᠬ᠎ᠡ ᠮᠡᠳᠡᠯ ᠪᠦᠬᠦᠢ ᠡᠲᠭᠡᠳ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠲᠡᠮᠴᠡᠬᠦ ᠵᠣᠷᠢᠭᠯᠠᠭᠰᠠᠨ ᠬᠦᠮᠦᠨ᠂ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠬᠠᠮᠢᠶᠠᠯᠠᠭᠴᠢ ᠶᠢ ᠠᠢᠯᠭᠠᠨ ᠰᠦᠷᠳᠦᠦᠯᠵᠦ᠂ ᠵᠠᠨᠠᠯᠬᠢᠶᠠᠯᠵᠦ᠂ ᠭᠦᠲᠭᠡᠵᠦ᠂ ᠳᠠᠷᠠᠮᠲ᠎ᠠ ᠱᠠᠬᠠᠯᠲ᠎ᠠ ᠦᠵᠦᠦᠯᠵᠦ᠂ ᠵᠦᠢ ᠪᠦᠰᠦ ᠬᠠᠷᠢᠴᠠᠵᠦ ᠲᠦᠦᠨᠴᠢᠯᠡᠨ ᠬᠤᠤᠯᠢ ᠪᠦᠰᠠᠷ ᠪᠠᠷᠢᠪᠴᠢᠯᠠᠨ ᠬᠣᠷᠢᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ 2015 ᠣᠨᠳᠤ ᠳᠡᠯᠬᠢᠶ᠎ᠡ ᠳᠠᠶᠠᠷ 156 ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠬᠠᠮᠢᠶᠠᠯᠠᠭᠴᠢ ᠬᠣᠷᠢᠬᠤ ᠭᠠᠵᠠᠷᠲ᠎ᠠ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠠᠳ ᠪᠠᠢᠳᠠᠯᠠᠷ ᠠᠮᠢ ᠨᠠᠰᠠᠭ᠎ᠠ ᠠᠯᠠᠳᠵᠠᠢ᠃",
          },
          {
            title: "ᠡᠰᠦᠷᠭᠦᠴᠦ ᠡᠷᠬ᠎ᠡ",
            content:
              "ᠳᠡᠯᠬᠢᠶ᠎ᠡ ᠳᠠᠶᠠᠷ ᠤᠯᠠᠨ ᠤᠷᠤᠨ ᠵᠠᠰᠠᠭ ᠤᠨ ᠭᠠᠵᠠᠷ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢᠨ ᠡᠰᠦᠷᠭᠦ ᠠᠪᠤᠵᠤ ᠶᠠᠪᠤᠭᠤᠯᠵᠤ ᠪᠠᠶᠢᠭ᠎ᠠ ᠠᠷᠭ᠎ᠠ ᠬᠡᠮᠵᠢᠶ᠎ᠠ ᠶᠢᠨ ᠨᠢᠭᠡ ᠬᠡᠰᠦᠭ ᠪᠣᠯᠭᠠᠨ ᠬᠦᠮᠦᠨ ᠦ ᠲᠠᠢᠪᠠᠨ ᠵᠠᠮᠠᠷ ᠡᠰᠦᠷᠭᠦᠴᠦ ᠡᠷᠬ᠎ᠡ ᠶᠢ ᠤᠳᠠᠭᠠᠨ ᠬᠤᠭᠤᠴᠠᠭ᠎ᠠ ᠳᠤ ᠬᠢᠵᠠᠭᠠᠷᠯᠠᠬᠤ ᠶᠢ ᠵᠣᠷᠢᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃",
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
              "ᠲᠧᠺᠨ᠋ᠣᠯᠣᠭᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢ ᠵᠥᠷᠴᠢᠬᠦ ᠰᠢᠨ᠎ᠡ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮᠤᠳ ᠢ ᠪᠢᠶ᠎ᠡ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠶᠠᠯᠭᠠᠪᠠᠷᠯᠠᠨ ᠭᠠᠳᠤᠤᠷᠬᠠᠯᠲ᠎ᠠ ᠶᠢ ᠳᠡᠯᠭᠡᠷᠦᠦᠯᠵᠦ᠂ ᠵᠠᠰᠠᠭ ᠤᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠺᠣᠮᠫᠠᠨᠢ ᠪᠢᠳᠨᠢ ᠬᠤᠪᠢᠶᠠᠨ ᠤᠷᠤᠨ ᠵᠠᠢ᠂ ᠬᠤᠪᠢᠶᠠᠨ ᠨᠢᠭᠤᠴ᠎ᠠ ᠳᠤ ᠬᠠᠯᠠᠳᠬᠤ ᠪᠣᠯᠣᠮᠵᠢ ᠶᠢ ᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠡᠮᠨᠢᠰᠲᠢ ᠢᠨᠲᠦᠷᠨ᠋ᠠᠰᠢᠶᠣᠨ᠋ᠠᠯ ᠲᠧᠺᠨ᠋ᠣᠯᠣᠭᠢ ᠶᠢᠨ ᠳᠡᠪᠰᠢᠯᠭ᠎ᠠ ᠶᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠠᠱᠢᠭᠯᠠᠬᠤ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠦᠦᠯᠵᠦ᠂ ᠴᠠᠬᠢᠮ ᠣᠷᠴᠢᠨ ᠳᠤ ᠡᠮᠡᠭᠲᠡᠶᠢᠴᠦᠦᠳ ᠦ ᠡᠰᠦᠷᠭᠦ ᠭᠦᠲᠠᠨ ᠳᠤᠷᠤᠮᠵᠢᠯᠠᠬᠤ ᠶᠢᠨ ᠡᠰᠦᠷᠭᠦ ᠲᠡᠮᠴᠡᠬᠦ ᠶᠢᠨ ᠵᠡᠷᠭᠡᠴᠡᠡ ᠲᠠᠨᠢ ᠬᠤᠪᠢᠶᠠᠨ ᠨᠢᠭᠤᠴ᠎ᠠ ᠬᠠᠮᠢᠶᠠᠯᠠᠬᠠᠳ ᠬᠡᠷᠡᠭ ᠪᠣᠯᠣᠬᠤ ᠵᠥᠪᠯᠥᠮᠵᠢᠦᠦᠳ ᠬᠦᠷᠭᠡᠵᠦ ᠪᠠᠶᠢᠨ᠎ᠠ᠃",
          },
        ],
      },
      3: {
        title: "ᠵᠠᠬᠢᠳᠠᠯ ᠪᠢᠴᠢᠵᠦ᠂ ᠥᠭᠡᠷᠴᠢᠯᠡᠯᠲᠡ ᠬᠢᠶᠡᠴᠡᠭᠡᠶ",
        video: "https://www.youtube.com/embed/8rCXBIpllWg",
        sections: [
          {
            title: "ᠵᠠᠬᠢᠳᠠᠯ ᠪᠢᠴᠢᠵᠦ᠂ ᠥᠭᠡᠷᠴᠢᠯᠡᠯᠲᠡ ᠬᠢᠶᠡᠴᠡᠭᠡᠶ",
            content:
              "ᠡᠮᠨᠢᠰᠲᠢ ᠢᠨᠲᠦᠷᠨ᠋ᠠᠰᠢᠶᠣᠨ᠋ᠠᠯ ᠤᠨ 'ᠡᠷᠬᠦ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠪᠢᠴᠢᠴᠢᠭᠡᠶ' ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠨᠢ ᠡᠷᠬ᠎ᠡ ᠵᠥᠷᠴᠢᠭ ᠬᠦᠮᠦᠨ ᠦ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠢ ᠥᠭᠡᠷᠴᠢᠯᠡᠬᠦ ᠬᠦᠴᠦᠲᠡᠢ᠃ ᠳᠠᠯᠠᠢ ᠳᠠᠬᠢᠨ᠎ᠠ ᠶᠠᠪᠤᠯᠳᠠᠭ ᠵᠠᠬᠢᠳᠠᠯ ᠪᠢᠴᠢᠬᠦ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠤᠨ ᠭᠣᠯ ᠦᠨᠳᠦᠰᠦ ᠨᠢ ᠡᠨ᠎ᠡ ᠶᠤᠮ᠃ ᠡᠷᠬᠦ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠪᠢᠴᠢᠴᠢᠭᠡᠶ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠶᠢᠨ ᠣᠷᠣᠯᠴᠤᠭᠴᠢ᠂ ᠳᠡᠮᠵᠢᠭᠴᠢ ᠡᠨᠡᠬᠦ ᠱᠤᠳᠠᠷᠭ᠎ᠠ ᠪᠦᠰᠦ ᠪᠠᠢᠳᠠᠯ ᠤᠨ ᠡᠰᠦᠷᠭᠦ ᠥᠭᠡᠷᠴᠢᠯᠡᠯᠲᠡ ᠬᠢᠶᠡᠬᠦ ᠬᠦᠰᠦᠯ ᠡᠷᠮᠡᠯᠵᠢᠯ ᠦᠶᠡᠷ ᠨᠡᠭᠳᠡᠳᠡᠭ᠃",
          },
        ],
      },
      4: {
        title: "ᠠᠭᠤᠤᠷ ᠠᠮᠢᠰᠭᠠᠯ ᠤᠨ ᠥᠭᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠪᠠ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ",
        video: "https://www.youtube.com/embed/hL6EGGE3hRY",
        sections: [
          {
            title: "ᠠᠭᠤᠤᠷ ᠠᠮᠢᠰᠭᠠᠯ ᠤᠨ ᠥᠭᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ",
            content:
              "ᠳᠡᠯᠬᠢᠶ᠎ᠡ ᠳᠤᠯᠠᠷᠠᠯ᠂ ᠠᠭᠤᠤᠷ ᠠᠮᠢᠰᠭᠠᠯ ᠤᠨ ᠥᠭᠡᠷᠴᠢᠯᠡᠯᠲᠡᠦᠰ ᠦᠦᠳᠰᠡᠨ ᠪᠠᠶᠢᠭᠠᠯᠢ ᠭᠠᠮᠰᠢᠭ᠂ ᠳᠠᠯᠠᠢ ᠶᠢᠨ ᠲᠥᠪᠰᠢᠨ ᠦ ᠥᠭᠡᠷᠴᠢᠯᠡᠯᠲᠡ ᠬᠦᠮᠦᠨ ᠦ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠳᠤ ᠰᠢᠦᠦᠳ ᠪᠠ ᠰᠢᠦᠦᠳ ᠪᠦᠰᠠᠷ ᠨᠥᠭᠥᠯᠡᠰᠦᠷ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠭᠠᠨ ᠭᠠᠴᠢᠭ᠂ ᠦᠢᠷ ᠤᠰᠤ ᠶᠢᠨ ᠠᠶᠤᠯ᠎ᠦᠰ ᠪᠣᠯᠵᠤ ᠬᠦᠮᠦᠨ ᠣᠷᠣᠨ ᠭᠡᠷ ᠦᠭᠡᠢ ᠪᠣᠯᠵᠤ᠂ ᠤᠷᠭᠠᠴ ᠠᠯᠠᠳᠬᠤ ᠵ᠌ᠦᠷᠦᠭᠦᠭ᠎ᠦᠷ ᠡᠳ᠋ᠦᠨ ᠵᠠᠰᠠᠭ᠂ ᠨᠢᠶᠢᠭᠡᠮ ᠦ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠳᠤ ᠨᠦ ᠨᠥᠭᠥᠯᠡᠵᠦ ᠬᠦᠮᠦᠨ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠤᠨ ᠨᠠᠳ ᠵᠠᠬᠢᠨ ᠬᠡᠷᠡᠭᠴᠦ ᠰᠢᠠᠷᠳᠯᠠᠭ᠎ᠠ ᠬᠠᠩᠭᠠᠵᠤ ᠴᠢᠳᠠᠬᠤᠭᠦᠢ ᠳᠤ ᠬᠦᠷᠳᠡᠭ᠃ ᠢᠮᠯ᠎ᠡ ᠠᠭᠤᠤᠷ ᠠᠮᠢᠰᠭᠠᠯ ᠤᠨ ᠥᠭᠡᠷᠴᠢᠯᠡᠯᠲᠡ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠠᠮᠢᠳ ᠶᠠᠪᠬᠤ᠂ ᠡᠷᠦᠯ ᠠᠮᠢᠳᠷᠠᠬᠤ ᠪᠣᠯᠤᠨ ᠬᠤᠤᠯ ᠬᠦᠨᠰ᠂ ᠤᠨᠳᠤ ᠤᠰ᠂ ᠣᠷᠣᠨ ᠪᠠᠢᠷᠠᠷ ᠬᠠᠩᠭᠠᠳᠠᠬᠤ ᠡᠷᠬᠲᠡᠢ ᠰᠢᠦᠦᠳ ᠬᠣᠯᠪᠤᠭᠠᠨ᠃",
          },
        ],
      },
      5: {
        title: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ",
        video: "",
        sections: [
          {
            title: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ",
            content:
              "ᠲᠠ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠠᠷ ᠳᠠᠮᠵᠢᠭᠤᠯᠤᠨ ᠲᠡᠭᠰᠢ ᠡᠷᠬ᠎ᠡ᠂ ᠨᠡᠷ᠎ᠡ ᠬᠦᠨᠳᠦ᠂ ᠬᠠᠷᠢᠯᠴᠠᠨ ᠬᠦᠨᠳᠦᠯᠡᠯ ᠢ ᠥᠪᠡᠷᠲᠡᠭᠡᠨ ᠤᠷᠤᠨ ᠲᠠᠶᠢᠷᠤᠨᠳ᠂ ᠨᠢᠶᠢᠭᠡᠮᠳᠦ᠂ ᠳᠡᠯᠬᠢᠶ᠎ᠡ ᠳᠠᠬᠢᠨ᠎ᠠ ᠲᠦᠭᠡᠡᠬᠦ ᠤᠷ ᠴᠠᠳᠪᠠᠷ ᠬᠠᠨᠳᠯᠠᠭ᠎ᠠ ᠶᠢ ᠥᠪᠡᠷᠲᠡᠭᠡᠨ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠳᠠᠳ ᠲᠥᠯᠥᠪᠰᠦᠯᠵᠦ᠂ ᠬᠥᠭᠵᠢᠭᠦᠯᠵᠦ ᠴᠢᠳᠠᠨ᠎ᠠ᠃",
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
              "2017 ᠣᠨᠳᠤ ᠳᠡᠯᠬᠢᠶ᠎ᠡ ᠳᠠᠶᠠᠭᠠᠷ 607 ᠬᠦᠮᠦᠨ ᠲᠥᠷᠦ ᠵᠠᠰᠠᠭ᠎ᠠ ᠦᠬᠡᠬᠦ ᠶᠠᠯᠠᠭᠠᠷ ᠰᠢᠶᠢᠳᠭᠦᠦᠯᠦᠭᠰᠡᠨ᠃ ᠬᠢᠲᠠᠳ ᠪᠠ ᠬᠣᠢ ᠰᠣᠯᠣᠩᠭᠣᠰ ᠭᠦᠶᠴᠡᠲᠡᠭᠰᠡᠨ ᠲᠣᠣᠨ ᠦᠯ ᠮᠡᠳᠡᠭᠳᠡᠬ ᠦᠬᠡᠬᠦ ᠶᠠᠯᠠᠢ ᠣᠷᠣᠯᠴᠤᠯᠠᠠᠳ ᠳᠡᠭᠡᠷ᠎ᠡ ᠳᠤᠷᠤᠰᠤᠨ᠎ᠠ ᠡᠴᠡ ᠣᠯᠠᠨ ᠬᠦᠮᠦᠨ ᠦ ᠠᠮᠢᠶᠠ ᠠᠯᠠᠪᠠ᠃ ᠴᠠᠭᠠᠵᠠᠷ ᠠᠪᠬᠤ ᠶᠠᠯ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢ ᠲᠤᠢᠯ ᠤᠨ ᠪᠠᠶᠢᠳᠠᠯ ᠦᠭᠦᠢᠰᠦᠭᠡᠳ ᠲᠤᠯ ᠡᠮᠨᠡᠰᠲᠢ ᠢᠨᠲᠦᠷᠨ᠋ᠠᠰᠢᠶᠣᠨ᠋ᠠᠯ ᠨᠢ ᠪᠦᠬᠦ ᠲᠣᠬᠢᠶᠠᠯᠳᠠ ᠡᠨ᠎ᠡ ᠶᠠᠯ ᠢ ᠡᠰᠦᠷᠭᠦᠴᠦᠳᠡᠭ ᠪᠠ ᠬᠠᠯᠠᠬᠤ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃ ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠤᠨ ᠢᠬ ᠬᠤᠷᠠᠯ ᠦᠪᠡ ᠨ 2015 ᠣᠨ ᠤ 12 ᠷ ᠰᠠᠷᠠ ᠨ 3 ᠨᠥ ᠥᠳᠦᠷ ᠡᠷᠦᠦᠩ ᠦᠨ ᠬᠠᠤᠯᠢ (ᠰᠢᠨᠢᠴᠢᠯᠰᠦᠨ ᠨᠠᠢᠷᠠᠭᠤᠯᠭ᠎ᠠ) ᠪᠠᠲᠠᠯᠵᠤ 2017 ᠣᠨ ᠤ 7 ᠷ ᠰᠠᠷᠠ ᠨ 1 ᠨᠥ ᠥᠳᠦᠷ ᠡᠴᠡ ᠬᠡᠷᠡᠭᠵᠢᠵ ᠡᠴᠡᠯᠰᠨᠡᠷ ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠴᠠᠭᠠᠵᠠᠷ ᠠᠪᠬᠤ ᠶᠠᠯᠠᠢ ᠪᠦᠷᠡᠨ ᠬᠠᠯᠠᠰᠠᠨ ᠳᠡᠯᠬᠢᠶ᠎ᠡ ᠨ 105 ᠳᠠᠬᠢ ᠣᠷᠣᠨ ᠪᠣᠯᠣᠰᠣᠨ᠃",
          },
        ],
      },
      7: {
        title: "ᠬᠦᠮᠦᠨ ᠢ ᠬᠦᠨᠳᠦᠯᠡᠬᠦ",
        video: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0",
        sections: [
          {
            title:
              "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ ᠠᠶᠤᠯ ᠵᠠᠨᠠᠯᠬᠢᠶᠠᠯᠡᠯᠳᠦ ᠥᠷᠲᠡᠬᠦ ᠨᠢ ᠢᠬᠡᠰᠴᠦ ᠪᠠᠶᠢᠨᠠ",
            content:
              "ᠲᠡᠳᠡᠨᠢᠭ ᠭᠦᠵᠢᠷᠳᠦᠵᠦ᠂ ᠭᠤᠲᠠᠨ ᠳᠣᠷᠣᠮᠵᠢᠯᠠᠵᠦ᠂ ᠬᠣᠷᠢᠵᠤ ᠵᠠᠷᠢᠮ ᠲᠣᠬᠢᠶᠠᠯᠳᠠ ᠳᠡᠭᠡᠳᠦ ᠲᠡᠳᠡᠨᠢ ᠠᠮᠢ ᠡᠷᠰᠢᠳᠦᠵᠦ ᠪᠠᠶᠢᠳᠠᠭ᠃",
          },
        ],
      },
      8: {
        title: "ᠣᠷᠤᠨ ᠪᠠᠢᠷᠲᠠᠢ ᠪᠠᠶᠢᠬᠤ ᠡᠷᠬ᠎ᠡ",
        video: "https://www.youtube.com/embed/l29DlaUSPkc?si=OV77tFhrEXiDtZkV",
        sections: [
          {
            title: "ᠲᠠᠨᠢᠯᠴᠠᠭᠤᠯᠭᠠ",
            content:
              "ᠬᠦᠭᠵᠢᠯ ᠦᠨ ᠲᠦᠯᠦᠭᠦ ᠲᠦᠷᠦ ᠶᠢᠨ ᠪᠣᠳᠣᠯᠭᠠ᠂ ᠦᠶᠯ᠎ᠡ ᠠᠵᠢᠯᠯᠠᠭᠠ ᠶᠢᠨ ᠤᠯᠤᠮᠠᠰ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠵᠣᠷᠴᠢᠭᠳᠦᠬᠦ ᠶᠣᠰᠭᠦᠢ᠃ ᠲᠦᠷ ᠨᠢ ᠬᠣᠲ ᠲᠤ ᠲᠦᠯᠦᠪᠯᠦᠯᠲᠦ ᠶᠢᠨ ᠶᠠᠪᠤᠴᠠ ᠳᠤ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠵᠣᠷᠴᠢᠭᠳᠦᠬᠦ ᠦᠰ ᠤᠷᠢᠳᠴᠢᠯᠠᠨ ᠰᠦᠷᠭᠦᠢᠯᠵᠦ᠂ ᠵᠣᠷᠴᠢᠯᠲᠠᠢ ᠲᠡᠮᠴᠦᠵᠦ᠂ ᠵᠣᠷᠴᠢᠭᠳᠠᠰᠠᠨ ᠡᠷᠬᠡ ᠶᠢ ᠰᠦᠷᠭᠦᠨ ᠡᠳᠦᠯᠦᠯᠬᠦ ᠦᠦᠷᠭᠲᠡᠢ᠃ ᠭᠡᠪᠡᠴ ᠱᠠᠠᠷᠳᠤᠯᠭᠠ ᠳᠤ ᠨᠢᠢᠴᠡᠰᠦ ᠣᠷᠤᠨ ᠪᠠᠢᠷᠲᠠᠢ ᠪᠠᠶᠢᠬᠤ ᠡᠷᠬᠡ ᠬᠡᠷᠡᠭᠵᠢᠬᠦ ᠬᠠᠤᠯᠢ ᠵᠦᠢ᠂ ᠨᠢᠶᠢᠭᠡᠮ᠂ ᠡᠷᠦᠦᠨ ᠵᠠᠰᠠᠭ ᠤᠨ ᠪᠠᠲᠠᠯᠭᠠᠭᠠᠲ ᠣᠷᠴᠢᠨ ᠦᠢᠭᠦᠷ ᠳᠤᠮᠳᠠᠳᠤ ᠬᠠᠶ᠎ᠠ ᠪᠠᠶᠢᠭ ᠠ᠎ᠠ ᠠᠷᠭ᠎ᠠ ᠬᠡᠮᠵᠢᠶ᠎ᠠ ᠶᠢᠨ ᠨᠢᠭᠡ ᠬᠡᠰᠦᠭ ᠪᠣᠯᠭᠠᠨ ᠣᠯᠠᠨ ᠮᠢᠩᠭᠠᠳ ᠢᠷᠭᠡᠳ ᠦ ᠦᠨᠳᠦᠰᠦᠨ ᠬᠠᠤᠯᠢ ᠪᠠᠷ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠳᠠᠰᠠᠨ ᠡᠷᠬᠡ ᠨᠣᠴᠲᠠᠢ ᠵᠣᠷᠴᠢᠭᠳᠦᠵᠦ ᠪᠠᠶᠢᠨ᠎ᠠ᠃",
          },
        ],
      },
      9: {
        title: "ᠳᠦᠷᠪᠡᠭᠰᠡᠳ ᠪᠠ ᠴᠠᠭᠠᠭᠠᠴᠢ ᠶᠢᠨ ᠡᠷᠬ᠎ᠡ",
        video: "",
        sections: [
          {
            title: "",
            content: "ᠳᠦᠷᠪᠡᠭᠰᠡᠳ ᠪᠠ ᠴᠠᠭᠠᠭᠠᠴᠢ ᠶᠢᠨ ᠡᠷᠬ᠎ᠡ ᠶᠢᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ",
          },
        ],
      },
      10: {
        title: "ᠦᠵᠡᠯ ᠪᠣᠳᠯᠠᠭ᠎ᠠ ᠴᠥᠯᠥᠭᠡᠲᠡᠢ ᠢᠯᠡᠷᠬᠡᠢᠶᠯᠡᠬᠦ ᠡᠷᠬ᠎ᠡ",
        video: "",
        sections: [
          {
            title: "",
            content:
              "ᠦᠵᠡᠯ ᠪᠣᠳᠯᠠᠭ᠎ᠠ ᠴᠥᠯᠥᠭᠡᠲᠡᠢ ᠢᠯᠡᠷᠬᠡᠢᠶᠯᠡᠬᠦ ᠡᠷᠬ᠎ᠡ ᠶᠢᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ",
          },
        ],
      },
      11: {
        title: "ᠮᠢᠨᠦ ᠪᠢᠶ᠎ᠡ ᠮᠢᠨᠦ ᠡᠷᠬ᠎ᠡ",
        video: "",
        sections: [
          {
            title: "",
            content: "ᠮᠢᠨᠦ ᠪᠢᠶ᠎ᠡ ᠮᠢᠨᠦ ᠡᠷᠬ᠎ᠡ ᠶᠢᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ",
          },
        ],
      },
      12: {
        title: "ᠡᠷᠦᠦᠳᠡᠨ ᠰᠢᠦᠦᠬᠡᠢ ᠶᠢ ᠵᠣᠭᠰᠤᠭᠠᠶ",
        video: "https://www.youtube.com/embed/Oop4uCJJvrA?si=CcgGom2TPLbY7Jlo",
        sections: [
          {
            title: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷ᠎ᠡ ᠶᠢᠨ ᠲᠦᠭᠡᠡᠮᠡᠯ ᠲᠤᠨᠬᠠᠭᠯᠠᠯ ᠠᠷᠠᠰ",
            content:
              "'ᠬᠡᠨ ᠳ ᠢ ᠡᠷᠦᠦ ᠰᠢᠦᠦᠯᠲᠤ ᠲᠤᠯᠭᠠᠨ ᠡᠰᠬᠦ ᠬᠡᠨᠲᠡᠢ ᠢ ᠬᠡᠷᠴᠢᠭᠡᠡᠷ᠎ᠠ ᠪᠤᠶᠤ ᠬᠦᠮᠦᠨ ᠶᠣᠰᠨᠣᠰ ᠠᠳᠤᠷ ᠬᠠᠷᠢᠴᠠᠬᠳᠣᠷᠤᠨ ᠰᠢᠶᠲᠭᠡᠬ᠆ ᠶᠣᠰᠦᠯᠭᠢ' ᠰᠠᠥ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠡᠷᠦᠦᠳᠡᠨ ᠰᠢᠦᠬᠡᠢ ᠨᠢ ᠢᠬᠡᠪᠴᠡᠳ ᠬᠦᠮᠦᠨ ᠦ ᠨᠦᠳᠨᠡᠡᠰ ᠳᠠᠯᠳ ᠶᠠᠪᠠᠭᠳᠠᠭ᠃ ᠵᠠᠰᠠᠭ ᠠᠩᠭᠠᠷᠤᠤᠳ ᠢᠬᠡᠪᠴᠡᠳ ᠡᠷᠦᠦᠳᠡᠨ ᠰᠢᠦᠦᠭᠳᠰᠡᠨ ᠲᠤᠬᠠᠢ ᠭᠣᠮᠳ᠎ᠠ ᠲᠠᠲᠦᠬ ᠠᠬᠠᠭᠭᠤᠢ ᠶᠠᠭᠠᠮᠠᠭᠳᠠᠭ᠃ 1948 ᠣᠨ ᠳ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡᠨ ᠲᠦᠭᠡᠡᠮᠡᠯ ᠲᠤᠨᠬᠠᠯᠠᠯ ᠪᠠᠲᠠᠯᠭᠠᠳᠰᠠᠨᠠᠰ ᠬᠣᠢ ᠡᠷᠦᠦᠳᠡᠨ ᠰᠢᠦᠬᠡ ᠢᠭ ᠣᠯᠤᠨ ᠤᠯᠤᠰᠠᠳ ᠬᠣᠷᠢᠭᠯᠠᠰᠠᠨ᠃ 156 ᠤᠯᠤᠰ ᠡᠷᠦᠦᠳᠡᠨ ᠰᠢᠦᠬᠡᠢ ᠨ ᠡᠰᠦᠷᠭᠦ ᠣᠨᠪᠡᠨᠴᠢ ᠳ ᠨᠡᠭᠳᠡᠨ ᠣᠷᠰ ᠠᠪᠠ ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠡᠨ᠎ᠡ ᠣᠨᠪᠡᠨᠴᠢ ᠳ 2002 ᠣᠨᠳ ᠨᠡᠭᠳᠡᠨ ᠣᠷᠵᠡᠡ᠃",
          },
        ],
      },
      13: {
        title: "ᠡᠳᠦᠨ ᠵᠠᠰᠠᠭ᠂ ᠨᠢᠶᠢᠭᠡᠮ᠂ ᠰᠤᠶᠤᠯ ᠤᠨ ᠡᠷᠬ᠎ᠡ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ",
        video: "https://www.youtube.com/embed/KHuEIlRmVrc?si=il1RL9HDICTrxWf2",
        sections: [
          {
            title: "ᠲᠠᠨᠢᠯᠴᠠᠭᠤᠯᠭᠠ",
            content:
              "ᠡᠮᠨᠡᠰᠲᠢ ᠢᠨᠲᠦᠷᠨ᠋ᠠᠰᠢᠶᠣᠨ᠋ᠠᠯ ᠨᠢ ᠡᠳᠦᠨ ᠵᠠᠰᠠᠭ᠂ ᠨᠢᠶᠢᠭᠡᠮ᠂ ᠰᠤᠶᠤᠯ ᠤᠨ ᠡᠷᠬ ᠎ᠡ (ᠡᠵᠨᠰᠧ) ᠢ ᠬᠠᠮᠢᠶᠠᠯᠠᠬᠤ ᠶᠢᠨ ᠲᠦᠯᠦᠭ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠥᠷᠨᠦᠦᠯᠳᠦ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᠪᠠᠶᠢᠨᠠ᠃ ᠡᠳᠡᠡᠭᠡᠡ ᠡᠷᠬ ᠦᠦᠳ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡᠨ ᠲᠦᠭᠡᠡᠮᠡᠯ ᠲᠤᠨᠬᠠᠯᠠᠯ ᠪᠣᠯᠤᠨ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠨ ᠭᠡᠷᠡᠡᠨᠦᠦᠳ ᠢ ᠬᠠᠮᠢᠶᠠᠯᠠᠰ ᠪᠠᠶᠢᠳᠠᠭ᠃ ᠡᠳᠦᠨ ᠵᠠᠰᠠᠭ᠂ ᠨᠢᠶᠢᠭᠡᠮ᠂ ᠰᠤᠶᠤᠯ ᠤᠨ ᠡᠷᠬ ᠦᠦᠳ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠨ ᠨᠠᠰ ᠵᠠᠬᠢᠨ ᠬᠡᠷᠡᠭᠴᠦ ᠶᠢ ᠬᠠᠮᠢᠶᠠᠯᠠᠰ ᠡᠷᠬ ᠦᠦᠳ ᠶᠤᠮ᠃ ᠦᠦᠨᠳ : ᠬᠣᠯ ᠬᠦᠨᠰ᠂ ᠴᠡᠪᠡᠷ ᠤᠰ᠂ ᠠᠷᠢᠨ ᠴᠡᠪᠷᠡᠨ ᠲᠤᠶᠭᠠᠦᠯᠠᠮᡤᠲᠠᠭ᠂ ᠡᠷᠦᠯ ᠮᠡᠨᠳ ᠡᠨ ᠶᠢᠯᠴᠢᠯᠤᠩᠠᠯ᠂ ᠣᠷᠤᠨ ᠪᠠᠢᠷ᠂ ᠨᠢᠶᠢᠭᠡᠮ ᠦ ᠬᠠᠮᠢᠶᠠᠠᠯᠠᠭᠠ ᠶᠢ ᠡᠷᠬ ᠦᠦᠳ ᠪᠠᠭᠲᠠᠨ᠎ᠠ᠃ ᠲᠦᠨᠴᠢᠯᠡᠨ ᠬᠠᠷᠢᠯᠴᠠᠨ ᠬᠠᠢᠷᠠᠨ ᠬᠤᠨᠳᠤᠦ ᠡᠷᠬᠡᠦᠳ ᠤᠨ ᠬᠠᠮᠰᠠᠢᠳᠠᠯᠢ ᠨᠠᠰ ᠵᠠᠬᠢᠨ ᠬᠡᠷᠡᠭᠴဦ ᠲᠦᠩᠭᠣ ᠦᠯᠡᠠᠯᠯᠠᠯᠠᠳ᠎ᠠᠢ ᠪᠠᠲᠠᠯᠠᠭᠰᠠᠨ᠃",
          },
        ],
      },
      14: {
        title: "ᠬᠦᠮᠦᠨ ᠢ ᠬᠦᠨᠳᠦᠯᠡᠬᠦ",
        video: "",
        sections: [
          {
            title: "",
            content: "ᠬᠦᠮᠦᠨ ᠢ ᠬᠦᠨᠳᠦᠯᠡᠬᠦ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ",
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
                  }}
                >
                  {section.title}
                </h2>
              )}
              <div
                className="text-base text-gray-800 flex-1"
                style={{
                  writingMode: "vertical-lr",
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
                      }}
                    >
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p
                        className="text-xs text-gray-600 text-center"
                        style={{
                          writingMode: "vertical-lr",
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
                }}
              >
                {section.title}
              </h2>
            )}
            <div
              className="text-lg text-gray-800 max-w-[600px] flex-1"
              style={{
                writingMode: "vertical-lr",
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
                        }}
                      >
                        {feature.title}
                      </h3>
                      {feature.description && (
                        <div
                          className="text-base text-gray-700"
                          style={{
                            writingMode: "vertical-lr",
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
