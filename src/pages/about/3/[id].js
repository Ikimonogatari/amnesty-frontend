import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/common/Button";
import { Download, ArrowLeft } from "lucide-react";
import {
  formatMongolianDate,
  getImageUrl,
  toMongolianNumbers,
} from "@/utils/fetcher";
import SectionTitle from "@/components/common/SectionTitle";
import ReportSwiper from "@/components/about-us/report/ReportSwiper";
import RelatedItems from "@/components/common/RelatedItems";
import StaticHeader from "@/components/common/StaticHeader";
import Image from "next/image";
import {
  useGetReportByIdQuery,
  useGetReportsQuery,
} from "@/redux/services/apiService";

export default function ReportDetail() {
  const router = useRouter();
  const { id } = router.query;

  const convertTextNumbers = (text) => {
    if (!text) return text;
    return String(text).replace(/\d/g, (digit) => toMongolianNumbers(digit));
  };

  // Use RTK Query hooks for better caching and state management
  const {
    data: report,
    isLoading: isLoadingReport,
    error: reportError,
  } = useGetReportByIdQuery(id, {
    skip: !id, // Don't run query if id is not available
  });

  const {
    data: allReportsData,
    isLoading: isLoadingReports,
    error: reportsError,
  } = useGetReportsQuery({
    pageSize: 100, // Get all reports for related section
  });

  const allReports = allReportsData || [];
  const isLoading = isLoadingReport || isLoadingReports;
  const error = reportError || reportsError;

  const handleDownload = () => {
    // RTK Query flattens attributes, but pdf_file is still nested
    let pdfUrl = report?.pdf_file?.data?.attributes?.url;

    if (pdfUrl) {
      // Handle URL exactly like old web
      if (!pdfUrl.includes("https:")) {
        pdfUrl = `https://${pdfUrl}`;
      }

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = (report?.title || "report") + ".pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getPdfUrl = () => {
    // RTK Query flattens attributes, but pdf_file is still nested
    let pdfUrl = report?.pdf_file?.data?.attributes?.url;

    if (pdfUrl) {
      // Handle URL exactly like old web
      if (!pdfUrl.includes("https:")) {
        pdfUrl = `https://${pdfUrl}`;
      }
      return pdfUrl;
    }
    return null;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p
            className="text-lg font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠠᠴᠢᠶᠠᠯᠠᠨ ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠢᠨ᠎ᠠ...
          </p>
        </div>
      </Layout>
    );
  }

  if (error || !report) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-600">
            <p
              style={{ writingMode: "vertical-lr" }}
            >
              ᠮᠡᠳᠡᠭᠳᠡᠯ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ᠪᠤᠴᠠᠬᠤ
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // After formatStrapiResponse, the structure is flattened
  // So we access properties directly instead of through attributes
  // RTK Query formatStrapiResponse flattens attributes, so we access directly
  const publishedAt = formatMongolianDate(report?.publishedAt);
  const title = report?.title || "";
  const description = report?.description || "";
  const pdfUrl = getPdfUrl();

  // RTK Query flattens attributes, but cover is still nested
  const coverImage =
    getImageUrl(report?.cover?.data?.attributes?.url) || "/images/news1.png";

  return (
    <Layout>
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col w-full">
        {/* Mobile StaticHeader */}
        <StaticHeader
          image="/images/header-img.png"
          alt={title || "ᠲᠠᠶᠢᠯᠤᠨ"}
          title={title}
          width="100%"
        />

        {/* Mobile Content */}
        <div className="flex flex-col gap-6 p-4">
          {/* Mobile PDF Viewer */}
          {pdfUrl && (
            <div>
              <h2 className="text-xl font-bold mb-4">PDF ᠲᠠᠶᠢᠯᠤᠨ</h2>
              <object
                data={pdfUrl}
                type="application/pdf"
                width="100%"
                height="400px"
                className="border rounded"
              >
                <div className="w-full h-[400px] bg-gray-100 border rounded flex items-center justify-center">
                  <Button
                    onClick={() => window.open(pdfUrl, "_blank")}
                    text="PDF ᠲᠠᠲᠠᠬᠤ"
                    type="primary"
                  />
                </div>
              </object>
            </div>
          )}

          {/* Mobile Title */}
          <div className="flex flex-row gap-2">
            <h1
              className="text-xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {title}
            </h1>
          </div>

          {/* Mobile Date */}
          {publishedAt && (
            <div className="flex flex-row gap-2">
              <h3
                className="text-lg font-semibold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠬᠡᠨ ᠳᠤᠭᠠᠷ
              </h3>
              <p
                className="text-base text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {publishedAt}
              </p>
            </div>
          )}

          {/* Mobile Description */}
          {description && (
            <div className="flex flex-row gap-2">
              <h2
                className="text-xl font-bold mb-4"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠲᠠᠢᠯᠪᠤᠷᠢ
              </h2>
              <div
                className="text-base text-gray-800"
                style={{
                  writingMode: "vertical-lr",
                }}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>
          )}

          {/* Mobile Related Reports */}
          {(() => {
            // Ensure we have valid data and proper filtering
            const currentReportId = report?.id?.toString();

            // Remove duplicates first, then filter out current report
            const uniqueReports = allReports
              .filter((r) => r && r.id) // Remove invalid entries
              .filter(
                (report, index, self) =>
                  index ===
                  self.findIndex(
                    (r) => r.id?.toString() === report.id?.toString()
                  )
              ) // Remove duplicates
              .filter((r) => r.id?.toString() !== currentReportId); // Remove current report

            return (
              uniqueReports.length > 0 && (
                <div className="flex flex-row gap-2">
                  <h2
                    className="text-xl font-bold"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠲᠠᠶᠢᠯᠤᠨ
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {uniqueReports.slice(0, 6).map((item, index) => (
                      <div
                        key={item.id || index}
                        className="flex gap-4 max-h-[150px] cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => router.push(`/about/3/${item.id}`)}
                      >
                        <h3
                          className="text-sm font-medium line-clamp-3 mb-2"
                          style={{
                            writingMode: "vertical-lr",
                          }}
                        >
                          {item?.title?.length > 40
                            ? `${item.title.substring(0, 40)}...`
                            : item?.title}
                        </h3>
                        <div className="relative aspect-square w-[150px] h-[150px] flex-shrink-0">
                          <Image
                            src={
                              getImageUrl(item?.cover?.data?.attributes?.url) ||
                              "/images/news1.png"
                            }
                            alt={item?.title || "Report image"}
                            fill
                            className="object-cover rounded"
                          />
                          <Button
                            text="ᠲᠠᠶᠢᠯᠤᠨ"
                            type="primary"
                            className="absolute -top-1 -right-1 text-black text-xs px-1 py-0.5"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            );
          })()}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="h-full p-4 hidden sm:flex gap-7 overflow-x-auto w-auto flex-shrink-0 max-h-screen min-w-screen">
        {/* Report Title Header */}
        <StaticHeader
          image="/images/header-img.png"
          alt="Report Page Header"
          width="90rem"
          title={title}
        />

        {/* PDF Viewer Section */}
        {pdfUrl && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              PDF ᠲᠠᠶᠢᠯᠤᠨ
            </h2>
            <div className="flex items-center">
              <object
                data={pdfUrl}
                type="application/pdf"
                width="100%"
                height="500px"
                className="shadow-lg rounded-lg"
              >
                <div className="w-full h-[500px] bg-gray-100 shadow-lg rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-4">
                      PDF viewer not supported
                    </p>
                    <Button
                      onClick={() => window.open(pdfUrl, "_blank")}
                      text="PDF ᠲᠠᠲᠠᠬᠤ"
                      type="primary"
                    />
                  </div>
                </div>
              </object>
            </div>
          </div>
        )}

        {/* Report Date */}
        {publishedAt && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠬᠡᠨ ᠳᠤᠭᠠᠷ
            </h2>
            <div
              className="text-xl text-gray-600"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {publishedAt}
            </div>
          </div>
        )}

        {/* Report Description */}
        {description && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠲᠠᠢᠯᠪᠤᠷᠢ
            </h2>
            <div
              className="text-lg text-gray-800 max-w-[600px]"
              style={{
                writingMode: "vertical-lr",
              }}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
        )}

        {/* Related Reports Section */}
        {(() => {
          const currentReportId = report?.id?.toString();
          const uniqueReports = allReports
            .filter((r) => r && r.id)
            .filter(
              (report, index, self) =>
                index ===
                self.findIndex(
                  (r) => r.id?.toString() === report.id?.toString()
                )
            )
            .filter((r) => r.id?.toString() !== currentReportId);

          return (
            uniqueReports.length > 0 && (
              <RelatedItems
                items={uniqueReports}
                sectionTitle="ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠲᠠᠶᠢᠯᠤᠨ"
                primaryButtonText="ᠲᠠᠶᠢᠯᠤᠨ"
                itemType="about/3"
                maxItems={3}
              />
            )
          );
        })()}
      </div>
    </Layout>
  );
}
