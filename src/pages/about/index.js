import Layout from "@/components/layout/Layout";
import AboutUsDesktop from "@/components/about-us/AboutUsDesktop";
import AboutUsMobile from "@/components/about-us/AboutUsMobile";

export default function Home() {
  return (
    <Layout>
      <AboutUsDesktop />
      <AboutUsMobile />
    </Layout>
  );
}
