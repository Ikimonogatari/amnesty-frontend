import CampaignButtons from "./CampaignButtons";
import CampaignTwoColumn from "./CampaignTwoColumn";
import CampaignSection from "./CampaignSection";

export default function CampaignContent({ sections, isMobile = false }) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section, index) => {
        // Render buttons section
        if (section.type === "buttons" && section.buttons) {
          return (
            <CampaignButtons
              key={index}
              section={section}
              isMobile={isMobile}
            />
          );
        }

        // Render two-column section
        if (section.type === "two-column" && section.columns) {
          return (
            <CampaignTwoColumn
              key={index}
              section={section}
              isMobile={isMobile}
            />
          );
        }

        // Render regular content section
        return (
          <CampaignSection
            key={index}
            section={section}
            isMobile={isMobile}
          />
        );
      })}
    </>
  );
}
