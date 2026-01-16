import Layout from "@/components/layout/Layout";
import WriteForRightsDesktop from "@/components/campaign/writeforrights/WriteForRightsDesktop";
import WriteForRightsMobile from "@/components/campaign/writeforrights/WriteForRightsMobile";
import { useEffect, useState } from "react";
import Fetcher, { buildFetcherUrl } from "@/utils/fetcher";
import { getLocale } from "@/utils/locale";

export default function WriteForRights() {
  const [actions, setActions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadActions = async () => {
      try {
        setError(null);
        const response = await Fetcher(
          buildFetcherUrl("/actions", {
            populate: "*",
            "sort[0]": "createdAt:desc",
            locale: getLocale(),
          })
        );

        const formattedActions =
          response?.data?.map((item) => ({
            id: item.id,
            title: item.attributes?.title || item.title,
            description: item.attributes?.description || item.description,
            cover: item.attributes?.cover || item.cover,
          })) || [];

        if (isMounted) {
          setActions(formattedActions);
        }
      } catch (fetchError) {
        if (isMounted) {
          setActions([]);
          setError(fetchError?.message || "Failed to load actions");
        }
      }
    };

    loadActions();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <WriteForRightsDesktop actions={actions} error={error} />
      <WriteForRightsMobile actions={actions} error={error} />
    </Layout>
  );
}
