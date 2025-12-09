import Layout from "@/components/layout/Layout";
import HistoryDesktop from "@/components/about-us/history/HistoryDesktop";
import HistoryMobile from "@/components/about-us/history/HistoryMobile";

export default function History() {
  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: "MongolianScript2";
          src: url("/fonts/MongolianScript-2.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
      <Layout>
        <HistoryDesktop />
        <HistoryMobile />
      </Layout>
    </>
  );
}
