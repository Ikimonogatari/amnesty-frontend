import Layout from "@/components/layout/Layout";
import ReportDesktop from "@/components/about-us/report/ReportDesktop";
import ReportMobile from "@/components/about-us/report/ReportMobile";

export default function History() {
  return (
    <Layout>
      <ReportDesktop />
      <ReportMobile />
    </Layout>
  );
}
