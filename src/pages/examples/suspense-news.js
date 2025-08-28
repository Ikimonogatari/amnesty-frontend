/**
 * Example Page: Suspense-enabled News Page
 * Demonstrates modern loading with React Suspense
 */

import Layout from "@/components/layout/Layout";
import SuspenseNewsList from "@/components/examples/SuspenseNewsList";
import PageSuspenseLoader from "@/components/common/SuspenseLoader";

export default function SuspenseNewsPage() {
  return (
    <Layout>
      <PageSuspenseLoader
        loaderSize="xl"
        showText={true}
        customText="ᠰᠣᠨᠢᠨ ᠮᠡᠳᠡᠭᠡᠯ ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ..."
        backgroundColor="bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <SuspenseNewsList />
      </PageSuspenseLoader>
    </Layout>
  );
}
