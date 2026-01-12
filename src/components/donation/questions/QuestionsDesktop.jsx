import { useRouter } from "next/router";
import StaticHeader from "@/components/common/StaticHeader";

export default function QuestionsDesktop() {
  const router = useRouter();
  return (
    <div className="h-full hidden sm:flex gap-20 w-auto flex-shrink-0">
      <StaticHeader
        image="/mng/images/donate/questions/header-img-donation-qa.jpg"
        alt="Questions Page Header"
        width="90rem"
        title="ᠬᠠᠨᠳᠢᠪ ᠤ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷᢈᠢ ᠲᠦᢉᠡᠮᠡᠯ ᠠᠰᠠᠭᠤᠯᠲᠠ ᠬᠠᠷᠢᠭᠤᠯᠲᠠ"
      />

      <div className="h-full flex gap-10 mr-4">
        <div className="bg-[#ECECEC] flex gap-4 p-8">
          <h5 className="text-2xl font-bold" style={{ writingMode: "vertical-lr" }}>
            ᠮᠢᠨᠤ ᠲᠥᠯᠦᢉᠰᠡᠨ ᠬᠠᠨᠳᠢᠪ ᢈᠡᠷᢈᠢᠨ ᠵᠠᠷᠤᠴᠠᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ ᠪᠤᠢ?
          </h5>
          <p className="text-sm" style={{ writingMode: "vertical-lr" }}>
            ᠲᠠᠨ ᠤ᠋ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠬᠠᠨᠳᠢᠪ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠤᠯᠤᠰ ᠣᠷᠤᠨ ᠨᠤᠭᠤᠳ ᠲᠤ ᠪᠣᠯᠵᠤ ᠪᠤᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠢ᠋ ᠪᠠᠷᠢᠮᠲᠠᠵᠢᠭᠤᠯᠬᠤ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᠵᠦ᠂ 
            ᠨᠥᠯᠦᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠠᠵᠢᠯ᠂ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠢᠳᠡᠪᢈᠢᠨ ᠨᠦ᠋ᢉᠦᠳ ᠢ᠋ ᠳᠡᠮᠵᠢᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠲᠦᢉᠡᢉᠡᢈᠦ 
            ᠰᠤᠷᠭᠠᠯᠲᠠ᠂ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠬᠤ ᠳ᠋ᠤ ᠵᠠᠷᠤᠴᠠᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ᠃ <br />
            ᠲᠠ ᠮᠠᠨ ᠤ᠋ ᠲᠠᠶᠢᠯᠤᠨ ᠠ᠋ᠴᠠ ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ ᠤᠩᠰᠢᠨ᠎ᠠ ᠤᠤ᠃
          </p>
        </div>
        <div className="bg-white flex gap-4 p-8">
          <h5 className="text-2xl font-bold" style={{ writingMode: "vertical-lr" }}>
            ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠲᠡᠢ ᠬᠣᠯᠪᠤᠭᠠᠲᠠᠢ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠢ᠋ᠶᠠᠷ ᢈᠡᠨ ᠲᠡᠢ ᠬᠣᠯᠪᠤᠭᠳᠠᠬᠤ ᠪᠤᠢ?
          </h5>
          <p className="text-sm" style={{ writingMode: "vertical-lr" }}>
            ᠲᠠ ᠮᠣᠩᠭᠤᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ ᠗᠐᠐᠐-᠔᠗᠐᠖ ᠤᠲᠠᠰᠤ ᠪᠠᠷ ᠬᠣᠯᠪᠤᠭᠳᠠᠭᠠᠷᠠᠢ᠃
          </p>
        </div>
        <div className="bg-[#ECECEC] flex gap-4 p-8">
          <h5 className="text-2xl font-bold" style={{ writingMode: "vertical-lr" }}>
            ᠰᠠᠷ᠎ᠠ ᠪᠦᠷᠢ ᠬᠠᠨᠳᠢᠪᠯᠠᠬᠤ ᠦᠨ᠎ᠡ ᠶ᠋ᠢᠨ ᠳ᠋ᠦᠩ ᠢ᠋ᠶᠡᠨ ᢈᠡᠷᢈᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᢈᠦ ᠪᠣᠯᠤᠨ ᠴᠤᠴᠠᠯᠠᠬᠤ ᠪᠤᠢ?
          </h5>
          <p className="text-sm" style={{ writingMode: "vertical-lr" }}>
            ᠲᠠ ᠮᠣᠩᠭᠤᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ ᠗᠐᠐᠐-᠔᠗᠐᠖ ᠤᠲᠠᠰᠤ ᠪᠠᠷ᠂ ᠡᠰᠡᠪᠡᠯ ᠥᠪᠡᠷ ᠦ᠋ᠨ ᠬᠠᠷᠢᠯᠴᠠᠳᠠᠭ ᠪᠠᠩᠻᠢ ᠲᠠᠢ ᠬᠣᠯᠪᠤᠭᠳᠠᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃
          </p>
        </div>
        <div className="bg-white flex gap-4 p-8">
          <h5 className="text-2xl font-bold" style={{ writingMode: "vertical-lr" }}>
            ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯ ᠦ᠋ᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠵᠣᠷᠢᠭᠤᠯᠵᠤ ᠪᠡᠯᠡᢉ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠪᠡᠶᠡᠲᠦ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ ᠤᠤ?
          </h5>
          <p className="text-sm" style={{ writingMode: "vertical-lr" }}>
            ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ᠃  ᠲᠠ ᠗᠐᠐᠐-᠔᠗᠐᠖ ᠤᠲᠠᠰᠤ ᠪᠠᠷ ᠬᠣᠯᠪᠤᠭᠳᠠᠵᠤ ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ ᠶᠠᠷᠢᠯᠴᠠᠭᠠᠷᠠᠢ᠃
          </p>
        </div>
        <div className="bg-[#ECECEC] flex gap-4 p-8">
          <h5 className="text-2xl font-bold" style={{ writingMode: "vertical-lr" }}>
            ᠮᠠᠨ ᠤ᠋ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠲᠠᠨ ᠤ᠋ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠶ᠋ᠢ ᠳᠡᠮᠵᠢᢈᠦ ᢈᠦᠰᠡᠯ ᠲᠡᠢ ᠪᠠᠶᠢᠨ᠎ᠠ᠂ ᢈᠡᠷᢈᠢᠨ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠪᠤᠢ?
          </h5>
          <p className="text-sm" style={{ writingMode: "vertical-lr" }}>
            ᠲᠠ ᠗᠐᠐᠂᠐᠐᠐₮ ᢈᠦᠷᠲᠡᠯᠡᢈᠢ ᠦᠨ᠎ᠡ ᠶ᠋ᠢᠨ ᠳ᠋ᠦᠩᠲᠡᠢ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠪᠣᠯ ᠰᠢᠭᠤᠳ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠰᠤᠪᠠᠭ ᠢ᠋ᠶᠠᠷ ᠳᠠᠮᠵᠢᠭᠤᠯᠤᠨ ᠢᠯᠡᢉᠡᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃  
            ᠢᠩᢉᠢᢈᠦ ᠳ᠋ᠦ ᠪᠡᠨ ᢉᠦᠢᠯᢉᠡᢉᠡᠨ ᠦ᠋ ᠤᠳᠬ᠎ᠠ ᠳᠡᢉᠡᠷ᠎ᠡ ᠥᠪᠡᠷ ᠦ᠋ᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠨᠡᠷ᠎ᠡ ᠶ᠋ᠢ ᠵᠠᠪᠠᠯ ᠪᠢᠴᠢᠨ᠎ᠡ ᠦᠦ᠃  ᠗᠐᠐᠂᠐᠐᠐₮- ᠡᠴᠡ 
            ᠳᠡᢉᠡᢉᠰᠢ ᠦᠨ᠎ᠡ ᠶ᠋ᠢᠨ ᠳ᠋ᠦᠩ ᠲᠡᠢ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠪᠣᠯ ᠗᠐᠐᠐-᠔᠗᠐᠖ ᠤᠲᠠᠰᠤ ᠪᠠᠷ ᠬᠣᠯᠪᠤᠭᠳᠠᠨ᠎ᠠ ᠤᠤ᠃
          </p>
        </div>
        <div className="bg-[#fcff5d] flex gap-4 p-8">
          <h5 className="text-2xl font-bold" style={{ writingMode: "vertical-lr" }}>
            ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠳ᠋ᠦ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ
          </h5>
          <p className="text-sm" style={{ writingMode: "vertical-lr" }}>
            ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠰᠢᠨ᠋ᠯ ᠨᠢ ᠠᠯᠢᠪᠠ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ᠂ ᠤᠯᠤᠰ ᠲᠥᠷᠦ ᠶ᠋ᠢᠨ ᠦᠵᠡᠯ ᠰᠤᠷᠲᠠᠯ᠂ ᠡᠳ᠋ ᠦ᠋ᠨ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠠᠰᠢᠭ ᠰᠣᠨᠢᠷᠬᠠᠯ᠂ 
            ᠱᠠᠰᠢᠨ ᠰᠢᠲᠦᠯᢉᠡ ᠡᠴᠡ ᠠᠩᢉᠢ ᠳ᠋ᠤ ᠪᠡᠶ᠎ᠡ ᠳᠠᠭᠠᠭᠠᠭᠰᠠᠨ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠪᠠᠨ ᠶᠠᠪᠤᠭᠤᠯᠳᠠᠭ᠃  ᠡᠶᠢᠮᠦ ᠳ᠋ᠦ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ 
            ᠭᠣᠣᠯ ᠰᠠᠩᢈᠦᠵᠢᠯᠲᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠰᠠᠨᠠᠭ᠎ᠠ ᠲᠠᠯᠪᠢᠵᠤ᠂ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ ᠣᠷᠤᠭᠤᠯᠳᠠᠭ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠰ ᠦ᠋ᠨ ᠬᠠᠨᠳᠢᠪ ᠠ᠋ᠴᠠ 
            ᠪᠦᠷᠢᠳᠳᠡᢉ᠃  ᠲᠠ ᠴᠤ ᠪᠠᠰᠠ ᠬᠠᠨᠳᠢᠪ ᠥᢉᠴᠦ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠶ᠋ᠢ ᠳᠡᠮᠵᠢᢉᠡᠷᠡᠢ᠃
          </p>
          <div 
            className="border border-black p-4 rounded-lg h-40 cursor-pointer flex items-center justify-center hover:bg-yellow-100 transition-colors"
            onClick={() => router.push("/donate")}
          >
            <p className="text-sm" style={{ writingMode: "vertical-lr" }}>
              ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
