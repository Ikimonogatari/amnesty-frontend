import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Button from "@/components/common/Button";
import StaticHeader from "@/components/common/StaticHeader";
import toast from "react-hot-toast";
import * as countryList from "country-list";
import { actionsService } from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";

export default function WriteForRightsActionMobile({ actionId, action }) {
  const router = useRouter();
  const { control } = useForm({
    defaultValues: {
      country: "MN",
    },
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "MN",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [actionData, setActionData] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  useEffect(() => {
    // Initialize country data
    setCountryData(countryList.getData());

    // Use action data from props if available, otherwise fallback to mock data
    if (action) {
      setActionData(action);
      console.log("Using real action data:", {
        id: action.id,
        title: action.title,
        cover: action.cover,
      });
    }
  }, [actionId, action]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const missingFields = [];

    if (!formData.lastName) missingFields.push("ᠣᠪᠤᠭ");
    if (!formData.firstName) missingFields.push("ᠨᠡᠷᠡ");
    if (!formData.email) missingFields.push("ᠮᠠᠢᠯ ᢈᠠᠶᠠᠭ");

    if (missingFields.length > 0) {
      setErrorMessage(`${missingFields.join(", ")} ᠣᠷᠤᠤᠯᠬᠤ ᢈᠠᠷᠳᠯᠠᠭᠠᠲᠠᠢ᠃`);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setErrorMessage("ᠮᠠᠢᠯ ᢈᠠᠶᠠᠭ ᠢᠨ ᠴᠣᠷᠮᠠᠲ ᠢ ᠨᠢ ᠶᠠᠯᠠᠱ ᠤᠯ᠌");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      // Submit the action form
      await actionsService.submitAction({
        actionId: parseInt(actionId),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
      });

      setFormSubmitted(true);
      toast.success("ᢈᠠᠴᠢᠯᠠᠨ ᠠᠮᠵᠢᠯᠲᠤᠲᠠᠢ ᢈᠢᠯᠢᠭᠯᠡᢉᠡᢉᠡᠢ!"); // Successfully submitted!
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ! ᠳᠠᢉᠢᠨ ᠣᠷᠣᠯᠳᠣᠨᠠ ᠤᠤ."); // Error occurred! Please try again.
      toast.error("ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ! ᠳᠠᢉᠢᠨ ᠣᠷᠣᠯᠳᠣᠨᠠ ᠤᠤ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!actionData) {
    return (
      <div className="sm:hidden flex items-center justify-center min-h-screen bg-[#43a6ac]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="sm:hidden flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="relative">
        <StaticHeader
          image={getImageUrl(actionData.cover) || "/images/no-image.png"}
          alt={actionData.title}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-4 p-4">
        {/* Introduction */}
        <div className="flex flex-row max-h-[200px] overflow-hidden gap-2">
          <h2
            className="text-sm font-bold overflow-hidden flex-shrink-0 max-w-[60px]"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              wordBreak: "keep-all",
              overflowWrap: "break-word",
            }}
            title={actionData.title}
          >
            {actionData.title}
          </h2>
          <p
            className="text-[10px] overflow-y-auto flex-1 max-w-[120px] pr-1"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              wordBreak: "keep-all",
              overflowWrap: "break-word",
              lineHeight: "1.4",
            }}
            title={actionData.description}
          >
            {actionData.description}
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-[#363636] rounded-lg max-h-[400px] p-6">
          <div className="flex gap-4 mt-4 w-full">
            <h2
              className="text-white text-lg font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠨᠢᢉᠡᠳᠡᠨᠡ ᠦᠦ
            </h2>

            {!formSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex gap-2 overflow-x-auto"
              >
                {/* Last Name Field */}
                <div className="flex gap-2">
                  <p
                    className="text-white text-xs"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    ᠣᠪᠤᠭ*
                  </p>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="border rounded-md p-2 w-16 text-xs max-h-[300px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  />
                </div>

                {/* First Name Field */}
                <div className="flex gap-2">
                  <p
                    className="text-white text-xs"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    ᠨᠡᠷᠡ*
                  </p>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="border rounded-md p-2 w-16 text-xs max-h-[300px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  />
                </div>

                {/* Email Field */}
                <div className="flex gap-2">
                  <p
                    className="text-white text-xs"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    ᠮᠠᠢᠯ ᢈᠠᠶᠠᠭ*
                  </p>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border rounded-md p-2 w-16 text-xs max-h-[300px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  />
                </div>

                {/* Country Field */}
                <div className="flex gap-2">
                  <p
                    className="text-white text-xs"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    ᠤᠯᠤᠰ*
                  </p>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <div className="relative dropdown-container">
                        <button
                          type="button"
                          onClick={() =>
                            setIsCountryDropdownOpen(!isCountryDropdownOpen)
                          }
                          className="border border-gray-300 rounded-md p-2 w-16 text-xs bg-white flex flex-col items-center justify-center gap-1 text-black max-h-[300px]"
                          style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                          }}
                        >
                          <div
                            style={{
                              writingMode: "vertical-lr",
                              textOrientation: "upright",
                            }}
                            className="flex items-center justify-center text-xs"
                          >
                            {countryData.find(
                              (country) => country.code === field.value
                            )?.name || "Mongolia"}
                          </div>
                          <div
                            className="flex items-center justify-center text-xs"
                            style={{ writingMode: "horizontal-tb" }}
                          >
                            {isCountryDropdownOpen ? "◀" : "▶"}
                          </div>
                        </button>
                        {isCountryDropdownOpen && (
                          <div className="absolute top-0 left-20 bg-white border border-gray-300 rounded-md shadow-lg z-[9999] flex flex-col w-20 overflow-y-auto max-h-96">
                            {countryData.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  field.onChange(country.code);
                                  handleInputChange("country", country.code);
                                  setIsCountryDropdownOpen(false);
                                }}
                                className="w-16 p-2 text-xs hover:bg-gray-100 border-r border-gray-200 last:border-r-0 h-full flex items-center justify-center text-black"
                              >
                                {country.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="flex gap-2">
                    <div
                      className="text-red-400 text-[10px]"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        width: "60px",
                      }}
                    >
                      {errorMessage}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-2">
                  <Button
                    text={isSubmitting ? "ᠢᠯᠭᠡᢉᠦ ᠪᠠᠶᠢᠨ᠎ᠠ..." : "ᠢᠯᠭᠡᢉᠦ"}
                    type="primary"
                    className="py-2 px-3 text-sm"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Privacy Policy */}
                <div className="flex gap-2 max-h-[300px]">
                  <p
                    className="text-white text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      width: "120px",
                    }}
                  >
                    ᠲᠠᠨ ᠤ᠋ ᠥᠭᠦᠰᠦᠨ ᢈᠤᠪᠢᠶᠠᠨ ᠮᠡᠳᠡᢉᠡᠯᠦᠯ ᠢ ᠪᠢᠳ ᠵᠥᠪᢈᠥᠨ ᠡᠨᠡ ᠻᠠᠮᠫᠠᠨᠢᠲ
                    ᠠᠵᠢᠯ ᠤ᠋ᠨ ᢈᠦᠷᠡᢉᠡ ᠳ᠋ᠤ ᢈᠡᠷᠡᠭᠯᠡᠨᠡ
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <h1
                  className="text-white text-xl font-bold mb-8"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠲᠠᠨ ᠳ᠋ᠤ ᠪᠠᠶᠠᠷᠯᠠᠯᠠᠭ᠎ᠠ
                </h1>

                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.facebook.com/AIMONGOLIA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <svg width="40" height="40" viewBox="0 0 448 512">
                      <path
                        fill="#316ff6"
                        d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/amnestymongolia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-600"
                  >
                    <svg width="40" height="40" viewBox="0 0 448 512">
                      <path
                        fill="#962fbf"
                        d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/amnestymongolia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-900"
                  >
                    <svg width="40" height="40" viewBox="0 0 448 512">
                      <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
