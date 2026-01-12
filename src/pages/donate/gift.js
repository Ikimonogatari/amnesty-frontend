import Layout from "@/components/layout/Layout";
import GiftDesktop from "@/components/donation/gift/GiftDesktop";
import GiftMobile from "@/components/donation/gift/GiftMobile";

export default function Gift() {
  return (
    <Layout>
      <GiftDesktop />
      <GiftMobile />
    </Layout>
  );
}
