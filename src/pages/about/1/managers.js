import Layout from "@/components/layout/Layout";
import StructureManagersDesktop from "@/components/about-us/structure/detail/StructureManagersDesktop";
import StructureManagersMobile from "@/components/about-us/structure/detail/StructureManagersMobile";

export default function StructureManagers() {
  return (
    <Layout>
      <StructureManagersDesktop />
      <StructureManagersMobile />
    </Layout>
  );
}
