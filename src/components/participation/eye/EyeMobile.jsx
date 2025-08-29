import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import BannerSlider from "@/components/common/BannerSlider";
import StaticHeader from "@/components/common/StaticHeader";
import { bannerImages } from "@/constants/bannerImages";
import Button from "@/components/common/Button";
import { toMongolianNumbers } from "@/utils/fetcher";
import { useSubmitHumanRightsReportMutation } from "@/redux/services/apiService";
import userApiService from "@/services/userApiService";
import toast from "react-hot-toast";

// Sample data for top 5 provinces - this should come from API in real implementation
const top5Provinces = [
  { provinceName: "ᠤᠯᠠᠭᠠᠨᠪᠠᠭᠠᠲᠤᠷ", count: 25, percent: 25.0 },
  { provinceName: "ᠲᠦᠪ", count: 18, percent: 18.0 },
  { provinceName: "ᠣᠷᠬᠣᠨ", count: 16, percent: 16.0 },
  { provinceName: "ᠳᠠᠷᠬᠠᠨ ᠤᠤᠯ", count: 14, percent: 14.0 },
];

// Arch visualization data - all yellow dots (mobile version with fewer graduses)
const archGraduses = [
  { gradus: 10 },
  { gradus: 25 },
  { gradus: 40 },
  { gradus: 55 },
  { gradus: 70 },
  { gradus: 85 },
  { gradus: 100 },
  { gradus: 115 },
  { gradus: 130 },
  { gradus: 145 },
  { gradus: 160 },
  { gradus: 175 },
];

