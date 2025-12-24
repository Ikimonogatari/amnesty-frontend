import Image from "next/image";
import Button from "@/components/common/Button";
import StaticHeader from "@/components/common/StaticHeader";
import SectionTitle from "@/components/common/SectionTitle";
import { useRouter } from "next/router";
import {
  useGetCompanyWorksQuery,
  useGetCompanyWorkFeaturesQuery,
} from "@/redux/services/apiService";
import { getImageUrl } from "@/config/api";

import FullScreenLoader from "../common/FullScreenLoader";

export default function CampaignDesktop() {
  const router = useRouter();

  // Fetch company works for campaigns
  const {
    data: companyWorksData,
    error: companyWorksError,
    isLoading: companyWorksLoading,
  } = useGetCompanyWorksQuery({
    pageSize: 15, // Get 15 company works for the 5x3 grid
    sort: "publishedAt:desc",
  });

  // Fetch campaign features
  const {
    data: featuresData,
    error: featuresError,
    isLoading: featuresLoading,
  } = useGetCompanyWorkFeaturesQuery({
    pageSize: 3, // Get 3 features for the left section
    sort: "publishedAt:desc",
  });

  // Convert company works data to campaign items format
  const campaignItems = companyWorksData
    ? companyWorksData
        .map((companyWork) => ({
        id: companyWork.static_id || companyWork.id, // Use static_id for routing
        title: companyWork.title || "ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ",
        image: getImageUrl(companyWork.icon) || "/mng/images/about1.png",
        description: companyWork.description || "ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠲᠠᠢᠯᠪᠤᠷᠢ",
      }))
        .sort((a, b) => {
          // Sort by id (convert to number for proper numeric sorting)
          const idA = Number(a.id) || a.id;
          const idB = Number(b.id) || b.id;
          return idA - idB;
        })
    : [];

  // Static image paths for the first 3 feature items (from old web)
  const staticFeatureImages = [
    "/mng/images/campaign/211568.png",
    "/mng/images/campaign/211450.png",
    "/mng/images/campaign/211464.png",
  ];

  // Dynamic campaign images array
  const campaignImages = [
    "/mng/images/campaign/cam1.png",
    "/mng/images/campaign/cam2.png",
    "/mng/images/campaign/childrights.png",
    "/mng/images/campaign/cam4.png",
    "/mng/images/campaign/cam5.png",
    "/mng/images/campaign/cam6.png",
    "/mng/images/campaign/cam7.png",
    "/mng/images/campaign/cam8.png",
    "/mng/images/campaign/durvegch.png",
    "/mng/images/campaign/cam10.png",
    "/mng/images/campaign/cam11.webp",
    "/mng/images/campaign/eruuden.png",
    "/mng/images/campaign/cam13.webp",
  ];

  // Convert features data to changeitems format, with fallback to static data
  const changeitems = [
    {
      id: 1,
      title: "ᠰᠤᠳᠤᠯᠭ᠎ᠠ",
      description:
        "ᠭᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᠭᠡ ᠶ᠋ᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠪᠣᠯ ᠪᠠᠷᠢᠮᠲᠠ ᠡᠴᠠ ᠡᠭᠢᠯᠡᠳᠡᠭ᠃ ᠮᠠᠨ ᠤ᠋ ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠳᠡᠯᠡᠭᠡᠢ ᠶ᠋ᠢᠨ ᠭᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠬᠦᠮᠦᠰ ᠦ᠋ᠨ ᠬᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᠭᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠦ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠦᠨᠡᠨ ᠵᠥᠪ᠂ ᠭᠥᠨᠳᠡᠯᠡᠨ ᠰᠢᠯᠭᠠᠭᠰᠠᠨ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᠭᠢᠳᠡᠭ᠃",
      image: "/mng/images/campaign/211568.png",
    },
    {
      id: 2,
      title: "ᠨᠥᠯᠦᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠠᠵᠢᠯ",
      description:
        "ᠪᠢᠳᠡ ᠳ᠋ᠦᠩ ᠰᠢᠨᠵᠢᠯᠡᢉᠡ ᠪᠡᠨ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ᠂ ᠻᠣᠮᠫᠠᠨᠢ ᠨᠤᠭᠤᠳ ᠪᠣᠯᠤᠨ ᠰᠢᠢᠳᠪᠦᠷᠢ ᠭᠠᠷᠭᠠᠭᠴᠢᠳ ᠲᠤ ᠵᠥᠪ ᠵᠦᠢᠯ ᠭᠢᢈᠦ ᠳ᠋ᠦ ᠨᠥᠯᠦᢉᠡᠯᠡᠭᠦ᠂ ᠰᠢᠬᠠᠬᠤ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠠᠰᠢᠭᠯᠠᠳᠠᠭ᠃",
      image: "/mng/images/campaign/211450.png",
    },
    {
      id: 3,
      title: "ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ᠂ ᠠᠻᠼ",
      description:
        "ᠡᠷᢉᠦᠳᠡᠯ᠂ ᠵᠠᢈᠢᠳᠠᠯ᠂ ᠡᠰᠡᠷᢉᠦᠴᠡᠯ ᠢ᠋ᠢᠡᠷ ᠳᠠᠮᠵᠢᠭᠤᠯᠤᠨ ᠳᠡᠯᠡᠭᠡᠢ ᠳᠠᠶᠠᠭᠠᠷᢈᠬ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯᠴᠢᠳ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠭᠢᠵᠦ ᠴᠢᠳᠠᠬᠤ ᠭᠦᠮᠦᠰ᠂ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠨᠤᠭᠤᠳ ᠡᠴᠠ ᠠᠷᠭ᠎ᠠ ᠭᠡᠮᠵᠢᠶ᠎ᠡ ᠠᠪᠬᠤ ᠶ᠋ᠢ ᠰᠢᠬᠠᠳᠠᠭ᠃",
      image: "/mng/images/campaign/211464.png",
    },
  ];

  // Loading state
  if (companyWorksLoading || featuresLoading) {
    return <FullScreenLoader />;
  }

  // Error state
  if (companyWorksError && featuresError) {
    return (
      <div className="h-full hidden sm:flex gap-10 overflow-x-auto w-auto flex-shrink-0 items-center justify-center min-w-screen">
        <div className="text-center text-red-600">
          <p
            className="text-sm"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full hidden sm:flex gap-10 w-auto flex-shrink-0 min-w-screen">
      <StaticHeader
        image="/mng/images/image-campaign-header.jpg"
        alt="Campaign Page Header"
        width="90rem"
        title="ᠪᠢᠳᠡ ᠶᠠᠭᠤ ᠭᠢᠳᠡᠭ ᠪᠤᠢ?"
        desc="ᠪᠢᠳᠡ ᠰᠢᠳᠤᠷᠭᠤ ᠪᠤᠰᠤ ᠶᠠᠪᠤᠳᠠᠯ ᠲᠠᠢ ᠲᠡᠮᠡᠴᠡᠵᠦ᠂ ᠭᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᠬᠡ ᠶ᠋ᠢ ᠭᠥᠭᠦᢉᠦᠯᠦᠨ ᠳᠡᠮᠵᠢᠭᠦ ᠳᠡᠯᠡᠭᠡᠢ ᠨᠡᠶᠢᠲᠡ ᠶ᠋ᠢᠨ ᠭᠥᠳᠡᠯᢉᠡᢉᠡᠨ ᠶᠠᠭᠤᠮ᠎ᠠ᠃"
      />

      <div className="h-full p-4 flex gap-32">
        <div className="h-full flex gap-10">
          <SectionTitle title={"ᠪᠢᠳᠡ ᠭᠡᠷᠭᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠶ᠋ᠢ ᠭᠢᠳᠡᠭ ᠪᠤᠢ?"} />
          <div className="h-full w-full grid grid-cols-1 grid-rows-3 gap-10">
            {changeitems.map((item) => (
              <div key={item.id} className="flex gap-5 w-full">
                {/* Feature Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={180}
                    height={120}
                    className="object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "/mng/images/campaign/211568.png"; // fallback image
                    }}
                  />
                </div>
                {/* Title Container */}
                <div className="flex-shrink-0 w-[80px] max-h-[200px] overflow-hidden">
                  <h4
                    className="text-2xl font-bold"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {item.title}
                  </h4>
                </div>
                {/* Description Container */}
                <div className="flex-1 max-h-[200px] overflow-hidden">
                  <p
                    className="text-sm font-bold"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {item.description.length > 200
                      ? `${item.description.substring(0, 200)}...`
                      : item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full flex gap-10">
          <SectionTitle title={"ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠤ᠋ᠳ"} />
          <div className="h-full grid grid-rows-3 grid-flow-col gap-[10px]">
            {campaignItems.slice(0, 13).map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center w-36 gap-5 border-2 border-black p-5 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => router.push(`/campaign/${index + 1}`)}
              >
                <Image
                  src={campaignImages[index]}
                  alt={item.title}
                  width={60}
                  height={60}
                  onError={(e) => {
                    // Use campaign images as fallback, cycling through them
                    const fallbackIndex = item.id % campaignImages.length;
                    e.target.src = campaignImages[fallbackIndex] || campaignImages[0];
                  }}
                />
                <p
                  className="text-base font-bold"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                  title={item.title}
                >
                  {item.title.length > 15
                    ? `${item.title.substring(0, 15)}...`
                    : item.title}
                </p>
              </div>
            ))}
            {/* Fill empty slots if we have less than 13 campaigns */}
            {Array.from({ length: Math.max(0, 13 - campaignItems.length) }).map(
              (_, index) => {
                // Use campaign images in rotation, starting from where we left off
                const imageIndex = (campaignItems.length + index) % campaignImages.length;
                const fallbackImage = campaignImages[0]; // Use first image as fallback
                
                return (
                <div
                    key={`empty-${index}`}
                  className="flex flex-col items-center justify-center w-36 gap-5 border-2 border-black p-5 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => router.push(`/campaign/${campaignItems.length + index + 1}`)}
                >
                  <Image
                      src={campaignImages[imageIndex]}
                    alt={"ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ"}
                    width={60}
                    height={60}
                    onError={(e) => {
                        e.target.src = fallbackImage; // fallback to first campaign image
                    }}
                  />
                  <p
                    className="text-base font-bold"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                    title={"ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ"}
                  >
                    {"ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ"}
                  </p>
                </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
