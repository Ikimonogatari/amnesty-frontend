import Image from "next/image";
import Button from "@/components/common/Button";
import StaticHeader from "@/components/common/StaticHeader";
import { useRouter } from "next/router";

export default function ParticipationDesktop() {
  const router = useRouter();

  const handleItemClick = (link) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      router.push(link);
    }
  };

  return (
    <div className="h-full hidden sm:flex gap-10 w-auto flex-shrink-0 min-w-screen">
      <StaticHeader
        image="/mng/images/participation/image-participation-header.jpg"
        alt="Participation Page Header"
        width="90rem"
        title="ᠲᠠᠨ ᠤ᠋ ᠣᠷᠣᠯᠴᠠᠭ᠎ᠠ"
      />

      <div className="h-full p-4 flex gap-20">
        <div className="h-full flex gap-4">
          <p
            className="text-lg"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠵᠠᢈᠢᠳᠠᠯ ᠳ᠋ᠤ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠵᠢᠷᠤᠵᠤ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠰᠠᠶᠢᠨ
            ᠳᠤᠷᠤᠨ ᠤ᠋ ᠠᠵᠢᠯ ᢈᠢᠵᠦ᠂ ᢉᠢᠰᠦᠨ ᠪᠣᠯᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃ ᠥᠨᠦᠳᠦᠷ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ
            ᠠᠪᠴᠤ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠬᠠᠮᠲᠤ ᠳ᠋ᠤ ᠪᠠᠨ
            ᠵᠣᠭᠰᠤᠬᠤ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ ᠦ᠋ ᠨᠢᢉᠡ ᢈᠡᠰᠡᢉ ᠪᠣᠯᠤᠭᠠᠷᠠᠢ᠃
          </p>
        </div>
        <div className="h-full w-[1px] bg-black"></div>
        <div className="grid grid-rows-3 grid-flow-col gap-10">
          {participationItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-2 max-w-[800px] max-h-[320px]"
            >
              <h3
                className="text-lg font-bold w-[100px] max-h-[320px] overflow-hidden"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {item.title}
              </h3>
              <Image
                src={item.image}
                alt={item.title}
                width={413}
                height={231}
                className="aspect-[413/231] object-cover flex-shrink-0"
              />
              <p
                className="text-sm w-[150px] max-h-[320px] overflow-hidden"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {item.description}
              </p>
              <Button
                type="primary"
                text={item.buttonText}
                className="text-sm cursor-pointer min-w-[60px] max-h-[320px] overflow-hidden"
                onClick={() => handleItemClick(item.link)}
              />
            </div>
          ))}
        </div>
        <div className="h-full w-[1px] bg-black"></div>
        <div className="grid grid-rows-3 grid-flow-col gap-10">
          {secondRowItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-2 max-w-[800px] max-h-[320px]"
            >
              <h3
                className="text-lg font-bold w-[100px] max-h-[320px] overflow-hidden"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {item.title}
              </h3>
              <Image
                src={item.image}
                alt={item.title}
                width={413}
                height={231}
                className="aspect-[413/231] object-cover flex-shrink-0"
              />
              <p
                className="text-sm w-[150px] max-h-[320px] overflow-hidden"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {item.description}
              </p>
              <Button
                type="primary"
                text={item.buttonText}
                className="text-sm cursor-pointer w-[60px] max-h-[320px] overflow-hidden"
                onClick={() => handleItemClick(item.link)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const participationItems = [
  {
    id: 1,
    title: "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠣᠷᠤᠯᠴᠠᠮᠠᠷ ᠪᠠᠶᠢᠨ᠎ᠠ ᠤᠤ?",
    description:
      "ᠥᠪᠡᠷᠲᠡ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠣᠶᠢᠷ᠎ᠠ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠨᠢᢉᠡᠳᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠲᠠᠢ ᠤᠤᠯᠵᠠᠭᠠᠷᠠᠢ᠃ ᢈᠡᠷᠪᠡ ᠲᠠ ᠥᠪᠡᠷ ᠢ᠋ᠶᠡᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ ᠪᠥᢉᠡᠳ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᢈᠦ ᠪᠣᠯ ᠡᠨᠳᠡ ᠨᠡᠶᠢᠲᠡᠯᠡᢉᠡᠷᠡᠢ᠃",
    buttonText: "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠣᠷᠤᠯᠴᠠᠬᠤ",
    link: "/participation/events",
    image: "/mng/images/participation/2h_thumbnail.jpg.png",
  },
  {
    id: 2,
    title: "ᠰᠠᠶᠢᠨ ᠳᠤᠷᠤᠨ ᠤ᠋ ᠠᠵᠢᠯ ᢈᠢᠶᠡᠮᠡᠷ ᠪᠠᠶᠢᠨ᠎ᠠ ᠤᠤ?",
    description:
      "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ᠂ ᠲᠦᠭᠡᠡᠨ ᠳᠡᠯᠭᠡᠷᠦᠦᠯᢈᠦ ᢈᠦᠰᠦᠯ ᠡᠷᠮᠡᠯᠵᠡᠯᠡᠡᠷ ᠳᠦᠦᠷᠡᠨ ᠭᠦᠢᠴᠡᠲᠭᠡᢈᠦ ᠲᠣᠪᠴᠢᠶ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯᠲᠠᠨ᠂ ᠰᠠᠶᠢᠨ ᠳᠤᠷᠤᠨ ᠤ᠋ ᠠᠵᠢᠯᠲᠠᠨ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠮᠠᠨᠯᠠᠢᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᠬᠠᠮᠲᠤᠭᠠᠷ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠲᠦᠭᠡᠡᠨ ᠳᠡᠯᠭᠡᠷᠦᠦᠯᢈᠦ ᠬᠠᠮᠠᠭᠠᠯᠠᢈᠤ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠠᠵᠢᠯᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃",
    buttonText: "ᠰᠠᠶᠢᠨ ᠳᠤᠷᠤᠨ ᠤ᠋ ᠠᠵᠢᠯᠲᠠᠨ ᠪᠣᠯᠬᠤ",
    link: "https://forms.office.com/Pages/ResponsePage.aspx?id=Kfjbwo03wUS0ehwEOSTd82OOUTGBqCBLh99jR3DTwohURU0zSEU4WDRCSjNRNDJWVDVIUUEwVUZHRi4u",
    image: "/mng/images/participation/2b_thumbnail.jpg.png",
  },
  {
    id: 3,
    title: "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᢉᠢᠰᠦᠨ ᠪᠣᠯᠮᠣᠷ ᠪᠠᠶᠢᠨ᠎ᠠ ᠤᠤ?",
    description:
      'ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᢈᠢᠨ ᠤ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠶᠡᠬᠡ ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ "ᠡᠮᠨᠡᠰᠲᠢ ᠢᠨᠲᠡᠷᠨᠠᠰᠢᠣᠨᠠᠯ"-ᠳ᠋ᠤ ᠨᠢᢉᠡᠳᢈᠦ ᢈᠦᠰᠦᠪᠡᠯ ᠪᠢᠳᠡᠨᠲᠡᠢ ᠨᠢᢉᠡᠳᠡᠡᠷᠡᠢ᠃',
    buttonText: "ᢉᠢᠰᠦᠨ ᠪᠣᠯᠬᠤ",
    link: "https://forms.office.com/e/rBFq73J5Hi",
    image: "/mng/images/participation/2c_thumbnail.jpg.png",
  },
];

const secondRowItems = [
  {
    id: 4,
    title: "ᠵᠠᢈᠢᠳᠠᠯ ᠪᠢᢈᠢᢈᠦ ᠠᠶᠠᠨ",
    description:
      "ᠡᠯᠡᠻᠲᠷᠣᠨ ᠰᠢᠤᠳᠠᠩᠭᠠᠷ ᠵᠠᢈᠢᠳᠠᠯ ᠢᠯᠭᠡᢉᠦ᠂ ᠤᠷᠢᠶᠠᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᠨᠢᢉᠡᠳᢈᠦ᠂ ᠨᠢᠶᠢᠭᠡᠮ ᠤ᠋ᠨ ᠰᠦᠯᠵᠢᠶᠡ ᠳ᠋ᠤ ᠠᠻᠴᠠᠳ ᠨᠢᢉᠡᠳᢈᠦ ᠵᠡᠷᠡᠭ ᠡᠩᠭᠢᠨ ᠦᠢᠯᠡᠳᠦᠯ ᢈᠡᠨ ᠨᠡᠭᠡᠨ ᠢ᠋ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠳ᠋ᠤ ᠪᠣᠳᠢᠲᠣᠢ ᠥᠪᠡᠷᢉᠢᠯᢉᠡ ᢈᠢᠶᠡᠵᠤ ᠴᠢᠳᠠᠨ᠎ᠠ᠃",
    buttonText: "ᠵᠠᢈᠢᠳᠠᠯ ᠪᠢᢈᠢᠵᠦ ᠥᠪᠡᠷᢉᠢᠯᢉᠡ ᢈᠢᠶᠡ",
    link: "/campaign/writeforrights",
    image: "/mng/images/participation/2a_thumbnail.jpg.png",
  },
  {
    id: 5,
    title: "ᠵᠣᠷᠢᠭᠲᠣᠨ ᠭᠠᠷ ᠤᠲᠠᠰᠤ ᠶ᠋ᠢᠨ ᠠᠫᠫᠯᠢᠻᠠᠰᠢ",
    description:
      "ᠵᠣᠷᠢᠭᠲᠣᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ ᠭᠠᠷ ᠤᠲᠠᠰᠤ ᠶ᠋ᠢᠨ ᠫᠷᠣᠭᠷᠠᠮ ᠢ ᠲᠠ ᠭᠠᠷ ᠤᠲᠠᠰᠠᠨ ᠳ᠋ᠤ ᠰᠤᠤᠯᠭᠠᠰᠨᠠᠷ ᠲᠠ ᠠᠯᠭᠠᠨ ᠳᠡᠭᠡᠷᠡᠡᠰᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᢈᠤ ᠳ᠋ᠤ ᢈᠤᠪ ᠨᠡᠮᠡᠷᠡ ᠣᠷᠤᠤᠯᠵᠤ ᠴᠢᠳᠠᠨ᠎ᠠ᠃ ᠮᠥᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠲᠡᠢ ᢈᠣᠯᠪᠣᠭᠠᠲᠠᠢ ᠮᠡᠳᠡᢉᠡ᠂ ᠮᠡᠳᠡᢉᠡᠯᠦᠯ᠂ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶᠡ ᠶ᠋ᠢᠨ ᠲᠠᠯ᠎ᠠ ᠴᠠᠭ ᠠᠯᠳᠠᠯᠭᠦᠢ ᠮᠡᠳᠡᢉᠡᠯᠦᠯ ᠠᠪᠨ᠎ᠠ᠃",
    buttonText: "ᠵᠣᠷᠢᠭᠲᠣᠨ ᠭᠠᠷ ᠤᠲᠠᠰᠤ ᠶ᠋ᠢᠨ ᠠᠫᠫᠯᠢᠻᠠᠰᠢ ᠲᠠᠲᠠᢈᠤ",
    link: "https://play.google.com/store/apps/details?id=mn.amnesty.zorigton",
    image: "/mng/images/participation/2e_thumbnail.jpg.png",
  },
  {
    id: 6,
    title: "ᢈᠠᠨᠳᠢᠪ ᠥᠭᢈᠦ",
    description:
      "ᠥᠳᠦᠷ ᠪᠦᠷ ᠥᠮᠰᠦᠰᠦᠨ ᢈᠤᠪᠴᠠᠰᠠᠷᠠᠶᠠᠨ ᠳᠠᠮᠵᠢᠤᠯᠵᠤ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠮᠡᠰᠰᠡᠵ ᠲᠦᠭᠡᢉᠦ ᠵᠠᠭᠪᠠᠷᠯᠠᠭ ᠪᠣᠭᠢᠨᠣ ᢈᠠᠨᠴᠤᠢᠲ ᠴᠠᠮᠴ᠂ ᠹᠯᠡᠰ ᠳᠢᠰᠻ᠂ ᠲᠡᠮᠳᠡᠭᠯᠡᠯ ᠤ᠋ᠨ ᠳᠡᠪᠲᠡᠷ᠂ ᠡᠩᠭᠡᠷ ᠤ᠋ᠨ ᠲᠡᠮᠳᠡᠭ ᠵᠡᠷᠡᠭ ᠣᠯᠠᠨ ᠪᠦᠲᠡᠭᠡᠳᢈᠦᠨ ᠡᠴᠡ ᠲᠠ ᠥᠪᠡᠷᠲᠡ ᠪᠣᠯᠣᠭᠠᠳ ᢈᠠᠢᠷᠠᠲᠠᠢ ᢈᠦᠮᠦᠨ ᠲᠡᠢ ᠠᠪᠴᠤ ᠪᠡᠯᠡᠭᠯᠡᠡᠷᠡᠢ᠃",
    buttonText: "ᢈᠠᠨᠳᠢᠪ ᠥᠷᢈᠦ",
    link: "/donation",
    image: "/mng/images/participation/2f_thumbnail.jpg.png",
  },
];
