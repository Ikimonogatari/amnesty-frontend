import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import WriteForRightsActionDesktop from "@/components/campaign/writeforrights/WriteForRightsActionDesktop";
import WriteForRightsActionMobile from "@/components/campaign/writeforrights/WriteForRightsActionMobile";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import Fetcher, { buildFetcherUrl } from "@/utils/fetcher";
import { getLocale } from "@/utils/locale";

export default function WriteForRightsDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [action, setAction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const loadAction = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await Fetcher(
          buildFetcherUrl(`/actions/${id}`, {
            populate: "*",
            locale: getLocale(),
          })
        );
        const actionData = response?.data;

        if (!actionData) {
          throw new Error("Failed to load action");
        }

        const formattedAction = {
          id: actionData.id,
          title: actionData.attributes?.title || actionData.title,
          description:
            actionData.attributes?.description || actionData.description,
          cover: actionData.attributes?.cover || actionData.cover,
          problem: actionData.attributes?.problem || "",
          action: actionData.attributes?.action || "",
          problemDescription: actionData.attributes?.problemDescription || "",
          actionDescription: actionData.attributes?.actionDescription || "",
        };

        if (isMounted) {
          setAction(formattedAction);
        }
      } catch (fetchError) {
        if (isMounted) {
          setAction(null);
          setError(fetchError?.message || "Failed to load action");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAction();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Loading state
  if (!id || isLoading) {
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
              style={{ writingMode: "vertical-lr" }}
            >
              ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p
              className="text-gray-600 mb-4"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠠᠵᠢᠯ ᠤ᠋ᠯᠠᠭ᠎ᠠ ᠦᠵᠡᠭᠳᠡᠵᠤ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </p>
            <button
              onClick={() => router.push("/campaign/writeforrights")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              style={{
                writingMode: "vertical-lr",
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
