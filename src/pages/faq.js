import Layout from "@/components/layout/Layout";
import FaqDesktop from "@/components/about-us/faq/FaqDesktop";
import FaqMobile from "@/components/about-us/faq/FaqMobile";

export default function History() {
  return (
    <Layout>
      <FaqDesktop />
      <FaqMobile />
    </Layout>
  );
}
