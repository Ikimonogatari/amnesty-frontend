import StaticHeader from "@/components/common/StaticHeader";
import RightSwiper from "./RightSwiper";
import { useState, useEffect } from "react";
import {
  videosService,
  librariesService,
  lessonsService,
  onlineLessonsService,
  podcastsService,
} from "@/services/apiService";

export default function RightDesktop() {
  const [swiperData, setSwiperData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      setLoading(true);

      // Fetch all content types in parallel (matching old knowrights page)
      const [lessons, onlineLessons, libraries, videos, podcasts] =
        await Promise.all([
          lessonsService.getLessons({ pageSize: 6 }),
          onlineLessonsService.getOnlineLessons({ pageSize: 6 }),
          librariesService.getLibraries({ pageSize: 6 }),
          videosService.getVideos({ pageSize: 6 }),
          podcastsService.getPodcasts({ pageSize: 6 }),
        ]);

      // Data fetched successfully

      // Create swiper data structure (matching old knowrights page structure)
      const dynamicSwiperData = [
        {
          id: 1,
          title: "ᠰᠤᠷᠭᠠᠯᠲᠠ:",
          description:
            "ᠪᠢᠳ ᠪᠦᠬᠦ ᠨᠠᠰᠤᠨ ᠤ ᠬᠦᠮᠦᠨ ᠦ ᠵᠣᠷᠢᠯᠠᠭᠰᠠᠨ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠤᠨ ᠮᠠᠲ᠋ᠧᠷᠢᠶᠠᠯ ᠪᠡᠯᠲᠡᠭᠡᠵᠦ᠂ ᠨᠢᠶᠭᠡᠮ ᠳᠦ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠦᠯᠦᠭᠡ ᠲᠡᠮᠡᠴᠡᠯ ᠦᠳ ᠳᠦ ᠲᠤᠰᠠᠯᠠᠬᠤ ᠵᠣᠷᠢᠯᠭᠠ ᠂ ᠤᠭ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠵᠢᠨ ᠭᠠᠷᠢᠨ ᠠᠪᠤᠯᠭᠠ᠂ ᠸᠢᠳᠧᠣ ᠪᠢᠴᠢᠯᠡᠭ ᠨᠢ ᠪᠡᠯᠲᠡᠭᠡᠳᠡᠭ᠃",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ",
          data: lessons || [],
        },
        {
          id: 2,
          title: "ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ:",
          description:
            "ᠮᠣᠨᠭᠣᠯ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠒᠐ ᠭᠠᠷᠤᠢ ᠣᠷᠤᠨ ᠤ ᠬᠡᠯᠡ ᠳᠡᠭᠡᠷᠡ ᠰᠤᠳᠤᠯᠬᠤ ᠪᠣᠯᠣᠮᠵᠢᠲᠠᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ ᠢ ᠰᠠᠨᠠᠯ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠢᠨᠠ᠃ ᠤᠭ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ ᠨᠢ ᠦᠨᠡ ᠲᠥᠯᠦᠪᠦᠷᠢ ᠦᠭᠡᠢ ᠪᠥᠭᠡᠳ ᠲᠠ ᠢᠨᠲᠧᠷᠨᠧᠲ ᠲᠦ ᠬᠣᠯᠪᠤᠭᠠᠳ ᠪᠠᠢᠬᠤ ᠳᠤ ᠯᠠ ᠬᠠᠩᠭᠠᠯᠲᠠᠢ᠃",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ",
          data: onlineLessons || [],
        },
        {
          id: 3,
          title: "ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ:",
          description:
            "ᠲᠠ ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠠᠰᠢᠶᠠᠨᠠᠯ ᠡᠴᠡ ᠡᠷᠬᠢᠯᠡᠨ ᠭᠠᠷᠭᠠᠭᠰᠠᠨ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠣᠯᠠᠨ ᠨᠣᠮ ᠲᠣᠪᠴᠢᠮᠠᠯ᠂ ᠰᠤᠳᠤᠯᠭᠠ᠂ ᠭᠠᠷᠢᠨ ᠠᠪᠤᠯᠭᠠ᠂ ᠲᠠᠢᠯᠠᠩ ᠠᠴᠠ ᠬᠦᠰᠡᠭᠰᠡᠨ ᠢᠶᠠᠷ ᠢᠶᠠᠨ ᠦᠵᠡᠵᠦ ᠰᠤᠳᠤᠯᠵᠤ ᠥᠪᠡᠷ ᠢ ᠪᠡᠨ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠢ ᠡᠷᠬᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᠭ᠂ ᠡᠷᠬᠡ ᠪᠡᠨ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ᠂ ᠡᠷᠬᠡ ᠪᠡᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠳᠠᠭ ᠬᠦᠮᠦᠨ ᠪᠣᠯᠬᠤ ᠳᠤ ᠲᠤᠰᠠᠯᠠᠷᠠᠢ᠃",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠨᠣᠮ ᠲᠣᠪᠴᠢᠮᠠᠯ ᠤᠳ",
          data: libraries || [],
        },
        {
          id: 4,
          title: "ᠸᠢᠳᠧᠣ:",
          description:
            "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠮᠡᠳᠡᠯᠡᠯ ᠣᠯᠭᠣᠬᠤ ᠪᠢᠴᠢᠯ ᠸᠢᠳᠧᠣ᠂ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠬᠢᠴᠢᠶᠡᠯ ᠦᠳ᠂ ᠮᠣᠨᠭᠣᠯ ᠤᠨ ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠠᠰᠢᠶᠠᠨᠠᠯ ᠤᠨ ᠵᠣᠬᠢᠶᠠᠨ ᠪᠠᠢᠭᠤᠯᠠᠭᠰᠠᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ ᠲᠣᠢᠢᠮ ᠮᠡᠳᠡᠡᠯᠡᠯ ᠵᠡᠷᠭᠡ ᠶᠢ ᠳᠠᠷᠠᠭᠠᠬᠢ ᠴᠠᠬᠢᠮ ᠸᠢᠳᠧᠣ ᠰᠠᠩ ᠠᠴᠠ ᠬᠦᠯᠢᠶᠡᠨ ᠠᠪᠴᠤ ᠦᠵᠡᠨᠡ ᠦᠦ᠃",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠸᠢᠳᠧᠤ ᠨᠤᠭᠤᠳ",
          data: videos || [],
        },
        {
          id: 5,
          title: "ᠫᠣᠳᠺᠠᠰᠲ:",
          description:
            "ᠮᠣᠨᠭᠣᠯ ᠤᠨ ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠠᠰᠢᠶᠠᠨᠠᠯ ᠤᠨ ᠢᠳᠡᠪᠬᠢᠲᠡᠨ ᠦᠳ ᠬᠦᠲᠡᠯᠡᠨ ᠶᠠᠪᠤᠭᠤᠯᠳᠠᠭ᠂ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠤᠬᠠᠢ ᠰᠢᠨ᠎ᠡ ᠮᠡᠳᠡᠡ᠂ ᠮᠡᠳᠡᠡᠯᠡᠯ᠂ ᠰᠣᠨᠢᠷᠬᠣᠯᠲᠠᠢ ᠵᠣᠴᠢᠳᠲᠠᠢ ᠶᠠᠷᠢᠯᠴᠠᠵᠤ᠂ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠣᠯᠭᠣᠬᠤ ᠫᠣᠳᠺᠠᠰᠲ ᠤᠳ",
          sectionTitle: "ᠣᠨᠴᠣᠯᠠᠬᠤ ᠫᠣᠳᠺᠠᠰᠲ ᠤᠳ",
          data: podcasts || [],
        },
      ];

      setSwiperData(dynamicSwiperData);
    } catch (error) {
      // Set empty array if API fails
      setSwiperData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full hidden sm:flex gap-10 flex-shrink-0 p-4">
      <StaticHeader
        image="/images/div.png"
        alt="Rights Page Header"
        width="100rem"
        title="ᠡᠷᠬᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶᠡ"
      />
      <div className="h-full p-4">
        <div className="h-full flex gap-10">
          <div className="flex gap-7">
            <h1
              className="text-2xl font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠡᠷᠬᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶᠡ
            </h1>
            <p
              className="text-sm font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠮᠥᠨ ᠪᠢᠳᠡ ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠧᠰᠢᠩᠯᠦ ᠶᠢᠨ ᠵᠠᠢ ᠶᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ ᠢ ᠲᠠ
              ᠪᠦᠬᠦᠨ ᠳᠦ ᠪᠡᠨ ᠬᠦᠷᠭᠡᠵᠦ ᠪᠠᠢᠨᠠ᠃
            </p>
            <p
              className="text-sm font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠲᠠ "ᠡᠷᠬᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶᠡ" ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ᠂ ᠮᠡᠳᠡᠯᠡᠯ ᠶᠢᠨ
              ᠴᠠᠬᠢᠮ ᠲᠠᠯᠠᠪᠤᠷ ᠠᠴᠠ ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠧᠰᠢ ᠡᠷᠬᠢᠯᠡᠨ ᠭᠠᠷᠭᠠᠭᠰᠠᠨ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ
              ᠶᠢᠨ ᠣᠯᠠᠨ ᠲᠣᠭᠠᠨ ᠤ ᠨᠣᠮ ᠲᠣᠪᠴᠢᠮᠠᠯ᠂ <br />
              ᠸᠢᠳᠧᠣ ᠹᠣᠨᠲᠧᠨᠲ ᠠᠴᠠ ᠬᠦᠰᠡᠭᠰᠡᠨ ᠢᠶᠠᠷ ᠢᠶᠠᠨ ᠦᠵᠡᠵᠦ ᠰᠤᠳᠤᠯᠵᠤ ᠥᠪᠡᠷ ᠢ ᠪᠡᠨ
              ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠢ ᠡᠷᠬᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᠭ᠂ ᠡᠷᠬᠡ ᠪᠡᠨ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ᠂ ᠡᠷᠬᠡ ᠪᠡᠨ
              ᠬᠠᠮᠠᠭᠠᠯᠠᠳᠠᠭ ᠬᠦᠮᠦᠨ ᠪᠣᠯᠬᠤ ᠳᠤ <br />
              ᠲᠤᠰᠠᠯᠠᠷᠠᠢ᠃
            </p>
            <p
              className="text-sm font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠢᠶᠠᠷ ᠳᠠᠮᠵᠢᠭᠤᠯᠤᠨ ᠲᠠ ᠲᠡᠭᠰᠢ ᠡᠷᠬᠡ᠂ ᠨᠡᠷᠡ
              ᠬᠦᠨᠳᠦ᠂ ᠬᠠᠷᠢᠯᠴᠠᠨ ᠬᠦᠨᠳᠦᠯᠡᠯ ᠢ ᠥᠪᠡᠷ ᠦᠨ ᠣᠷᠴᠢᠨ ᠲᠣᠭᠤᠷᠢᠨ ᠳᠤ᠂ ᠨᠢᠶᠭᠡᠮ ᠳᠦ᠂
              ᠳᠡᠯᠡᠬᠡᠢ ᠳᠠᠬᠢᠨ ᠢᠶᠠᠨ ᠲᠦᠭᠡᠭᠡᠬᠦ <br />
              ᠤᠷᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠬᠠᠨᠳᠤᠯᠭᠠ ᠶᠢ ᠥᠪᠡᠷ ᠲᠦ ᠪᠡᠨ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠲᠤ ᠲᠥᠯᠦᠪᠰᠢᠬᠦᠯᠵᠦ᠂
              ᠬᠥᠵᠢᠬᠦᠯᠵᠦ ᠴᠢᠳᠠᠨᠠ᠃
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-500">Loading content...</p>
            </div>
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
  );
}
