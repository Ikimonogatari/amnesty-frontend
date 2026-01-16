import { useRouter } from "next/router";
import Image from "next/image";
import GridLayout from "@/components/common/GridLayout";
import { getImageUrl } from "@/utils/fetcher";

export default function CampaignPosts({ posts, isMobile = false }) {
  const router = useRouter();

  if (!posts || posts.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h2
          className="text-xl font-bold"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠬᠠᠮᠠᠭ᠎ᠠᠷᠠᠯᠲᠠᠢ ᠮᠡᠳᠡᢉᠡ
        </h2>
        <div className="flex flex-col gap-4 w-full">
          {posts.slice(0, 3).map((post, index) => (
            <div
              key={post.id || index}
              className="flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-opacity w-full"
              onClick={() => router.push(`/news/${post.id}`)}
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={getImageUrl(post.cover) || "/mng/images/news1.png"}
                  alt={post.title || "Post image"}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <h3
                className="text-sm font-medium"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {post.title?.length > 60
                  ? `${post.title.substring(0, 60)}...`
                  : post.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
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
        items={posts}
        basePath="/news"
        categoryButtonText="ᠮᠡᠳᠡᢉᠡ"
        emptyStateText="ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠮᠡᠳᠡᢉᠡ ᠦᠭᠡᠢ"
        getImageUrl={(item) =>
          getImageUrl(item.cover) || "/mng/images/news1.png"
        }
        getTitle={(item) => item.title}
        itemType="news"
      />
    </div>
    );
}
