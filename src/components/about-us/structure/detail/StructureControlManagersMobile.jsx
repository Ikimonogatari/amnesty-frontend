import StaticHeader from "@/components/common/StaticHeader";
import Image from "next/image";


export default function StructureControlManagersMobile() {
  const controlManagers = [
    {
      id: 1,
      name: "ᠫ‍᠂ ᠲᠣᠳᠤᠷᠠᠯ",
      position: "ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠯᠡᠯ ᠦ᠋ᠨ ᠳᠠᠷᠤᠭ᠎ᠠ",
      description:
        "ᠮᠣᠨᠤᠰᠤ ᢈᠦᠨᠡᠰᠦ ᢈᠢ-ᠡᠶᠢᠨ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠬᠠᠷᠢᠭᠤᠴᠠᠭᠰᠠᠨ ᠳᠡᠳ ᠵᠠᢈᠢᠷᠤᠯ ᠢ᠋ᠶᠠᠷ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃  ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠨ ᠢ᠋ᠶᠡᠷ ᠒᠐᠐᠑ ᠣᠨ ᠳ᠋ᠤ ᠡᠯᠰᠡᠵᠦ ᠪᠠᠶᠢᠭᠰᠠᠨ᠃  ᠤᠯᠠᠮ ᠢ᠋ᠶᠠᠷ ᠒᠐᠐᠕ ᠣᠨ ᠤ᠋ IYC- ᠳ᠋ᠤ ᠲᠥᠯᠦᢉᠡᠯᠡᢉᠴᠢ ᠪᠡᠷ ᠣᠷᠤᠯᠴᠠᠵᠤ ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠰᠢᠯ ᠤ᠋ᠨ ᠤᠳᠤᠷᠢᠳᠬᠤ ᠵᠥᠪᠯᠡᠯ ᠦ᠋ᠨ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ ᠤ᠋ᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠬᠠᠷᠢᠭᠤᠴᠠᠭᠰᠠᠨ ᢉᠡᠰᠢᢉᠦᠨ ᠢ᠋ᠶᠡᠷ ᠰᠣᠩᠭᠤᠭᠳᠠᠵᠤ ᠪᠠᠶᠢᠭᠰᠠᠨ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠣᠯᠭᠤᠬᠤ᠂ ᠵᠡᠷ ᠵᠡᠪᠰᠡᢉ ᠦ᠋ᠨ ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢ ᠰᠠᠶᠢᠵᠢᠷᠠᠭᠤᠯᠬᠤ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠡᠮᠡᠴᠡᢉᠴᠢᠳ ᠢ᠋ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠵᠡᠷᢉᠡ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠳ᠋ᠤ ᠢᠳᠡᠪᢈᠢ ᠲᠡᠢ ᠣᠷᠤᠯᠴᠠᠵᠤ ᠢᠷᠡᢉᠰᠡᠨ᠃",
      image: "/mng/images/controlManagers/todrol.png",
    },
    {
      id: 2,
      name: "ᠰ‍᠂ᠨᠠᠵᠢᠳᠮ᠎ᠠ᠃",
      position: "ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠯᠡᠯ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠨ",
      description:
        "ᠨᠡᠶᠢᠰᠯᠡᠯ ᠦ᠋ᠨ ᠓᠓-ᠷ ᠰᠤᠷᠭᠠᠭᠤᠯᠢ ᠳ᠋ᠤ ᠲᠡᠦᢈᠡ-ᠨᠡᠶᠢᢉᠡᠮ ᠦ᠋ᠨ ᠪᠠᠭᠰᠢ ᠪᠠᠷ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃  ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠳ᠋ᠦ ᠒᠐᠐᠓ ᠣᠨ ᠠ᠋ᠴᠠ ᠪᠠᠭᠰᠢ ᠨᠠᠷ ᠤ᠋ᠨ ᠪᠦᠯᠦᢉ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠨ᠂ ᠒᠐᠒᠐ ᠣᠨ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᠨ ᠪᠠᠭᠰᠢ ᠨᠠᠷ ᠤ᠋ᠨ ᠪᠦᠯᠦᢉ ᠦ᠋ᠨ ᠠᠬᠠᠯᠠᠭᠴᠢ ᠪᠠᠷ ᠠᠵᠢᠯᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠒᠐᠐᠓ ᠣᠨ ᠠ᠋ᠴᠠ ᠬᠣᠶᠢᠰᠢ ᠪᠠᠭᠰᠢ ᠪᠠᠷ ᠠᠵᠢᠯᠯᠠᠵᠤ ᠡᢈᠢᠯᠡᢉᠡᠳ ᠡᠷᢈᠡ ᠵᠦᠢ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠣᠶᠢᠯᠠᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠢ᠋ ᠵᠢᠭᠠᠬᠤ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠠ᠋ᠴᠠ ᠡᢉᠦᠳᠦᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢᠭ ᠤ᠋ᠨ ᠨᠣᠮ ᠤ᠋ᠨ ᠰᠠᠩ ᠢ᠋ᠶᠠᠷ ᠦᠶᠢᠯᠡᠴᠢᠯᠡᢉᠦᠯᠵᠦ ᠪᠠᠶᠢᠭᠠᠳ ᢉᠡᠰᠢᢉᠦᠨ ᠢ᠋ᠶᠡᠷ ᠡᠯᠰᠡᠨ ᠣᠷᠤᠭᠰᠠᠨ᠃  ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠡᠳᠦᠷ ᠦ᠋ᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ᠂ ᢈᠡᠦᢈᠡᠳ ᠦ᠋ᠨ ᠬᠣᠷᠢᠬᠤ ᠠᠩᢉᠢ᠂ ᠡᠮᠡᢉᠲᠡᠶᠢᠴᠦᠳ ᠦ᠋ᠨ ᠬᠣᠷᠢᠬᠤ ᠠᠩᢉᠢ᠂ ᠣᠷᠤᠨ ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ ᠪᠣᠯᠤᠨ ᠨᠡᠶᠢᠰᠯᠡᠯ ᠦ᠋ᠨ ᠶᠡᠪᠰ ᠵᠡᠷᢉᠡ ᠳ᠋ᠦ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠴᠢᢉᠯᠡᠯ ᠢ᠋ᠶᠡᠷ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠣᠷᠤᠵᠤ ᠪᠠᠶᠢᠭᠰᠠᠨ ᠲᠤᠷᠰᠢᠯᠭᠠᠲᠠᠢ᠃",
      image: "/mng/images/controlManagers/najidmaa.png",
    },
    {
      id: 3,
      name: "ᠮ‍᠂ᠴᠢᠮᠡᢉ ᠡ",
      position: "ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠯᠡᠯ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠨ",
      description:
        "ᠨᠡᠶᠢᢉᠡᠮ ᠦ᠋ᠨ ᠠᠵᠢᠯᠲᠠᠨ ᠮᠡᠷᢉᠡᠵᠢᠯ ᠲᠡᠢ᠂ ᠮᠠᢉᠢᠰᠲ᠋ᠷ᠃  ᠒᠐᠑᠑ ᠣᠨ ᠠ᠋ᠴᠠ ᠡᠮᠨᠧᠰᠲ ᠲᠦ ᠠᠷᠤᠬᠠᠩᠭᠠᠢ ᠶ᠋ᠢᠨ ᠪᠦᠯᠦᢉ ᠲᠦ ᢉᠡᠰᠢᢉᠦᠨ ᠢ᠋ᠶᠡᠷ ᠡᠯᠰᠡᠵᠦ ᠥᠨᠦ ᠶ᠋ᠢ ᢈᠦᠷᠲᠡᠯ᠎ᠡ ᠬᠤᠭᠤᠴᠠᠭᠠᠨ ᠳ᠋ᠤ ᠪᠦᠯᠦᢉ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠨ᠂ ᠠᠬᠠᠯᠠᠭᠴᠢ ᠪᠠᠷ ᠲᠤᠰ ᠲᠤᠰ ᠠᠵᠢᠯᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᢈᠡᠦᢈᠡᠳ ᠦ᠋ᠨ ᠡᠷᢈᠡ᠂ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠤ᠋ᠨ ᠴᠢᢉᠯᠡᠯ ᠢ᠋ᠶᠡᠷ ᠣᠷᠤᠨ ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ ᠨᠡᠶᠢᢉᠡᠮ ᠦ᠋ᠨ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠪᠣᠯᠤᠨ ᠣᠶᠤᠲᠠᠨ ᠨᠤᠭᠤᠳ᠂ ᠰᠤᠷᠭᠠᠭᠤᠯᠢ᠂ ᠴᠡᠴᠡᠷᠯᠢᢉ ᠦ᠋ᠨ ᠪᠠᠭᠰᠢ ᠨᠠᠷ ᠲᠤ ᠴᠢᢉᠯᠡᢉᠰᠡᠨ ᠰᠤᠷᠭᠠᠯᠲᠠ᠂ ᠨᠥᠯᠦᢉᠡᠯᠡᠯ᠂ ᠲᠥᠰᠦᠯᠲᠡ ᠠᠵᠢᠯ ᠤ᠋ᠳ ᠢ᠋ ᠲᠥᠷᠦ ᠶ᠋ᠢᠨ ᠪᠣᠯᠤᠨ ᠲᠥᠷᠦ ᠶ᠋ᠢᠨ ᠪᠤᠰᠤ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠨᠤᠭᠤᠳ ᠲᠠᠢ ᠬᠠᠮᠲᠤᠷᠠᠨ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠨ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃  ᠰᠡᢉᠦᠯ ᠦ᠋ᠨ ᠵᠢᠯ ᠦ᠋ᠳ ᠲᠦ ᠵᠣᠷᠢᠯᠲᠠᠲᠤ ᠰᠤᠮᠤ᠂ ᠪᠠᠭ ᠤ᠋ᠳ ᠤᠷᠤᠭᠤ ᠴᠢᢉᠯᠡᠨ ᠣᠷᠤᠨ ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ ᢈᠡᠦᢈᠡᠳ ᠬᠠᠮᠠᠭᠠᠯᠠᠯ ᠤ᠋ᠨ ᠨᠢᢉᠡᠴᠡ ᠨᠦ᠋ᢉᠦᠳ ᠪᠣᠯᠬᠤ ᠬᠠᠮᠲᠤᠷᠠᠭᠰᠠᠨ ᠪᠠᠭ ᠤ᠋ᠳ ᠲᠤ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠥᠯᠦᢉᠡᠯᠡᠯ᠂ ᢈᠡᠦᢈᠡᠳ ᠢ᠋ ᠵᠣᠳᠤᠵᠤ ᠰᠢᠳᢈᠡᢈᠦ ᠶ᠋ᠢᠨ ᠡᠰᠡᠷᢉᠦ ᠻᠣᠮᠫᠠᠨᠢᠲᠤ ᠪᠣᠯᠤᠨ ᠰᠤᠳᠤᠯᠭᠠᠨ ᠤ᠋ ᠠᠵᠢᠯ ᠤ᠋ᠳ ᠳᠡᢉᠡᠷ᠎ᠡ ᠠᠵᠢᠯᠯᠠᠬᠤ ᠶ᠋ᠢᠨ ᠵᠡᠷᢉᠡᠴᠡᢉᠡ ᠻᠧᠶᠢᠰ ᠰᠢᠢᠳᠪᠦᠷᠢᠯᠡᠯᠲᠡ ᠳᠡᢉᠡᠷ᠎ᠡ ᠠᠷᠭ᠎ᠠ ᠵᠦᠢ ᠶ᠋ᠢᠨ ᠵᠥᠪᠯᠡᢉᠡ ᠥᢉᠴᠦ᠂ ᠬᠠᠮᠲᠤᠷᠠᠨ ᠠᠵᠢᠯᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃",
      image: "/mng/images/controlManagers/chimge.png",
    },
  ];

  return (
    <div className="w-full block sm:hidden">
      <div className="relative w-full h-[40vh]">
        <StaticHeader
          title="ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠯᠡᠯ"
          description="ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯ ᠦ᠋ᠨ ᠪᠣᠳᠤᠯᠭ᠎ᠠ᠂ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠮᠡᠷᢉᠡᠵᠢᠯ ᠦ᠋ᠨ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ᠂ ᠲᠤᠷᠰᠢᠯᠭ᠎ᠠ᠂ ᠴᠠᠭ ᠵᠠᠪ ᠢ᠋ᠶᠠᠨ ᠬᠠᠨᠳᠢᠪᠯᠠᠵᠤ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠯᠡᠯ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠳ᠃"
          width="100%"
        />
      </div>
      <div className="flex flex-col items-center gap-12 p-4 h-full w-full max-w-full">
        <div className="flex gap-2 max-h-[200px]">
          <h2
            className="text-sm font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠯᠡᠯ
          </h2>
          <p
            className="text-[10px]"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯ ᠦ᠋ᠨ ᠪᠣᠳᠤᠯᠭ᠎ᠠ᠂ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ
            ᠮᠡᠷᢉᠡᠵᠢᠯ ᠦ᠋ᠨ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ᠂ ᠲᠤᠷᠰᠢᠯᠭ᠎ᠠ᠂ ᠴᠠᠭ ᠵᠠᠪ ᠢ᠋ᠶᠠᠨ ᠬᠠᠨᠳᠢᠪᠯᠠᠵᠤ
            ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠯᠡᠯ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠳ᠃
          </p>
        </div>

        {/* Control Managers Section */}
        <div className="flex flex-col gap-6 w-full">
          {controlManagers.map((manager, index) => (
            <div
              key={manager.id}
              className="flex flex-row items-center gap-4 border-b border-dashed border-gray-300 pb-6 last:border-b-0 w-full"
            >
              <div className="flex-shrink-0">
                <Image
                  src={manager.image || "/mng/images/no-image-icon.png"}
                  alt={manager.name}
                  width={150}
                  height={150}
                  className="rounded-full w-[150px] h-[150px] object-cover"
                />
                <div className="flex flex-row items-start justify-center gap-2 mt-2">
                  <h3
                    className="font-bold text-sm"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {manager.name}
                  </h3>
                  <p
                    className="text-xs text-gray-600"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {manager.position}
                  </p>
                </div>
              </div>
              <div className="flex-1 min-w-0 overflow-x-auto max-h-[400px]">
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {manager.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
