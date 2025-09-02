import Layout from "@/components/layout/Layout";
import RightDesktop from "@/components/right/RightDesktop";
import RightMobile from "@/components/right/RightMobile";

export default function Home() {
  return (
    <Layout>
      <RightDesktop />
      <RightMobile />
    </Layout>
  );
}
