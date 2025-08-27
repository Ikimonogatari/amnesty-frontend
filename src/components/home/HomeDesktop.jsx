import Image from "next/image";
import Button from "@/components/common/Button";
import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import SectionTitle from "@/components/common/SectionTitle";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiService from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";
import Link from "next/link";

export default function HomeDesktop() {
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
      title: post.short_description || post.title || "ᠭᠠᠷᠴᠢᠭ ᠦᠭᠡᠢ",
      image: getImageUrl(post.cover) || "/images/news1.png",
      body: post.short_description || post.body || "",
      category: "news",
    };
  });

  const handleNewsClick = (newsId) => {
    router.push(`/news/${newsId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full gap-10 overflow-x-auto w-auto flex-shrink-0 hidden md:flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p
            className="mt-4 text-gray-600"
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
      <div className="h-full gap-10 overflow-x-auto w-auto flex-shrink-0 hidden md:flex items-center justify-center">
        <div className="text-center text-red-600">
          <p style={{ writingMode: "vertical-lr", textOrientation: "upright" }}>
            ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full gap-10 w-auto flex-shrink-0 hidden md:flex">
      <BannerSlider width="90rem" useDynamic={true} />
      <div className="h-full p-4">
        <div className="h-full flex gap-10">
          <SectionTitle
            title="ᠰᠡᢉᠦᠯ ᠦ᠋ᠨ ᠦᠶ᠎ᠡ ᠶ᠋ᠢᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠠᠯᠠᠭᠠᠷᢈᠢ ᠮᠡᠳᠡᢉᠡ"
            containerClassName="h-full flex flex-col items-center justify-between border border-[#E3E3E3] rounded-xl p-8"
            button={
              <Button
                onClick={() => {
                  router.push("/news");
                }}
                text={"ᠪᠦᢈᠦ ᠮᠡᠳᠡᢉᠡ ᠶ᠋ᠢ ᠦᠵᠡᢈᠦ"}
                type="primary"
              />
            }
          />
          <div className="h-full grid grid-cols-2 grid-rows-3 grid-flow-col gap-10">
            {newsItems.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="col-span-1 flex items-end space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleNewsClick(item.id)}
              >
                <h3
                  className="w-16 h-full text-sm"
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
                <div className="relative h-full aspect-square">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={330}
                    height={330}
                    className="aspect-square object-cover rounded-xl"
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
                  className="text-black h-48"
                />
              </div>
            ))}
            {/* Show message if no posts available */}
            {newsItems.length === 0 && (
              <div className="col-span-2 row-span-3 flex items-center justify-center border border-gray-200 rounded-xl">
                <p
                  className="text-gray-400"
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
      <div className="h-screen w-[20rem] bg-[#F1F1F1] flex items-center justify-center gap-10">
        <p
          className="text-black font-bold"
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
        >
          ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠰᠢᠨ᠋ᠯ ᠨᠢ ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠳ᠋ᠦ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠨᠢ ᠡᠳ᠋ᠯᠡᢉᠦᠯᢈᠦ ᠶ᠋ᠢᠨ
          ᠲᠥᠯᠦᢉᠡ ᢈᠦᠮᠦᠰ ᠦ᠋ᠨ ᢈᠦᠮᠦᠨᠯᠢᢉ ᠰᠡᠳᢈᠢᠯ ᠳ᠋ᠦ ᠲᠤᠯᠭᠠᠭᠤᠷᠢᠯᠠᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ <br />
          ᠠᠵᠢᠯ ᠥᠷᠨᠢᢉᠦᠯᠳᠡᢉ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᢈᠦᠮᠦᠨ ᠢ᠋ ᠡᠩᠨᠡᢉᠡᠨ ᠳ᠋ᠦ ᠪᠡᠨ ᠨᠢᢉᠡᠳᢈᠡᢉᠰᠡᠨ ᠳᠡᠯᠡᢈᠡᠢ
          ᠳᠠᠶᠠᠭᠠᠷᢈᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ ᠶᠤᠮ᠃
        </p>
        <p
          className="text-[#848382] font-bold"
          style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
        >
          ᠡᠷᢈᠡ ᠪᠠᠷᠢᠭᠴᠢᠳ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠡᠷᢈᠡ ᠵᠦᠢ᠂ ᢈᠡᠮ ᢈᠡᠮᠵᠢᠶ᠎ᠡ ᠶ᠋ᠢ ᢈᠦᠨᠳᠦᠳᢈᠡᠳᠡᢉ᠂
          ᠬᠠᠷᠢᠭᠤᠴᠠᠯᠭ᠎ᠠ ᠪᠠᠨ ᢈᠦᠯᠢᠶᠡᠳᠡᢉ᠂ ᠠᠮᠠᠯᠠᠯᠲᠠ ᠳ᠋ᠤ ᠪᠠᠨ ᢈᠦᠷᠳᠡᢉ <br />
          ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢ ᠪᠤᠢ ᠪᠣᠯᠭᠠᠬᠤ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠪᠢᠳᠡ ᠠᠵᠢᠯᠠᠳᠠᠭ᠃
        </p>
      </div>
      <div className="h-full p-4">
        <div className="h-full grid grid-cols-2 grid-rows-2 grid-flow-col gap-[10px] mr-20">
          {aboutItems.map((item) => (
            <Link
              key={item.id}
              className="flex border border-[#E3E3E3] rounded-xl p-5 gap-4"
              href={item.buttonHref}
            >
              <div className="flex flex-col items-center gap-5">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  onError={(e) => {
                    e.target.src = "/images/about1.png"; // fallback image
                  }}
                />
                <h4
                  className="text-black font-bold text-sm max-h-32 overflow-hidden"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                  title={item.title}
                >
                  {item.title.length > 20
                    ? `${item.title.substring(0, 20)}...`
                    : item.title}
                </h4>
              </div>
              <div
                className="min-w-28 text-black font-bold text-sm max-h-96 overflow-hidden"
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
              <div className="flex items-end">
                <Button type="secondary" text={"ᠪᠢᠳᠡᠨ ᠦ᠋ ᠲᠡᠦᢈᠡ ᠶ᠋ᠢ ᠤᠩᠰᠢᠬᠤ"} />
              </div>
            </Link>
          ))}
          {/* Show message if no events available */}
          {aboutItems.length === 0 && (
            <div className="col-span-2 row-span-2 flex items-center justify-center border border-gray-200 rounded-xl">
              <p
                className="text-gray-400"
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
