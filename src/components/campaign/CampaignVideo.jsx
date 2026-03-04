export default function CampaignVideo({ video, isMobile = false }) {
  if (!video) {
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
          ᠪᠢᠳᠢᠶᠣ
        </h2>
        <div className="w-full aspect-video relative">
          <iframe
            width="100%"
            height="100%"
            src={video}
            title="Campaign Video"
            className="border-0 rounded w-full h-full"
            allowFullScreen
          />
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
        ᠪᠢᠳᠢᠶᠣ
      </h2>
      <div className="w-[570px] h-[315px] relative">
        <iframe
          width="570"
          height="315"
          src={video}
          title="Campaign Video"
          className="border-0 rounded-lg"
          allowFullScreen
        />
      </div>
    </div>
  );
}
