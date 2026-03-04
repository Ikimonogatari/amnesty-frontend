import Layout from "@/components/layout/Layout";
import StructureControlManagersDesktop from "@/components/about-us/structure/detail/StructureControlManagersDesktop";
import StructureControlManagersMobile from "@/components/about-us/structure/detail/StructureControlManagersMobile";

export default function StructureControlManagers() {
  return (
    <Layout>
      <StructureControlManagersDesktop />
      <StructureControlManagersMobile />
    </Layout>
  );
}
