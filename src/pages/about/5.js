import Layout from "@/components/layout/Layout";
import AssemblyDesktop from "@/components/about-us/assembly/AssemblyDesktop";
import AssemblyMobile from "@/components/about-us/assembly/AssemblyMobile";

export default function History() {
  return (
    <Layout>
      <AssemblyDesktop />
      <AssemblyMobile />
    </Layout>
  );
}
