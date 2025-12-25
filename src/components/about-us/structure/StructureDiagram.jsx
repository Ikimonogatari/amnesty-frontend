import Image from "next/image";
import Link from "next/link";


export default function StructureDiagram() {
  // Max height: 85vh, Aspect ratio: 1.39:1, Max width: flexible (calculated from height)
  // All positioning uses percentages for responsive scaling
  return (
    <div className="w-full h-full flex justify-center items-center min-h-[600px]">
      <div 
        className="relative"
        style={{ 
          maxHeight: "85vh",
          minHeight: "600px",
          maxWidth: "100%",
          width: "100%",
          aspectRatio: "1.39 / 1",
          fontSize: "clamp(10px, 1.2vw, 16px)", // Base font size that scales with viewport
        }}
      >
        <Image
          src={"/mng/images/structure-diagram.png"}
          alt="Structure diagram"
          fill
          className="object-contain z-0"
        />
        {/* Links container - all values converted to percentages */}
        <div 
          className="z-10 absolute"
          style={{
            top: "27.6%", // 260/942
            left: "26.3%", // 330/1255
            width: "73.7%", // (1255-330)/1255
            height: "72.4%", // (942-260)/942
          }}
        >
          {/* First column */}
          <div 
            className="absolute flex flex-col"
            style={{
              top: "0%",
              left: "3%",
              gap: "57.2%", // 390/682 (relative to links container height)
            }}
          >
            <Link
              href="/about/1/control-managers"
              className="border border-solid border-[#E3E3E3] max-h-min whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
              style={{ 
                writingMode: "vertical-lr",
                width: "3.2em",
                padding: "0.75em 0.5em",
                borderRadius: "0.625em",
                fontSize: "0.8em",
              }}
            >
              <p className="font-bold" style={{ fontSize: "inherit" }}>ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ</p>
            </Link>
          </div>
          <div 
            className="absolute flex flex-col"
            style={{
              top: "74%",
              left: "3%",
              gap: "57.2%", // 390/682 (relative to links container height)
            }}
          >
            <Link
              href="/about/1/managers"
              className="border border-solid border-[#E3E3E3] max-h-min whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
              style={{ 
                writingMode: "vertical-lr",
                width: "3.2em",
                padding: "0.75em 0.5em",
                borderRadius: "0.625em",
                fontSize: "0.8em",
              }}
            >
              <p className="font-bold" style={{ fontSize: "inherit" }}>ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ</p>
            </Link>
          </div>
          
          {/* Second column */}
          <Link
            href="/about/1/chapter-members"
            className="absolute border border-solid border-[#E3E3E3] max-h-min whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
            style={{ 
              writingMode: "vertical-lr",
              left: "28.9%", // 212/925 (212px gap relative to 925px container width)
              top: "35.9%", // 245/682 (relative to links container height)
              width: "3.2em",
              padding: "0.75em 0.5em",
              borderRadius: "0.625em",
              fontSize: "0.8em",
            }}
          >
            <p className="font-bold" style={{ fontSize: "inherit" }}>ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ</p>
          </Link>
          {/* Third column */}
          <Link
            href="/about/1/chapter-members"
            className="absolute border border-solid border-[#E3E3E3] max-h-min whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
            style={{ 
              writingMode: "vertical-lr",
              left: "55.8%", // 424/925 (424px from start = 212px gap * 2)
              top: "37.4%", // 255/682 (relative to links container height)
              width: "3.2em",
              padding: "0.75em 0.5em",
              borderRadius: "0.625em",
              fontSize: "0.8em",
            }}
          >
            <p className="font-bold" style={{ fontSize: "inherit" }}>ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ</p>
          </Link>
          {/* Fourth column */}
          <div 
            className="absolute flex flex-col"
            style={{
              left: "82%", // 636/925 (636px from start = 212px gap * 3)
              top: "0%",
              gap: "57.2%", // 390/682 (relative to links container height)
            }}
          >
            <Link
              href="/about/1/chapter-members"
              className="border border-solid border-[#E3E3E3] max-h-min whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
              style={{ 
                writingMode: "vertical-lr",
                width: "3.2em",
                padding: "0.75em 0.5em",
                borderRadius: "0.625em",
                fontSize: "0.8em",
              }}
            >
              <p className="font-bold" style={{ fontSize: "inherit" }}>ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ</p>
            </Link>
          </div>
          <div 
            className="absolute flex flex-col"
            style={{
              left: "82%", // 636/925 (636px from start = 212px gap * 3)
              top: "72%",
              gap: "57.2%", // 390/682 (relative to links container height)
            }}
          >
            <Link
              href="/about/1/chapter-members"
              className="border border-solid border-[#E3E3E3] max-h-min whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
              style={{ 
                writingMode: "vertical-lr",
                width: "3.2em",
                padding: "0.75em 0.5em",
                borderRadius: "0.625em",
                fontSize: "0.8em",
              }}
            >
              <p className="font-bold" style={{ fontSize: "inherit" }}>ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ</p>
            </Link>
          </div>
        </div>
        {/* Text labels container - all values converted to percentages */}
        <div 
          className="z-0 absolute whitespace-nowrap font-bold"
          style={{
            top: "18.0%", // 170/942
            left: "8.0%", // 100/1255
            width: "92.0%", // (1255-100)/1255 = 1155px
            height: "82.0%", // (942-170)/942 = 772px
            fontSize: "1.125em", // Scales with container base font size
          }}
        >
          <p
            className="absolute text-black"
            style={{
              writingMode: "vertical-lr",
              top: "38.2%", // 295/772 (relative to text container height)
              left: "2.5%", // 0/1155 (relative to text container width)
              fontSize: "12px",
            }}
          >
            ᠴᠢᠭᠤᠯᠭᠠᠨ
          </p>
          <p
            className="absolute text-black"
            style={{
              writingMode: "vertical-lr",
              top: "0%", // 0/772 (relative to text container height)
              left: "14%", // 125/1155 (relative to text container width)
              fontSize: "12px",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
          </p>
          <p
            className="absolute text-black"
            style={{
              writingMode: "vertical-lr",
              top: "65%", // 320/772 (relative to text container height)
              left: "14%", // 125/1155 (relative to text container width)
              fontSize: "12px",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
          </p>
          <p
            className="absolute text-black"
            style={{
              writingMode: "vertical-lr",
              top: "31.7%", // 245/772 (relative to text container height)
              left: "34.8%", // 240/1155 (relative to text container width)
              fontSize: "12px",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
          </p>
          <p
            className="absolute text-black"
            style={{
              writingMode: "vertical-lr",
              top: "31.7%", // 245/772 (relative to text container height)
              left: "56.5%", // 230/1155 (relative to text container width)
              fontSize: "12px",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
          </p>
          <p
            className="absolute text-black"
            style={{
              writingMode: "vertical-lr",
              top: "-0.5%", // -4/772 (relative to text container height)
              left: "78.3%", // 235/1155 (relative to text container width)
              fontSize: "12px",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
          </p>
          <p
            className="absolute text-black"
            style={{
              writingMode: "vertical-lr",
              top: "64.5%", // 336/772 (relative to text container height)
              left: "78.3%", // 235/1155 (relative to text container width)
              fontSize: "12px",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
          </p>
        </div>
      </div>
    </div>
  );
}
