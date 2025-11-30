import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import LeafletMap from "../../common/LeafletMap";

export default function EventModal({
  selectedEvent,
  showModal,
  closeModal,
  formatDateToMongolian,
}) {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  
  // Reset to first event when modal opens
  useEffect(() => {
    if (showModal) {
      setCurrentEventIndex(0);
    }
  }, [showModal]);
  
  if (!showModal || !selectedEvent) return null;

  // Handle both old format (single event) and new format (multiple events)
  const events = selectedEvent.events || [selectedEvent];
  const currentEvent = events[currentEventIndex] || events[0];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="relative bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-x-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white hover:text-gray-200 text-3xl font-light"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Modal Content */}
        <div className="w-full p-8 flex flex-col md:flex-row justify-between h-[70hv] gap-4 overflow-x-auto">
          <div className="flex flex-row gap-4">
            {/* Event Counter and Navigation for multiple events */}
            {events.length > 1 && (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setCurrentEventIndex(Math.max(0, currentEventIndex - 1))}
                  disabled={currentEventIndex === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm">{currentEventIndex + 1}/{events.length}</span>
                <button
                  onClick={() => setCurrentEventIndex(Math.min(events.length - 1, currentEventIndex + 1))}
                  disabled={currentEventIndex === events.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            <h3
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {currentEvent.title}
            </h3>
            <div className="flex flex-col items-center gap-2">
              <p
                className="text-sm lg:text-base font-bold text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠪᠤᠷᠲᠠᠯ ᠡᠬᠯᠠᠬᠤ:
              </p>
              <p
                className="text-xs lg:text-sm text-gray-900"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {formatDateToMongolian(
                  new Date(currentEvent.startDate).toISOString().split("T")[0]
                )}{" "}
                {currentEvent.startTime}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p
                className="text-sm lg:text-base font-bold text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠪᠤᠷᠲᠠᠯ ᠳᠤᠤᠰᠠᠬᠤ:
              </p>
              <p
                className="text-xs lg:text-sm text-gray-900"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {formatDateToMongolian(
                  new Date(currentEvent.endDate).toISOString().split("T")[0]
                )}{" "}
                {currentEvent.endTime}
              </p>
            </div>
            <div className="flex flex-row gap-2 max-h-[500px] overflow-x-auto">
              <p
                className="text-sm lg:text-base font-bold text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠬᠠᠭᠠᠢ:
              </p>
              <p
                className="text-xs lg:text-sm text-gray-900"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {currentEvent.location || "ᠲᠣᠭᠲᠠᠭᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ"}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-sm lg:text-base font-bold text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {currentEvent.type}
              </span>
              <div
                className={`w-4 h-4 rounded-full ${currentEvent.color}`}
              ></div>
            </div>
            <div className="flex flex-row gap-2 max-h-[500px] overflow-x-auto">
              <h4
                className="text-sm lg:text-base font-bold text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠲᠠᠨᠢᠯᠴᠤᠤᠯᠭ᠎ᠠ:
              </h4>
              {currentEvent.description ? (
                <p
                  className="text-xs lg:text-sm text-gray-600"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {currentEvent.description}
                </p>
              ) : (
                <p
                  className="text-sm lg:text-base text-gray-600"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠲᠠᠨᠢᠯᠴᠤᠤᠯᠭ᠎ᠠ ᠦᠭᠡᠢ
                </p>
              )}
            </div>
          </div>
          <div className="p-4 md:min-w-[500px] md:min-h-[500px] bg-gray-200 rounded-lg shadow-inner">
            <LeafletMap
              coordinates={currentEvent.coordinates}
              className="h-full w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
