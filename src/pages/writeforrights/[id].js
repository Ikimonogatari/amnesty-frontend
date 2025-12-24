export async function getServerSideProps({ params }) {
  // Redirect to new location
  return {
    redirect: {
      destination: `/campaign/writeforrights/${params.id}`,
      permanent: false,
    },
  };
}

// Old file - redirects to new location
export default function WriteForRightsDetailRedirect() {
  return null;
}
