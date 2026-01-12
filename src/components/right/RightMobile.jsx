import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import RightSwiper from "./RightSwiper";
import { useState, useEffect } from "react";
import Fetcher, { buildFetcherUrl } from "@/utils/fetcher";
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

      // Use buildFetcherUrl to include locale parameters
      const fetchRequests = [
        Fetcher(
          buildFetcherUrl("/lessons", {
            populate: "deep",
            "sort[publishedAt]": "desc",
          })
        ).catch(() => ({
          data: [],
        })),
        Fetcher(
          buildFetcherUrl("/online-lessons", {
            populate: "deep",
            "sort[publishedAt]": "desc",
          })
        ).catch(() => ({ data: [] })),
        Fetcher(
          buildFetcherUrl("/libraries", {
            populate: "deep",
            "sort[publishedAt]": "desc",
          })
        ).catch(() => ({ data: [] })),
        Fetcher(
          buildFetcherUrl("/videos", {
            populate: "deep",
            "sort[publishedAt]": "desc",
          })
        ).catch(() => ({
          data: [],
        })),
        Fetcher(
          buildFetcherUrl("/podcasts", {
            populate: "deep",
            "sort[publishedAt]": "desc",
          })
        ).catch(() => ({
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
            "ᠪᠢᠳᠡ ᠪᠦᢈᠦ ᠨᠠᠰᠤᠨ ᠤ᠋ ᢈᠦᠮᠦᠰ ᠲᠦ ᠵᠣᠷᠢᠭᠤᠯᠤᠭᠰᠠᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠤ᠋ᠨ ᠮᠠᠲ᠋ᠧᠷᠢᠠᠯ ᠪᠡᠯᠡᠳᢈᠡᠵᠦ᠂ ᠨᠡᠶᠢᢉᠡᠮ ᠳ᠋ᠡᢈᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠲᠡᠮᠡᠴᠡᢉᠴᠢᠳ ᠲᠦ ᠲᠤᠰᠠᠯᠠᠬᠤ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠭᠠᠷ ᠤ᠋ᠨ ᠠᠪᠤᠯᠭ᠎ᠠ᠂ ᠸᠢᠳᠧᠣ᠋ ᠪᠢᠴᠢᠯᢉᠡ ᠶ᠋ᠢ ᠪᠡᠯᠡᠳᢈᠡᠳᠡᢉ᠃  ᠵᠢᠱᠢᠶᠡᠯᠡᠪᠡᠯ᠂ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠣᠨ᠋ᠯᠠᠶᠢᠨ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠲᠠᠨ ᠳ᠋ᠤ ᠭᠣᠣᠯ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠤ᠋ᠳ ᠪᠣᠯᠤᠨ ᠲᠡᠦᢈᠡ ᠶ᠋ᠢᠨ ᠲᠠᠯᠠᠭᠠᠷᢈᠢ ᠣᠶᠢᠯᠠᠭᠠᠯᠲᠠ ᠶ᠋ᠢ ᢉᠦᠨᠵᠡᢉᠡᠶᠢᠷᠡᢉᠦᠯᢈᠦ ᠳ᠋ᠦ ᠲᠤᠰᠠᠯᠠᠨ᠎ᠠ᠃  ᠮᠠᠨ ᠤ᠋ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ᠂ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠨᠥᢉᠡᠴᠡ ᠶ᠋ᠢᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠢᠯᠡᢉᠦᠦ ᠶᠡᢈᠡ ᠶ᠋ᠢ ᠮᠡᠳᠡᠵᠦ ᠠᠪᠤᠭᠠᠷᠠᠢ᠃",
          sectionTitle: "ᠣᠨᠴᠠᠯᠠᠬᠤ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ",
          data: lessons,
        },
        {
          id: 2,
          title: "ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ:",
          description:
            "ᠮᠣᠩᠭᠣᠯ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠒᠐ ᠭᠠᠷᠤᠢ ᠣᠷᠤᠨ ᠤ᠋ ᢈᠡᠯᠡ ᠳᠡᢉᠡᠷ᠎ᠡ ᠰᠤᠳᠤᠯᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠢ᠋ ᠰᠠᠨᠠᠯ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃  ᠤᠭ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠨᠢ ᠦᠨ᠎ᠡ ᠲᠥᠯᠦᠪᠦᠷᠢ ᠦᢉᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠠ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠲ ᠲᠦ ᠬᠣᠯᠪᠤᠭᠳᠠᠭᠰᠠᠨ ᠪᠠᠶᠢᠬᠤ ᠳ᠋ᠤ ᠯᠠ ᠬᠠᠩᠭᠠᠯᠲᠠᠲᠠᠢ᠃  ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠦᠷᢉᠦᠯᠵᠢᠯᠡᢈᠦ ᠬᠤᠭᠤᠴᠠᠭᠠᠨ ᠠ᠋ᠴᠠ ᠬᠠᠮᠢᠶᠠᠷᠴᠤ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠣᠯᠭᠤᠨ᠎ᠠ᠃",
          sectionTitle: "ᠣᠨᠴᠠᠯᠠᠬᠤ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ",
          data: onlineLessons,
        },
        {
          id: 3,
          title: "ᠨᠣᠮ ᠤ᠋ᠨ ᠰᠠᠩ:",
          description:
            "ᠲᠠ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠡᠯ ᠡᠴᠡ ᠡᠷᢈᠢᠯᠡᠨ ᠭᠠᠷᠭᠠᠭᠰᠠᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠣᠯᠠᠨ ᠨᠣᠮ ᠲᠣᠪᢈᠢᠮᠠᠯ᠂ ᠰᠤᠳᠤᠯᠭ᠎ᠠ᠂ ᠭᠠᠷ ᠤ᠋ᠨ ᠠᠪᠤᠯᠭ᠎ᠠ᠂ ᠲᠠᠶᠢᠯᠤᠨ ᠠ᠋ᠴᠠ ᢈᠦᠰᠡᢉᠰᠡᠨ ᠢ᠋ᠶᠡᠷ ᠢ᠋ᠶᠡᠨ ᠦᠵᠡᠵᠦ ᠰᠤᠳᠤᠯᠵᠤ ᠥᠪᠡᠷ ᠢ᠋ ᠪᠡᠨ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠳᠠᠭ ᢈᠦᠮᠦᠨ ᠪᠣᠯᠬᠤ ᠳ᠋ᠤ ᠲᠤᠰᠠᠯᠠᠭᠠᠷᠠᠢ᠃",
          sectionTitle: "ᠣᠨᠴᠠᠯᠠᠬᠤ ᠨᠣᠮ ᠲᠣᠪᢈᠢᠮᠠᠯ ᠤ᠋ᠳ",
          data: libraries,
        },
        {
          id: 4,
          title: "ᠸᠢᠳᠧᠣ᠋:",
          description:
            "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠮᠡᠳᠡᠯᢉᠡ ᠣᠯᠭᠤᠬᠤ ᠪᠢᠴᠢᠯ ᠸᠢᠳᠧᠣ᠋᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᢈᠢᠴᠢᠶᠡᠯ ᠦ᠋ᠳ᠂ ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠰᠢᠯ ᠤ᠋ᠨ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠳᠠᠭ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠲᠣᠶᠢᠮᠤ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠵᠡᠷᢉᠡ ᠶ᠋ᠢ ᠳᠠᠷᠠᠭᠠᢈᠢ ᠴᠠᢈᠢᠮ ᠸᠢᠳᠧᠣ᠋ ᠰᠠᠩ ᠠ᠋ᠴᠠ ᢈᠦᠯᠢᠶᠡᠨ ᠠᠪᠴᠤ ᠦᠵᠡᠨ᠎ᠡ ᠦᠦ᠃",
          sectionTitle: "ᠣᠨᠴᠠᠯᠠᠬᠤ ᠸᠢᠳᠧᠤᠨ ᠨᠤᠭᠤᠳ",
          data: videos,
        },
        {
          id: 5,
          title: "ᠫᠣᠳ᠋ᠻᠠᠰᠲ:",
          description:
            "ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯᠡ ᠶ᠋ᠢᠨ ᠢᠳᠡᠪᢈᠢᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᢈᠥᠲᠦᠯᠦᠨ ᠶᠠᠪᠤᠭᠤᠯᠳᠠᠭ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠤᠬᠠᠢ ᠰᠢᠨᠡᠯᠢᢉ ᠮᠡᠳᠡᢉᠡ᠂ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ᠂ ᠰᠣᠨᠢᠷᠬᠠᠯᠲᠠᠢ ᠵᠣᠴᠢᠳ ᠲᠠᠢ ᠶᠠᠷᠢᠯᠴᠠᠵᠤ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠣᠯᠭᠠᠬᠤ ᠫᠣᠳᠠᠰᠲ ᠤ᠋ᠳ",
          sectionTitle: "ᠣᠨᠴᠠᠯᠠᠬᠤ ᠫᠣᠳ᠋ᠻᠠᠰᠲ ᠤ᠋ᠳ",
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
        image="/mng/images/div.png"
        alt="Rights Page Header"
        width="100%"
        title="ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶ᠎ᠡ"
      />
      <div className="h-full p-4">
        <div className="h-full flex flex-col gap-7">
          <div className="flex gap-2 max-h-[200px] overflow-x-auto">
            <h1
              className="text-xs font-bold"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶ᠎ᠡ
            </h1>
            <p
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠮᠥᠨ ᠪᠢᠳᠡ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯᠦ ᠶ᠋ᠢᠨ ᠵᠠᠢ ᠶ᠋ᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠢ᠋
              ᠲᠠ ᠪᠦᢈᠦᠨ ᠳ᠋ᠦ ᠪᠡᠨ ᢈᠦᠷᢉᠡᠵᠦ ᠪᠠᠶᠢᠨ᠎ᠠ᠃
            </p>
            <p
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr" }}
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
              style={{ writingMode: "vertical-lr" }}
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
