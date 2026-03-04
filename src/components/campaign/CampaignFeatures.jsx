import Image from "next/image";
import { getImageUrl } from "@/utils/fetcher";

export default function CampaignFeatures({ features, isMobile = false }) {
  if (!features || features.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h2
          className="text-xl font-bold"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᢈᠢᠨᠠᠷ
        </h2>
        <div className="flex flex-col gap-4 w-full">
          {features.map((feature, index) => (
            <div
              key={feature.id || index}
              className="flex flex-col items-center gap-2 w-full"
            >
              {feature.image && (
                <div className="w-24 h-24 relative">
                  <Image
                    src={
                      getImageUrl(feature.image) ||
                      "/mng/images/campaign/feature.png"
                    }
                    alt={feature.title || "Feature image"}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              {feature.title && (
                <h3
                  className="text-sm font-semibold text-center"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {feature.title}
                </h3>
              )}
              {feature.description && (
                <div
                  className="text-xs text-gray-600 text-center w-full"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: feature.description,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <h2
        className="text-2xl font-bold"
        style={{
          writingMode: "vertical-lr",
        }}
      >
        ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠶ᠋ᠢᠨ ᢈᠢᠨᠠᠷ
      </h2>
      <div className="max-h-[600px] overflow-y-auto">
        <div className="grid gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id || index}
              className="flex gap-6 p-6 bg-gray-50 rounded-lg border"
            >
              {feature.image && (
                <div className="w-32 h-32 flex-shrink-0 relative">
                  <Image
                    src={
                      getImageUrl(feature.image) ||
                      "/mng/images/campaign/feature.png"
                    }
                    alt={feature.title || "Feature image"}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3
                  className="text-xl font-bold mb-4"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {feature.title}
                </h3>
                {feature.description && (
                  <div
                    className="text-base text-gray-700"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: feature.description,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
