import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ</title>
      </Head>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            writingMode: "vertical-lr",
            textOrientation: "upright",
            minWidth: "120px",
            minHeight: "200px",
            padding: "16px 12px",
            fontSize: "14px",
            lineHeight: "1.4",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10B981",
              color: "#fff",
              writingMode: "vertical-lr",
              textOrientation: "upright",
              minWidth: "120px",
              minHeight: "200px",
              padding: "16px 12px",
              fontSize: "14px",
              lineHeight: "1.4",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#EF4444",
              color: "#fff",
              writingMode: "vertical-lr",
              textOrientation: "upright",
              minWidth: "120px",
              minHeight: "250px",
              padding: "16px 12px",
              fontSize: "14px",
              lineHeight: "1.4",
            },
          },
        }}
      />
    </Provider>
  );
}
