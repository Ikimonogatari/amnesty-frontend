import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import StaticHeader from "@/components/common/StaticHeader";
import ReportSwiper from "./ReportSwiper";
import { useRouter } from "next/router";
import { useGetReportsQuery } from "@/redux/services/apiService";

export default function ReportDesktop() {
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
      <div className="h-full hidden sm:flex gap-20 w-auto flex-shrink-0">
        <StaticHeader
          image="/mng/images/header-img.png"
          alt="Report Page Header"
          width="90rem"
          title="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠬᠡᠮᠵᠢᠶ᠎ᠡ ᠶᠢᠨ ᠲᠠᠢᠯᠪᠤᠷᠢ"
        />
        <div className="flex items-center justify-center h-full w-full">
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
      <div className="h-full hidden sm:flex gap-20 w-auto flex-shrink-0">
        <StaticHeader
          image="/mng/images/header-img.png"
          alt="Report Page Header"
          width="90rem"
          title="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠬᠡᠮᠵᠢᠶ᠎ᠡ ᠶᠢᠨ ᠲᠠᠢᠯᠪᠤᠷᠢ"
        />
        <div className="flex items-center justify-center h-full w-full">
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
    <div className="h-full hidden sm:flex gap-20 w-auto flex-shrink-0">
      <StaticHeader
        image="/mng/images/header-img.png"
        alt="Report Page Header"
        width="90rem"
        title="ᠲᠠᠶᠢᠯᠠᠨ"
      />
      <div className="flex gap-16 h-full max-h-screen">
        <ReportSwiper
          title={"ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ"}
          description={
            "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠲᠦᢉᠡᢉᠡᠨ ᠳᠡᠯᢉᠡᠷᠡᢉᠦᠯᢈᠦ᠂ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠦᠢᠯᠡᠰ ᠲᠦ ᠮᠠᠨ ᠤ᠋ ᢉᠡᠰᠢᢉᠦᠳ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠥᠪᠡᠷᠰᠡᠳ ᠦ᠋ᠨ ᠴᠠᠭ ᠵᠠᠪ᠂ ᠰᠡᠳᢈᠢᠯ ᠵᠢᠷᠦᢈᠡ ᠪᠡᠨ ᠵᠣᠷᠢᠭᠤᠯᠵᠤ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠳ᠋ᠦ ᠡᢉᠡᠯᠢᠲᠡᠢ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢ ᠪᠠᠶᠢᠭᠤᠯᠬᠤ ᠳ᠋ᠤ ᢉᠡᠰᠢᢉᠦᠨ ᠦ᠋ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ᠂ ᠲᠠᠲᠠᠪᠤᠷᠢ ᠶᠠᠭᠤ ᠶᠠᠭᠤᠨ ᠠ᠋ᠴᠠ ᠴᠤ ᠢᠯᠡᢉᠦᠦ ᠴᠢᠬᠤᠯᠠ ᠪᠠᠶᠢᠳᠠᠭ᠃ ᠲᠡᠶᠢᠮᠦ ᠡᠴᠡ ᠪᠢᠳᠡ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠢ᠋ᠶᠡᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠬᠠᠨᠳᠢᠪᠯᠠᠭᠰᠠᠨ ᠴᠠᠭ᠂ ᠲᠥᠯᠦᢉᠰᠡᠨ ᠲᠠᠲᠠᠪᠤᠷᠢ᠂ ᠪᠠᠬᠠᠷᠬᠠᠵᠤ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠲᠠᠶᠢᠯᠤᠨ ᠳ᠋ᠤ ᠪᠠᠨ ᠳᠤᠷᠠᠳᠳᠠᠭ᠃"
          }
          sectionTitle={"ᠪᠢᠳᠡ ᢈᠡᠷᢈᠢᠨ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᢈᠢᠳᠡᢉ ᠪᠤᠢ?"}
          reports={reportItems}
        />
        <div
          className={`flex flex-col items-center justify-center border border-[#E3E3E3] rounded-xl my-4`}
        >
          <div
          style={{ writingMode: "vertical-lr" }}
          className="h-1/2 text-lg font-bold flex items-center justify-center w-full rounded-t-xl bg-[#FFFF00] p-8">

              ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠳᠡᢉᠡᠳᠦᠯᠡᠳᠡᢉ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ
          </div>
          <div className="text-lg font-bold h-1/2 flex flex-row items-start justify-center w-full rounded-b-xl bg-black p-8">

            <h2 className="text-[#FFFF00]" style={{ writingMode: "vertical-lr" }}>
              ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ
            </h2>
            <h2
              className={`text-white`} style={{ writingMode: "vertical-lr" }}
            >
              ᠨᠡᠩ ᠲᠡᠷᠢᢉᠦᠨ ᠳ᠋ᠦ ᠠᠩᠬᠠᠷᠴᠤ <br/> ᠠᠵᠢᠯᠯᠠᠬᠤ ᢈᠦᠮᠦᠨ ᠦ᠋ <br/> ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠰᠲ᠋ᠷᠠᠲ᠋ᠧᢉᠢ
              ᠵᠣᠷᠢᠯᠲᠠ
            </h2>
          </div>
        </div>
        <div className="flex gap-12 p-4">
          {staticItems.map((a, i) => (
            <div className="flex gap-7 max-h-screen">
              <div className="w-14 h-14 text-4xl font-bold aspect-square rounded-sm flex items-center justify-center bg-black text-[#FFFF00]">
                {i + 1}
              </div>
              <h2
                className="text-2xl font-bold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {a.title}
              </h2>
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {a.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-16 p-4">
          <div className="flex gap-7">
            <h2
              className="text-2xl font-bold"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠰᠠᠩᢈᠦᠵᠢᠯᠲᠡ
            </h2>
            <p
              className="text-sm"
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
          <div className="flex gap-7">
            <h2
              className="text-2xl font-bold"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠪᠢᠳᠡᠨ ᠦ᠋ ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ ᠳ᠋ᠦ ᠨᠢᢉᠡᠳᠦ᠋ᢉᠡᠷᠡᠢ
            </h2>
            <Button
              text={"ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ"}
              type="primary"
              className="max-h-min whitespace-nowrap"
              onClick={() => router.push("/donation")}
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
];
