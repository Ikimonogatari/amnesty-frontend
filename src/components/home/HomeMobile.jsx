import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";
import Image from "next/image";
import { useState, useEffect } from "react";
import apiService from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";
import { useRouter } from "next/router";
import Link from "next/link";
import StaticHeader from "../common/StaticHeader";

export default function HomeMobile() {
  const router = useRouter();
  // State for API data
  const [postsData, setPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Static about content matching the original SvelteKit homepage
  const aboutItems = [
    {
      id: 1,
      title: "ᠪᠢᠳᠡ ᠬᠡᠨ ᠪᠡ?",
      body: "ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠰᠢᠨ᠋ᠯ ᠨᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᢈᠦᠮᠦᠰ ᠦ᠋ᠨ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠷ᠎ᠠ ᠬᠥᠳᠡᠯᠭᠡᠭᠡᠨ ᠶᠤᠮ᠃",
      image: "/images/about1.png",
      buttonHref: "/about-us",
    },
    {
      id: 2,
      title: "ᠪᠢᠳᠡ ᠶᠤᠤ ᢈᠢᠶᠡᠳᠡᠭ ᠪᠡ?",
      body: "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠦᠭᠡᠮᠡᠯ ᠲᠤᠨᠬᠠᠭᠯᠠᠯ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠠᠳ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠢᠰᠢᠭ ᢈᠡᠮ ᢈᠡᠮᠵᠢᠶ᠎ᠡ ᠳ᠋ᠤ ᠵᠠᠠᠰᠠᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠡᠨᠡ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠳ᠋ᠦ ᠡᠳ᠋ᠯᠡᢉᠦᠯᢈᠦ ᠳ᠋ᠤ ᠣᠷᠣᠰᠢᠨ᠎ᠠ᠃",
      image: "/images/about2.png",
      buttonHref: "/about-us/report",
    },
    {
      id: 3,
      title: "ᠲᠠ ᠶᠤᠤ ᢈᠢᠶᠡᠵᠤ ᠴᠠᠳᠠᠬᠤ ᠪᠡ?",
      body: "ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠷ᠎ᠠ ᠶᠠᠪᠤᠭᠤᠯᠵᠤ ᠪᠠᠶᠢᠭ᠎ᠠ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠪᠣᠯᠤᠨ ᠳᠣᠲᠣᠭᠠᠳ ᠤ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ, ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠤᠬᠠᠢ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠮᠡᠳᠡᠯᠭᠡ ᠶ᠋ᠢ ᠳᠡᠭᠡᠰᠢᠯᠡᢉᠦᠯᢈᠦ ᠦᠶ᠎ᠡᠳ ᠤ ᠬᠠᠮᠲᠤᠷᠠᠨ ᠠᠵᠢᠯᠯᠠᠬᠤ᠃",
      image: "/images/about3.png",
      buttonHref: "/member",
    },
    {
      id: 4,
      title: "ᢈᠠᠨᠳᠢᠪ ᠥᠭᠴᠦ, ᠠᠮᠢᠳᠤᠷᠠᠯ ᠥᠥᠷᠴᠢᠯᢉᠦ",
      body: "ᠪᠢᠳᠡ ᠠᠯᠢᠪᠠ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ, ᠤᠯᠤᠰ ᠲᠥᠷ ᠦ᠋ᠨ ᠦᠵᠡᠯ ᠰᠤᠷᠲᠠᠯ, ᠡᠳ᠋ᠦᠨ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠠᠰᠢᠭ ᠰᠣᠨᠢᠷᠬᠣᠯ, ᠰᠠᠰᠢᠨ ᠰᠦᠲᠡᠯᠡᠭ ᠡᠴᠡ ᠠᠩᠭᠢᠳ ᠪᠢᠶ᠎ᠡ ᠳᠠᠭᠠᠰᠠᠨ, ᠬᠠᠷᠠᠭᠠᠳ ᠦᠭᠡᠢ ᠪᠥᠭᠡᠳ ᠭᠢᠰᠦᠨ ᠳᠡᠮᠵᠢᠭᠴᠢᠳ ᠦ᠋ᠨ ᢈᠠᠨᠳᠢᠪ ᠲᠤᠰᠠᠯᠠᠮᠵᠢ ᠪᠠᠷ ᠰᠠᠨᢈᠦᠦᠵᠢᠳᠡᠭ᠃",
      image: "/images/about4.png",
      buttonHref: "/donation",
    },
  ];

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use the correct posts/list API endpoint
        const posts = await apiService.posts.getPostsList({
          page: 1,
          pageSize: 6,
        });

        // Handle the consistent data structure
        const postsArray = Array.isArray(posts) ? posts : posts?.data || [];
        setPostsData(postsArray);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Convert posts data to the format expected by the component
  const newsItems = postsData.map((post) => {
    return {
      id: post.id,
      title: post.title || "ᠭᠠᠷᠴᠢᠭ ᠦᠭᠡᠢ",
      image: getImageUrl(post.cover) || "/images/news1.png",
      body: post.short_description || post.body || "",
    };
  });

  const handleNewsClick = (newsId) => {
    router.push(`/news/${newsId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white block md:hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p
            className="mt-4 text-gray-600 text-sm"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full min-h-screen bg-white block md:hidden flex items-center justify-center">
        <div className="text-center text-red-600">
          <p
            className="text-sm"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white block md:hidden">
      <div className="relative w-full h-[40vh]">
        <StaticHeader
          image="/images/news1.png"
          alt="Home Page Header"
          width="100%"
          title="ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠰᠢᠨ᠋ᠯ ᠨᠢ ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠳ᠋ᠦ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠨᠢ ᠡᠳ᠋ᠯᠡᢉᠦᠯᢈᠦ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᢈᠦᠮᠦᠰ ᠦ᠋ᠨ ᢈᠦᠮᠦᠨᠯᠢᢉ ᠰᠡᠳᢈᠢᠯ ᠳ᠋ᠦ ᠲᠤᠯᠭᠠᠭᠤᠷᠢᠯᠠᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠥᠷᠨᠢᢉᠦᠯᠳᠡᢉ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᢈᠦᠮᠦᠨ ᠢ᠋ ᠡᠩᠨᠡᢉᠡᠨ ᠳ᠋ᠦ ᠪᠡᠨ ᠨᠢᢉᠡᠳᢈᠡᢉᠰᠡᠨ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷᢈᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ ᠶᠤᠮ᠃"
        />
      </div>
      <div className="h-full p-1">
        <div className="max-h-[200px] h-full flex gap-3">
          <SectionTitle
            title="ᠰᠡᢉᠦᠯ ᠦ᠋ᠨ ᠦᠶ᠎ᠡ ᠶ᠋ᠢᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠠᠯᠠᠭᠠᠷᢈᠢ ᠮᠡᠳᠡᢉᠡ"
            containerClassName="max-h-[200px] flex flex-col gap-1 items-center justify-between border-0 rounded-none border-r border-[#E3E3E3] p-2"
            button={
              <button
                className="rounded-lg bg-[#FFFF00] max-h-10 text-[8px] leading-tight p-1"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
                onClick={() => {
                  router.push("/news");
                }}
              >
                ᠪᠦᢈᠦ ᠮᠡᠳᠡᢉᠡ ᠶ᠋ᠢ ᠦᠵᠡᢈᠦ
              </button>
            }
          />
          <div className="flex flex-row gap-4 overflow-x-auto">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="w-full min-w-max flex items-end space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleNewsClick(item.id)}
              >
                <h3
                  className="text-[10px] max-h-[200px] py-2"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                  title={item.title}
                >
                  {item.title.length > 50
                    ? `${item.title.substring(0, 50)}...`
                    : item.title}
                </h3>
                <div className="relative min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px] object-cover rounded-xl"
                    onError={(e) => {
                      e.target.src = "/images/news1.png"; // fallback image
                    }}
                  />
                  <Button
                    text={"ᠮᠡᠳᠡᢉᠡ"}
                    type="primary"
                    className="absolute top-0 right-0 text-black"
                  />
                </div>
                <Button
                  text={"ᠤᠩᠰᠢᠬᠤ"}
                  type="secondary"
                  className="text-black clear-start "
                />
              </div>
            ))}
            {/* Show message if no posts available */}
            {newsItems.length === 0 && (
              <div className="min-w-[200px] min-h-[200px] flex items-center justify-center border border-gray-200 rounded-xl">
                <p
                  className="text-gray-400 text-[10px]"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠮᠡᠳᠡᢉᠡ ᠦᠭᠡᠢ
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-h-[200px] w-full overflow-x-auto bg-[#F1F1F1] flex gap-10 p-5">
        <p
          className="text-black font-bold text-[10px] sm:text-base"
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
        >
          ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠰᠢᠨ᠋ᠯ ᠨᠢ ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠳ᠋ᠦ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠨᠢ ᠡᠳ᠋ᠯᠡᢉᠦᠯᢈᠦ ᠶ᠋ᠢᠨ
          ᠲᠥᠯᠦᢉᠡ ᢈᠦᠮᠦᠰ ᠦ᠋ᠨ ᢈᠦᠮᠦᠨᠯᠢᢉ ᠰᠡᠳᢈᠢᠯ ᠳ᠋ᠦ ᠲᠤᠯᠭᠠᠭᠤᠷᠢᠯᠠᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ <br />
          ᠠᠵᠢᠯ ᠥᠷᠨᠢᢉᠦᠯᠳᠡᢉ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᢈᠦᠮᠦᠨ ᠢ᠋ ᠡᠩᠨᠡᢉᠡᠨ ᠳ᠋ᠦ ᠪᠡᠨ ᠨᠢᢉᠡᠳᢈᠡᢉᠰᠡᠨ ᠳᠡᠯᠡᢈᠡᠢ
          ᠳᠠᠶᠠᠭᠠᠷᢈᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ ᠶᠤᠮ᠃
        </p>
        <p
          className="text-[#848382] font-bold text-[10px] sm:text-base"
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
        >
          ᠡᠷᢈᠡ ᠪᠠᠷᠢᠭᠴᠢᠳ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠡᠷᢈᠡ ᠵᠦᠢ᠂ ᢈᠡᠮ ᢈᠡᠮᠵᠢᠶ᠎ᠡ ᠶ᠋ᠢ ᢈᠦᠨᠳᠦᠳᢈᠡᠳᠡᢉ᠂
          ᠬᠠᠷᠢᠭᠤᠴᠠᠯᠭ᠎ᠠ ᠪᠠᠨ ᢈᠦᠯᠢᠶᠡᠳᠡᢉ᠂ ᠠᠮᠠᠯᠠᠯᠲᠠ ᠳ᠋ᠤ ᠪᠠᠨ ᢈᠦᠷᠳᠡᢉ <br />
          ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢ ᠪᠤᠢ ᠪᠣᠯᠭᠠᠬᠤ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠪᠢᠳᠡ ᠠᠵᠢᠯᠠᠳᠠᠭ᠃
        </p>
      </div>
      <div className="min-h-[400px] w-full overflow-x-auto p-1">
        <div className="h-full grid grid-cols-2 grid-rows-2 gap-[5px]">
          {aboutItems.map((item) => (
            <Link
              key={item.id}
              href={item.buttonHref}
              className="max-h-[200px] w-full flex flex-row justify-between border border-[#E3E3E3] rounded-xl p-2 gap-1"
            >
              <div className="flex items-end">
                <Button type="secondary" text={"ᠪᠢᠳᠡᠨ ᠦ᠋ ᠲᠡᠦᢈᠡ ᠶ᠋ᠢ ᠤᠩᠰᠢᠬᠤ"} />
              </div>
              <div className="flex flex-row-reverse gap-1">
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={28}
                    height={28}
                    onError={(e) => {
                      e.target.src = "/images/about1.png"; // fallback image
                    }}
                  />
                  <h4
                    className="text-black font-bold text-[10px] sm:text-base max-h-24 overflow-hidden"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    title={item.title}
                  >
                    {item.title.length > 10
                      ? `${item.title.substring(0, 10)}...`
                      : item.title}
                  </h4>
                </div>
                <div
                  className="text-black font-bold text-[8px] sm:text-base max-h-32 overflow-hidden"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                  title={item.body}
                >
                  {item.body.length > 100
                    ? `${item.body.substring(0, 100)}...`
                    : item.body}
                </div>
              </div>
            </Link>
          ))}
          {/* Show message if no events available */}
          {aboutItems.length === 0 && (
            <div className="col-span-2 row-span-2 max-h-[200px] w-full flex items-center justify-center border border-gray-200 rounded-xl">
              <p
                className="text-gray-400 text-[10px]"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠠᠷᠪᠢᠳᠠᠯ ᠦᠭᠡᠢ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
