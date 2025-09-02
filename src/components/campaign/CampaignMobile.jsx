import Image from "next/image";
import Button from "@/components/common/Button";
import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import SectionTitle from "@/components/common/SectionTitle";
import { useRouter } from "next/router";
import {
  useGetCompanyWorksQuery,
  useGetCompanyWorkFeaturesQuery,
} from "@/redux/services/apiService";
import { getImageUrl } from "@/config/api";
import StaticHeader from "../common/StaticHeader";
import FullScreenLoader from "../common/FullScreenLoader";

export default function CampaignMobile() {
  const router = useRouter();

  // Fetch company works for campaigns
  const {
    data: companyWorksData,
    error: companyWorksError,
    isLoading: companyWorksLoading,
  } = useGetCompanyWorksQuery({
    pageSize: 12, // Adjusted for mobile layout
    sort: "publishedAt:desc",
  });

  // Fetch campaign features
  const {
    data: featuresData,
    error: featuresError,
    isLoading: featuresLoading,
  } = useGetCompanyWorkFeaturesQuery({
    pageSize: 3, // Get 3 features for the mobile section
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
        "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠪᠣᠯ ᠪᠠᠷᠢᠮᠲᠠ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᠳᠡᢉ᠃  ᠮᠠᠨ ᠤ᠋ ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᢈᠦᠮᠦᠰ ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠦ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠦᠨᠡᠨ ᠵᠥᠪ᠂ ᢈᠥᠨᠳᠡᠯᠡᠨ ᠰᠢᠯᠭᠠᠭᠰᠠᠨ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᠳᠡᢉ᠃",
      image: "/images/campaign/211568.png",
    },
    {
      id: 2,
      title: "ᠨᠥᠯᠦᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠠᠵᠢᠯ",
      description:
        "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠪᠣᠯ ᠪᠠᠷᠢᠮᠲᠠ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᠳᠡᢉ᠃  ᠮᠠᠨ ᠤ᠋ ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᢈᠦᠮᠦᠰ ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠦ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠦᠨᠡᠨ ᠵᠥᠪ᠂ ᢈᠥᠨᠳᠡᠯᠡᠨ ᠰᠢᠯᠭᠠᠭᠰᠠᠨ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᠳᠡᢉ᠃",
      image: "/images/campaign/211450.png",
    },
    {
      id: 3,
      title: "ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ᠂ ᠠᠻᠼ",
      description:
        "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠪᠣᠯ ᠪᠠᠷᠢᠮᠲᠠ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᠳᠡᢉ᠃  ᠮᠠᠨ ᠤ᠋ ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᢈᠦᠮᠦᠰ ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠦ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠦᠨᠡᠨ ᠵᠥᠪ᠂ ᢈᠥᠨᠳᠡᠯᠡᠨ ᠰᠢᠯᠭᠠᠭᠰᠠᠨ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᠳᠡᢉ᠃",
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
      <div className="h-full flex sm:hidden flex-col items-center justify-center p-4">
        <div className="text-center text-red-600">
          <p
            className="text-sm"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full block sm:hidden">
      <StaticHeader
        image="/images/image-campaign-header.jpg"
        alt="Campaign Page Header"
        width="100%"
        title="ᠪᠢᠳᠡ ᠶᠠᠭᠤᠮ ᠬᠢᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ?"
      />

      <div className="h-full p-4 flex flex-col gap-7">
        <div className="h-full flex gap-7 max-h-[150px]">
          <h2
            className="text-xs font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠪᠢᠳᠡ ᢈᠡᠷᢈᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠶ᠋ᠢ ᢈᠢᠳᠡᢉ ᠪᠤᠢ?
          </h2>
          <div className="h-full w-full flex max-h-[150px] gap-4 overflow-x-auto">
            {changeitems.map((item) => (
              <div
                key={item.id}
                className="flex gap-2 flex-shrink-0 min-w-[220px] max-w-[220px]"
              >
                {/* Feature Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={90}
                    height={60}
                    className="object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/images/campaign/211568.png"; // fallback image
                    }}
                  />
                </div>
                {/* Title Container */}
                <div className="flex-shrink-0 w-[30px] max-h-[140px] overflow-hidden">
                  <h4
                    className="text-[10px] font-bold"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {item.title.length > 15
                      ? `${item.title.substring(0, 15)}...`
                      : item.title}
                  </h4>
                </div>
                {/* Description Container */}
                <div className="flex-1 max-h-[140px] overflow-hidden">
                  <p
                    className="text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {item.description.length > 80
                      ? `${item.description.substring(0, 80)}...`
                      : item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full flex gap-7">
          <h2
            className="text-xs font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠤ᠋ᠳ
          </h2>
          <div className="h-full grid grid-cols-5 gap-2">
            {campaignItems.slice(0, 12).map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center gap-2 border rounded p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => router.push(`/campaign/${item.id}`)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={20}
                  height={20}
                  className="min-w-5 min-h-5"
                  onError={(e) => {
                    e.target.src = "/images/about1.png"; // fallback image
                  }}
                />
                <p
                  className="text-[10px] pl-[2px] font-bold"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                  title={item.title}
                >
                  {item.title.length > 10
                    ? `${item.title.substring(0, 10)}...`
                    : item.title}
                </p>
              </div>
            ))}
            {/* Fill empty slots if we have less than 12 campaigns */}
            {Array.from({ length: Math.max(0, 12 - campaignItems.length) }).map(
              (_, index) => (
                <div
                  key={`empty-${index}`}
                  className="flex flex-col items-center justify-center gap-2 border border-gray-200 rounded p-4"
                >
                  <div className="w-[20px] h-[20px] bg-gray-200 rounded min-w-5 min-h-5"></div>
                  <p
                    className="text-[10px] pl-1 font-bold text-gray-400"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
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
