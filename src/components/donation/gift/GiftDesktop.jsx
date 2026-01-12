import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import StaticHeader from "@/components/common/StaticHeader";
import { useSubmitContactFormMutation } from "@/redux/services/apiService";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";

export default function GiftDesktop() {
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
    watch,
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

  const messageValue = watch("message", "");

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
        subject: data.subject || "Gift Donation Inquiry",
        message: data.message,
        token: token,
      }).unwrap();

      toast.success(
        "ᠲᠠᠨ ᠤ᠋ ᠬᠦᠰᠡᠯᠲᠡ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠢᠯᠭᠡᠭᠡᠳᠯᠡᠭᠡ᠃ ᠪᠢᠳᠡ ᠲᠠᠨ ᠲᠠᠢ ᠤᠳᠠᠬᠭᠦ ᠬᠣᠯᠪᠣᠭᠳᠠᠬᠤ ᠪᠣᠯᠨᠠ᠃"
      );

      reset();
    } catch (error) {
      toast.error(
        "ᠬᠦᠰᠡᠯᠲᠡ ᠢᠯᠭᠡᠭᠡᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ: " +
          (error.data?.message || error.message || "Unknown error")
      );
    }
  };

  return (
    <div className="h-full hidden sm:flex gap-20 w-auto flex-shrink-0">
      <StaticHeader
        image="/mng/images/donate/gift/header-img-donation-other.jpg"
        alt="Gift Page Header"
        width="90rem"
        title="ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠪᠤᠰᠤᠳ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ"
      />

      <div className="h-full flex gap-10 mr-4">
        <div className="flex flex-col items-start p-5 gap-4 w-[400px] m-4">
          <Image src="/mng/images/donate/gift/img1.png" alt="Gift Image" width={400} height={200} />
          <p className="text-sm" style={{ writingMode: "vertical-lr" }}>
            ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠦ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᠵᠡᢉᠦᠯᢈᠦ ᠮᠠᠰᠢ ᠣᠯᠠᠨ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ ᠪᠤᠢ᠃
            ᠲᠠ ᠨᠠᠶᠢᠵᠠ ᠨᠥᢈᠦᠳ᠂ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠬᠠᠮᠲᠤ ᠣᠯᠠᠨ᠂ ᢉᠡᠷ ᠪᠦᠯᠢ ᠶ᠋ᠢᠨ ᢈᠢᠨ ᠲᠡᠢ ᠪᠡᠨ ᠬᠠᠮᠲᠤ ᢈᠥᠷᠦᠩᢉᠡ ᠪᠣᠰᠬᠠᠬᠤ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠬᠤ᠂
            ᠡᠰᠡᠪᠡᠯ ᠮᠠᠨ ᠤ᠋ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠠᠰᠢᠭᠯᠠᠭᠳᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ ᠪᠡᠯᠡᢉ ᠥᢉᢈᠦ ᠵᠡᠷᢉᠡ ᠪᠡᠷ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ᠃
          </p>
        </div>
        <div className="bg-[#ECECEC] flex gap-4 p-8">
          <h3 className="text-2xl font-bold" style={{ writingMode: "vertical-lr" }}>ᠵᠢᠱᠢᠶ᠎ᠡ ᠨᠢ:</h3>
          {exampleItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <p className="text-sm" style={{ writingMode: "vertical-lr" }}>{item}</p>
            </div>
          ))}
        </div>
        <div className="m-4 flex gap-8">
          <p className="text-sm" style={{ writingMode: "vertical-lr" }}>
            ᠲᠠᠨ ᠳ᠋ᠤ ᠮᠠᠨ ᠤ᠋ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠶ᠋ᠢ ᠳᠡᠮᠵᠢᢈᠦ ᠰᠠᠨᠠᠭ᠎ᠠ ᠲᠥᠷᠦᠪᠡᠯ᠂ ᠡᠰᠡᠪᠡᠯ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠪᠤᠰᠤᠳ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ ᠤ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ
            ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ ᠶᠠᠷᠢᠯᠴᠠᠬᠤ ᠶ᠋ᠢ ᢈᠦᠰᠡᠪᠡᠯ ᠗᠐᠐᠐-᠔᠗᠐᠖ ᠤᠲᠠᠰᠤ ᠪᠠᠷ ᠬᠣᠯᠪᠤᠭᠳᠠᠭᠠᠷᠠᠢ᠃  ᠡᠰᠡᠪᠡᠯ ᠲᠠ ᠥᠪᠡᠷ ᠦ᠋ᠨ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠢ᠋ᠶᠡᠨ
            ᢈᠦᠰᠦᠨᠦᢉᠲᠦ ᠳ᠋ᠦ ᠪᠥᢉᠯᠡᢉᠡᠷᠡᠢ᠂ ᠪᠢᠳᠡ ᠲᠠᠨ ᠲᠠᠢ ᠬᠣᠯᠪᠤᠭᠳᠠᠬᠤ ᠪᠣᠯᠤᠨ᠎ᠠ᠃
          </p>
          {/* Contact Form Section */}
        <div className="flex gap-7">
          <h2
            className="text-2xl font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            {/* Name Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{ writingMode: "vertical-lr" }}
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
                style={{ writingMode: "vertical-lr" }}
              />
              {errors.name && (
                <div
                  className="text-red-500 text-xs"
                  style={{ writingMode: "vertical-lr", width: "80px" }}
                >
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{ writingMode: "vertical-lr" }}
              >
                ᠢᠮᠧᠶᠢᠯ ᠬᠠᠶᠢᠭ*
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
                style={{ writingMode: "vertical-lr" }}
              />
              {errors.email && (
                <div
                  className="text-red-500 text-xs"
                  style={{ writingMode: "vertical-lr", width: "80px" }}
                >
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Subject Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{ writingMode: "vertical-lr" }}
              >
                ᠭᠠᠷᠴᠠᠭ*
              </p>
              <input
                {...register("subject", {
                  required: "ᠭᠠᠷᠴᠠᠭ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                })}
                className={`border rounded-md p-2 w-20 ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
                style={{ writingMode: "vertical-lr" }}
              />
              {errors.subject && (
                <div
                  className="text-red-500 text-xs"
                  style={{ writingMode: "vertical-lr", width: "80px" }}
                >
                  {errors.subject.message}
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{ writingMode: "vertical-lr" }}
              >
                ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳ᠋ᠤᠭᠠᠷ (ᠵᠠᠪᠠᠯ ᠪᠢᠰᠢ)
              </p>
              <input
                type="tel"
                {...register("phone")}
                className="border border-gray-300 rounded-md p-2 w-20"
                style={{ writingMode: "vertical-lr" }}
              />
            </div>

            {/* Contact Type Dropdown */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{ writingMode: "vertical-lr" }}
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
                      style={{ writingMode: "vertical-lr" }}
                    >
                      <div
                        style={{ writingMode: "vertical-lr" }}
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
                            style={{ writingMode: "vertical-lr" }}
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
              <div className="flex flex-col gap-1">
                <p
                  className="text-sm"
                  style={{ writingMode: "vertical-lr" }}
                >
                  ᠮᠧᠰᠰᠧᠵᠢ*
                </p>
                <p
                  className="text-xs text-gray-500"
                  style={{ writingMode: "vertical-lr" }}
                >
                  ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠢᢈᠡ ᠳ᠋ᠡᠭᠡᠨ ᠑᠐᠐᠐ ᠲᠡᠮᠳᠡᠭᠲᠦ ᠪᠢᠴᠢᠨ᠎ᠡ᠃ ({messageValue.length}/1000)
                </p>
              </div>
              <textarea
                {...register("message", {
                  required: "ᠮᠧᠰᠰᠧᠵᠢ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  minLength: {
                    value: 10,
                    message: "ᠮᠧᠰᠰᠧᠵᠢ ᠪᠠᠭ᠎ᠠ ᠪᠠᠷᠠᠭᠤᠨ ᠳᠤ ᠠᠷᠪᠠᠨ ᠦᠰᠦᠭ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  },
                  maxLength: {
                    value: 1000,
                    message: "ᠮᠧᠰᠰᠧᠵᠢ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠢᢈᠡ ᠳ᠋ᠡᠭᠡᠨ ᠑᠐᠐᠐ ᠲᠡᠮᠳᠡᠭᠲᠦ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  },
                })}
                className={`border rounded-md p-2 w-60 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                style={{ writingMode: "vertical-lr" }}
              />
              {errors.message && (
                <div
                  className="text-red-500 text-xs"
                  style={{ writingMode: "vertical-lr", width: "80px" }}
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
                    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAAif1czpQqnn6cG3"
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
                style={{ writingMode: "vertical-lr", width: "60px" }}
              >
                {isLoading ? "ᠢᠯᠭᠡᠭᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ..." : "ᠢᠯᠭᠡᠭᠡᠬᠦ"}
              </button>
            </div>
          </form>
        </div>
        </div>


        <div className="bg-[#ECECEC] flex gap-4 p-8">
          <h5 className="text-lg font-bold" style={{ writingMode: "vertical-lr" }}>
            ᠶᠠᠭᠠᢈᠢᠭᠰᠠᠨ ᠬᠠᠷᠠᠩᠬᠤᠢ ᠶᠤᠮ ᠪᠤᠢ ᢉᠡᠵᠦ ᠬᠠᠰᢈᠢᠷᠤᠭᠰᠠᠨ ᠠ᠋ᠴᠠ <br />
            ᠶᠠᠳᠠᠵᠤ ᠨᠢᢉᠡ ᠴᠤ ᢉᠡᠰᠡᠨ ᠯᠠ ᠠᠰᠠᠭ᠎ᠠ🕯️
          </h5>
        </div>
      </div>
    </div>
  );
}

const exampleItems = [
  "🕯️ᠨᠠᠷᠢᠨ ᠪᠣᠣᠪᠤ ᢈᠢᢈᠦ᠂ ᠨᠡᢈᠡᠮᠡᠯ ᢈᠢᢈᠦ᠂ ᠵᠢᠷᠤᠭ ᠵᠢᠷᠤᠬᠤ ᠵᠡᠷᢉᠡ ᠵᠢᠵᠢᢉ ᠡᠸᠧᠨ᠋ᠲ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠵᠤ᠂ ᠣᠯᠤᠭᠰᠠᠨ ᠣᠷᠤᠯᠭ᠎ᠠ ᠪᠠᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠳ᠋ᠦ ᠬᠠᠨᠳᠢᠪᠯᠠᠬᠤ",
  "🕯️ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠦ᠋ᠨ ᠬᠠᠨᠳᠢᠪ ᠤ᠋ᠨ ᠬᠠᠶᠢᠷᠴᠠᠭ ᠢ᠋ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠢ᠋ᠶᠠᠨ ᠡᢉᠦᠳᠡᠨ ᠳ᠋ᠦ ᠪᠠᠶᠢᠷᠢᠯᠠᠭᠤᠯᠬᠤ",
  "🕯️ᠥᠪᠡᠷ ᠦ᠋ᠨ ᠡᠷᢈᠢᠯᠡᠳᠡᢉ ᠪᠢᠽᠢᠨᠧᠰ ᠦ᠋ᠨ ᠢ᠋ᠶᠡᠨ ᠬᠤᠳᠠᠯᠳᠤᠨ ᠠᠪᠤᠯᠲᠠ ᠪᠦᠷᠢ ᠶ᠋ᠢᠨ ᠑%-ᠭ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠳ᠋ᠦ ᠬᠠᠨᠳᠢᠪᠯᠠᠬᠤ",
  "🕯️ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠢ᠋ᠶᠠᠨ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠨᠢᢉᠡ ᠡᠳᠦᠷ ᠢ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠡᠳᠦᠷ ᠪᠣᠯᠭᠠᠨ ᠲᠡᠮᠳᠡᢉᠯᠡᠵᠦ᠂ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠦ᠋ᠨ ᠢᠳᠡᠪᢈᠢᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠢ᠋ ᠤᠷᠢᠵᠤ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᢈᠢᠴᠢᠶᠡᠯ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠵᠤ᠂ ᠨᠢᢉᠡ ᠡᠳᠦᠷ ᠦ᠋ᠨ ᠴᠠᠯᠢᠩ ᠢ᠋ᠶᠠᠨ ᠬᠠᠨᠳᠢᠪᠯᠠᠬᠤ",
  "🕯️ᠲᠥᠷᠦᢉᠰᠡᠨ ᠡᠳᠦᠷ ᠦ᠋ᠨ ᠢ᠋ᠶᠡᠨ ᠪᠡᠯᠡᢉ ᠪᠣᠯᠭᠠᠵᠤ ᠲᠠᠨ ᠤ᠋ ᠨᠡᠷ᠎ᠡ ᠶ᠋ᠢᠨ ᠡᠮᠦᠨ᠎ᠡ ᠡᠴᠡ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠳ᠋ᠦ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠶ᠋ᠢ ᠣᠶᠢᠷ᠎ᠠ ᠳᠣᠲᠤᠨᠤ ᢈᠢᠨ ᠳ᠋ᠤ ᠪᠠᠨ ᠤᠷᠢᠶᠠᠯᠠᠬᠤ",
  "🕯️ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯ ᠦ᠋ᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠠᠰᠢᠭᠯᠠᠭᠳᠠᠵᠤ ᠪᠣᠯᠬᠤ ᠪᠦᠲᠦᢉᠡᢉᠳᠡᢈᠦᠨ ᠢ᠋ ᠪᠡᠯᠡᢉᠯᠡᢈᠦ"
];
