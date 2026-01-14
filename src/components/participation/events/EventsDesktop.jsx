import { API_CONFIG } from "@/config/api";
import { eventsService } from "@/services/apiService";
import { useEffect, useState } from "react";
import EventModal from "./EventModal";

export default function EventsDesktop() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const monthNames = [
    "ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠬᠣᠶᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠳᠥᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠳᠣᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠶᠡᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
    "ᠠᠷᠪᠠᠨ ᠬᠣᠶᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
  ];

  // Reorder days to start with Monday
  const daysOfWeek = [
    "ᠰᠠᠷᠠᠨ", // Monday
    "ᠠᠩᠭᠠᠷᠠᠭ", // Tuesday
    "ᠯᠬᠠᠭᠠᠨ", // Wednesday
    "ᠫᠦᠷᠡᠪ", // Thursday
    "ᠪᠠᠰᠠᠩ", // Friday
    "ᠪᠢᠮᠪᠠ", // Saturday
    "ᠨᠠᠷᠠᠨ", // Sunday
  ];

  // Convert Arabic numerals to Mongolian Bichig numerals
  const toMongolianNumerals = (num) => {
    try {
      const mongolianDigits = [
        "᠐",
        "᠑",
        "᠒",
        "᠓",
        "᠔",
        "᠕",
        "᠖",
        "᠗",
        "᠘",
        "᠙",
      ];
      const result = num
        .toString()
        .split("")
        .map((digit) => mongolianDigits[parseInt(digit)])
        .join("");
      return result || num.toString(); // Fallback to regular numbers if conversion fails
    } catch (error) {
      return num.toString(); // Fallback to regular numbers
    }
  };

  // Fetch events data for the current month
  const fetchEventsData = async (year, month) => {
    setLoading(true);
    setError(null);

    try {
      // Use the direct events API endpoint
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);

      // Format dates for API (YYYY-MM-DD) - using local date to avoid timezone issues
      const startDateStr = `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
      const endDateStr = `${endDate.getFullYear()}-${String(
        endDate.getMonth() + 1
      ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

      console.log(
        `Fetching events for ${year}-${
          month + 1
        }: ${startDateStr} to ${endDateStr}`
      );

      // Simple approach: get events that start before end of month and end after start of month
      // This will capture all events that overlap with the current month
      const params = {
        "filters[start_date][$lte]": endDateStr,
        "filters[end_date][$gte]": startDateStr,
        sort: "start_date:asc",
        populate: "*",
        locale: API_CONFIG.LOCALE,
        "pagination[pageSize]": 100, // Get more events
      };

      const response = await eventsService.getEvents(params);
      console.log("Events API response:", response);

      if (response && (response.data || Array.isArray(response))) {
        const eventData = response.data || response;
        console.log(`Found ${eventData.length} events for this month`);
        processEventsData(eventData);
      } else {
        console.log("No events found for this month");
        setEvents({});
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message || "Failed to fetch events");
      // Clear events on error
      setEvents({});
    } finally {
      setLoading(false);
    }
  };

  // Process API response data into calendar format
  const processEventsData = (eventData) => {
    const eventsMap = {};

    if (!Array.isArray(eventData)) {
      console.warn("Event data is not an array:", eventData);
      return;
    }

    console.log("Processing events data:", eventData);

    eventData.forEach((event, index) => {
      try {
        // Handle both possible event structures
        const eventAttrs = event.attributes || event;

        if (!eventAttrs.start_date || !eventAttrs.end_date) {
          console.warn("Event missing required dates:", eventAttrs);
          return;
        }

        // Extract date part directly from ISO string to avoid timezone issues
        // If the date string is "2024-01-15T10:00:00.000Z", extract "2024-01-15"
        const getDatePart = (dateString) => {
          if (typeof dateString === "string") {
            // Extract YYYY-MM-DD from ISO string
            const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
            if (dateMatch) {
              return {
                year: parseInt(dateMatch[1], 10),
                month: parseInt(dateMatch[2], 10),
                day: parseInt(dateMatch[3], 10),
              };
            }
          }
          // Fallback to Date object if not a string
          const date = new Date(dateString);
          if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
          }
          return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
          };
        };

        const startDateParts = getDatePart(eventAttrs.start_date);
        const endDateParts = getDatePart(eventAttrs.end_date);

        // Create Date objects for comparison (using local time at midnight)
        const startDate = new Date(
          startDateParts.year,
          startDateParts.month - 1,
          startDateParts.day
        );
        const endDate = new Date(
          endDateParts.year,
          endDateParts.month - 1,
          endDateParts.day
        );

        // Create date key from date parts (avoiding timezone conversion)
        const dateKey = `${startDateParts.year}-${String(
          startDateParts.month
        ).padStart(2, "0")}-${String(startDateParts.day).padStart(2, "0")}`;

        // Use current date for comparison (removed 2025 specific logic)
        const currentDate = new Date();
        const isPastEvent = endDate < currentDate;

        // Color coding based on event type and status
        let eventColor = "bg-[#D9D9D9]"; // Default/past events
        if (!isPastEvent) {
          if (eventAttrs.members_only) {
            eventColor = "bg-[#FB00FF]"; // Members only - purple
          } else {
            eventColor = "bg-[#FFFF00]"; // Public events - yellow
          }
        }

        const eventObj = {
          id: event.id,
          title: eventAttrs.title || "Unnamed Event",
          color: eventColor,
          type: eventAttrs.event_type || "ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ",
          startTime: formatTime(eventAttrs.start_date),
          endTime: formatTime(eventAttrs.end_date),
          description: eventAttrs.body || "",
          location: eventAttrs.address || "",
          membersOnly: eventAttrs.members_only || false,
          isPast: isPastEvent,
          startDate: eventAttrs.start_date,
          endDate: eventAttrs.end_date,
        };

        // Handle multiple events on the same date
        if (eventsMap[dateKey]) {
          // For now, keep the first event (could be enhanced to show multiple)
          console.log(`Multiple events on ${dateKey}, keeping first one`);
        } else {
          eventsMap[dateKey] = eventObj;
        }

        // Also add events for multi-day events (if end date is different)
        if (
          dateKey !==
          `${endDateParts.year}-${String(endDateParts.month).padStart(
            2,
            "0"
          )}-${String(endDateParts.day).padStart(2, "0")}`
        ) {
          // Iterate through each day of the multi-day event
          let currentDateParts = { ...startDateParts };
          const endDateKey = `${endDateParts.year}-${String(
            endDateParts.month
          ).padStart(2, "0")}-${String(endDateParts.day).padStart(2, "0")}`;

          while (true) {
            // Move to next day
            const currentDate = new Date(
              currentDateParts.year,
              currentDateParts.month - 1,
              currentDateParts.day
            );
            currentDate.setDate(currentDate.getDate() + 1);

            const nextYear = currentDate.getFullYear();
            const nextMonth = currentDate.getMonth() + 1;
            const nextDay = currentDate.getDate();
            const multiDayKey = `${nextYear}-${String(nextMonth).padStart(
              2,
              "0"
            )}-${String(nextDay).padStart(2, "0")}`;

            if (multiDayKey > endDateKey) break;

            if (!eventsMap[multiDayKey]) {
              eventsMap[multiDayKey] = {
                ...eventObj,
                title: `${eventObj.title} (continued)`,
              };
            }

            currentDateParts = {
              year: nextYear,
              month: nextMonth,
              day: nextDay,
            };
          }
        }
      } catch (error) {
        console.error("Error processing event:", event, error);
      }
    });

    console.log("Processed events map:", eventsMap);
    setEvents(eventsMap);
  };

  // Format time from ISO string
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Fetch events when component mounts or date changes
  useEffect(() => {
    fetchEventsData(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    // Get the first day of the month (0=Sunday, 1=Monday, etc.)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // Convert to Monday-first format (Monday=0, Tuesday=1, etc.)
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const getPrevMonthDays = (date) => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 0);
    return prevMonth.getDate();
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (dateString) => {
    const event = events[dateString];
    if (event) {
      setSelectedEvent({ ...event, date: dateString });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const formatDateToMongolian = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${toMongolianNumerals(year)} ᠣᠨ ${toMongolianNumerals(
      parseInt(month)
    )} ᠰᠠᠷ᠎ᠠ ${toMongolianNumerals(parseInt(day))} ᠦᠳᠦᠷ`;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const prevMonthDays = getPrevMonthDays(currentDate);
    const days = [];

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const dayIndex = firstDay - 1 - i;
      const isLastInRow = (dayIndex + 1) % 7 === 0;
      days.push(
        <div
          key={`prev-${day}`}
          className={`border-b border-gray-200 p-2 text-gray-400 text-sm cursor-pointer hover:bg-gray-50 relative h-full min-h-[80px] min-w-[240px] ${
            isLastInRow ? "" : "border-r"
          }`}
        >
          <div
            className="absolute top-2 left-2 text-xs opacity-50"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {daysOfWeek[(firstDay - 1 - i + 7) % 7]}
          </div>
          <div
            className="absolute top-2 right-2"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {toMongolianNumerals(day)}
          </div>
        </div>
      );
    }

    // Current month days
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const event = events[dateString];
      const dayIndex = firstDay + day - 1;
      const isLastInRow = dayIndex % 7 === 0;
      const isToday = dateString === todayString;

      days.push(
        <div
          key={day}
          className={`border-b border-gray-200 p-2 text-sm cursor-pointer relative h-full min-h-[80px] min-w-[240px] ${
            isLastInRow ? "" : "border-r"
          } ${
            isToday
              ? "bg-[#fffadf] hover:bg-[#fffadf]"
              : event
              ? "hover:bg-blue-50"
              : "hover:bg-gray-50"
          }`}
          onClick={() => handleDayClick(dateString)}
        >
          <div
            className="absolute top-2 left-2 text-xs opacity-50"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {daysOfWeek[dayIndex % 7]}
          </div>
          <div
            className="absolute top-2 right-0 font-medium"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {toMongolianNumerals(day)}
          </div>
          {event && (
            <>
              <div
                className={`absolute bottom-2 left-2 ${event.color} px-1 py-0.5 rounded text-white text-[8px] font-medium cursor-pointer min-w-[20px] text-center group`}
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {event.title.split(" ")[0] || event.title.substring(0, 3)}
                {/* Tooltip */}
                <div className="absolute left-full bottom-0 ml-2 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                  <div
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {event.title}
                  </div>
                  <div className="absolute top-full left-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                </div>
              </div>
            </>
          )}
        </div>
      );
    }

    // Next month's leading days to fill the grid
    const totalCells = Math.ceil(days.length / 7) * 7;
    for (let day = 1; days.length < totalCells; day++) {
      const dayIndex = days.length;
      const isLastInRow = (dayIndex + 1) % 7 === 0;
      days.push(
        <div
          key={`next-${day}`}
          className={`border-b border-gray-200 p-2 text-gray-400 text-sm cursor-pointer hover:bg-gray-50 relative h-full min-h-[80px] min-w-[240px] ${
            isLastInRow ? "" : "border-r"
          }`}
        >
          <div
            className="absolute top-2 left-2 text-xs opacity-50"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {daysOfWeek[dayIndex % 7]}
          </div>
          <div
            className="absolute top-2 right-0"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {toMongolianNumerals(day)}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="h-full hidden sm:flex gap-10 p-14 overflow-x-auto w-auto flex-shrink-0">
      {/* Left side - Legend */}
      <div className="h-full flex gap-10">
        <div className="h-full flex gap-12">
          <h2
            className="text-base font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠪᠢᠳᠡ ᠰᠢᠳᠤᠷᠭᠤ ᠶᠣᠰᠤ᠂ ᠡᠷᢈᠡ ᠴᠢᠯᠦᢉᠡ᠂ ᠦᠨᠡᠨ᠂ ᠪᠣᠯᠤᠨ ᠨᠡᠷ᠎ᠡ ᠲᠥᠷᠦ ᠨᠢ
            ᠦᢉᠡᠶᠢᠰᢈᠡᢉᠳᠡᢉᠰᠡᠨ ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠶ᠋ᠢᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠪᠠᠷ
            ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢᠳ ᠤ᠋ᠨ ᠳᠠᠶᠠᠩ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ
            ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ᠃
          </h2>
          <h2
            className="text-base font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠪᠣᠯ ᢈᠦᠮᠦᠰ ᠦ᠋ᠨ ᠨᠢᢉᠡᠳᠦᠯ᠃ ᠣᠯᠠᠨ ᢈᠦᠮᠦᠰ ᠰᠢᠳᠤᠷᠭᠤ ᠶᠣᠰᠤᠨ ᠤ᠋ ᠲᠥᠯᠦᢉᠡ
            ᠳᠤᠤᠭᠠᠷᠳᠠᠭ ᠤᠴᠢᠷ ᠠ᠋ᠴᠠ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠱᠢᠨ᠋ᠯ ᠭᠠᠶᠢᠬᠠᠯᠲᠠᠢ ᠠᠮᠵᠢᠯᠲᠠ ᠳ᠋ᠤ
            ᢈᠦᠷᠴᠦ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠶᠤᠮ᠃
          </h2>
          <h2
            className="text-base font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠲᠠᠨ ᠤ᠋ ᠣᠷᠤᠯᠴᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ ᠤᠯᠠᠮᠵᠢᠯᠠᠯᠲᠤ᠂ ᠵᠢᠯ ᠪᠣᠯᠭᠠᠨ ᠵᠣᢈᠢᠶᠠᠨ
            ᠪᠠᠶᠢᠭᠤᠯᠳᠠᠭ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ ᠨᠦ᠋ᢉᠦᠳ᠃
          </h2>
          <div className="flex flex-col gap-2">
            <div className="bg-[#D9D9D9] aspect-square"></div>
            <p
              className="text-xs"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠵᠣᢈᠢᠶᠠᠭᠳᠠᠭᠰᠠᠨ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-[#FB00FF] w-4 h-4 aspect-square"></div>

            <p
              className="text-xs"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠪᠠᠭ᠂ ᠪᠦᠯᠦᢉ᠂ ᠪᠦᢈᠦ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠠᠭᠤᠯᠵᠠᠯᠲᠠ
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-[#FFFF00] w-4 h-4 aspect-square"></div>

            <p
              className="text-xs"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠣᠯᠠᠨ ᠨᠡᠶᠢᠲᠡ ᠶ᠋ᠢᠨ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Header - Column Layout */}
      <div className="flex flex-col items-center justify-between h-full">
        {/* Top: Left/Right buttons in a row */}
        <div className="flex items-center">
          <button
            onClick={() => navigateMonth(-1)}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => navigateMonth(1)}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* Middle: Date name with loader/error */}
        <div className="flex items-center justify-center gap-2">
          <h2
            className="text-xl font-semibold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            {monthNames[currentDate.getMonth()]}{" "}
            {toMongolianNumerals(currentDate.getFullYear())}
          </h2>
          {loading && (
            <div className="flex items-center text-gray-500 gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              <span
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠠᠴᠢᠯᠠᠭᠤᠯᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...
              </span>
            </div>
          )}
          {error && (
            <div
              className="text-red-500 text-sm"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠠᠯᠳᠠᠭ᠎ᠠ: {error}
            </div>
          )}
        </div>
        {/* Bottom: Today button */}
        <button
          onClick={navigateToToday}
          disabled={loading}
          className="px-4 py-2 hover:bg-gray-100 text-sm border rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <p
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠥᠨᠥᠳᠦᠷ
          </p>
        </button>
      </div>

      {/* Right side - Calendar Grid */}
      <div className="flex-1 bg-white flex flex-col h-full">
        {/* Calendar Grid */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex-1 flex flex-col">
          {/* Calendar days */}
          <div className="grid grid-cols-7 flex-1 auto-rows-fr">
            {renderCalendarDays()}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <EventModal
        selectedEvent={selectedEvent}
        showModal={showModal}
        closeModal={closeModal}
        formatDateToMongolian={formatDateToMongolian}
      />
    </div>
  );
}
