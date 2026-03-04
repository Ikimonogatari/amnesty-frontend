import StructureChapterMembersDesktop from "@/components/about-us/structure/detail/StructureChapterMembersDesktop";
import StructureChapterMembersMobile from "@/components/about-us/structure/detail/StructureChapterMembersMobile";
import Layout from "@/components/layout/Layout";

export default function StructureChapterMembers() {
  return (
    <Layout>
      <StructureChapterMembersDesktop />
      <StructureChapterMembersMobile />
    </Layout>
  );
}
