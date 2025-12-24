import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import BannerSlider from "@/components/common/BannerSlider";
import StaticHeader from "@/components/common/StaticHeader";
import { bannerImages } from "@/constants/bannerImages";
import Button from "@/components/common/Button";
import { toMongolianNumbers } from "@/utils/fetcher";
import { useSubmitHumanRightsReportMutation } from "@/redux/services/apiService";
import userApiService from "@/services/userApiService";
import toast from "react-hot-toast";


// findTop5 function exactly like old web
const findTop5 = (data) => {
  if (!data || data.length === 0) {
    // Return default top provinces with 0 counts when no data (like old web)
    return [
      { provinceName: "ᠤᠯᠠᠭᠠᠨᠪᠠᠭᠠᠲᠤᠷ", count: 0, percent: 0 },
      { provinceName: "ᠲᠦᠪ", count: 0, percent: 0 },
      { provinceName: "ᠠᠷᠬᠠᠨᠭᠠᠢ", count: 0, percent: 0 },
      { provinceName: "ᠳᠠᠷᠬᠠᠨ ᠤᠤᠯ", count: 0, percent: 0 },
      { provinceName: "ᠪᠠᠶᠠᠨ ᠬᠣᠩᠭᠣᠷ", count: 0, percent: 0 },
    ];
  }
  return data.sort((a, b) => b.count - a.count).slice(0, 5);
};

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

  // Dynamic data states (like old web)
  const [provinceStats, setProvinceStats] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Load data from APIs (exactly like old web)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load both subjects and stats in parallel
        const [subjectsResponse, statsResponse] = await Promise.all([
          fetch("/api/human-right-reports/subjects"),
          fetch("/api/human-right-reports/stats"),
        ]);

        // Safely parse JSON responses
        let subjectsData = null;
        let statsData = null;

        // Check if subjects response is JSON before parsing
        const subjectsContentType = subjectsResponse.headers.get("content-type");
        if (subjectsContentType?.includes("application/json")) {
          try {
            subjectsData = await subjectsResponse.json();
          } catch (e) {
            console.error("Failed to parse subjects JSON:", e);
            subjectsData = null;
          }
        } else {
          console.warn("Subjects API returned non-JSON response:", subjectsContentType);
        }

        // Check if stats response is JSON before parsing
        const statsContentType = statsResponse.headers.get("content-type");
        if (statsContentType?.includes("application/json")) {
          try {
            statsData = await statsResponse.json();
          } catch (e) {
            console.error("Failed to parse stats JSON:", e);
            statsData = null;
          }
        } else {
          console.warn("Stats API returned non-JSON response:", statsContentType);
        }

        if (subjectsData?.payload) {
          setHumanRightsSubjects(subjectsData.payload);
          setSubjects(subjectsData.payload);
        } else {
          // Fallback to default subjects if API fails or returns non-JSON
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
          setSubjects([
            { id: 1, title: "ᠠᠮᠢᠳᠤᠷᠠᠯ ᠪᠠ ᠤᠯᠠᠰ ᠲᠦᠷᠦ ᠶᠢᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
            { id: 2, title: "ᠡᠳ᠋ᠦ ᠡᠷᠬᠡ ᠪᠠ ᠨᠢᠭᠡᠮᠯᠢᠭ ᠡᠷᠬᠡ", reportCounts: 0 },
            { id: 3, title: "ᠦᠭᠡ ᠬᠡᠯᠡᠬᠦ ᠡᠷᠬᠡ", reportCounts: 0 },
            { id: 4, title: "ᠠᠮᠢᠨ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠤ᠋ᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
            { id: 5, title: "ᠦᠭᠡ ᠰᠤᠷᠭᠠᠬᠤ ᠡᠷᠬᠡ", reportCounts: 0 },
            { id: 6, title: "ᠡᠮᠨᠡᠯᠭᠡ ᠶᠢᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
            { id: 7, title: "ᠬᠦᠦᠬᠡᠳ ᠦᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
            { id: 8, title: "ᠭᠡᠷ ᠪᠦᠯ ᠢ᠋ᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
          ]);
        }

        if (statsData?.payload?.provinceData) {
          setProvinceStats(statsData.payload.provinceData);
        } else {
          // Show empty array but let findTop5 work with it
          setProvinceStats([]);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
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
        setSubjects([
          { id: 1, title: "ᠠᠮᠢᠳᠤᠷᠠᠯ ᠪᠠ ᠤᠯᠠᠰ ᠲᠦᠷᠦ ᠶᠢᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 2, title: "ᠡᠳ᠋ᠦ ᠡᠷᠬᠡ ᠪᠠ ᠨᠢᠭᠡᠮᠯᠢᠭ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 3, title: "ᠦᠭᠡ ᠬᠡᠯᠡᠬᠦ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 4, title: "ᠠᠮᠢᠨ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠤ᠋ᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 5, title: "ᠦᠭᠡ ᠰᠤᠷᠭᠠᠬᠤ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 6, title: "ᠡᠮᠨᠡᠯᠭᠡ ᠶᠢᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 7, title: "ᠬᠦᠦᠬᠡᠳ ᠦᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 8, title: "ᠭᠡᠷ ᠪᠦᠯ ᠢ᠋ᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
        ]);
        setProvinceStats([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
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
        // Use local API proxy to avoid CORS
        const response = await fetch("/api/human-right-reports/cover", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        console.log("Cover upload response:", data);

        // Check if response has payload with cover (successful upload)
        if (response.ok && data?.payload?.cover) {
          setCoverImage(data.payload.cover);
          setCoverImageName(file.name);
          toast.success("ᠺᠣᠪᠧᠷ ᠵᠢᠷᠤᠭ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠢᠯᠠᠭᠰᠠᠨ!");
        } else {
          console.error("Unexpected response format:", data);
          toast.error("ᠺᠣᠪᠧᠷ ᠵᠢᠷᠤᠭ ᠢᠯᠠᠬᠤᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ!");
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
      // Format data to match the working curl structure
      const formData = {
        subjectId: parseInt(data.subjectId),
        title: data.incident || "", // Using incident as title
        message: data.details || "", // Using details as message
        coverImage: coverImage,
        provinceId: 21, // Default province ID (you may need to get this from form)
        phone: data.phone,
        verifyCode: data.otp, // OTP is called verifyCode in API
      };

      console.log("Sending form data:", JSON.stringify(formData, null, 2));

      // Get auth headers for the request (same way as userApiService)
      const getAuthHeaders = () => {
        if (typeof window !== "undefined") {
          const token =
            localStorage.getItem("auth_token") ||
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("amnesty_member_token="))
              ?.split("=")[1];
          return token ? { Authorization: `Bearer ${token}` } : {};
        }
        return {};
      };
      const authHeaders = getAuthHeaders();
      console.log("Auth headers for form submission:", authHeaders);

      // Use local API proxy to avoid CORS and auth issues
      const response = await fetch("/api/human-right-reports/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok && result.payload) {
        toast.success("ᠮᠡᠳᠡᠭᠡᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠤ᠋ᠨ ᠳᠠᠷᠤᠭᠠ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠢᠯᠠᠬᠤ ᠪᠣᠯᠤᠨᠠ!");
        setIsSubmitted(true);
        reset();
        setIsOtpSent(false);
        setCoverImage("");
        setCoverImageName("");
      } else if (result.error) {
        console.error("Submit error:", result.error);
        if (result.error.code === "AUTH_ERROR") {
          toast.error(
            "ᠨᠢᠭᠤᠴᠠ ᠨᠣᠮ ᠢ ᠪᠠᠲᠠᠯᠭᠠᠵᠢᠯᠠᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ! ᠳᠠᠬᠢᠨ ᠨᠢᠷᠤᠭᠤᠯᠤᠨ᠎ᠠ ᠤᠤ!"
          );
        } else {
          toast.error("ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ᠃ ᠳᠠᠬᠢᠨ ᠤᠷᠢᠳᠤᠨ ᠳᠤ ᠰᠢᠯᠢᠳᠡᠭᠡᠷᠡᠢ᠃");
        }
      } else {
        toast.error("ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ᠃ ᠳᠠᠬᠢᠨ ᠤᠷᠢᠳᠤᠨ ᠳᠤ ᠰᠢᠯᠢᠳᠡᠭᠡᠷᠡᠢ᠃");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ᠃ ᠳᠠᠬᠢᠨ ᠤᠷᠢᠳᠤᠨ ᠳᠤ ᠰᠢᠯᠢᠳᠡᠭᠡᠷᠡᠢ᠃");
    }
  };
  // Calculate totalNews dynamically like old web
  const totalNews = subjects.reduce((a, b) => a + (b.reportCounts || 0), 0);
  const top5Provinces = findTop5(provinceStats);

  const archInfo = {
    count: totalNews,
    percent: "᠑᠐᠐",
    title: "ᠨᠡᠶᠢᠲᠡ ᠢᠷᠡᢉᠰᠡᠨ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠲᠣᠭ᠎ᠠ",
  };

  return (
    <div className="h-full w-full sm:hidden p-4 flex flex-col gap-4">
      <StaticHeader
        image="/mng/images/participation/humanrighteye/header-img.png"
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
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠤ᠋ᠨ ᠵᠢᠷᠤᠭ
          </p>
          <div className="relative w-full max-w-[300px] h-[150px]">
            <Image
              src={"/mng/images/mgl-map.png"}
              alt="Mongolia map"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Yellow Arch Visualization */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-[280px] h-[160px] flex items-center justify-end flex-col gap-2">
            <div className="text-xl flex flex-col items-center justify-center gap-0 pb-2 pl-2 border-b border-black">
              {String(archInfo.percent)
                .split("")
                .map((digit, idx) => (
                  <span key={idx}>
                    {toMongolianNumbers(digit)}
                  </span>
                ))}
            </div>
            <div
              className="text-[8px] h-[30px] text-center"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {archInfo.title}
            </div>
            <div className="text-xl leading-none flex flex-col items-center justify-center gap-0">
              {String(archInfo.count)
                .split("")
                .map((digit, idx) => (
                  <span key={idx}>
                    {toMongolianNumbers(digit)}
                  </span>
                ))}
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
                    }}
                    className="max-h-[40px] overflow-x-auto"
                  >
                    {item.provinceName}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-0">
                    {String(item.count)
                      .split("")
                      .map((digit, idx) => (
                        <span key={idx} className="text-[10px]">
                          {toMongolianNumbers(digit)}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-0">
                    {String(item.percent)
                      .split("")
                      .map((digit, idx) => (
                        <span key={idx} className="text-[10px]">
                          {toMongolianNumbers(digit)}
                        </span>
                      ))}
                    <span className="text-[10px]">%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#FCFF29] rounded-lg p-4">
          <div className="flex flex-row gap-4 max-h-[500px] overflow-x-auto">
            {/* General Requirements */}
            <div className="flex flex-row gap-2">
              <h3
                className="text-sm font-bold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠨᠢᠶᠢᠲᠯᠡᠭ ᠰᠠᠷᠳᠯᠠᠭ᠎ᠠ:
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠣᠷᠣᠯᠴᠠᠭᠴᠢ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠵᠥᠷᠴᠢᠯᠦᠭ ᠢ ᠪᠠᠷᠢᠮᠲᠤᠵᠢᠤᠯᠠᠨ ᠮᠡᠳᠡᠭᠡᠯ
                ᠢᠶᠠᠷ www.amnesty.mn ᠬᠠᠢᠠᠭᠠᠷ ᠥᠪᠡᠷᠲᠡᠭᠡᠨ ᠦ ᠪᠠᠢᠭ᠎ᠠ ᠠᠢᠮᠠᠭ᠂ ᠳᠦᠦᠷᠭᠡ ᠶᠢᠨ
                ᠨᠡᠷᠡ ᠶᠢ ᠰᠣᠩᠭᠣᠨ ᠣᠷᠤᠵᠤ ᠴᠠᠬᠢᠮ ᠠᠩᠺᠧᠲ ᠦᠨ ᠳᠠᠭᠠᠤ ᠢᠯᠭᠡᠡᠨᠡ᠃ ᠣᠷᠣᠯᠴᠠᠭᠴᠢ ᠶᠢᠨ
                ᠢᠯᠭᠡᠭᠰᠡᠨ ᠪᠦᠲᠦᠭᠡᠯ ᠵᠥᠪᠬᠡᠨ ᠥᠪᠡᠷᠲᠡᠭᠡᠨ ᠦ ᠪᠦᠲᠦᠭᠡᠯ ᠪᠠᠢᠬᠤ ᠪᠠ ᠵᠣᠬᠢᠶᠠᠭᠴᠢ
                ᠶᠢᠨ ᠡᠷᠬᠡ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠠᠳ ᠬᠤᠤᠯᠢ ᠲᠣᠭᠲᠠᠭᠠᠮᠵᠢ ᠶᠢᠨ ᠵᠥᠷᠴᠢᠯᠦᠭᠡᠢ ᠪᠠᠢᠬᠤ᠃
              </p>
            </div>

            {/* Who Can Send Information */}
            <div className="flex flex-row gap-2">
              <h3
                className="text-sm font-bold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠬᠡᠨ ᠮᠡᠳᠡᠭᠡᠯ ᠢᠯᠭᠡᠬᠦ ᠪᠡ?
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠑᠖ ᠳᠡᠭᠡᠰᠢ ᠨᠠᠰᠤᠨ ᠤ ᠪᠦᠬᠦ ᠬᠦᠮᠦᠨ ᠳᠦ ᠨᠡᠭᠡᠭᠡᠯᠲᠡᠢ ᠪᠥᠭᠡᠳ ᠪᠠᠭᠠᠷ ᠪᠣᠯᠤᠨ
                ᠭᠠᠨᠴᠠᠷᠴᠢᠯᠠᠨ ᠣᠷᠣᠯᠴᠤᠵᠤ ᠪᠣᠯᠨᠣ᠃ ᠦᠨᠳᠦᠰᠦᠨ ᠦ ᠮᠡᠳᠡᠭᠡᠯ ᠦᠨ ᠮᠠᠷᠠᠹᠣᠨ ᠨᠢ
                ᠮᠡᠳᠡᠭᠡᠯ ᠢᠯᠭᠡᠵᠦ ᠪᠤᠢ ᠢᠷᠭᠡᠨ ᠦ ᠨᠡᠷᠡ ᠶᠢ ᠨᠢᠭᠤᠴᠠᠯᠠᠬᠤ ᠪᠥᠭᠡᠳ ᠮᠡᠳᠡᠭᠡᠯ
                ᠢᠯᠭᠡᠭᠰᠡᠨ ᠭᠠᠵᠠᠷᠳᠤ ᠯᠠᠮ ᠦᠨ ᠳᠥᠯ ᠨᠡᠮᠡᠭᠳᠡᠨᠡ᠃
              </p>
            </div>

            {/* Information */}
            <div className="flex flex-row gap-2">
              <h3
                className="text-sm font-bold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠮᠡᠳᠡᠭᠡᠯ:
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠦᠢᠯᠡᠳᠦᠯ ᠳᠦ ᠳᠤᠤᠳᠰᠠᠨ ᠪᠣᠳᠢᠲᠤ᠂ ᠰᠢᠤᠷᠬᠠᠢ ᠮᠡᠳᠡᠭᠡᠯ
              </p>
            </div>

            {/* Selection Process */}
            <div className="flex flex-row gap-2">
              <h3
                className="text-sm font-bold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠰᠠᠯᠭᠠᠷᠠᠤᠯᠠᠯᠲ:
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠒᠐᠒᠔ ᠣᠨ ᠦ ᠑᠒ ᠷ ᠰᠠᠷᠠ ᠶᠢᠨ ᠑᠐ ᠦ ᠦᠳᠦᠷ ᠪᠤᠶᠤ "ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠦᠨ ᠬᠦᠮᠦᠨ ᠦ
                ᠡᠷᠬᠡ" ᠶᠢᠨ ᠦᠳᠦᠷ ᠦᠨ ᠳᠤᠤᠷ ᠰᠠᠯᠭᠠᠷᠠᠤᠯᠵᠤ ᠦᠢᠯᠡᠳᠦᠯ ᠳᠦ ᠳᠤᠤᠳᠰᠠᠨ ᠰᠢᠤᠷᠬᠠᠢ
                ᠮᠡᠳᠡᠭᠡᠯ ᠦᠨ ᠮᠠᠷᠠᠹᠣᠨ ᠳᠤ ᠬᠠᠮᠤᠭ ᠣᠯᠠᠨ ᠮᠡᠳᠡᠭᠡᠯ ᠢᠯᠭᠡᠭᠰᠡᠨ ᠮᠡᠳᠡᠭᠡᠯᠡᠭᠴᠢ ᠵᠢ
                "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠢᠳᠦᠨ" ᠦᠷᠭᠦᠮᠵᠢᠯᠡᠯ ᠦᠨᠡ ᠪᠦᠬᠦᠢ ᠵᠦᠢᠯ ᠦᠨ ᠠᠷ ᠲᠤᠰ ᠲᠤᠰ
                ᠰᠠᠭᠨᠠᠨ᠎ᠠ᠃
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-7 mt-4 w-full">
          <h2
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
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
                  }}
                  maxLength="8"
                />
                {errors.phone && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
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
                    }}
                    maxLength="6"
                  />
                  {errors.otp && (
                    <div
                      className="text-red-500 text-[10px]"
                      style={{
                        writingMode: "vertical-lr",
                        width: "60px",
                      }}
                    >
                      {errors.otp.message}
                    </div>
                  )}
                </div>
              )}

              {/* Cover Image Upload Field */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠺᠣᠪᠧᠷ ᠵᠢᠷᠤᠭ ᠰᠣᠩᠭᠣᠬᠤ*
                </p>
                {coverImage ? (
                  <div className="relative min-w-[200px] min-h-[200px] aspect-square">
                    <Image
                      src={
                        coverImage.startsWith("http")
                          ? coverImage
                          : `${process.env.NEXT_PUBLIC_USER_API_URL}/${coverImage}`
                      }
                      alt="Cover preview"
                      fill
                      className="object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage("");
                        setCoverImageName("");
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      value={coverImageName}
                      readOnly
                      placeholder=""
                      className="cursor-pointer z-10 h-full w-16 border border-gray-300 text-center text-xs"
                      onClick={handleCoverImageUpload}
                      style={{
                        writingMode: "vertical-lr",
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleCoverImageUpload}
                      className="z-10 absolute w-16 h-full flex flex-col justify-center items-center gap-1 top-0 left-0"
                    >
                      <Image
                        src={"/mng/icons/upload.png"}
                        alt="upload"
                        width={16}
                        height={16}
                      />
                      <span
                        className="text-xs"
                        style={{
                          writingMode: "vertical-lr",
                        }}
                      >
                        ᠵᠢᠷᠤᠭ ᠬᠤᠤᠯᠠᠬᠤ
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Human Rights Subject Selection */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
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
                  }}
                />
                {errors.incident && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
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
                  }}
                />
                {errors.outcome && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
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
                  }}
                />
                {errors.authorities && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
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
                  }}
                />
                {errors.details && (
                  <div
                    className="text-red-500 text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
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
                  }}
                >
                  ᠮᠧᠰᠰᠧᠵᠢ
                </p>
                <textarea
                  {...register("message")}
                  className="border border-gray-300 rounded-md p-2 w-48 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                />
              </div>

              {/* Submit Button */}
              <Button
                text={isSubmitting ? "ᠢᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ..." : "ᠢᠯᠠᠬᠤ"}
                type="primary"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || !isOtpSent}
                className={`${
                  isSubmitting || !isOtpSent
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                } transition-colors text-[10px] max-h-max`}
              />
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
