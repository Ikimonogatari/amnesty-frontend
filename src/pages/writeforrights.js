import Layout from "@/components/layout/Layout";
import WriteForRightsDesktop from "@/components/campaign/writeforrights/WriteForRightsDesktop";
import WriteForRightsMobile from "@/components/campaign/writeforrights/WriteForRightsMobile";
import { actionsService } from "@/services/apiService";

export async function getServerSideProps() {
  try {
    console.log("=== WRITEFORRIGHT PAGE LOADING ===");
    console.log("Environment check:", {
      CMS_API: process.env.NEXT_PUBLIC_API_URL,
      HasApiKey: !!process.env.NEXT_PUBLIC_API_KEY,
    });

    // Try direct fetch with auth to bypass service layer
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://cms.amnesty.mn/api";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    console.log(
      "Direct CMS API call:",
      `${apiUrl}/actions?populate=*&sort[0]=createdAt:desc`
    );

    const response = await fetch(
      `${apiUrl}/actions?populate=*&sort[0]=createdAt:desc`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("CMS API Response Status:", response.status);
    const actionsData = await response.json();
    console.log("CMS API Response:", {
      hasData: !!actionsData.data,
      count: actionsData.data?.length || 0,
      firstAction: actionsData.data?.[0]
        ? {
            id: actionsData.data[0].id,
            title:
              actionsData.data[0].attributes?.title ||
              actionsData.data[0].title,
          }
        : "None",
    });

    // Format the response like Strapi v4
    const actions =
      actionsData.data?.map((item) => ({
        id: item.id,
        title: item.attributes?.title || item.title,
        description: item.attributes?.description || item.description,
        cover: item.attributes?.cover || item.cover,
      })) || [];

    return {
      props: {
        actions: actions,
        error: null,
        debug: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL,
          hasApiKey: !!process.env.NEXT_PUBLIC_API_KEY,
          actionCount: actions.length,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        actions: [],
        error: "Failed to load actions",
      },
    };
  }
}

export default function WriteForRights({ actions, error }) {
  return (
    <Layout>
      <WriteForRightsDesktop actions={actions} error={error} />
      <WriteForRightsMobile actions={actions} error={error} />
    </Layout>
  );
}
