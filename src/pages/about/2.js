import Layout from "@/components/layout/Layout";
import HistoryDesktop from "@/components/about-us/history/HistoryDesktop";
import HistoryMobile from "@/components/about-us/history/HistoryMobile";

export default function History() {
  return (
    <Layout>
      <HistoryDesktop />
      <HistoryMobile />
    </Layout>
  );
}
