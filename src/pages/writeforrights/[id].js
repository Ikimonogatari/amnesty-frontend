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

    // Fetch action data by ID
    const actionResponse = await actionsService.getActionById(id);

    return {
      props: {
        action: actionResponse.data || null,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        action: null,
        error: "Failed to load action",
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
