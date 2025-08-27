import Layout from "@/components/layout/Layout";
import ContactDesktop from "@/components/about-us/contact/ContactDesktop";
import ContactMobile from "@/components/about-us/contact/ContactMobile";

export default function Home() {
  return (
    <Layout>
      <ContactDesktop />
      <ContactMobile />
    </Layout>
  );
}
