import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
import * as countryList from "country-list";
import { actionsService } from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";

export default function WriteForRightsMobile({ actions = [], error = null }) {
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
  const [selectedItems, setSelectedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  useEffect(() => {
    // Initialize country data
    const countries = countryList.getData();
    setCountryData(countries);

    // Select all items by default
    if (actions && actions.length > 0) {
      setSelectedItems(actions.map((action) => action.id));
    }
  }, [actions]);

  const handleCheckboxChange = (actionId, isChecked) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, actionId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== actionId));
    }
  };

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

    // Check if any actions are selected
    if (selectedItems.length === 0) {
      setErrorMessage("ᠠᠵᠢᠯ ᠤᠯᠠᠭᠠ ᠰᠣᠩᠭᠣᠨᠠ ᠤᠤ᠃"); // Please select at least one action
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      console.log("=== WRITEFORRIGHT MOBILE FORM SUBMISSION ===");
      console.log("Selected items:", selectedItems);
      console.log("Form data:", formData);

      // Submit for each selected action, like the old web
      const submitPromises = selectedItems.map((actionId) => {
        console.log(`Submitting for action ID: ${actionId}`);
        return actionsService.submitAction({
          actionId: actionId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          country: formData.country,
        });
      });

      console.log("Waiting for all promises to resolve...");
      const results = await Promise.all(submitPromises);
      console.log("All submissions completed:", results);

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

  const handleActionClick = (actionId) => {
    router.push(`/campaign/writeforrights/${actionId}`);
  };

  // Show error state if there's an API error
  if (error) {
    return (
      <div className="sm:hidden flex flex-col min-h-screen bg-[#43a6ac] items-center justify-center">
        <div className="text-center">
          <h1
            className="text-xl font-bold text-red-600 mb-4"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </h1>
          <p
            className="text-white mb-4"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠠᠵᠢᠯ ᠤ᠋ᠯᠠᠭ᠎ᠠ ᠦᠵᠡᠭᠳᠡᠵᠤ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:hidden flex flex-col min-h-screen bg-[#43a6ac]">
      {/* Main Content */}
      <div className="flex-1 space-y-4 p-4">
        {/* Introduction */}
        <div className="flex flex-row max-h-[300px] overflow-x-auto gap-2">
          <h2
            className="bg-black text-white p-2 text-lg font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            "ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠵᠠᢈᠢᠳᠠᠯ ᠪᠢᢈᠢᢈᠦ" ᠠᠶᠠᠨ ᠳ᠋ᠤ ᠨᠢᢉᠡᠳᠡᠨᠡ ᠦᠦ
          </h2>
          <p
            className="text-base mb-6"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠪᠢᠳ ᠬᠠᠮᠲᠤᠳᠠᠭᠠ ᠲᠡᠮᠴᠪᠡᠯ ᠢᠯᠦᠦ ᢈᠦᢉᠲᠡᠢ᠃ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠵᠠᢈᠢᠳᠠᠯ ᠪᠢᢈᠢᢈᠦ
            ᠠᠶᠠᠨ ᠤ᠋ ᠭᠣᠯ ᢈᠥᠳᠡᠯᢉᠡᢉᠴᠢ ᢈᠦᢉ ᠶᠤᠮ᠃
          </p>
        </div>

        {/* Actions List */}
        <div className="flex flex-row gap-2 overflow-x-auto mb-8">
          {actions && actions.length > 0 ? (
            actions.map((action) => (
              <div
                key={action.id}
                className="flex flex-col items-center justify-between gap-2 p-3 w-[120px] bg-white rounded-lg"
              >
                <div className="w-[80px] h-[80px] flex-shrink-0">
                  <Image
                    src={getImageUrl(action.cover)}
                    width={100}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3 w-full flex flex-row overflow-hidden max-h-[300px]">
                  <h3
                    className="font-bold mb-1 text-xs overflow-hidden flex-shrink-0 max-w-[40px]"
                    style={{
                      writingMode: "vertical-lr",
                      wordBreak: "keep-all",
                      overflowWrap: "break-word",
                    }}
                    title={action.title}
                  >
                    {action.title}
                  </h3>
                  <p
                    className="text-xs mb-2 overflow-y-auto flex-1 max-w-[80px] pr-1"
                    style={{
                      writingMode: "vertical-lr",
                      wordBreak: "keep-all",
                      overflowWrap: "break-word",
                      lineHeight: "1.4",
                    }}
                    title={action.description}
                  >
                    {action.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <Button
                    text="ᠳᠡᠯᠭᠡᠷᠡᠩᠭᠦᠢ"
                    type="secondary"
                    className="text-xs px-2 py-1"
                    onClick={() => handleActionClick(action.id)}
                  />
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-gray-500"
                    checked={selectedItems.includes(action.id)}
                    onChange={(e) =>
                      handleCheckboxChange(action.id, e.target.checked)
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-4 text-center">
              <p
                className="text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠠᠵᠢᠯ ᠤ᠋ᠯᠠᠭ᠎ᠠ ᠦᠵᠡᠭᠳᠡᠵᠤ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ
              </p>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="bg-[#1b4244] rounded-lg p-6">
          <div className="flex gap-4 mt-4 w-full">
            <h2
              className="text-white text-lg font-bold"
              style={{
                writingMode: "vertical-lr",
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
                    className="border rounded-md p-2 w-16 text-xs"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  />
                </div>

                {/* First Name Field */}
                <div className="flex gap-2">
                  <p
                    className="text-white text-xs"
                    style={{
                      writingMode: "vertical-lr",
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
                    className="border rounded-md p-2 w-16 text-xs"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  />
                </div>

                {/* Email Field */}
                <div className="flex gap-2">
                  <p
                    className="text-white text-xs"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᠮᠠᠢᠯ ᢈᠠᠶᠠᠭ*
                  </p>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border rounded-md p-2 w-16 text-xs"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  />
                </div>

                {/* Country Field */}
                <div className="flex gap-2">
                  <p
                    className="text-white text-xs"
                    style={{
                      writingMode: "vertical-lr",
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
                          className="border border-gray-300 rounded-md p-2 w-16 text-xs bg-white flex flex-col items-center justify-center h-full gap-1 text-black"
                          style={{
                            writingMode: "vertical-lr",
                          }}
                        >
                          <div
                            style={{
                              writingMode: "vertical-lr",
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
                          <div className="absolute top-0 left-20 bg-white border border-gray-300 rounded-md shadow-lg z-[9999] flex flex-col overflow-y-auto max-h-96">
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
                <div className="flex gap-2">
                  <p
                    className="text-white text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
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
