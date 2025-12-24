export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/campaign/writeforrights",
      permanent: false,
    },
  };
}

// Old file - redirects to new location
export default function WriteForRightsRedirect() {
  return null;
}
