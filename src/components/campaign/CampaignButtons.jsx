export default function CampaignButtons({ section, isMobile = false }) {
  if (!section.buttons || section.buttons.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="w-full bg-gray-200 p-4 rounded-lg">
        <div className="flex flex-col gap-3">
          {section.buttons.map((button, btnIndex) => (
            <a
              key={btnIndex}
              href={button.link || "#"}
              className="bg-white px-6 py-4 rounded text-black font-bold text-sm text-center hover:bg-gray-50 transition-colors"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {button.text || button}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex ml-0 lg:ml-24 flex-nowrap gap-4 bg-gray-200 p-6 rounded-lg flex-shrink-0 min-w-fit">
      {section.buttons.map((button, btnIndex) => (
        <a
          key={btnIndex}
          href={button.link || "#"}
          className="flex items-center justify-center w-[150px] bg-white text-black text-center text-lg font-bold rounded-lg shadow-md hover:opacity-80 transition-opacity flex-shrink-0"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          {button.text || button}
        </a>
      ))}
    </div>
  );
}
