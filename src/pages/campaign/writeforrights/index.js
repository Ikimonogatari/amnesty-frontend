import Layout from "@/components/layout/Layout";
import WriteForRightsDesktop from "@/components/campaign/writeforrights/WriteForRightsDesktop";
import WriteForRightsMobile from "@/components/campaign/writeforrights/WriteForRightsMobile";

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
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || "70412827041a1cada9c8c234bb111c64704ef4aaf148136f19ffc25e6403f944d8ad25a2f70004eaa8a3c9167f6234676b990608bcfdfbd2d9d7da835a0327fa0b9ad93d64f9331bdfe1a362ce7f546bd3a2ff160f5e3232afc4a5a1ec6533ee07a5bfafda0aaf1126c3f476e0434e623ad50c7842cda7145df959378a4a584e";

    console.log(
      "Direct CMS API call:",
      `${apiUrl}/actions?populate=*&sort[0]=createdAt:desc`
    );

    // Build headers - only add Authorization if API key is available
    const headers = {
      "Content-Type": "application/json",
    };
    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }

    const response = await fetch(
      `${apiUrl}/actions?populate=*&sort[0]=createdAt:desc&locale=mn-MN`,
      { headers }
    );

    console.log("CMS API Response Status:", response.status);

    if (!response.ok) {
      console.error("CMS API Error:", response.status, response.statusText);
      // Return empty actions instead of error to show the page without actions
      return {
        props: {
          actions: [],
          error: null,
        },
      };
    }

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
      },
    };
  } catch (error) {
    console.error("WriteForRights getServerSideProps error:", error.message);
    // Return empty actions instead of error to allow page to render
    return {
      props: {
        actions: [],
        error: null,
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
