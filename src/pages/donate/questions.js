import Layout from "@/components/layout/Layout";
import QuestionsDesktop from "@/components/donation/questions/QuestionsDesktop";
import QuestionsMobile from "@/components/donation/questions/QuestionsMobile";

export default function Questions() {
  return (
    <Layout>
      <QuestionsDesktop />
      <QuestionsMobile />
    </Layout>
  );
}
