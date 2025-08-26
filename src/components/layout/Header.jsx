import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "@/components/common/Button";
import Link from "next/link";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  // Menu items for the 2x4 grid
  const menuItems = [
    { text: "ᠪᠢᠳᠨᠢ ᠲᠤᠬᠠᠢ", hasDropdown: true },
    { text: "ᠬᠠᠮᠫᠠᠨᠢᠲ ᠠᠵᠢᠯ", link: "/campaign" },
    { text: "ᠲᠠᠨᠢ ᠣᠷᠣᠯᠴᠣᠭ", link: "/participation" },
    { text: "ᠮᠡᠳᠡᢉᠡ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ", link: "/news" },
    { text: "ᠡᠷᠬᠡᢉᠡ ᠮᠡᠳᠢᠶᠡ", link: "/right" },
    { text: "ᠭᠢᠰᠦᠦᠨᠴᠢᠯᠡᠯ", link: "/member" },
    { text: "ᠬᠠᠨᠳᠢᠪ", link: "/donation" },
    { text: "ᠬᠣᠯᠪᠣᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ", link: "/contact" },
  ];

  return (
    <div className="h-full min-w-[100px] inline-flex flex-col justify-between bg-white border-r border-[#E3E3E3] z-20">
      <div className="flex flex-col items-center">
        <Link href="/" className="py-4 px-2">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </Link>
        <div className="mt-4 px-2">
          {/* 2x4 Grid Layout */}
          <div className="grid grid-cols-2 gap-2">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                {item.hasDropdown ? (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-3 cursor-pointer hover:bg-gray-100 rounded-md transition-colors text-center">
                      <p
                        className="text-black font-bold text-sm"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                    {showDropdown && (
                      <div className="absolute left-[38px] top-[-30px] bg-white rounded-xl p-6 w-auto z-30 border border-[#E3E3E3]">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-10">
                            <div className="flex flex-col items-center cursor-pointer group">
                              <p
                                className="text-black font-bold group-hover:text-[#444] transition-colors"
                                style={{
                                  writingMode: "vertical-lr",
                                  textOrientation: "upright",
                                }}
                              >
                                ᠪᠢᠳᠡ ᢈᠡᠨ ᠪᠤᠢ?
                              </p>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <p
                                className="text-black font-bold group-hover:text-[#444] transition-colors"
                                style={{
                                  writingMode: "vertical-lr",
                                  textOrientation: "upright",
                                }}
                              >
                                ᠪᠢᠳᠡ ᠶᠠᠭᠤ ᢈᠢᠳᠡᢉ ᠪᠤᠢ?
                              </p>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <p
                                className="text-black font-bold group-hover:text-[#444] transition-colors"
                                style={{
                                  writingMode: "vertical-lr",
                                  textOrientation: "upright",
                                }}
                              >
                                ᠪᠢᠳᠡᠨ ᠦ᠋ ᠲᠡᠦᢈᠡ
                              </p>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <p
                                className="text-black font-bold group-hover:text-[#444] transition-colors"
                                style={{
                                  writingMode: "vertical-lr",
                                  textOrientation: "upright",
                                }}
                              >
                                ᠪᠢᠳᠡᠨ ᠦ᠋ ᠠᠵᠢᠯ
                              </p>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <p
                                className="text-black font-bold group-hover:text-[#444] transition-colors"
                                style={{
                                  writingMode: "vertical-lr",
                                  textOrientation: "upright",
                                }}
                              >
                                ᠬᠣᠯᠪᠣᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : item.link ? (
                  <Link href={item.link}>
                    <div className="p-3 cursor-pointer hover:bg-gray-100 rounded-md transition-colors text-center">
                      <p
                        className="text-black font-bold text-sm"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="p-3 cursor-pointer hover:bg-gray-100 rounded-md transition-colors text-center">
                    <p
                      className="text-black font-bold text-sm"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-5 gap-5">
        <button className="text-base text-black px-3 py-2 rounded border border-[#E3E3E3] hover:bg-gray-50 transition-colors">
          MNG
        </button>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#432C2C] to-transparent via-50%" />
        <button className="p-4 hover:bg-gray-100 rounded-md transition-colors">
          <Icon icon={"lucide:search"} fontSize={25} />
        </button>
        <Button text={"ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠳᠡᠯᢉᠡᢉᠦᠷ"} type="primary" />
      </div>
    </div>
  );
}
