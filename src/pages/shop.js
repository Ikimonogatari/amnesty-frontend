import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ShopDesktop from "@/components/shop/ShopDesktop";
import ShopMobile from "@/components/shop/ShopMobile";
import { staticMerchandise } from "@/constants/staticMerchandise";

export default function Shop() {
  const [merchandise, setMerchandise] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip API entirely - just use static data like old website
    setMerchandise(staticMerchandise);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <div
            className="text-lg"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠢᠨ᠎ᠠ...
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <div
            className="text-lg text-red-500"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ: {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ShopDesktop merchandise={merchandise} />
      <ShopMobile merchandise={merchandise} />
    </Layout>
  );
}
