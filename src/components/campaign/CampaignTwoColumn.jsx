export default function CampaignTwoColumn({ section, isMobile = false }) {
  if (!section.columns || section.columns.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="flex overflow-auto gap-6 w-full">
        {section.title && (
          <h2
            className="text-xl font-bold mb-2"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {section.title}
          </h2>
        )}
        <div className="flex gap-4 w-full">
          {section.columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="flex gap-3 w-full p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              {column.title && (
                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {column.title}
                </h3>
              )}
              {column.content && (
                <div
                  className="text-sm text-gray-800 w-full leading-relaxed"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {column.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 flex-shrink-0 min-w-fit mr-0 ml-0  md:ml-10 md:mr-24 lg:ml-10 lg:mr-24">
      {section.title && (
        <h2
          className="text-2xl font-bold text-center mb-4"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          {section.title}
        </h2>
      )}
      <div className="flex gap-6">
        {section.columns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4 min-w-[200px]">
            {column.title && (
              <h3
                className="text-xl font-bold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {column.title}
              </h3>
            )}
            <div
              className="text-base text-gray-800"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {column.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
