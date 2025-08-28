import { X } from "lucide-react";
import LeafletMap from "../../common/LeafletMap";

export default function EventModal({
  selectedEvent,
  showModal,
  closeModal,
  formatDateToMongolian,
}) {
  if (!showModal || !selectedEvent) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="relative bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden shadow-2xl"
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
            <h3
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {selectedEvent.title}
            </h3>
            <div className="flex flex-col items-center gap-2">
              <p
                className="text-sm lg:text-base font-bold text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠪᠤᠷᠲᠠᠯ ᠡᠬᠯᠠᠬᠤ:
              </p>
              <p
                className="text-xs lg:text-sm text-gray-900"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {formatDateToMongolian(
                  new Date(selectedEvent.startDate).toISOString().split("T")[0]
                )}{" "}
                {selectedEvent.startTime}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p
                className="text-sm lg:text-base font-bold text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠪᠤᠷᠲᠠᠯ ᠳᠤᠤᠰᠠᠬᠤ:
              </p>
              <p
                className="text-xs lg:text-sm text-gray-900"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {formatDateToMongolian(
                  new Date(selectedEvent.endDate).toISOString().split("T")[0]
                )}{" "}
                {selectedEvent.endTime}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p
                className="text-sm lg:text-base font-bold text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠬᠠᠭᠠᠢ:
              </p>
              <p
                className="text-xs lg:text-sm text-gray-900"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {selectedEvent.location || "ᠲᠣᠭᠲᠠᠭᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ"}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-sm lg:text-base font-bold text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {selectedEvent.type}
              </span>
              <div
                className={`w-4 h-4 rounded-full ${selectedEvent.color}`}
              ></div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h4
                className="text-sm lg:text-base font-bold text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠲᠠᠨᠢᠯᠴᠤᠤᠯᠭ᠎ᠠ:
              </h4>
              {selectedEvent.description ? (
                <p
                  className="text-xs lg:text-sm text-gray-600"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {selectedEvent.description}
                </p>
              ) : (
                <p
                  className="text-sm lg:text-base text-gray-600"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠲᠠᠨᠢᠯᠴᠤᠤᠯᠭ᠎ᠠ ᠦᠭᠡᠢ
                </p>
              )}
            </div>
          </div>
          <div className="p-4 h-64 lg:h-full w-full bg-gray-200 rounded-lg shadow-inner">
            <LeafletMap
              coordinates={selectedEvent.coordinates}
              className="h-full w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
