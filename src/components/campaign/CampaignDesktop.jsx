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
    ? companyWorksData.map((companyWork) => ({
        id: companyWork.static_id || companyWork.id, // Use static_id for routing
        title: companyWork.title || "ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ",
        image: getImageUrl(companyWork.icon) || "/images/about1.png",
        description: companyWork.description || "ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠲᠠᠢᠯᠪᠤᠷᠢ",
      }))
    : [];

  // Static image paths for the first 3 feature items (from old web)
  const staticFeatureImages = [
    "/images/campaign/211568.png",
    "/images/campaign/211450.png",
    "/images/campaign/211464.png",
  ];

  // Convert features data to changeitems format, with fallback to static data
  const changeitems = [
    {
      id: 1,
      title: "ᠰᠤᠳᠤᠯᠭ᠎ᠠ",
      description:
        "ᠭᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᠭᠡ ᠶ᠋ᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠪᠣᠯ ᠪᠠᠷᠢᠮᠲᠠ ᠡᠴᠠ ᠡᠭᠢᠯᠡᠳᠡᠭ᠃ ᠮᠠᠨ ᠤ᠋ ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠳᠡᠯᠡᠭᠡᠢ ᠶ᠋ᠢᠨ ᠭᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠬᠦᠮᠦᠰ ᠦ᠋ᠨ ᠬᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᠭᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠦ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠦᠨᠡᠨ ᠵᠥᠪ᠂ ᠭᠥᠨᠳᠡᠯᠡᠨ ᠰᠢᠯᠭᠠᠭᠰᠠᠨ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᠭᠢᠳᠡᠭ᠃",
      image: "/images/campaign/211568.png",
    },
    {
      id: 2,
      title: "ᠨᠥᠯᠦᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠠᠵᠢᠯ",
      description:
        "ᠪᠢᠳᠡ ᠳ᠋ᠦᠩ ᠰᠢᠨᠵᠢᠯᠡᢉᠡ ᠪᠡᠨ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ᠂ ᠻᠣᠮᠫᠠᠨᠢ ᠨᠤᠭᠤᠳ ᠪᠣᠯᠤᠨ ᠰᠢᠢᠳᠪᠦᠷᠢ ᠭᠠᠷᠭᠠᠭᠴᠢᠳ ᠲᠤ ᠵᠥᠪ ᠵᠦᠢᠯ ᠭᠢᢈᠦ ᠳ᠋ᠦ ᠨᠥᠯᠦᢉᠡᠯᠡᠭᠦ᠂ ᠰᠢᠬᠠᠬᠤ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠠᠰᠢᠭᠯᠠᠳᠠᠭ᠃",
      image: "/images/campaign/211450.png",
    },
    {
      id: 3,
      title: "ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ᠂ ᠠᠻᠼ",
      description:
        "ᠡᠷᢉᠦᠳᠡᠯ᠂ ᠵᠠᢈᠢᠳᠠᠯ᠂ ᠡᠰᠡᠷᢉᠦᠴᠡᠯ ᠢ᠋ᠢᠡᠷ ᠳᠠᠮᠵᠢᠭᠤᠯᠤᠨ ᠳᠡᠯᠡᠭᠡᠢ ᠳᠠᠶᠠᠭᠠᠷᢈᠬ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯᠴᠢᠳ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠭᠢᠵᠦ ᠴᠢᠳᠠᠬᠤ ᠭᠦᠮᠦᠰ᠂ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠨᠤᠭᠤᠳ ᠡᠴᠠ ᠠᠷᠭ᠎ᠠ ᠭᠡᠮᠵᠢᠶ᠎ᠡ ᠠᠪᠬᠤ ᠶ᠋ᠢ ᠰᠢᠬᠠᠳᠠᠭ᠃",
      image: "/images/campaign/211464.png",
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
        image="/images/image-campaign-header.jpg"
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
                      e.target.src = "/images/campaign/211568.png"; // fallback image
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
            {campaignItems.slice(0, 15).map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center w-36 gap-5 border-2 border-black p-5 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => router.push(`/campaign/${item.id}`)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={60}
                  height={60}
                  onError={(e) => {
                    e.target.src = "/images/about1.png"; // fallback image
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
            {/* Fill empty slots if we have less than 15 campaigns */}
            {Array.from({ length: Math.max(0, 15 - campaignItems.length) }).map(
              (_, index) => (
                <div
                  key={`empty-${index}`}
                  className="flex flex-col items-center justify-center w-36 gap-5 border border-gray-200 p-5"
                >
                  <div className="w-[60px] h-[60px] bg-gray-200 rounded"></div>
                  <p
                    className="text-gray-400 font-bold text-center"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠦᠭᠡᠢ
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
