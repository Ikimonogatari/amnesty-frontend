import Layout from "@/components/layout/Layout";
import StructureDesktop from "@/components/about-us/structure/StructureDesktop";
import StructureMobile from "@/components/about-us/structure/StructureMobile";

export default function Home() {
  return (
    <Layout>
      <StructureDesktop />
      <StructureMobile />
    </Layout>
  );
}
