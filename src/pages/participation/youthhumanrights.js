import Layout from "@/components/layout/Layout";
import YouthDesktop from "@/components/participation/youth/YouthDesktop";
import YouthMobile from "@/components/participation/youth/YouthMobile";

export default function Calendar() {
  return (
    <Layout>
      <YouthDesktop />
      <YouthMobile />
    </Layout>
  );
}
