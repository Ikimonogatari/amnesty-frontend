import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { eventsService } from "@/services/apiService";
import { API_CONFIG } from "@/config/api";
import EventModal from "./EventModal";

export default function EventsMobile() {
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
          if (typeof dateString === 'string') {
            // Extract YYYY-MM-DD from ISO string
            const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
            if (dateMatch) {
              return {
                year: parseInt(dateMatch[1], 10),
                month: parseInt(dateMatch[2], 10),
                day: parseInt(dateMatch[3], 10)
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
            day: date.getDate()
          };
        };

        const startDateParts = getDatePart(eventAttrs.start_date);
        const endDateParts = getDatePart(eventAttrs.end_date);

        // Create Date objects for comparison (using local time at midnight)
        const startDate = new Date(startDateParts.year, startDateParts.month - 1, startDateParts.day);
        const endDate = new Date(endDateParts.year, endDateParts.month - 1, endDateParts.day);

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
           // Convert to array if not already
           if (!Array.isArray(eventsMap[dateKey])) {
             eventsMap[dateKey] = [eventsMap[dateKey]];
           }
           eventsMap[dateKey].push(eventObj);
         } else {
           eventsMap[dateKey] = eventObj; // Single event stays as object for backward compatibility
         }

        // Also add events for multi-day events (if end date is different)
        if (dateKey !== `${endDateParts.year}-${String(
          endDateParts.month
        ).padStart(2, "0")}-${String(endDateParts.day).padStart(2, "0")}`) {
          // Iterate through each day of the multi-day event
          let currentDateParts = { ...startDateParts };
          const endDateKey = `${endDateParts.year}-${String(
            endDateParts.month
          ).padStart(2, "0")}-${String(endDateParts.day).padStart(2, "0")}`;
          
          while (true) {
            // Move to next day
            const currentDate = new Date(currentDateParts.year, currentDateParts.month - 1, currentDateParts.day);
            currentDate.setDate(currentDate.getDate() + 1);
            
            const nextYear = currentDate.getFullYear();
            const nextMonth = currentDate.getMonth() + 1;
            const nextDay = currentDate.getDate();
            const multiDayKey = `${nextYear}-${String(
              nextMonth
            ).padStart(2, "0")}-${String(nextDay).padStart(2, "0")}`;
            
            if (multiDayKey > endDateKey) break;
            
            if (!eventsMap[multiDayKey]) {
              eventsMap[multiDayKey] = {
                ...eventObj,
                title: `${eventObj.title} (continued)`,
              };
            }
            
            currentDateParts = { year: nextYear, month: nextMonth, day: nextDay };
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
    const eventOrEvents = events[dateString];
    if (eventOrEvents) {
      // Handle both single event (object) and multiple events (array)
      const eventsArray = Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents];
      setSelectedEvent({ events: eventsArray, date: dateString });
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
          className={`border-b border-r border-gray-200 p-2 text-gray-400 text-[8px] cursor-pointer hover:bg-gray-50 flex flex-col h-full min-h-[40px] w-full min-w-[40px]`}
        >
          {toMongolianNumerals(day)}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const event = events[dateString];
      const dayIndex = firstDay + day - 1;
      const isLastInRow = dayIndex % 7 === 0;

      days.push(
        <div
          key={day}
          className={`border-b border-r border-gray-200 p-2 text-[8px] cursor-pointer hover:bg-gray-50 relative h-full min-h-[40px] w-full min-w-[40px] ${
            event ? "hover:bg-blue-50" : ""
          }`}
          onClick={() => handleDayClick(dateString)}
        >
          <span style={{ writingMode: "vertical-lr" }} className="absolute top-1 left-1 font-medium">
            {toMongolianNumerals(day)}
          </span>
          {event && (
            <div className="group relative">
              {Array.isArray(event) ? (
                // Multiple events - show multiple squares
                <div className="flex flex-wrap gap-0.5 absolute bottom-1 right-1">
                  {event.slice(0, 4).map((evt, index) => (
                    <div
                      key={index}
                      className={`${evt.color} w-2 h-2 rounded cursor-pointer`}
                    ></div>
                  ))}
                  {event.length > 4 && (
                    <div className="bg-gray-600 w-2 h-2 rounded cursor-pointer text-[6px] text-white flex items-center justify-center">
                      +
                    </div>
                  )}
                </div>
              ) : (
                // Single event - show single square
                <div
                  className={`relative top-4 left-6 ${event.color} w-3 h-3 rounded cursor-pointer`}
                ></div>
              )}
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-1 px-2 py-1 bg-black text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap max-w-[120px]">
                <div
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {Array.isArray(event) 
                    ? `${event.length} ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ`
                    : event.title
                  }
                </div>
                <div className="absolute top-full right-1 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
              </div>
            </div>
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
          className={`border-b border-r border-gray-200 p-2 text-gray-400 text-[8px] cursor-pointer hover:bg-gray-50 flex flex-col h-full min-h-[40px] w-full min-w-[40px]`}
        >
          {toMongolianNumerals(day)}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="h-full w-full sm:hidden p-4 flex flex-col gap-7">
      <div className="h-full flex gap-10">
        <div className="h-full flex gap-4 max-h-[180px]">
          <h2
            className="text-xs font-bold"
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
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠪᠣᠯ ᢈᠦᠮᠦᠰ ᠦ᠋ᠨ ᠨᠢᢉᠡᠳᠦᠯ᠃ ᠣᠯᠠᠨ ᢈᠦᠮᠦᠰ ᠰᠢᠳᠤᠷᠭᠤ ᠶᠣᠰᠤᠨ ᠤ᠋ ᠲᠥᠯᠦᢉᠡ
            ᠳᠤᠤᠭᠠᠷᠳᠠᠭ ᠤᠴᠢᠷ ᠠ᠋ᠴᠠ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠱᠢᠨ᠋ᠯ ᠭᠠᠶᠢᠬᠠᠯᠲᠠᠢ ᠠᠮᠵᠢᠯᠲᠠ ᠳ᠋ᠤ
            ᢈᠦᠷᠴᠦ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠶᠤᠮ᠃
          </h2>
          <h2
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠲᠠᠨ ᠤ᠋ ᠣᠷᠤᠯᠴᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ ᠤᠯᠠᠮᠵᠢᠯᠠᠯᠲᠤ᠂ ᠵᠢᠯ ᠪᠣᠯᠭᠠᠨ ᠵᠣᢈᠢᠶᠠᠨ
            ᠪᠠᠶᠢᠭᠤᠯᠳᠠᠭ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ ᠨᠦ᠋ᢉᠦᠳ᠃
          </h2>
        </div>
      </div>

      {/* Right side - Calendar Grid */}
      <div className="flex-1 bg-white flex flex-col gap-4 h-full">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth(-1)}
              disabled={loading}
              className="hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateMonth(1)}
              disabled={loading}
              className="hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              style={{ writingMode: "vertical-lr" }}
              onClick={navigateToToday}
              disabled={loading}
              className="px-2 py-1 hover:bg-gray-100 text-[10px] border rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p>ᠥᠨᠥᠳᠦᠷ</p>
            </button>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-xs font-bold" style={{ writingMode: "vertical-lr" }}>
              {monthNames[currentDate.getMonth()]}{" "}
              {toMongolianNumerals(currentDate.getFullYear())}
            </h2>
            {loading && (
              <div className="flex items-center text-gray-500">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600 mr-1"></div>
                <span className="text-[10px]">ᠠᠴᠢᠯᠠᠭᠤᠯᠵᠤ...</span>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-[10px] text-center">
                ᠠᠯᠳᠠᠭ᠎ᠠ
              </div>
            )}
          </div>
          <div></div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex-1 flex flex-col">
          {/* Days of week header */}
          <div className="grid grid-cols-7 bg-gray-50">
            {daysOfWeek.map((day, index) => (
              <div
                key={day}
                style={{
                  writingMode: "vertical-lr",
                }}
                className={`p-2 flex items-center justify-center text-[10px] font-medium text-gray-700 border-r border-gray-200 ${
                  index === 6 ? "border-r-0" : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 flex-1 auto-rows-fr">
            {renderCalendarDays()}
          </div>
        </div>
        <div className="w-full flex gap-5 max-h-[150px] justify-end">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#D9D9D9] w-4 h-4 aspect-square"></div>
            <p
              className="text-[10px]"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠵᠣᢈᠢᠶᠠᠭᠳᠠᠭᠰᠠᠨ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#FB00FF] w-4 h-4 aspect-square"></div>

            <p
              className="text-[10px]"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠪᠠᠭ᠂ ᠪᠦᠯᠦᢉ᠂ ᠪᠦᢈᠦ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠠᠭᠤᠯᠵᠠᠯᠲᠠ
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#FFFF00] w-4 h-4 aspect-square"></div>

            <p
              className="text-[10px]"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠣᠯᠠᠨ ᠨᠡᠶᠢᠲᠡ ᠶ᠋ᠢᠨ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ
            </p>
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
