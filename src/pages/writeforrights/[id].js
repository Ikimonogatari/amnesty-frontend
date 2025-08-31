import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import WriteForRightsActionDesktop from "@/components/campaign/writeforrights/WriteForRightsActionDesktop";
import WriteForRightsActionMobile from "@/components/campaign/writeforrights/WriteForRightsActionMobile";
import { actionsService } from "@/services/apiService";
import FullScreenLoader from "@/components/common/FullScreenLoader";

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    console.log("=== FETCHING ACTION BY ID ===");
    console.log("Action ID:", id);

    // Direct API fetch to bypass service layer issues
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://cms.amnesty.mn/api";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    console.log("Direct API call:", `${apiUrl}/actions/${id}?populate=*`);

    const response = await fetch(`${apiUrl}/actions/${id}?populate=*`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log("API Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const actionData = await response.json();
    console.log("Action API Response:", {
      hasData: !!actionData.data,
      actionId: actionData.data?.id,
      title: actionData.data?.attributes?.title,
    });

    // Format the action data like the list page does
    let formattedAction = null;
    if (actionData.data) {
      formattedAction = {
        id: actionData.data.id,
        title: actionData.data.attributes?.title || actionData.data.title,
        description:
          actionData.data.attributes?.description ||
          actionData.data.description,
        cover: actionData.data.attributes?.cover || actionData.data.cover,
        problem: actionData.data.attributes?.problem || "",
        action: actionData.data.attributes?.action || "",
        problemDescription:
          actionData.data.attributes?.problemDescription || "",
        actionDescription: actionData.data.attributes?.actionDescription || "",
      };
    }

    console.log("Formatted action:", formattedAction);

    return {
      props: {
        action: formattedAction,
        error: null,
        debug: {
          actionId: id,
          hasAction: !!formattedAction,
        },
      },
    };
  } catch (error) {
    console.error("=== ACTION FETCH ERROR ===");
    console.error("Error:", error.message);
    return {
      props: {
        action: null,
        error: "Failed to load action",
        debug: {
          errorMessage: error.message,
          actionId: params.id,
        },
      },
    };
  }
}

export default function WriteForRightsDetail({ action, error }) {
  const router = useRouter();
  const { id } = router.query;

  // Loading state
  if (!id) {
    return <FullScreenLoader />;
  }

  // Error state
  if (error || !action) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-2xl font-bold text-red-600 mb-4"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p
              className="text-gray-600 mb-4"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠠᠵᠢᠯ ᠤ᠋ᠯᠠᠭ᠎ᠠ ᠦᠵᠡᠭᠳᠡᠵᠤ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </p>
            <button
              onClick={() => router.push("/writeforrights")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠪᠤᠴᠠᠬᠤ
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Desktop Version */}
        <WriteForRightsActionDesktop actionId={id} action={action} />

        {/* Mobile Version */}
        <WriteForRightsActionMobile actionId={id} action={action} />
      </div>
    </Layout>
  );
}
