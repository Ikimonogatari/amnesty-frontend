import Layout from "@/components/layout/Layout";
import WriteForRightsDesktop from "@/components/campaign/writeforrights/WriteForRightsDesktop";
import WriteForRightsMobile from "@/components/campaign/writeforrights/WriteForRightsMobile";

export async function getServerSideProps() {
  try {
    console.log("=== WRITEFORRIGHT PAGE LOADING ===");

    const fallbackApiKey = "70412827041a1cada9c8c234bb111c64704ef4aaf148136f19ffc25e6403f944d8ad25a2f70004eaa8a3c9167f6234676b990608bcfdfbd2d9d7da835a0327fa0b9ad93d64f9331bdfe1a362ce7f546bd3a2ff160f5e3232afc4a5a1ec6533ee07a5bfafda0aaf1126c3f476e0434e623ad50c7842cda7145df959378a4a584e";
    const envApiKey = process.env.NEXT_PUBLIC_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://cms.amnesty.mn/api";

    console.log("Environment check:", {
      CMS_API: apiUrl,
      HasEnvApiKey: !!envApiKey,
      EnvApiKeyLength: envApiKey ? envApiKey.length : 0,
    });

    // Helper to fetch actions with a specific key
    const fetchActions = async (key, keySource) => {
      console.log(`Attempting fetch with ${keySource} key...`);
      const headers = {
        "Content-Type": "application/json",
      };
      if (key) {
        headers.Authorization = `Bearer ${key}`;
      }

      const response = await fetch(
        `${apiUrl}/actions?populate=*&sort[0]=createdAt:desc&locale=mn-MN`,
        { headers }
      );

      return response;
    };

    // 1. Try with Environment Variable Key first (if exists)
    let response;
    let usedFallback = false;

    if (envApiKey) {
      response = await fetchActions(envApiKey, "ENVIRONMENT");

      // If forbidden/unauthorized, might be a bad specific key, try fallback
      if (!response.ok && (response.status === 403 || response.status === 401)) {
        console.warn(`Environment key failed with ${response.status}. Retrying with fallback key...`);
        response = await fetchActions(fallbackApiKey, "FALLBACK");
        usedFallback = true;
      }
    } else {
      // No env key, go straight to fallback
      response = await fetchActions(fallbackApiKey, "FALLBACK");
      usedFallback = true;
    }

    console.log(`Final API Response Status: ${response.status} (Used fallback: ${usedFallback})`);

    if (!response.ok) {
      console.error("CMS API Error:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error body:", errorText);

      return {
        props: {
          actions: [],
          error: `API Error: ${response.status}`,
        },
      };
    }

    const actionsData = await response.json();
    console.log("CMS API Response Success:", {
      count: actionsData.data?.length || 0,
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
    console.error("WriteForRights getServerSideProps error:", error);
    return {
      props: {
        actions: [],
        error: error.message,
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
