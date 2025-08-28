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

  // Convert features data to changeitems format, with fallback to static data
  const changeitems =
    featuresData && featuresData.length > 0
      ? featuresData.slice(0, 3).map((feature) => ({
          id: feature.id,
          title: feature.title || "ᠰᠤᠳᠤᠯᠭ᠎ᠠ",
          description:
            feature.description ||
            feature.content ||
            "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠪᠣᠯ ᠪᠠᠷᠢᠮᠲᠠ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᠳᠡᢉ᠃",
        }))
      : [
          {
            id: 1,
            title: "ᠰᠤᠳᠤᠯᠭ᠎ᠠ",
            description:
              "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠪᠣᠯ ᠪᠠᠷᠢᠮᠲᠠ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᠳᠡᢉ᠃  ᠮᠠᠨ ᠤ᠋ ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᢈᠦᠮᠦᠰ ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠦ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠦᠨᠡᠨ ᠵᠥᠪ᠂ ᢈᠥᠨᠳᠡᠯᠡᠨ ᠰᠢᠯᠭᠠᠭᠰᠠᠨ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᠳᠡᢉ᠃",
          },
          {
            id: 2,
            title: "ᠨᠥᠯᠦᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠠᠵᠢᠯ",
            description:
              "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠪᠣᠯ ᠪᠠᠷᠢᠮᠲᠠ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᠳᠡᢉ᠃  ᠮᠠᠨ ᠤ᠋ ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᢈᠦᠮᠦᠰ ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠦ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠦᠨᠡᠨ ᠵᠥᠪ᠂ ᢈᠥᠨᠳᠡᠯᠡᠨ ᠰᠢᠯᠭᠠᠭᠰᠠᠨ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᠳᠡᢉ᠃",
          },
          {
            id: 3,
            title: "ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ᠂ ᠠᠻᠼ",
            description:
              "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠪᠣᠯ ᠪᠠᠷᠢᠮᠲᠠ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᠳᠡᢉ᠃  ᠮᠠᠨ ᠤ᠋ ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᢈᠦᠮᠦᠰ ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠦ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠦᠨᠡᠨ ᠵᠥᠪ᠂ ᢈᠥᠨᠳᠡᠯᠡᠨ ᠰᠢᠯᠭᠠᠭᠰᠠᠨ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᠳᠡᢉ᠃",
          },
        ];

  // Loading state
  if (companyWorksLoading || featuresLoading) {
    return (
      <div className="h-full hidden sm:flex gap-10 overflow-x-auto w-auto flex-shrink-0 items-center justify-center min-w-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p
            className="mt-4 text-gray-600 text-sm"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (companyWorksError && featuresError) {
    return (
      <div className="h-full hidden sm:flex gap-10 overflow-x-auto w-auto flex-shrink-0 items-center justify-center min-w-screen">
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
    <div className="h-full hidden sm:flex gap-10 w-auto flex-shrink-0 min-w-screen">
      <StaticHeader
        image="/images/campaign/header-img.png"
        alt="Campaign Page Header"
        width="90rem"
        title="ᠪᠢᠳᠡ ᠶᠠᠭᠤᠮ ᠬᠢᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ?"
      />

      <div className="h-full p-4 flex gap-32">
        <div className="h-full flex gap-10">
          <SectionTitle title={"ᠪᠢᠳᠡ ᢈᠡᠷᢈᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠶ᠋ᠢ ᢈᠢᠳᠡᢉ ᠪᠤᠢ?"} />
          <div className="h-full w-full grid grid-cols-1 grid-rows-3 gap-10">
            {changeitems.map((item) => (
              <div key={item.id} className="flex gap-5">
                <h4
                  className="text-2xl font-bold"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-sm font-bold"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {item.description}
                </p>
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
                    textOrientation: "upright",
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