export default function EyeMobile() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [coverImage, setCoverImage] = useState("");
  const [coverImageName, setCoverImageName] = useState("");
  const [humanRightsSubjects, setHumanRightsSubjects] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [submitHumanRightsReport, { isLoading: isSubmitting }] =
    useSubmitHumanRightsReportMutation();
  const [isSendingSms, setIsSendingSms] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      phone: "",
      otp: "",
      subjectId: "0",
      incident: "",
      outcome: "",
      authorities: "",
      details: "",
      message: "",
    },
  });

  const phoneValue = watch("phone");

  // Load human rights subjects on component mount
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const response = await userApiService.contact.getHumanRightsSubjects();
        if (response.payload && response.payload.length > 0) {
          setHumanRightsSubjects(response.payload);
        } else {
          // Fallback to common human rights subjects if API fails
          setHumanRightsSubjects([
            { id: 1, title: "ᠠᠮᠢᠳᠤᠷᠠᠯ ᠪᠠ ᠤᠯᠠᠰ ᠲᠦᠷᠦ ᠶᠢᠨ ᠡᠷᠬᠡ" },
            { id: 2, title: "ᠡᠳ᠋ᠦ ᠡᠷᠬᠡ ᠪᠠ ᠨᠢᠭᠡᠮᠯᠢᠭ ᠡᠷᠬᠡ" },
            { id: 3, title: "ᠦᠭᠡ ᠬᠡᠯᠡᠬᠦ ᠡᠷᠬᠡ" },
            { id: 4, title: "ᠠᠮᠢᠨ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠤ᠋ᠨ ᠡᠷᠬᠡ" },
            { id: 5, title: "ᠦᠭᠡ ᠰᠤᠷᠭᠠᠬᠤ ᠡᠷᠬᠡ" },
            { id: 6, title: "ᠡᠮᠨᠡᠯᠭᠡ ᠶᠢᠨ ᠡᠷᠬᠡ" },
            { id: 7, title: "ᠬᠦᠦᠬᠡᠳ ᠦᠨ ᠡᠷᠬᠡ" },
            { id: 8, title: "ᠭᠡᠷ ᠪᠦᠯ ᠢ᠋ᠨ ᠡᠷᠬᠡ" },
          ]);
        }
      } catch (error) {
        console.error("Failed to load human rights subjects:", error);
        // Fallback to common human rights subjects if API fails
        setHumanRightsSubjects([
          { id: 1, title: "ᠠᠮᠢᠳᠤᠷᠠᠯ ᠪᠠ ᠤᠯᠠᠰ ᠲᠦᠷᠦ ᠶᠢᠨ ᠡᠷᠬᠡ" },
          { id: 2, title: "ᠡᠳ᠋ᠦ ᠡᠷᠬᠡ ᠪᠠ ᠨᠢᠭᠡᠮᠯᠢᠭ ᠡᠷᠬᠡ" },
          { id: 3, title: "ᠦᠭᠡ ᠬᠡᠯᠡᠬᠦ ᠡᠷᠬᠡ" },
          { id: 4, title: "ᠠᠮᠢᠨ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠤ᠋ᠨ ᠡᠷᠬᠡ" },
          { id: 5, title: "ᠦᠭᠡ ᠰᠤᠷᠭᠠᠬᠤ ᠡᠷᠬᠡ" },
          { id: 6, title: "ᠡᠮᠨᠡᠯᠭᠡ ᠶᠢᠨ ᠡᠷᠬᠡ" },
          { id: 7, title: "ᠬᠦᠦᠬᠡᠳ ᠦᠨ ᠡᠷᠬᠡ" },
          { id: 8, title: "ᠭᠡᠷ ᠪᠦᠯ ᠢ᠋ᠨ ᠡᠷᠬᠡ" },
        ]);
      }
    };
    loadSubjects();
  }, []);

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

  // Timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Send SMS OTP - using the same system as registration/password reset
  const handleSendOtp = async () => {
    if (!phoneValue || phoneValue.length !== 8) {
      toast.error("ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳᠤᠭᠠᠷ 8 ᠣᠷᠣᠨ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ!");
      return;
    }

    if (isSendingSms) return;

    setIsSendingSms(true);
    try {
      const response = await userApiService.auth.sendVerificationCode(
        phoneValue
      );

      if (response.payload?.availableAfter) {
        const availableTime = response.payload.availableAfter;
        const currentTime = Math.floor(Date.now() / 1000);
        setTimeLeft(availableTime - currentTime);
      } else {
        setTimeLeft(60); // Default 60 seconds if no availableAfter
      }

      const successMessage = "ᠲᠠᠨ ᠤ᠋ ᠤᠲᠠᠰᠤᠨ ᠳ᠋ᠤ 6 ᠣᠷᠣᠨᠲᠠᠢ ᠻᠣᠳ ᠢᠯᠭᠡᢉᠡᠯᠡᢉᠡ!";
      toast.success(successMessage, { duration: 6000 });
      setIsOtpSent(true);
    } catch (error) {
      console.error("SMS send error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "ᠻᠣᠳ ᠢᠯᠭᠡᢉᠡᢈᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ";
      toast.error(errorMessage);
    } finally {
      setIsSendingSms(false);
    }
  };

  // Handle cover image upload
  const handleCoverImageUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.style.display = "none";
    fileInput.type = "file";
    fileInput.name = "cover";
    fileInput.accept = "image/jpg,image/jpeg,image/png";

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        toast.error("ᠵᠢᠷᠤᠭ ᠤᠨ ᢈᠡᢉᠦ 5MB ᠠᠰᠠ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ!");
        return;
      }

      const formData = new FormData();
      formData.append("cover", file);

      try {
        // Use the cover upload endpoint
        const response = await fetch("/api/human-right-reports/cover", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (data.payload?.cover) {
          setCoverImage(data.payload.cover);
          setCoverImageName(file.name);
          toast.success("ᠺᠣᠪᠧᠷ ᠵᠢᠷᠤᠭ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠢᠯᠠᠭᠰᠠᠨ!");
        }
      } catch (error) {
        console.error("Cover image upload error:", error);
        toast.error("ᠺᠣᠪᠧᠷ ᠵᠢᠷᠤᠭ ᠢᠯᠠᠬᠤᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ!");
      }
    };

    fileInput.click();
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (uploadedImages.length + files.length > 3) {
      toast.error("ᠬᠠᠮᠤᠭ ᠤᠨᠳ 3 ᠵᠢᠷᠤᠭ ᠪᠠᠢᠴᠠᠭᠠᠬᠤ ᠠᠷᠭ᠎ᠠ ᠪᠠᠢᠨ᠎ᠠ!");
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ᠵᠢᠷᠤᠭ ᠤᠨ ᢈᠡᢉᠦ 5MB ᠠᠰᠠ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ!");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            name: file.name,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove uploaded image
  const removeImage = (imageId) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const onSubmit = async (data) => {
    if (!data.otp || data.otp.length !== 6) {
      toast.error("6 ᠣᠷᠣᠨᠲᠠᠢ ᠪᠠᠲᠠᠯᠭᠠᠵᠤᠭᠤᠯᠠᢈᠤ ᠻᠣᠳ ᠢ᠋ᠭ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      return;
    }

    // Validate cover image
    if (!coverImage) {
      toast.error("ᠺᠣᠪᠧᠷ ᠵᠢᠷᠤᠭ ᠰᠣᠩᠭᠣᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ!");
      return;
    }

    // Validate subject selection
    if (!data.subjectId || data.subjectId === "0") {
      toast.error("ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠰᠣᠩᠭᠣᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ!");
      return;
    }

    try {
      const formData = {
        ...data,
        coverImage: coverImage,
        images: uploadedImages.map((img) => img.file),
      };

      const response = await submitHumanRightsReport(formData);

      if (response.data) {
        toast.success("ᠮᠡᠳᠡᠭᠡᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠤ᠋ᠨ ᠳᠠᠷᠤᠭᠠ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠢᠯᠠᠬᠤ ᠪᠣᠯᠤᠨᠠ!");
        setIsSubmitted(true);
        reset();
        setUploadedImages([]);
        setIsOtpSent(false);
        setCoverImage("");
        setCoverImageName("");
      } else if (response.error) {
        toast.error("ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ᠃ ᠳᠠᠬᠢᠨ ᠤᠷᠢᠳᠤᠨ ᠳᠤ ᠰᠢᠯᠢᠳᠡᠭᠡᠷᠡᠢ᠃");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ᠃ ᠳᠠᠬᠢᠨ ᠤᠷᠢᠳᠤᠨ ᠳᠤ ᠰᠢᠯᠢᠳᠡᠭᠡᠷᠡᠢ᠃");
    }
  };
  const totalNews = 0; // This should come from API
  const archInfo = {
    count: totalNews,
    percent: "᠑᠐᠐",
    title: "ᠨᠡᠶᠢᠲᠡ ᠢᠷᠡᢉᠰᠡᠨ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠲᠣᠭ᠎ᠠ",
  };

  return (
    <div className="h-full w-full sm:hidden p-4 flex flex-col gap-4">
      <StaticHeader
        image="/images/participation/humanrighteye/header-img.png"
        alt="Youth Page Header"
        width="100%"
        title="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠦᠳᠦ"
      />
      <div className="h-full w-full flex flex-col gap-4">
        <div className="flex gap-4 max-h-[150px] w-full">
          <p
            className="text-[10px]"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠠᠩᠬᠠᠷᠤᠯ ᠲᠠᠲᠠᠭᠰᠠᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠤ᠋ᠳ ᠢ᠋ ᠡᠷᠢᠯᢈᠢᠯᠡᢈᠦ᠂
            ᠰᠢᠢᠳᠪᠦᠷᠢᠯᠡᢈᠦ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ ᠢ᠋ ᠲᠣᠳᠤᠷᠬᠠᠶᠢᠯᠠᠬᠤ ᠳ᠋ᠤ ᠢᠷᢉᠡᠳ ᠦ᠋ᠨ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ ᠶ᠋ᠢ
            ᠳᠡᠮᠵᠢᢈᠦ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠶᠠᠪᠤᠭᠤᠯᠵᠤ ᠪᠤᠢ “ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠨᠢᠳᠦ” ᠦᠨᠳᠦᠰᠦᠨ
            ᠦ᠋ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠮᠠᠷᠠᠹᠤᠨ᠃
          </p>
          <h2
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠶᠠᠭᠠᢈᠢᠭᠰᠠᠨ ᠬᠠᠷᠠᠩᠬᠤᠢ ᠶᠤᠮ ᠪᠤᠢ ᢉᠡᠵᠦ ᠬᠠᠰᢈᠢᠷᠤᠭᠰᠠᠨ ᠠ᠋ᠴᠠ ᠶᠠᠳᠠᠵᠤ ᠨᠢᢉᠡ ᠴᠤ
            ᢉᠡᠰᠡᠨ ᠯᠠ ᠲᠠ ᠥᠪᠡᠷ ᠢ᠋ᠶᠡᠨ ᠠᠰᠠᠭ᠎ᠠ᠃ ᠃ ᠃
          </h2>
        </div>
        <div className="h-full max-h-[150px] flex justify-center items-center gap-4">
          <p
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠤ᠋ᠨ ᠵᠢᠷᠤᠭ
          </p>
          <img src="/images/mgl-map.png" alt="" className="max-h-[150px]" />
        </div>

        {/* Yellow Arch Visualization */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-[280px] h-[160px] flex items-center justify-end flex-col gap-2">
            <div
              className="text-xl flex flex-col items-center pb-2 pl-2 border-b border-black"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {toMongolianNumbers(archInfo.percent)}
            </div>
            <div
              className="text-[8px] h-[30px] text-center"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {archInfo.title}
            </div>
            <div
              className="text-xl leading-none pl-2"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {toMongolianNumbers(archInfo.count)}
            </div>
            <div className="w-0 h-0 relative">
              {archGraduses.map((item, index) => (
                <div
                  key={index}
                  className="w-[130px] h-[25px] absolute right-0 bottom-2 flex items-center space-x-1"
                  style={{
                    transform: `rotate(${item.gradus}deg)`,
                    transformOrigin: "right",
                    clipPath: "polygon(0 0, 0 100%, 100% 50%)",
                  }}
                >
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className="w-[10px] h-[10px] rounded-full"
                      style={{
                        backgroundColor: "#fcff29",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Top Provinces Section */}
          <div className="flex flex-col w-full max-w-[300px]">
            <div
              className="w-full h-[60px] flex items-center justify-center border border-black text-sm font-bold p-2"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠬᠠᠮᠠᠭᠢᠨ ᠢ᠋ᠢᠬ ᠮᠡᠳᠡᠡᠡᠯ ᠢᠷᠰᠡᠨ ᠠ᠋ᠢᠮᠠᠭ᠂ ᠳ᠋ᠦᠦᠷᠡᠭ
            </div>
            <div className="flex w-full h-[50px] pl-[5px] my-[10px]">
              <div className="flex-1 flex items-center justify-center">
                <span
                  className="text-[10px]"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠠ᠋ᠢᠮᠠᠭ
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span
                  className="text-[10px]"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠨᠢᠢᠢᠲ
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span
                  className="text-[10px]"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  %
                </span>
              </div>
            </div>
            {top5Provinces.map((item, index) => (
              <div
                key={index}
                className="flex w-full h-[50px] pl-[5px] mb-[10px] border-l border-black"
              >
                <div
                  className={`flex-1 flex items-center justify-center border border-black text-[10px] ${
                    index === 0 ? "border-none" : ""
                  }`}
                  style={{
                    backgroundColor: index === 0 ? "#fcff29" : "transparent",
                  }}
                >
                  <span
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    className="max-h-[40px] overflow-x-auto"
                  >
                    {item.provinceName}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span
                    className="text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {item.count}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span
                    className="text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {item.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-7 mt-4 w-full">
          <h2
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠮᠡᠳᠡᠭᠡᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠤ᠋ᠨ ᠳᠠᠷᠤᠭᠠ
          </h2>

          {/* Success Message */}
          {isSubmitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p className="text-xs text-center">
                ᠲᠠᠨ ᠤ᠋ ᠮᠡᠳᠡᠭᠡᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠬᠦᠯᠢᠶᠠᠵᠤ ᠠᠪᠤᠯᠠ᠃ ᠪᠢᠳᠡ ᠲᠠ ᠢ᠋
                ᠬᠠᠷᠢᠤᠴᠠᠯᠠᠨᠠ᠃
              </p>
            </div>
          )}

          <div className="flex gap-2 overflow-x-auto w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
              {/* Phone Number Field */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳ᠋ᠤᠭᠠᠷ*
                </p>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳ᠋ᠤᠭᠠᠷ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                    pattern: {
                      value: /^[0-9]{8}$/,
                      message: "8 ᠣᠷᠣᠨᠲᠠᠢ ᠲᠣᠭ᠎ᠠ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                    },
                  })}
                  className={`border rounded-md p-2 w-16 text-xs ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                  maxLength="8"
                />
                {errors.phone && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      width: "60px",
                    }}
                  >
                    {errors.phone.message}
                  </div>
                )}
              </div>

              {/* Send OTP Button */}
              <div className="flex gap-2">
                <Button
                  text={
                    isSendingSms
                      ? "ᠢᠯᠠᠵᠤ..."
                      : timeLeft > 0
                      ? `${timeLeft}ᠰ`
                      : "ᠻᠣᠳ ᠢᠯᠭᠡᢉᠡᠬᠦ"
                  }
                  type="secondary"
                  onClick={handleSendOtp}
                  disabled={
                    isSendingSms ||
                    timeLeft > 0 ||
                    !phoneValue ||
                    phoneValue.length !== 8
                  }
                  className="text-[10px]"
                />
              </div>

              {/* OTP Field */}
              {isOtpSent && (
                <div className="flex gap-2">
                  <p
                    className="text-xs"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    ᠪᠠᠲᠠᠯᠭᠠᠵᠤᠭᠤᠯᠠᢈᠤ ᠻᠣᠳ*
                  </p>
                  <input
                    type="text"
                    {...register("otp", {
                      required: "ᠪᠠᠲᠠᠯᠭᠠᠵᠤᠭᠤᠯᠠᢈᠤ ᠻᠣᠳ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "6 ᠣᠷᠣᠨᠲᠠᠢ ᠲᠣᠭ᠎ᠠ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                      },
                    })}
                    className={`border rounded-md p-2 w-16 text-xs ${
                      errors.otp ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    maxLength="6"
                  />
                  {errors.otp && (
                    <div
                      className="text-red-500 text-[10px]"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        width: "60px",
                      }}
                    >
                      {errors.otp.message}
                    </div>
                  )}
                </div>
              )}

              {/* Cover Image Upload Field */}
              <div className="flex gap-2 flex-col">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠺᠣᠪᠧᠷ ᠵᠢᠷᠤᠭ ᠰᠣᠩᠭᠣᠬᠤ*
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={coverImageName}
                    readOnly
                    placeholder=""
                    className="cursor-pointer z-10 h-[42px] w-32 border-[1.2px] border-black px-3 text-black bg-white text-xs"
                    onClick={handleCoverImageUpload}
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  />
                  {!coverImage && (
                    <button
                      type="button"
                      onClick={handleCoverImageUpload}
                      className="z-0 absolute top-[26px] left-[8px] scale-50 flex items-center"
                    >
                      <img
                        src="/icons/upload.png"
                        alt="upload"
                        className="w-4 h-4"
                      />
                      <span
                        className="text-[16px] pl-3"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        ᠵᠢᠷᠤᠭ ᠬᠤᠤᠯᠠᠬᠤ
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Human Rights Subject Selection */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠶᠠᠮᠠᠷ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠢᠶᠠᠷ*
                </p>
                <Controller
                  name="subjectId"
                  control={control}
                  rules={{
                    required: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠰᠣᠩᠭᠣᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                    validate: (value) =>
                      value !== "0" ||
                      "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠰᠣᠩᠭᠣᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  }}
                  render={({ field }) => (
                    <div className="relative dropdown-container">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`border ${
                          errors.subjectId
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md p-2 w-16 h-[400px] text-xs bg-white flex flex-col items-center justify-center gap-2`}
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        <div className="flex items-center justify-center">
                          {humanRightsSubjects.find(
                            (opt) => opt.id == field.value
                          )?.title || "ᠰᠣᠩᠭᠣᠬᠤ"}
                        </div>
                        <div
                          className="flex items-center justify-center"
                          style={{ writingMode: "horizontal-tb" }}
                        >
                          {isDropdownOpen ? "◀" : "▶"}
                        </div>
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-0 left-20 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex h-[400px]">
                          {[
                            { id: "0", title: "ᠰᠣᠩᠭᠣᠬᠤ" },
                            ...humanRightsSubjects,
                          ].map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => {
                                field.onChange(option.id);
                                setIsDropdownOpen(false);
                              }}
                              className="w-16 p-2 text-xs hover:bg-gray-100 border-r border-gray-200 last:border-r-0 flex items-center justify-center"
                              style={{
                                writingMode: "vertical-lr",
                                textOrientation: "upright",
                              }}
                            >
                              {option.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                />
                {errors.subjectId && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      width: "60px",
                    }}
                  >
                    {errors.subjectId.message}
                  </div>
                )}
              </div>

              {/* Incident Field */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠪᠠᠶᠢᠷᠢᠰᠢᠯ*
                </p>
                <input
                  type="text"
                  {...register("incident", {
                    required: "ᠪᠠᠶᠢᠷᠢᠰᠢᠯ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  })}
                  className={`border rounded-md p-2 w-16 text-xs ${
                    errors.incident ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                />
                {errors.incident && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      width: "60px",
                    }}
                  >
                    {errors.incident.message}
                  </div>
                )}
              </div>

              {/* Outcome Field */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠭᠠᠷᠴᠠᠭ*
                </p>
                <input
                  type="text"
                  {...register("outcome", {
                    required: "ᠭᠠᠷᠴᠠᠭ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  })}
                  className={`border rounded-md p-2 w-16 text-xs ${
                    errors.outcome ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                />
                {errors.outcome && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      width: "60px",
                    }}
                  >
                    {errors.outcome.message}
                  </div>
                )}
              </div>

              {/* Authorities Field */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠻᠣᠸᠧᠷ ᠵᠢᠷᠤᠭ*
                </p>
                <input
                  type="text"
                  {...register("authorities", {
                    required: "ᠻᠣᠸᠧᠷ ᠵᠢᠷᠤᠭ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  })}
                  className={`border rounded-md p-2 w-16 text-xs ${
                    errors.authorities ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                />
                {errors.authorities && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      width: "60px",
                    }}
                  >
                    {errors.authorities.message}
                  </div>
                )}
              </div>

              {/* Details Field */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠠᠰᠠᠭᠤᠳᠠᠯ*
                </p>
                <input
                  type="text"
                  {...register("details", {
                    required: "ᠠᠰᠠᠭᠤᠳᠠᠯ ᠬᠡᠷᠡᠭᠲᠡᠢ",
                  })}
                  className={`border rounded-md p-2 w-16 text-xs ${
                    errors.details ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                />
                {errors.details && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      width: "60px",
                    }}
                  >
                    {errors.details.message}
                  </div>
                )}
              </div>

              {/* Message Field */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠮᠧᠰᠰᠧᠵᠢ
                </p>
                <textarea
                  {...register("message")}
                  className="border border-gray-300 rounded-md p-2 w-48 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                />
              </div>

              {/* Image Upload */}
              <div className="flex gap-2 flex-col">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠵᠢᠷᠤᠭ (3 ᠬᠡᠮᠡᠯ)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/jpg,image/jpeg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload-mobile"
                />
                <Button
                  text="ᠵᠢᠷᠤᠭ ᢈᠥᠭᠢᠯᠡᠬᠦ"
                  type="secondary"
                  onClick={() =>
                    document.getElementById("image-upload-mobile").click()
                  }
                  className="text-[10px]"
                />
                {/* Display uploaded images */}
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {uploadedImages.map((img) => (
                      <div key={img.id} className="relative">
                        <img
                          src={img.preview}
                          alt={img.name}
                          className="w-8 h-8 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 text-[8px] flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-2 items-end">
                <Button
                  text={isSubmitting ? "ᠢᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ..." : "ᠢᠯᠠᠬᠤ"}
                  type="primary"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting || !isOtpSent}
                  className={`${
                    isSubmitting || !isOtpSent
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  } transition-colors text-[10px]`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const volunteerItems = [
  {
    id: 1,
    description:
      "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᢈᠦᠴᠦ ᠨᠡᠮᠡᠵᠦ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᢈᠦᠴᠦᠷᢈᠡᢉ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠰ ᠦᢉᠡᠢ ᠪᠡᠷ ᠡᠨᠡ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ ᠠᠮᠵᠢᠯᠲᠠ ᠭᠠᠷᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃  ᠪᠢᠳᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠢ᠋ ᠲᠥᠯᠦᠪᠰᠢᢉᠦᠯᠵᠦ᠂ ᠤᠳᠤᠷᠢᠳᠴᠤ᠂ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠳᠡᢉ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᢈᠢᠨ ᠲᠠᠢ ᠠᠩᠬᠠᠨ ᠱᠠᠲᠤᠨ ᠤ᠋ ᢉᠡᠰᠢᢉᠦᠨᠴᠢᠯᠡᠯ ᠦ᠋ᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶᠤᠮ᠃ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᠨ ᠦ᠋ ᠑᠐᠐᠐᠐ ᠭᠠᠷᠤᠢ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠳ᠋ᠤ ᠪᠠᠶᠢᠳᠠᠭ᠃  ᠲᠡᠳᠡ ᠵᠠᢈᠢᠳᠠᠯ ᠤᠷᠢᠶᠠᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠴᠤᠭᠯᠠᠭᠤᠯᠬᠤ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᢉᠡᠳ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠤᠷᠢᠶᠠᠯᠠᠵᠤ᠂ ᠮᠡᠳᠡᠯᢉᠡ ᠲᠦᢉᠡᢉᠡᠵᠦ ᠲᠠᠰᠤᠷᠠᠯᠲᠠ ᠦᢉᠡᠢ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠦᢉᠰᠡᢉᠡᠷ ᠪᠠᠶᠢᠨ᠎ᠠ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᠡᠳᠡᢉᠡᠷ ᢈᠦᠮᠦᠰ ᠪᠣᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠶ᠋ᠢᠨ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠲᠣᠮᠤ ᢈᠦᠴᠦ ᠶᠤᠮ᠃  ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯᠲᠠᠨ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠢ᠋ᠶᠠᠷ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠡᠵᠡᠮᠰᠢᠵᠦ᠂ ᠰᠢᠨ᠎ᠡ ᢈᠦᠮᠦᠰ ᠲᠡᠢ ᠲᠠᠨᠢᠯᠴᠠᠬᠤ - ᠥᠨᠦᠳᠦᠷ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᢈᠢᠵᠦ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠠᠵᠢᠯ ᠢ᠋ ᠳᠡᠮᠵᠢᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃  ᠳᠣᠯᠤᠭ᠎ᠠ ᠬᠣᠨᠤᠭ ᠲᠤ ᢈᠡᠳᠦᠨ ᠮᠢᠨᠦ᠋ᠲ ᠴᠤ ᠪᠠᠢ᠂ ᢈᠡᠳᠦᠨ ᠴᠠᠭ ᠴᠤ ᠪᠠᠢ ᠲᠠ ᠮᠠᠨ ᠤ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠨᠢᢉᠡ ᢈᠡᠰᠡᢉ ᠪᠣᠯᠵᠤ ᠴᠢᠳᠠᠨ᠎ᠠ᠃",
  },
  {
    id: 2,
    title: "᠑᠐᠐ ᠴᠠᠭ ᠤ᠋ᠨ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠲᠠᠢ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᢈᠥᠲᠦᠯᠪᠦᠷᠢ",
    description:
      "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᢈᠦᠴᠦ ᠨᠡᠮᠡᠵᠦ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᢈᠦᠴᠦᠷᢈᠡᢉ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠰ ᠦᢉᠡᠢ ᠪᠡᠷ ᠡᠨᠡ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ ᠠᠮᠵᠢᠯᠲᠠ ᠭᠠᠷᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃  ᠪᠢᠳᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠢ᠋ ᠲᠥᠯᠦᠪᠰᠢᢉᠦᠯᠵᠦ᠂ ᠤᠳᠤᠷᠢᠳᠴᠤ᠂ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠳᠡᢉ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᢈᠢᠨ ᠲᠠᠢ ᠠᠩᠬᠠᠨ ᠱᠠᠲᠤᠨ ᠤ᠋ ᢉᠡᠰᠢᢉᠦᠨᠴᠢᠯᠡᠯ ᠦ᠋ᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶᠤᠮ᠃ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᠨ ᠦ᠋ ᠑᠐᠐᠐᠐ ᠭᠠᠷᠤᠢ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠳ᠋ᠤ ᠪᠠᠶᠢᠳᠠᠭ᠃  ᠲᠡᠳᠡ ᠵᠠᢈᠢᠳᠠᠯ ᠤᠷᠢᠶᠠᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠴᠤᠭᠯᠠᠭᠤᠯᠬᠤ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᢉᠡᠳ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠤᠷᠢᠶᠠᠯᠠᠵᠤ᠂ ᠮᠡᠳᠡᠯᢉᠡ ᠲᠦᢉᠡᢉᠡᠵᠦ ᠲᠠᠰᠤᠷᠠᠯᠲᠠ ᠦᢉᠡᠢ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠦᢉᠰᠡᢉᠡᠷ ᠪᠠᠶᠢᠨ᠎ᠠ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᠡᠳᠡᢉᠡᠷ ᢈᠦᠮᠦᠰ ᠪᠣᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠶ᠋ᠢᠨ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠲᠣᠮᠤ ᢈᠦᠴᠦ ᠶᠤᠮ᠃  ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯᠲᠠᠨ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠢ᠋ᠶᠠᠷ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠡᠵᠡᠮᠰᠢᠵᠦ᠂ ᠰᠢᠨ᠎ᠡ ᢈᠦᠮᠦᠰ ᠲᠡᠢ ᠲᠠᠨᠢᠯᠴᠠᠬᠤ - ᠥᠨᠦᠳᠦᠷ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᢈᠢᠵᠦ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠠᠵᠢᠯ ᠢ᠋ ᠳᠡᠮᠵᠢᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃  ᠳᠣᠯᠤᠭ᠎ᠠ ᠬᠣᠨᠤᠭ ᠲᠤ ᢈᠡᠳᠦᠨ ᠮᠢᠨᠦ᠋ᠲ ᠴᠤ ᠪᠠᠢ᠂ ᢈᠡᠳᠦᠨ ᠴᠠᠭ ᠴᠤ ᠪᠠᠢ ᠲᠠ ᠮᠠᠨ ᠤ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠨᠢᢉᠡ ᢈᠡᠰᠡᢉ ᠪᠣᠯᠵᠤ ᠴᠢᠳᠠᠨ᠎ᠠ᠃",
  },
  {
    id: 3,
    title: "᠑᠐᠐ ᠴᠠᠭ ᠤ᠋ᠨ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠲᠠᠢ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᢈᠥᠲᠦᠯᠪᠦᠷᠢ",
    description:
      "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᢈᠦᠴᠦ ᠨᠡᠮᠡᠵᠦ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᢈᠦᠴᠦᠷᢈᠡᢉ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠰ ᠦᢉᠡᠢ ᠪᠡᠷ ᠡᠨᠡ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ ᠠᠮᠵᠢᠯᠲᠠ ᠭᠠᠷᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃  ᠪᠢᠳᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠢ᠋ ᠲᠥᠯᠦᠪᠰᠢᢉᠦᠯᠵᠦ᠂ ᠤᠳᠤᠷᠢᠳᠴᠤ᠂ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠳᠡᢉ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᢈᠢᠨ ᠲᠠᠢ ᠠᠩᠬᠠᠨ ᠱᠠᠲᠤᠨ ᠤ᠋ ᢉᠡᠰᠢᢉᠦᠨᠴᠢᠯᠡᠯ ᠦ᠋ᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶᠤᠮ᠃ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᠨ ᠦ᠋ ᠑᠐᠐᠐᠐ ᠭᠠᠷᠤᠢ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠳ᠋ᠤ ᠪᠠᠶᠢᠳᠠᠭ᠃  ᠲᠡᠳᠡ ᠵᠠᢈᠢᠳᠠᠯ ᠤᠷᠢᠶᠠᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠴᠤᠭᠯᠠᠭᠤᠯᠬᠤ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᢉᠡᠳ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠤᠷᠢᠶᠠᠯᠠᠵᠤ᠂ ᠮᠡᠳᠡᠯᢉᠡ ᠲᠦᢉᠡᢉᠡᠵᠦ ᠲᠠᠰᠤᠷᠠᠯᠲᠠ ᠦᢉᠡᠢ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠦᢉᠰᠡᢉᠡᠷ ᠪᠠᠶᠢᠨ᠎ᠠ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᠡᠳᠡᢉᠡᠷ ᢈᠦᠮᠦᠰ ᠪᠣᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠶ᠋ᠢᠨ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠲᠣᠮᠤ ᢈᠦᠴᠦ ᠶᠤᠮ᠃  ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯᠲᠠᠨ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠢ᠋ᠶᠠᠷ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠡᠵᠡᠮᠰᠢᠵᠦ᠂ ᠰᠢᠨ᠎ᠡ ᢈᠦᠮᠦᠰ ᠲᠡᠢ ᠲᠠᠨᠢᠯᠴᠠᠬᠤ - ᠥᠨᠦᠳᠦᠷ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᢈᠢᠵᠦ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠠᠵᠢᠯ ᠢ᠋ ᠳᠡᠮᠵᠢᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃  ᠳᠣᠯᠤᠭ᠎ᠠ ᠬᠣᠨᠤᠭ ᠲᠤ ᢈᠡᠳᠦᠨ ᠮᠢᠨᠦ᠋ᠲ ᠴᠤ ᠪᠠᠢ᠂ ᢈᠡᠳᠦᠨ ᠴᠠᠭ ᠴᠤ ᠪᠠᠢ ᠲᠠ ᠮᠠᠨ ᠤ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠨᠢᢉᠡ ᢈᠡᠰᠡᢉ ᠪᠣᠯᠵᠤ ᠴᠢᠳᠠᠨ᠎ᠠ᠃",
  },
  {
    id: 4,
    title: "᠑᠐᠐ ᠴᠠᠭ ᠤ᠋ᠨ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠲᠠᠢ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᢈᠥᠲᠦᠯᠪᠦᠷᠢ",
    description:
      "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᢈᠦᠴᠦ ᠨᠡᠮᠡᠵᠦ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᢈᠦᠴᠦᠷᢈᠡᢉ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠰ ᠦᢉᠡᠢ ᠪᠡᠷ ᠡᠨᠡ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ ᠠᠮᠵᠢᠯᠲᠠ ᠭᠠᠷᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃  ᠪᠢᠳᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠢ᠋ ᠲᠥᠯᠦᠪᠰᠢᢉᠦᠯᠵᠦ᠂ ᠤᠳᠤᠷᠢᠳᠴᠤ᠂ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠳᠡᢉ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᢈᠢᠨ ᠲᠠᠢ ᠠᠩᠬᠠᠨ ᠱᠠᠲᠤᠨ ᠤ᠋ ᢉᠡᠰᠢᢉᠦᠨᠴᠢᠯᠡᠯ ᠦ᠋ᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶᠤᠮ᠃ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᠨ ᠦ᠋ ᠑᠐᠐᠐᠐ ᠭᠠᠷᠤᠢ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠳ᠋ᠤ ᠪᠠᠶᠢᠳᠠᠭ᠃  ᠲᠡᠳᠡ ᠵᠠᢈᠢᠳᠠᠯ ᠤᠷᠢᠶᠠᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠴᠤᠭᠯᠠᠭᠤᠯᠬᠤ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᢉᠡᠳ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠤᠷᠢᠶᠠᠯᠠᠵᠤ᠂ ᠮᠡᠳᠡᠯᢉᠡ ᠲᠦᢉᠡᢉᠡᠵᠦ ᠲᠠᠰᠤᠷᠠᠯᠲᠠ ᠦᢉᠡᠢ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠦᢉᠰᠡᢉᠡᠷ ᠪᠠᠶᠢᠨ᠎ᠠ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᠡᠳᠡᢉᠡᠷ ᢈᠦᠮᠦᠰ ᠪᠣᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠶ᠋ᠢᠨ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠲᠣᠮᠤ ᢈᠦᠴᠦ ᠶᠤᠮ᠃  ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯᠲᠠᠨ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠢ᠋ᠶᠠᠷ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠡᠵᠡᠮᠰᠢᠵᠦ᠂ ᠰᠢᠨ᠎ᠡ ᢈᠦᠮᠦᠰ ᠲᠡᠢ ᠲᠠᠨᠢᠯᠴᠠᠬᠤ - ᠥᠨᠦᠳᠦᠷ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᢈᠢᠵᠦ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠠᠵᠢᠯ ᠢ᠋ ᠳᠡᠮᠵᠢᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃  ᠳᠣᠯᠤᠭ᠎ᠠ ᠬᠣᠨᠤᠭ ᠲᠤ ᢈᠡᠳᠦᠨ ᠮᠢᠨᠦ᠋ᠲ ᠴᠤ ᠪᠠᠢ᠂ ᢈᠡᠳᠦᠨ ᠴᠠᠭ ᠴᠤ ᠪᠠᠢ ᠲᠠ ᠮᠠᠨ ᠤ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠨᠢᢉᠡ ᢈᠡᠰᠡᢉ ᠪᠣᠯᠵᠤ ᠴᠢᠳᠠᠨ᠎ᠠ᠃",
  },
];
