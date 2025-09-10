import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import Button from "@/components/common/Button";

export default function Custom404() {
  const router = useRouter();

  return (
    <Layout>
      {/* Desktop Layout */}
      <div
        className="hidden md:flex h-full items-center justify-center"
        style={{ width: "100vw" }}
      >
        <div className="flex flex-row items-center gap-12">
          {/* Large 404 Number */}
          <div
            className="text-9xl font-bold text-gray-300"
            style={{ writingMode: "horizontal-tb" }}
          >
            404
          </div>

          {/* Text Messages in Row */}
          <div className="flex flex-row items-center gap-8">
            {/* Main Error Message */}
            <h1
              className="text-2xl font-bold text-gray-800"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠬᠤᠪᠢ ᠤᠯᠤᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </h1>

            {/* Description */}
            <p
              className="text-base text-gray-600"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠬᠤᠪᠢ ᠤᠯᠤᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </p>
          </div>

          {/* Buttons in Row */}
          <div className="flex flex-row items-center gap-6">
            <Button
              text="ᠡᠬᠢᠨ ᠨᠢᠭᠤᠷ"
              type="primary"
              onClick={() => router.push("/")}
              className="px-6 py-3 text-black font-semibold"
            />

            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="text-gray-500 hover:text-gray-700 transition-colors px-4 py-2"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠪᠤᠴᠠᠬᠤ
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden min-h-screen items-center justify-center p-6">
        <div className="text-center w-full max-w-md">
          {/* Mobile 404 Number - Centered */}
          <div className="text-8xl font-bold text-gray-300 mb-8">404</div>

          {/* Mobile Text Messages in Row - Balanced */}
          <div className="flex flex-row items-center justify-center gap-8 mb-8">
            {/* Mobile Error Message */}
            <h1
              className="text-xl font-bold text-gray-800"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠬᠤᠪᠢ ᠤᠯᠤᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </h1>

            {/* Mobile Description */}
            <p
              className="text-base text-gray-600"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠬᠤᠪᠢ ᠦᠭᠡᠢ
            </p>
          </div>

          {/* Mobile Buttons in Row */}
          <div className="flex flex-row items-center justify-center gap-6">
            <Button
              text="ᠡᠬᠢᠨ ᠨᠢᠭᠤᠷ"
              type="primary"
              onClick={() => router.push("/")}
              className="px-6 py-3 text-black font-semibold"
            />

            <button
              onClick={() => router.back()}
              className="text-gray-500 hover:text-gray-700 transition-colors px-4 py-2 border border-gray-300 rounded"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠪᠤᠴᠠᠬᠤ
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
