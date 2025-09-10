import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import RightSwiper from "./RightSwiper";
import { useState, useEffect } from "react";
import Fetcher from "@/utils/fetcher";
import StaticHeader from "../common/StaticHeader";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function RightMobile() {
  const [swiperData, setSwiperData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      setLoading(true);

      // Use direct Fetcher calls like the working individual pages
      const fetchRequests = [
        Fetcher("/lessons?populate=deep&sort[publishedAt]=desc").catch(() => ({
          data: [],
        })),
        Fetcher("/online-lessons?populate=deep&sort[publishedAt]=desc").catch(
          () => ({ data: [] })
        ),
        Fetcher("/libraries?populate=deep&sort[publishedAt]=desc").catch(
          () => ({ data: [] })
        ),
        Fetcher("/videos?populate=deep&sort[publishedAt]=desc").catch(() => ({
          data: [],
        })),
        Fetcher("/podcasts?populate=deep&sort[publishedAt]=desc").catch(() => ({
          data: [],
        })),
      ];

      const [
        lessonsResponse,
        onlineLessonsResponse,
        librariesResponse,
        videosResponse,
        podcastsResponse,
      ] = await Promise.all(fetchRequests);

      // Extract data arrays (take first 6 items each)
      const lessons = (lessonsResponse?.data || []).slice(0, 6);
      const onlineLessons = (onlineLessonsResponse?.data || []).slice(0, 6);
      const libraries = (librariesResponse?.data || []).slice(0, 6);
      const videos = (videosResponse?.data || []).slice(0, 6);
      const podcasts = (podcastsResponse?.data || []).slice(0, 6);

      // Create swiper data structure (matching old knowrights page structure)
      const dynamicSwiperData = [
        {
          id: 1,
          title: "ᠰᠤᠷᠭᠠᠯᠲᠠ:",
          description:
            "ᠪᠢᠳ ᠪᠦᠬᠦ ᠨᠠᠰᠤᠨ ᠤ ᠬᠦᠮᠦᠨ ᠦ ᠵᠣᠷᠢᠯᠠᠭᠰᠠᠨ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠤᠨ ᠮᠠᠲ᠋ᠧᠷᠢᠶᠠᠯ ᠪᠡᠯᠲᠡᠭᠡᠵᠦ᠂ ᠨᠢᠶᠭᠡᠮ ᠳᠦ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠦᠯᠦᠭᠡ ᠲᠡᠮᠡᠴᠡᠯ ᠦᠳ ᠳᠦ ᠲᠤᠰᠠᠯᠠᠬᠤ ᠵᠣᠷᠢᠯᠭᠠ ᠂ ᠤᠭ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠵᠢᠨ ᠭᠠᠷᠢᠨ ᠠᠪᠤᠯᠭᠠ᠂ ᠸᠢᠳᠧᠣ ᠪᠢᠴᠢᠯᠡᠭ ᠨᠢ ᠪᠡᠯᠲᠡᠭᠡᠳᠡᠭ᠃",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ",
          data: lessons,
        },
        {
          id: 2,
          title: "ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ:",
          description:
            "ᠮᠣᠨᠭᠣᠯ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠒᠐ ᠭᠠᠷᠤᠢ ᠣᠷᠤᠨ ᠤ ᠬᠡᠯᠡ ᠳᠡᠭᠡᠷᠡ ᠰᠤᠳᠤᠯᠬᠤ ᠪᠣᠯᠣᠮᠵᠢᠲᠠᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ ᠢ ᠰᠠᠨᠠᠯ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠢᠨᠠ᠃ ᠤᠭ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ ᠨᠢ ᠦᠨᠡ ᠲᠥᠯᠦᠪᠦᠷᠢ ᠦᠭᠡᠢ ᠪᠥᠭᠡᠳ ᠲᠠ ᠢᠨᠲᠧᠷᠨᠧᠲ ᠲᠦ ᠬᠣᠯᠪᠤᠭᠠᠳ ᠪᠠᠢᠬᠤ ᠳᠤ ᠯᠠ ᠬᠠᠩᠭᠠᠯᠲᠠᠢ᠃",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ",
          data: onlineLessons,
        },
        {
          id: 3,
          title: "ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ:",
          description:
            "ᠲᠠ ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠠᠰᠢᠶᠠᠨᠠᠯ ᠡᠴᠡ ᠡᠷᠬᠢᠯᠡᠨ ᠭᠠᠷᠭᠠᠭᠰᠠᠨ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠣᠯᠠᠨ ᠨᠣᠮ ᠲᠣᠪᠴᠢᠮᠠᠯ᠂ ᠰᠤᠳᠤᠯᠭᠠ᠂ ᠭᠠᠷᠢᠨ ᠠᠪᠤᠯᠭᠠ᠂ ᠲᠠᠢᠯᠠᠩ ᠠᠴᠠ ᠬᠦᠰᠡᠭᠰᠡᠨ ᠢᠶᠠᠷ ᠢᠶᠠᠨ ᠦᠵᠡᠵᠦ ᠰᠤᠳᠤᠯᠵᠤ ᠥᠪᠡᠷ ᠢ ᠪᠡᠨ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠢ ᠡᠷᠬᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᠭ᠂ ᠡᠷᠬᠡ ᠪᠡᠨ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ᠂ ᠡᠷᠬᠡ ᠪᠡᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠳᠠᠭ ᠬᠦᠮᠦᠨ ᠪᠣᠯᠬᠤ ᠳᠤ ᠲᠤᠰᠠᠯᠠᠷᠠᠢ᠃",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠨᠣᠮ ᠲᠣᠪᠴᠢᠮᠠᠯ ᠤᠳ",
          data: libraries,
        },
        {
          id: 4,
          title: "ᠸᠢᠳᠧᠣ:",
          description:
            "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠮᠡᠳᠡᠯᠡᠯ ᠣᠯᠭᠣᠬᠤ ᠪᠢᠴᠢᠯ ᠸᠢᠳᠧᠣ᠂ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠬᠢᠴᠢᠶᠡᠯ ᠦᠳ᠂ ᠮᠣᠨᠭᠣᠯ ᠤᠨ ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠠᠰᠢᠶᠠᠨᠠᠯ ᠤᠨ ᠵᠣᠬᠢᠶᠠᠨ ᠪᠠᠢᠭᠤᠯᠠᠭᠰᠠᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ ᠲᠣᠢᠢᠮ ᠮᠡᠳᠡᠡᠯᠡᠯ ᠵᠡᠷᠭᠡ ᠶᠢ ᠳᠠᠷᠠᠭᠠᠬᠢ ᠴᠠᠬᠢᠮ ᠸᠢᠳᠧᠣ ᠰᠠᠩ ᠠᠴᠠ ᠬᠦᠯᠢᠶᠡᠨ ᠠᠪᠴᠤ ᠦᠵᠡᠨᠡ ᠦᠦ᠃",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠸᠢᠳᠧᠤ ᠨᠤᠭᠤᠳ",
          data: videos,
        },
        {
          id: 5,
          title: "ᠫᠣᠳᠺᠠᠰᠲ:",
          description:
            "ᠮᠣᠨᠭᠣᠯ ᠤᠨ ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠠᠰᠢᠶᠠᠨᠠᠯ ᠤᠨ ᠢᠳᠡᠪᠬᠢᠲᠡᠨ ᠦᠳ ᠬᠦᠲᠡᠯᠡᠨ ᠶᠠᠪᠤᠭᠤᠯᠳᠠᠭ᠂ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠤᠬᠠᠢ ᠰᠢᠨ᠎ᠡ ᠮᠡᠳᠡᠡ᠂ ᠮᠡᠳᠡᠡᠯᠡᠯ᠂ ᠰᠣᠨᠢᠷᠬᠣᠯᠲᠠᠢ ᠵᠣᠴᠢᠳᠲᠠᠢ ᠶᠠᠷᠢᠯᠴᠠᠵᠤ᠂ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠣᠯᠭᠣᠬᠤ ᠫᠣᠳᠺᠠᠰᠲ ᠤᠳ",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠫᠣᠳᠺᠠᠰᠲ ᠤᠳ",
          data: podcasts,
        },
      ];

      setSwiperData(dynamicSwiperData);
    } catch (error) {
      console.log("API failed, using empty data:", error);
      // Set empty data structure if all APIs fail
      setSwiperData([
        {
          id: 1,
          title: "ᠰᠤᠷᠭᠠᠯᠲᠠ:",
          description: "ᠰᠤᠷᠭᠠᠯᠲᠤ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ᠃",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ",
          data: [],
        },
        {
          id: 5,
          title: "ᠫᠣᠳᠺᠠᠰᠲ:",
          description: "ᠫᠣᠳᠺᠠᠰᠲ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ᠃",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠫᠣᠳᠺᠠᠰᠲ ᠤᠳ",
          data: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col sm:hidden gap-7">
      <StaticHeader
        image="/images/div.png"
        alt="Rights Page Header"
        width="100%"
        title="ᠡᠷᠬᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶᠡ"
      />
      <div className="h-full p-4">
        <div className="h-full flex flex-col gap-7">
          <div className="flex gap-2 max-h-[200px] overflow-x-auto">
            <h1
              className="text-xs font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶ᠎ᠡ
            </h1>
            <p
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠮᠥᠨ ᠪᠢᠳᠡ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯᠦ ᠶ᠋ᠢᠨ ᠵᠠᠢ ᠶ᠋ᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠢ᠋
              ᠲᠠ ᠪᠦᢈᠦᠨ ᠳ᠋ᠦ ᠪᠡᠨ ᢈᠦᠷᢉᠡᠵᠦ ᠪᠠᠶᠢᠨ᠎ᠠ᠃
            </p>
            <p
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠲᠠ "ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶ᠎ᠡ" ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ᠂ ᠮᠡᠳᠡᠯᢉᠡ ᠶ᠋ᠢᠨ
              ᠴᠠᢈᠢᠮ ᠲᠠᠯᠠᠪᠤᠷ ᠠ᠋ᠴᠠ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠰᠢ ᠡᠷᢈᠢᠯᠡᠨ ᠭᠠᠷᠭᠠᠭᠰᠠᠨ ᢈᠦᠮᠦᠨ ᠦ᠋
              ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠣᠯᠠᠨ ᠲᠣᠭᠠᠨ ᠤ᠋ ᠨᠣᠮ ᠲᠣᠪᢈᠢᠮᠠᠯ᠂ <br />
              ᠸᠢᠳᠧᠣ᠋ ᠻᠣᠨ᠋ᠲ᠋ᠧᠨ᠋ᠲ ᠠ᠋ᠴᠠ ᢈᠦᠰᠡᢉᠰᠡᠨ ᠢ᠋ᠶᠡᠷ ᠢ᠋ᠶᠡᠨ ᠦᠵᠡᠵᠦ ᠰᠤᠳᠤᠯᠵᠤ ᠥᠪᠡᠷ ᠢ᠋
              ᠪᠡᠨ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ
              ᠬᠠᠮᠠᠭᠠᠯᠠᠳᠠᠭ ᢈᠦᠮᠦᠨ ᠪᠣᠯᠬᠤ ᠳ᠋ᠤ <br />
              ᠲᠤᠰᠠᠯᠠᠭᠠᠷᠠᠢ᠃
            </p>
            <p
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠢ᠋ᠶᠠᠷ ᠳᠠᠮᠵᠢᠭᠤᠯᠤᠨ ᠲᠠ ᠲᠡᢉᠰᠢ ᠡᠷᢈᠡ᠂
              ᠨᠡᠷ᠎ᠡ ᢈᠦᠨᠳᠦ᠂ ᠬᠠᠷᠢᠯᠴᠠᠨ ᢈᠦᠨᠳᠦᠯᠡᠯ ᠢ᠋ ᠥᠪᠡᠷ ᠦ᠋ᠨ ᠣᠷᠴᠢᠨ ᠲᠣᠭᠤᠷᠢᠨ ᠳ᠋ᠤ᠂
              ᠨᠡᠶᠢᢉᠡᠮ ᠳ᠋ᠦ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᢈᠢᠨ ᠢ᠋ᠶᠠᠨ ᠲᠦᢉᠡᢉᠡᢈᠦ <br />
              ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠬᠠᠨᠳᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢ ᠥᠪᠡᠷ ᠲᠦ ᠪᠡᠨ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠲᠤ
              ᠲᠥᠯᠦᠪᠰᠢᢉᠦᠯᠵᠦ᠂ ᢈᠥᢉᠵᠢᢉᠦᠯᠵᠦ ᠴᠢᠳᠠᠨ᠎ᠠ᠃
            </p>
          </div>
          <div className="flex flex-col gap-7 overflow-x-auto">
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              swiperData.map((item) => (
                <RightSwiper
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  sectionTitle={item.sectionTitle}
                  data={item.data}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
