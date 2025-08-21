import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/common/Button";
import { Download, ArrowLeft } from "lucide-react";
import { formatMongolianDate } from "@/utils/fetcher";
import SectionTitle from "@/components/common/SectionTitle";
import ReportSwiper from "@/components/about-us/report/ReportSwiper";

export default function ReportDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [report, setReport] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch single report
        const reportResponse = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api'
          }/reports/${id}?populate=deep`
        );
        if (!reportResponse.ok) {
          throw new Error(`HTTP error! status: ${reportResponse.status}`);
        }
        const reportData = await reportResponse.json();
        setReport(reportData.data);

        // Fetch all reports for related section
        const allReportsResponse = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api'
          }/reports?populate=deep`
        );
        if (!allReportsResponse.ok) {
          throw new Error(`HTTP error! status: ${allReportsResponse.status}`);
        }
        const allReportsData = await allReportsResponse.json();
        setAllReports(allReportsData.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDownload = () => {
    if (report?.attributes?.pdf_file?.data?.attributes?.url) {
      const pdfUrl = report.attributes.pdf_file.data.attributes.url;
      const fullUrl = pdfUrl.startsWith("/uploads/")
        ? `${
            process.env.NEXT_PUBLIC_MEDIA_URL
          }${pdfUrl}`
        : pdfUrl;

      const link = document.createElement("a");
      link.href = fullUrl;
      link.download = report.attributes.title || "report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getPdfUrl = () => {
    if (report?.attributes?.pdf_file?.data?.attributes?.url) {
      const pdfUrl = report.attributes.pdf_file.data.attributes.url;
      return pdfUrl.startsWith("/uploads/")
        ? `${
            process.env.NEXT_PUBLIC_MEDIA_URL
          }${pdfUrl}`
        : pdfUrl;
    }
    return null;
  };

  const handleReportClick = (reportId) => {
    router.push(`/about-us/report/${reportId}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p
            className="text-lg font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
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
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
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

  const publishedAt = formatMongolianDate(
    report.attributes?.publishedAt || report.publishedAt
  );
  const title = report.attributes?.title || report.title || "";
  const description =
    report.attributes?.description || report.description || "";
  const pdfUrl = getPdfUrl();

  return (
    <Layout>
      <div className="h-full sm:h-screen overflow-x-hidden sm:overflow-x-auto sm:overflow-y-hidden w-full flex flex-col sm:flex-row justify-between sm:gap-10 sm:min-w-screen">
        {/* Main Content */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 p-4">
          <div className="flex gap-2 sm:gap-5 max-h-[200px] sm:max-h-max  overflow-x-auto">
            {/* Title */}
            <h1
              className="text-[10px] sm:text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {title}
            </h1>

            {/* Date */}
            <p
              className="text-gray-600 text-[9px] sm:text-sm"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {publishedAt}
            </p>

            <h2
              className="text-[9px] sm:text-sm font-semibold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠲᠠᠨᠢᠯᠴᠠᠭᠤᠯᠭ᠎ᠠ
            </h2>

            {/* Description */}

            <p
              className="leading-relaxed text-[9px] sm:text-sm"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {description}
            </p>
          </div>
          <div className="flex gap-2 sm:gap-5">
            {/* PDF Preview */}
            {pdfUrl && (
              <div className="border rounded-lg overflow-hidden h-[200px] sm:h-full w-full sm:w-[1124px]">
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="624"
                  title="PDF Preview"
                  className="w-full"
                />
              </div>
            )}

            {/* Download Button */}
            {pdfUrl && (
              <Button
                text={
                  <div className="flex gap-2 items-center">
                    <Download size={16} />
                    <span
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      PDF ᠲᠠᠲᠠᠬᠤ
                    </span>
                  </div>
                }
                type="primary"
                onClick={handleDownload}
                className="!h-full !min-h-32 !whitespace-nowrap"
              />
            )}
          </div>
        </div>

        <div className="flex gap-4 sm:gap-12">
          <ReportSwiper
            sectionTitle={"ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠲᠠᠶᠢᠯᠤᠨ"}
            reports={allReports.filter((report) => report.id !== report.id)}
          />
        </div>
      </div>
    </Layout>
  );
}
