import Image from "next/image";
import Link from "next/link";

export default function StructureDiagramMobile() {
  const buttonStyle = {
    writingMode: "vertical-lr",
    width: "18px",
    padding: "6px 3px",
    borderRadius: "3px",
    fontSize: "5px",
  };

  return (
    <div className="w-full flex justify-center items-center py-4">
      <div
        className="relative w-full"
        style={{
          aspectRatio: "1.39 / 1",
          maxWidth: "100%",
        }}
      >
        <Image
          src={"/mng/images/structure-diagram.png"}
          alt="Structure diagram"
          fill
          className="object-contain z-0"
        />

        {/* First column - top yellow box */}
        <Link
          href="/about/1/controlManagers"
          className="absolute z-10 border border-solid border-[#E3E3E3] whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
          style={{
            ...buttonStyle,
            top: "20%",
            left: "27%",
          }}
        >
          <p className="font-bold" style={{ fontSize: "5px" }}>
            ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
          </p>
        </Link>

        {/* First column - bottom yellow box */}
        <Link
          href="/about/1/managers"
          className="absolute z-10 border border-solid border-[#E3E3E3] whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
          style={{
            ...buttonStyle,
            top: "70%",
            left: "27%",
          }}
        >
          <p className="font-bold" style={{ fontSize: "5px" }}>
            ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
          </p>
        </Link>

        {/* Middle column - left yellow box (Network) */}
        <Link
          href="/about/1/chapterMembers"
          className="absolute z-10 border border-solid border-[#E3E3E3] whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
          style={{
            ...buttonStyle,
            top: "45%",
            left: "45%",
          }}
        >
          <p className="font-bold" style={{ fontSize: "5px" }}>
            ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
          </p>
        </Link>

        {/* Middle column - right yellow box (Committee) */}
        <Link
          href="/about/1/chapterMembers"
          className="absolute z-10 border border-solid border-[#E3E3E3] whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
          style={{
            ...buttonStyle,
            top: "45%",
            left: "65%",
          }}
        >
          <p className="font-bold" style={{ fontSize: "5px" }}>
            ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
          </p>
        </Link>

        {/* Right column - top yellow box */}
        <Link
          href="/about/1/chapterMembers"
          className="absolute z-10 border border-solid border-[#E3E3E3] whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
          style={{
            ...buttonStyle,
            top: "20%",
            left: "85%",
          }}
        >
          <p className="font-bold" style={{ fontSize: "5px" }}>
            ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
          </p>
        </Link>

        {/* Right column - bottom yellow box */}
        <Link
          href="/about/1/chapterMembers"
          className="absolute z-10 border border-solid border-[#E3E3E3] whitespace-nowrap flex items-center justify-center hover:brightness-105 transition-all bg-white hover:bg-gray-100"
          style={{
            ...buttonStyle,
            top: "72%",
            left: "85%",
          }}
        >
          <p className="font-bold" style={{ fontSize: "5px" }}>
            ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
          </p>
        </Link>
      </div>
    </div>
  );
}
