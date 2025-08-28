import Layout from "@/components/layout/Layout";
import StructureChapterMembersDesktop from "@/components/about-us/structure/detail/StructureChapterMembersDesktop";
import StructureChapterMembersMobile from "@/components/about-us/structure/detail/StructureChapterMembersMobile";

export default function StructureChapterMembers() {
  return (
    <Layout>
      <StructureChapterMembersDesktop />
      <StructureChapterMembersMobile />
    </Layout>
  );
}
