import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import StaticHeader from "@/components/common/StaticHeader";
import ContactBanner from "@/components/common/ContactBanner";
import { useSubmitContactFormMutation } from "../../../redux/services/apiService";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactDesktop() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [submitContactForm, { isLoading }] = useSubmitContactFormMutation();

  const contactTypeOptions = [
    { value: 1, label: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ" },
    { value: 2, label: "ᠰᠠᠢᠨ ᠳᠤᠷᠠᠯ" },
    { value: 3, label: "ᠬᠠᠮᠲᠤᠷᠠᠯ" },
    { value: 4, label: "ᠰᠤᠷᠭᠠᠯ" },
    { value: 5, label: "ᠪᠤᠰᠤᠳ" },
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      phone: "",
      contactType: 5,
      message: "",
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const turnstileCallback = (token) => {
    setToken(token);
  };

  const onSubmit = async (data) => {
    if (isLoading) return;

    if (!token) {
      toast.error("ᠬᠦᠮᠦᠨ ᠦ ᠪᠠᠳᠤᠯᠠᠭᠠ ᠢ᠋ ᠪᠠᠳᠤᠯᠠᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ");
      return;
    }

    try {
      await submitContactForm({
        contactType: data.contactType,
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject || "Contact Form Submission",
        message: data.message,
        token: token,
      }).unwrap();

      // Show success toast
      toast.success(
        "ᠲᠠᠨ ᠤ᠋ ᠬᠦᠰᠡᠯᠲᠡ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠢᠯᠭᠡᠭᠡᠳᠯᠡᠭᠡ᠃ ᠪᠢᠳᠡ ᠲᠠᠨ ᠲᠠᠢ ᠤᠳᠠᠬᠭᠦ ᠬᠣᠯᠪᠣᠭᠳᠠᠬᠤ ᠪᠣᠯᠨᠠ᠃"
      );

      // Reset form
      reset();
    } catch (error) {
      // Show error toast
      toast.error(
        "ᠬᠦᠰᠡᠯᠲᠡ ᠢᠯᠭᠡᠭᠡᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ: " +
          (error.data?.message || error.message || "Unknown error")
      );
    }
  };

  return (
    <div className="h-full hidden sm:flex gap-20 w-auto flex-shrink-0">
      <StaticHeader
        image="/images/aboutContact/header-img.png"
        alt="Contact Page Header"
        width="90rem"
        title="ᠬᠣᠯᠪᠠᠭᠠᠨ ᠪᠠᠷᠢᠬᠤ"
      />

      <ContactBanner isMobile={false} />

      <div className="flex gap-16 p-4 h-full">
        <div className="flex gap-7">
          <h2
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠤᠲᠠᠰᠤ: ᠗᠐᠐᠐-᠔᠗᠐᠘
          </h2>
          <p
            style={{
              writingMode: "vertical-lr",
            }}
            className="text-sm"
          >
            ᠠᠩᠬᠠᠷᠤᠨ᠎ᠠ ᠤ᠋ᠤ: ᠪᠢᠳᠡ ᠲᠠᠨ ᠤ᠋ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠢ᠋ ᠤᠲᠠᠰᠤ ᠪᠠᠷ ᠪᠠᠲᠤᠯᠠᠭᠠᠵᠢᠭᠤᠯᠬᠤ
            ᢈᠦᠷᠲᠡᠯ᠎ᠡ ᠲᠠᠨ ᠤ᠋ ᠲᠣᠭᠲᠠᠮᠠᠯ ᠬᠠᠨᠳᠢᠪᠲᠤ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ ᠣᠷᠤᠭᠤᠯᠬᠤ᠂ ᠴᠤᠴᠠᠯᠠᠬᠤ
            ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃ ᠬᠣᠯᠪᠤᠭᠳᠠᠬᠤ ᠳ᠋ᠤᠭᠠᠷ ᠗᠐᠐᠐-᠔᠗᠐᠕᠃
          </p>
        </div>
        <div className="flex gap-7">
          <h2
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯᠡ ᠶ᠋ᠢᠨ ᠣᠹᠹᠢᠰ
          </h2>
          <p
            style={{
              writingMode: "vertical-lr",
            }}
            className="text-sm"
          >
            ᠤᠯᠠᠭᠠᠨᠪᠠᠭᠠᠲᠤᠷ ᠬᠣᠲᠠ᠂ ᠰᠦᢈᠡᠪᠠᠭᠠᠲᠤᠷ ᠳᠡᢉᠦᠷᢉᠡ᠂ ᠖-ᠷ ᠬᠣᠷᠢᠶ᠎ᠠ᠂ AB Centerᠯ᠂ ᠗
            ᠳᠠᠪᠬᠤᠷ
          </p>
        </div>
        <div className="flex gap-7">
          <h2
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            {/* Name Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠨᠡᠷ᠎ᠡ*
              </p>
              <input
                {...register("name", {
                  required: "ᠨᠡᠷ᠎ᠡ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  minLength: {
                    value: 2,
                    message: "ᠨᠡᠷ᠎ᠡ ᠪᠠᠭ᠎ᠠ ᠪᠠᠷᠠᠭᠤᠨ ᠳᠤ ᠬᠣᠶᠠᠷ ᠦᠰᠦᠭ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  },
                })}
                className={`border rounded-md p-2 w-20 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
              {errors.name && (
                <div
                  className="text-red-500 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    width: "80px",
                  }}
                >
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠢᠮᠡᠶᠢᠯ ᠬᠠᠶᠢᠭ*
              </p>
              <input
                type="email"
                {...register("email", {
                  required: "ᠢᠮᠡᠶᠢᠯ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "ᠢᠮᠡᠶᠢᠯ ᠪᠤᠷᠤᠭᠤ",
                  },
                })}
                className={`border rounded-md p-2 w-20 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
              {errors.email && (
                <div
                  className="text-red-500 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    width: "80px",
                  }}
                >
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Subject Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠭᠠᠷᠴᠠᠭ
              </p>
              <input
                {...register("subject")}
                className="border border-gray-300 rounded-md p-2 w-20"
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Phone Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳ᠋ᠤᠭᠠᠷ (ᠵᠠᠪᠠᠯ ᠪᠢᠰᠢ)
              </p>
              <input
                type="tel"
                {...register("phone")}
                className="border border-gray-300 rounded-md p-2 w-20"
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Contact Type Dropdown */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠶᠠᠮᠠᠷ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠢ᠋ᠶᠠᠷ?
              </p>
              <Controller
                name="contactType"
                control={control}
                render={({ field }) => (
                  <div className="relative dropdown-container">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="border border-gray-300 rounded-md p-2 w-20 text-xs bg-white flex flex-col items-center justify-center h-full gap-2"
                      style={{
                        writingMode: "vertical-lr",
                      }}
                    >
                      <div
                        style={{
                          writingMode: "vertical-lr",
                        }}
                        className="flex items-center justify-center"
                      >
                        {
                          contactTypeOptions.find(
                            (opt) => opt.value === field.value
                          )?.label
                        }
                      </div>
                      <div
                        className="flex items-center justify-center"
                        style={{ writingMode: "horizontal-tb" }}
                      >
                        {isDropdownOpen ? "◀" : "▶"}
                      </div>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute top-0 left-24 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex">
                        {contactTypeOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              field.onChange(option.value);
                              setIsDropdownOpen(false);
                            }}
                            className="w-20 p-2 text-xs hover:bg-gray-100 border-r border-gray-200 last:border-r-0 h-full flex items-center justify-center"
                            style={{
                              writingMode: "vertical-lr",
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Message Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠮᠧᠰᠰᠧᠵᠢ*
              </p>
              <textarea
                {...register("message", {
                  required: "ᠮᠧᠰᠰᠧᠵᠢ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  minLength: {
                    value: 10,
                    message:
                      "ᠮᠧᠰᠰᠧᠵᠢ ᠪᠠᠭ᠎ᠠ ᠪᠠᠷᠠᠭᠤᠨ ᠳᠤ ᠠᠷᠪᠠᠨ ᠦᠰᠦᠭ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  },
                })}
                className={`border rounded-md p-2 w-60 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
              {errors.message && (
                <div
                  className="text-red-500 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    width: "80px",
                  }}
                >
                  {errors.message.message}
                </div>
              )}
            </div>

            {/* Turnstile CAPTCHA */}
            <div className="flex gap-2">
              <div className="flex flex-col">
                <Turnstile
                  siteKey={
                    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
                  }
                  onSuccess={turnstileCallback}
                  onError={(error) => console.error("Turnstile error:", error)}
                  onExpire={() => console.log("Turnstile expired")}
                  theme="light"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`p-2 rounded-md text-sm font-bold ${
                  isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#FFFF00] text-black hover:brightness-105 transition-all"
                }`}
                style={{
                  writingMode: "vertical-lr",
                  width: "60px",
                }}
              >
                {isLoading ? "ᠢᠯᠭᠡᠭᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ..." : "ᠢᠯᠭᠡᠭᠡᠬᠦ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
