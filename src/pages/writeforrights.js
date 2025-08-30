import Layout from "@/components/layout/Layout";
import WriteForRightsDesktop from "@/components/campaign/writeforrights/WriteForRightsDesktop";
import WriteForRightsMobile from "@/components/campaign/writeforrights/WriteForRightsMobile";
import { actionsService } from "@/services/apiService";

export async function getServerSideProps() {
  try {
    // Fetch actions data - simplified to get all active actions like old web
    const queryParams = {
      populate: "*",
      sort: "createdAt:desc",
      locale: "mn",
      // Remove restrictive date filters that may be blocking actions
    };

    const actionsResponse = await actionsService.getActions(queryParams);

    return {
      props: {
        actions: actionsResponse.data || [],
        error: null,
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
