import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import ReportSwiper from "./ReportSwiper";
import { useRouter } from "next/router";
import StaticHeader from "@/components/common/StaticHeader";
import { useGetReportsQuery } from "@/redux/services/apiService";

export default function ReportMobile() {
  const router = useRouter();

  // Use RTK Query for better caching and state management
  const {
    data: reportsData,
    isLoading: loading,
    error: queryError,
  } = useGetReportsQuery({
    pageSize: 100, // Get all reports
  });

  const reports = reportsData || [];
  const error = queryError?.message;

  if (loading) {
    return (
      <div className="block sm:hidden">
        <BannerSlider images={bannerImages} width="90rem" />
        <div className="flex items-center justify-center h-64">
          <p
            className="text-lg font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠠᠴᠢᠶᠠᠯᠠᠨ ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠢᠨ᠎ᠠ...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="block sm:hidden">
        <BannerSlider images={bannerImages} width="90rem" />
        <div className="flex items-center justify-center h-64">
          <p
            className="text-lg font-bold text-red-600"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠠᠯᠳᠠᠭᠠ ᠭᠠᠷᠪᠠ᠃ ᠳᠠᠬᠢᠨ ᠳᠤᠷᠠᠳᠬᠤ ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ᠃
          </p>
        </div>
      </div>
    );
  }

  const reportItems = reports || [];

  return (
    <div className="block sm:hidden">
      <StaticHeader
        image="/mng/images/header-img.png"
        alt="Report Page Header"
        width="100%"
        title="ᠲᠠᠶᠢᠯᠠᠨ"
      />
      <div className="flex flex-col gap-8 h-full">
        <ReportSwiper
          title={"ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ"}
          description={
            "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠲᠦᢉᠡᢉᠡᠨ ᠳᠡᠯᢉᠡᠷᠡᢉᠦᠯᢈᠦ᠂ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠦᠢᠯᠡᠰ ᠲᠦ ᠮᠠᠨ ᠤ᠋ ᢉᠡᠰᠢᢉᠦᠳ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠥᠪᠡᠷᠰᠡᠳ ᠦ᠋ᠨ ᠴᠠᠭ ᠵᠠᠪ᠂ ᠰᠡᠳᢈᠢᠯ ᠵᠢᠷᠦᢈᠡ ᠪᠡᠨ ᠵᠣᠷᠢᠭᠤᠯᠵᠤ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠳ᠋ᠦ ᠡᢉᠡᠯᠢᠲᠡᠢ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢ ᠪᠠᠶᠢᠭᠤᠯᠬᠤ ᠳ᠋ᠤ ᢉᠡᠰᠢᢉᠦᠨ ᠦ᠋ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ᠂ ᠲᠠᠲᠠᠪᠤᠷᠢ ᠶᠠᠭᠤ ᠶᠠᠭᠤᠨ ᠠ᠋ᠴᠠ ᠴᠤ ᠢᠯᠡᢉᠦᠦ ᠴᠢᠬᠤᠯᠠ ᠪᠠᠶᠢᠳᠠᠭ᠃ ᠲᠡᠶᠢᠮᠦ ᠡᠴᠡ ᠪᠢᠳᠡ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠢ᠋ᠶᠡᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠬᠠᠨᠳᠢᠪᠯᠠᠭᠰᠠᠨ ᠴᠠᠭ᠂ ᠲᠥᠯᠦᢉᠰᠡᠨ ᠲᠠᠲᠠᠪᠤᠷᠢ᠂ ᠪᠠᠬᠠᠷᠬᠠᠵᠤ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠲᠠᠶᠢᠯᠤᠨ ᠳ᠋ᠤ ᠪᠠᠨ ᠳᠤᠷᠠᠳᠳᠠᠭ᠃"
          }
          sectionTitle={"ᠪᠢᠳᠡ ᢈᠡᠷᢈᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᢈᠢᠳᠡᢉ ᠪᠤᠢ?"}
          reports={reportItems}
        />
        <div className={`h-full flex flex-row`}>
          <div className="max-h-[200px] flex items-center justify-center w-full h-full bg-[#F1F1F1]">
            <h2
              className={`text-[11px] font-bold py-4`}
              style={{ writingMode: "vertical-lr" }}
            >
              ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ ᠰᠲ᠋ᠷᠠᠲ᠋ᠧᢉᠢ ᠶ᠋ᠢᠨ ᠵᠣᠷᠢᠯᠲᠠ
            </h2>
          </div>
          <div className="max-h-[200px] flex items-center justify-center w-full h-full bg-[#FFFF00]">
            <h2
              className={`text-[11px] font-bold py-4`}
              style={{ writingMode: "vertical-lr" }}
            >
              ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠳᠡᢉᠡᠳᠦᠯᠡᠳᠡᢉ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ
            </h2>
          </div>
          <div className="max-h-[200px] flex items-start justify-center w-full h-full bg-black">
            <h2
              className={`text-[11px] font-bold text-[#FFFF00] py-4`}
              style={{ writingMode: "vertical-lr" }}
            >
              ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ
            </h2>
            <h2
              className={`text-[11px] font-bold text-white py-4`}
              style={{ writingMode: "vertical-lr" }}
            >
              ᠨᠡᠩ ᠲᠡᠷᠢᢉᠦᠨ ᠳ᠋ᠦ ᠠᠩᠬᠠᠷᠴᠤ ᠠᠵᠢᠯᠯᠠᠬᠤ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠰᠲ᠋ᠷᠠᠲ᠋ᠧᢉᠢ
              ᠵᠣᠷᠢᠯᠲᠠ
            </h2>
          </div>
        </div>
        <div className="flex flex-row gap-5 w-full h-full overflow-x-auto p-4">
          {staticItems.map((report, i) => (
            <div
              key={report.id || i}
              className="flex flex-col gap-2 w-full h-full"
            >
              <div className="w-8 h-8 text-xl font-bold aspect-square rounded-sm flex items-center justify-center bg-black text-[#FFFF00]">
                {i + 1}
              </div>
              <div className="flex gap-2 max-h-[300px]">
                <h2
                  className="text-xs font-bold"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {report.attributes?.title ||
                    report.title ||
                    `ᠲᠠᠶᠢᠯᠤᠨ ${i + 1}`}
                </h2>
                <p
                  className="text-[10px]"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {report.attributes?.description ||
                    report.description ||
                    "ᠲᠠᠢᠯᠪᠤᠷᠢ ᠦᢉᠡᠢ"}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 p-4">
          <div className="flex gap-2 max-h-[200px] overflow-x-auto">
            <h2
              className="text-xs font-bold"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠰᠠᠩᢈᠦᠵᠢᠯᠲᠡ
            </h2>
            <p
              className="text-[10px]"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠱᠢᠨ᠋ᠯ ᠨᠢ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠠᠷᠴᠢᠮ
              ᠤ᠋ᠳ ᠢ᠋ ᠪᠠᠷᠢᠮᠲᠠᠯᠠᠳᠠᠭ ᠪᠥᢉᠡᠳ ᠡᠨᠡ ᠨᠢ ᠪᠢᠳᠡ ᠠᠯᠢ ᠨᠢᢉᠡ ᠦᠵᠡᠯ ᠰᠤᠷᠲᠠᠯ᠂ ᠤᠯᠤᠰ
              ᠲᠥᠷᠦ᠂ ᠱᠠᠰᠢᠨ ᠤ᠋ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠲᠥᠷᠦ᠂ ᠨᠡᠶᠢᢉᠡᠮ ᠦ᠋ᠨ ᠵᠠᠭᠪᠤᠷ ᠢ᠋ ᠳᠡᠮᠵᠢᠳᠡᢉ
              ᠦᢉᠡᠢ ᢉᠡᠰᠡᠨ ᠦᢉᠡ ᠶᠤᠮ᠃ ᠪᠢᠳᠡ ᠠᠵᠢᠯ ᠳ᠋ᠤ ᠪᠠᠨ ᠲᠥᠪ ᠢ᠋ ᠰᠠᢈᠢᠭᠰᠠᠨ᠂ ᠰᠢᠳᠤᠷᠭᠤ
              ᠬᠠᠨᠳᠤᠬᠤ ᠶ᠋ᠢᠨ ᠲᠤᠯᠠᠳᠠ ᠰᠤᠳᠤᠯᠭ᠎ᠠ᠂ ᠰᠤᠷᠲᠠᠯᠴᠢᠯᠠᠭᠠᠨ ᠤ᠋ ᠠᠵᠢᠯ ᠳ᠋ᠤ ᠲᠥᠷᠦ ᠡᠴᠡ
              ᠶᠠᠮᠠᠷ ᠴᠤ ᠰᠠᠩᢈᠦᠵᠢᠯᠲᠡ ᠠᠪᠬᠤ ᠦᢉᠡᠢ᠃ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠶ᠋ᠢᠨ ᠰᠠᠩᢈᠦᠵᠢᠯᠲᠡ ᠶ᠋ᠢᠨ
              ᠳᠡᠶᠢᠯᠦᠩᢈᠢ ᠬᠤᠪᠢ ᠶ᠋ᠢ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠬᠠᠨᠳᠢᠪ ᠠ᠋ᠴᠠ ᠪᠦᠷᠢᠳᠦᢉᠦᠯᠳᠡᢉ᠃ ᠡᠳᠡᢉᠡᠷ
              ᠬᠤᠪᠢ ᠶ᠋ᠢᠨ ᠪᠣᠯᠤᠨ ᠬᠠᠮᠢᠶᠠᠷᠤᠯ ᠦᢉᠡᠢ ᠬᠠᠨᠳᠢᠪ ᠨᠢ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲᠧᠷᠨᠧᠰᠢᠨ᠋ᠯ ᠨᠢ
              ᠠᠯᠢᠪᠠ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ᠂ ᠤᠯᠤᠰ ᠲᠥᠷᠦ ᠶ᠋ᠢᠨ ᠦᠵᠡᠯ ᠰᠤᠷᠲᠠᠯ᠂ ᠡᠳ᠋ ᠦ᠋ᠨ ᠵᠠᠰᠠᠭ
              ᠤ᠋ᠨ ᠠᠰᠢᠭ ᠰᠣᠨᠢᠷᠬᠠᠯ᠂ ᠱᠠᠰᠢᠨ ᠰᠢᠲᠦᠯᢉᠡ ᠡᠴᠡ ᠪᠦᠷᠢᠨ ᠬᠠᠷᠠᠭᠠᠲᠤ ᠪᠤᠰᠤ ᠪᠠᠶᠢᠬᠤ
              ᠪᠣᠯᠤᠮᠵᠢ ᠶ᠋ᠢ ᠣᠯᠭᠠᠳᠠᠭ᠃ ᠪᠢᠳᠡ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠪᠣᠯᠤᠨ ᠤᠯᠤᠰ ᠲᠥᠷᠦ ᠶ᠋ᠢᠨ ᠨᠠᠮ
              ᠤ᠋ᠳ ᠠ᠋ᠴᠠ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠰᠤᠳᠤᠯᠭᠠᠨ ᠳ᠋ᠤ ᠵᠣᠷᠢᠭᠤᠯᠵᠤ ᠶᠠᠮᠠᠷ ᠨᠢᢉᠡᠨ
              ᠰᠠᠩᢈᠦᠦᠵᠢᢉᠦᠯᠦᠯᠲᠡ ᠬᠠᠶᠢᠳᠠᠭ ᠦᢉᠡᠢ᠂ ᢈᠦᠯᠢᠶᠡᠨ ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠳᠡᢉ ᠦᢉᠡᠢ ᠪᠥᢉᠡᠳ
              ᠵᠥᠪᢈᠡᠨ ᠰᠠᠶᠢᠲᠤᠷ ᠰᠢᠯᠭᠠᠭᠳᠠᠭᠰᠠᠨ ᠪᠢᠽᠢᠨᠧᠰ ᠡᠷᢈᠢᠯᠡᢉᠴᠢᠳ ᠡᠴᠡ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠠᠪᠳᠠᠭ᠃
              ᠬᠤᠪᠢ ᢈᠦᠮᠦᠰ ᠡᠴᠡ ᠬᠠᠨᠳᠢᠪ ᠴᠤᠭᠯᠠᠭᠤᠯᠬᠤ ᠶᠣᠰᠤ ᠵᠦᠢ ᠲᠡᠢ ᠬᠠᠨᠳᠢᠪ ᠴᠤᠭᠯᠠᠭᠤᠯᠬᠤ
              ᠵᠠᠮ ᠢ᠋ᠶᠠᠷ ᠪᠢᠳᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠨᠡᠶᠢᠲᠡᠯᠢᢉ᠂ ᠬᠤᠪᠢᠶᠠᠭᠳᠠᠰᠢ ᠦᢉᠡᠢ ᠡᠷᢈᠡ ᠶ᠋ᠢ
              ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠶ᠋ᠢᠨ ᠲᠤᠯᠠᠳᠠ ᠲᠤᠭᠤᠰᠢᠲᠠᠢ᠂ ᠭᠤᠶᠢᠪᠢᠰᠢ ᠦᢉᠡᠢ ᠵᠣᠭᠰᠤᠳᠠᠭ᠃ ᠰᠠᠩᢈᠦᠦ
              ᠶ᠋ᠢᠨ ᠲᠠᠶᠢᠯᠤᠨ ᠢ᠋ ᠵᠢᠯ ᠦ᠋ᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠲᠠᠶᠢᠯᠤᠨ ᠠ᠋ᠴᠠ ᠠᠪᠬᠤ
              ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃
            </p>
          </div>
          <div className="flex gap-4">
            <h2
              className="text-xs font-bold"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠪᠢᠳᠡᠨ ᠦ᠋ ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ ᠳ᠋ᠦ ᠨᠢᢉᠡᠳᠦ᠋ᢉᠡᠷᠡᠢ
            </h2>
            <Button
              text={"ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ"}
              type="primary"
              className="max-h-min whitespace-nowrap"
              onClick={() => router.push("/donate")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const staticItems = [
  {
    title:
      "ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠵᠦ ᠴᠢᠳᠠᠳᠠᠭ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ",
    description:
      "ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠦᢉᠡ ᢈᠡᠯᠡᢈᠦ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠢ᠋ᠶᠡᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᢈᠦ᠂ ᠬᠤᠷᠠᠨ ᠴᠢᠭᠤᠯᠬᠤ᠂ ᠰᠢᠳᠤᠷᠭᠤ ᠪᠤᠰᠤ ᠶᠠᠪᠤᠳᠠᠯ ᠢ᠋ ᠲᠠᠰᠤᠯᠤᠨ ᠵᠣᠭᠰᠤᠭᠠᠬᠤ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠷᢈᠡ ᠪᠡᠨ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ ᠪᠣᠯᠬᠤ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᠠᠶᠤᠯ ᠦᢉᠡᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠢ᠋ ᠬᠠᠩᠭᠠᠵᠤ᠂ ᠲᠡᠳᠡᠨ ᠳ᠋ᠦ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᠵᠡᢉᠦᠯᠳᠡᢉ ᠪᠠᠶᠢᠬᠤ᠃  ᢈᠦᠮᠦᠰ ᠢ᠋ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ ᠪᠣᠯᠭᠠᠵᠤ ᠴᠢᠳᠠᠪᢈᠢᠵᠢᠭᠤᠯᠬᠤ᠃",
  },
  {
    title:
      "ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠵᠦ ᠴᠢᠳᠠᠳᠠᠭ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ",
    description:
      "ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠦᢉᠡ ᢈᠡᠯᠡᢈᠦ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠢ᠋ᠶᠡᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᢈᠦ᠂ ᠬᠤᠷᠠᠨ ᠴᠢᠭᠤᠯᠬᠤ᠂ ᠰᠢᠳᠤᠷᠭᠤ ᠪᠤᠰᠤ ᠶᠠᠪᠤᠳᠠᠯ ᠢ᠋ ᠲᠠᠰᠤᠯᠤᠨ ᠵᠣᠭᠰᠤᠭᠠᠬᠤ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠷᢈᠡ ᠪᠡᠨ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ ᠪᠣᠯᠬᠤ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᠠᠶᠤᠯ ᠦᢉᠡᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠢ᠋ ᠬᠠᠩᠭᠠᠵᠤ᠂ ᠲᠡᠳᠡᠨ ᠳ᠋ᠦ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᠵᠡᢉᠦᠯᠳᠡᢉ ᠪᠠᠶᠢᠬᠤ᠃  ᢈᠦᠮᠦᠰ ᠢ᠋ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ ᠪᠣᠯᠭᠠᠵᠤ ᠴᠢᠳᠠᠪᢈᠢᠵᠢᠭᠤᠯᠬᠤ᠃",
  },
  {
    title:
      "ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠵᠦ ᠴᠢᠳᠠᠳᠠᠭ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ",
    description:
      "ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠦᢉᠡ ᢈᠡᠯᠡᢈᠦ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠢ᠋ᠶᠡᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᢈᠦ᠂ ᠬᠤᠷᠠᠨ ᠴᠢᠭᠤᠯᠬᠤ᠂ ᠰᠢᠳᠤᠷᠭᠤ ᠪᠤᠰᠤ ᠶᠠᠪᠤᠳᠠᠯ ᠢ᠋ ᠲᠠᠰᠤᠯᠤᠨ ᠵᠣᠭᠰᠤᠭᠠᠬᠤ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠷᢈᠡ ᠪᠡᠨ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ ᠪᠣᠯᠬᠤ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᠠᠶᠤᠯ ᠦᢉᠡᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠢ᠋ ᠬᠠᠩᠭᠠᠵᠤ᠂ ᠲᠡᠳᠡᠨ ᠳ᠋ᠦ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᠵᠡᢉᠦᠯᠳᠡᢉ ᠪᠠᠶᠢᠬᠤ᠃  ᢈᠦᠮᠦᠰ ᠢ᠋ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ ᠪᠣᠯᠭᠠᠵᠤ ᠴᠢᠳᠠᠪᢈᠢᠵᠢᠭᠤᠯᠬᠤ᠃",
  },
  {
    title:
      "ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠵᠦ ᠴᠢᠳᠠᠳᠠᠭ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ",
    description:
      "ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠦᢉᠡ ᢈᠡᠯᠡᢈᠦ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠢ᠋ᠶᠡᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᢈᠦ᠂ ᠬᠤᠷᠠᠨ ᠴᠢᠭᠤᠯᠬᠤ᠂ ᠰᠢᠳᠤᠷᠭᠤ ᠪᠤᠰᠤ ᠶᠠᠪᠤᠳᠠᠯ ᠢ᠋ ᠲᠠᠰᠤᠯᠤᠨ ᠵᠣᠭᠰᠤᠭᠠᠬᠤ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠷᢈᠡ ᠪᠡᠨ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ ᠪᠣᠯᠬᠤ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᠠᠶᠤᠯ ᠦᢉᠡᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠢ᠋ ᠬᠠᠩᠭᠠᠵᠤ᠂ ᠲᠡᠳᠡᠨ ᠳ᠋ᠦ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᠵᠡᢉᠦᠯᠳᠡᢉ ᠪᠠᠶᠢᠬᠤ᠃  ᢈᠦᠮᠦᠰ ᠢ᠋ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ ᠪᠣᠯᠭᠠᠵᠤ ᠴᠢᠳᠠᠪᢈᠢᠵᠢᠭᠤᠯᠬᠤ᠃",
  },
  {
    title:
      "ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠵᠦ ᠴᠢᠳᠠᠳᠠᠭ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ",
    description:
      "ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠦᢉᠡ ᢈᠡᠯᠡᢈᠦ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠢ᠋ᠶᠡᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᢈᠦ᠂ ᠬᠤᠷᠠᠨ ᠴᠢᠭᠤᠯᠬᠤ᠂ ᠰᠢᠳᠤᠷᠭᠤ ᠪᠤᠰᠤ ᠶᠠᠪᠤᠳᠠᠯ ᠢ᠋ ᠲᠠᠰᠤᠯᠤᠨ ᠵᠣᠭᠰᠤᠭᠠᠬᠤ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠷᢈᠡ ᠪᠡᠨ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ ᠪᠣᠯᠬᠤ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᠠᠶᠤᠯ ᠦᢉᠡᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠢ᠋ ᠬᠠᠩᠭᠠᠵᠤ᠂ ᠲᠡᠳᠡᠨ ᠳ᠋ᠦ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᠵᠡᢉᠦᠯᠳᠡᢉ ᠪᠠᠶᠢᠬᠤ᠃  ᢈᠦᠮᠦᠰ ᠢ᠋ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ ᠪᠣᠯᠭᠠᠵᠤ ᠴᠢᠳᠠᠪᢈᠢᠵᠢᠭᠤᠯᠬᠤ᠃",
  },
];
