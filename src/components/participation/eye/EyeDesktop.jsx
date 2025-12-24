import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import InteractiveMap from "@/components/participation/InteractiveMap";
import StaticHeader from "@/components/common/StaticHeader";
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

// Arch visualization data - all yellow dots
const archGraduses = [
  { gradus: 4 },
  { gradus: 13 },
  { gradus: 22 },
  { gradus: 31 },
  { gradus: 40 },
  { gradus: 49 },
  { gradus: 58 },
  { gradus: 67 },
  { gradus: 76 },
  { gradus: 85 },
  { gradus: 94 },
  { gradus: 103 },
  { gradus: 112 },
  { gradus: 121 },
  { gradus: 130 },
  { gradus: 139 },
  { gradus: 148 },
  { gradus: 157 },
  { gradus: 166 },
  { gradus: 175 },
];

export default function EyeDesktop() {
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
    setValue,
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
    // Validate phone number first
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
        // 5MB limit
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
    // Validate OTP
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
    <div className="h-full hidden sm:flex gap-10 w-auto flex-shrink-0">
      <StaticHeader
        image="/mng/images/participation/humanrighteye/header-img.png"
        alt="Youth Page Header"
        width="90rem"
        title="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠦᠳᠦ"
      />
      <div className="h-full p-4 flex gap-20">
        <div className="flex gap-10">
          <p
            className="text-sm"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠠᠩᠬᠠᠷᠤᠯ ᠲᠠᠲᠠᠭᠰᠠᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠤ᠋ᠳ ᠢ᠋ ᠡᠷᠢᠯᢈᠢᠯᠡᢈᠦ᠂
            ᠰᠢᠢᠳᠪᠦᠷᠢᠯᠡᢈᠦ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ ᠢ᠋ ᠲᠣᠳᠤᠷᠬᠠᠶᠢᠯᠠᠬᠤ ᠳ᠋ᠤ ᠢᠷᢉᠡᠳ ᠦ᠋ᠨ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ ᠶ᠋ᠢ
            ᠳᠡᠮᠵᠢᢈᠦ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠶᠠᠪᠤᠭᠤᠯᠵᠤ ᠪᠤᠢ "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠨᠢᠳᠦ" ᠦᠨᠳᠦᠰᠦᠨ
            ᠦ᠋ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠮᠠᠷᠠᠹᠤᠨ᠃
          </p>
          <h2
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠶᠠᠭᠠᢈᠢᠭᠰᠠᠨ ᠬᠠᠷᠠᠩᠬᠤᠢ ᠶᠤᠮ ᠪᠤᠢ ᢉᠡᠵᠦ ᠬᠠᠰᢈᠢᠷᠤᠭᠰᠠᠨ ᠠ᠋ᠴᠠ ᠶᠠᠳᠠᠵᠤ ᠨᠢᢉᠡ ᠴᠤ
            ᢉᠡᠰᠡᠨ ᠯᠠ ᠲᠠ ᠥᠪᠡᠷ ᠢ᠋ᠶᠡᠨ ᠠᠰᠠᠭ᠎ᠠ᠃ ᠃ ᠃
          </h2>
        </div>
        <div className="h-full flex justify-center items-center gap-16">
          <p
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠤ᠋ᠨ ᠵᠢᠷᠤᠭ
          </p>
          <div className="h-1/2">
            <InteractiveMap />
          </div>
        </div>

        {/* Yellow Arch Visualization */}
        <div className="flex flex-col items-center">
          <div className="w-[546px] h-[311px] flex items-center justify-end flex-col gap2">
            <div className="flex items-center gap-4">
              <div className="text-3xl flex flex-col items-center justify-center gap-0 pr-2 pl-3 border-r-[2px] border-black">
                {String(archInfo.percent)
                  .split("")
                  .map((digit, idx) => (
                    <span key={idx}>{toMongolianNumbers(digit)}</span>
                  ))}
              </div>
              <div
                className="text-[10px] h-[50px] text-center"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {archInfo.title}
              </div>
              <div className="text-3xl leading-none flex flex-col items-center justify-center gap-0">
                {String(archInfo.count)
                  .split("")
                  .map((digit, idx) => (
                    <span key={idx}>{toMongolianNumbers(digit)}</span>
                  ))}
              </div>
            </div>
            <div className="w-0 h-0 relative">
              {archGraduses.map((item, index) => (
                <div
                  key={index}
                  className="w-[260px] h-[45px] absolute right-0 -bottom-4 flex items-center space-x-1.5"
                  style={{
                    transform: `rotate(${item.gradus}deg)`,
                    transformOrigin: "right",
                    clipPath: "polygon(0 0, 0 100%, 100% 50%)",
                  }}
                >
                  {[0, 1, 2, 3, 4].map((dot) => (
                    <div
                      key={dot}
                      className="w-[17px] h-[17px] rounded-full"
                      style={{
                        backgroundColor: "#fcff29",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Top provinces with most reports section */}
          <div className="flex flex-col">
            <div
              className="w-[507px] h-[75px] flex items-center justify-center border border-black text-lg font-bold p-4"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠬᠠᠮᠠᠭᠢᠨ ᠢ᠋ᠢᠬ ᠮᠡᠳᠡᠡᠡᠯ ᠢᠷᠰᠡᠨ ᠠ᠋ᠢᠮᠠᠭ᠂ ᠳ᠋ᠦᠦᠷᠡᠭ
            </div>
            <div className="flex w-[507px] h-[60px] pl-[10px] my-[10px] text-sm">
              <div className="flex-1 flex items-center justify-center">
                <span
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠠ᠋ᠢᠮᠠᠭ
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠨᠢᠢᠢᠲ
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span
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
                className="flex w-[507px] h-[70px] pl-[10px] mb-3 border-l-2 border-black"
              >
                <div
                  className={`flex-1 flex items-center justify-center border border-black ${
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
                    className="max-h-[70px] overflow-x-auto text-[10px] text-center"
                  >
                    {item.provinceName}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-0">
                    {String(item.count)
                      .split("")
                      .map((digit, idx) => (
                        <span key={idx}>{toMongolianNumbers(digit)}</span>
                      ))}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-0">
                    {String(item.percent)
                      .split("")
                      .map((digit, idx) => (
                        <span key={idx}>{toMongolianNumbers(digit)}</span>
                      ))}
                    <span>%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-7">
          {/* Information Section */}
          <div className="bg-[#FCFF29] rounded-lg p-4">
            <div className="flex flex-row gap-4 max-h-[90vh] overflow-hidden">
              {/* General Requirements */}
              <div className="flex flex-row gap-2">
                <h3
                  className="text-lg font-bold"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠨᠢᠶᠢᠲᠯᠡᠭ ᠰᠠᠷᠳᠯᠠᠭ᠎ᠠ:
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠣᠷᠣᠯᠴᠠᠭᠴᠢ ᠨᠢ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠵᠥᠷᠴᠢᠯᠦᠭ ᠢ ᠪᠠᠷᠢᠮᠲᠤᠵᠢᠤᠯᠠᠨ ᠮᠡᠳᠡᠭᠡᠯ
                  ᠢᠶᠠᠷ www.amnesty.mn ᠬᠠᠢᠠᠭᠠᠷ ᠥᠪᠡᠷᠲᠡᠭᠡᠨ ᠦ ᠪᠠᠢᠭ᠎ᠠ ᠠᠢᠮᠠᠭ᠂ ᠳᠦᠦᠷᠭᠡ
                  ᠶᠢᠨ ᠨᠡᠷᠡ ᠶᠢ ᠰᠣᠩᠭᠣᠨ ᠣᠷᠤᠵᠤ ᠴᠠᠬᠢᠮ ᠠᠩᠺᠧᠲ ᠦᠨ ᠳᠠᠭᠠᠤ ᠢᠯᠭᠡᠡᠨᠡ᠃
                  ᠣᠷᠣᠯᠴᠠᠭᠴᠢ ᠶᠢᠨ ᠢᠯᠭᠡᠭᠰᠡᠨ ᠪᠦᠲᠦᠭᠡᠯ ᠵᠥᠪᠬᠡᠨ ᠥᠪᠡᠷᠲᠡᠭᠡᠨ ᠦ ᠪᠦᠲᠦᠭᠡᠯ
                  ᠪᠠᠢᠬᠤ ᠪᠠ ᠵᠣᠬᠢᠶᠠᠭᠴᠢ ᠶᠢᠨ ᠡᠷᠬᠡ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠠᠳ ᠬᠤᠤᠯᠢ ᠲᠣᠭᠲᠠᠭᠠᠮᠵᠢ ᠶᠢᠨ
                  ᠵᠥᠷᠴᠢᠯᠦᠭᠡᠢ ᠪᠠᠢᠬᠤ᠃
                </p>
              </div>

              {/* Who Can Send Information */}
              <div className="flex flex-row gap-2">
                <h3
                  className="text-lg font-bold"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠬᠡᠨ ᠮᠡᠳᠡᠭᠡᠯ ᠢᠯᠭᠡᠬᠦ ᠪᠡ?
                </h3>
                <p
                  className="text-sm leading-relaxed"
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
                  className="text-lg font-bold"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠮᠡᠳᠡᠭᠡᠯ:
                </h3>
                <p
                  className="text-sm leading-relaxed"
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
                  className="text-lg font-bold"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠰᠠᠯᠭᠠᠷᠠᠤᠯᠠᠯᠲ:
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠒᠐᠒᠔ ᠣᠨ ᠦ ᠑᠒ ᠷ ᠰᠠᠷᠠ ᠶᠢᠨ ᠑᠐ ᠦ ᠦᠳᠦᠷ ᠪᠤᠶᠤ "ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠦᠨ ᠬᠦᠮᠦᠨ ᠦ
                  ᠡᠷᠬᠡ" ᠶᠢᠨ ᠦᠳᠦᠷ ᠦᠨ ᠳᠤᠤᠷ ᠰᠠᠯᠭᠠᠷᠠᠤᠯᠵᠤ ᠦᠢᠯᠡᠳᠦᠯ ᠳᠦ ᠳᠤᠤᠳᠰᠠᠨ ᠰᠢᠤᠷᠬᠠᠢ
                  ᠮᠡᠳᠡᠭᠡᠯ ᠦᠨ ᠮᠠᠷᠠᠹᠣᠨ ᠳᠤ ᠬᠠᠮᠤᠭ ᠣᠯᠠᠨ ᠮᠡᠳᠡᠭᠡᠯ ᠢᠯᠭᠡᠭᠰᠡᠨ ᠮᠡᠳᠡᠭᠡᠯᠡᠭᠴᠢ
                  ᠵᠢ "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠢᠳᠦᠨ" ᠦᠷᠭᠦᠮᠵᠢᠯᠡᠯ ᠦᠨᠡ ᠪᠦᠬᠦᠢ ᠵᠦᠢᠯ ᠦᠨ ᠠᠷ
                  ᠲᠤᠰ ᠲᠤᠰ ᠰᠠᠭᠨᠠᠨ᠎ᠠ᠃
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 overflow-x-auto overflow-y-hidden"
          >
            {/* Phone Number Field */}
            <h2
              className="text-sm font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠮᠡᠳᠡᠭᠡᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠤ᠋ᠨ ᠳᠠᠷᠤᠭᠠ
            </h2>
            <div className="flex gap-2">
              <p
                className="text-sm"
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
                className={`border rounded-md p-2 w-20 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
                maxLength="8"
              />
              {errors.phone && (
                <div
                  className="text-red-500 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    width: "80px",
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
                className="text-xs"
              />
            </div>

            {/* OTP Field */}
            {isOtpSent && (
              <div className="flex gap-2">
                <p
                  className="text-sm"
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
                  className={`border rounded-md p-2 w-20 ${
                    errors.otp ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{
                    writingMode: "vertical-lr",
                  }}
                  maxLength="6"
                />
                {errors.otp && (
                  <div
                    className="text-red-500 text-xs"
                    style={{
                      writingMode: "vertical-lr",
                      width: "80px",
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
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠺᠣᠪᠧᠷ ᠵᠢᠷᠤᠭ ᠰᠣᠩᠭᠣᠬᠤ*
              </p>
              {coverImage ? (
                <div className="relative max-w-[400px] max-h-[400px] aspect-square">
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
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-red-600"
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
                    className="cursor-pointer z-10 h-full w-20 border border-gray-300 text-center"
                    onClick={handleCoverImageUpload}
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleCoverImageUpload}
                    className="z-10 absolute w-20 h-full flex flex-col justify-center items-center gap-2 top-0 left-0"
                  >
                    <Image
                      src={"/mng/icons/upload.png"}
                      alt="upload"
                      width={24}
                      height={24}
                    />
                    <span
                      className="text-sm pl-1"
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
                className="text-sm"
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
                        errors.subjectId ? "border-red-500" : "border-gray-300"
                      } rounded-md p-2 w-20 text-xs bg-white flex flex-col items-center justify-center h-full gap-2`}
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
                      <div className="absolute top-0 left-24 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex h-full">
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
                            className="w-20 p-2 text-xs hover:bg-gray-100 border-r border-gray-200 last:border-r-0 h-full flex items-center justify-center"
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
                  className="text-red-500 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    width: "80px",
                  }}
                >
                  {errors.subjectId.message}
                </div>
              )}
            </div>

            {/* Incident Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
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
                className={`border rounded-md p-2 w-20 ${
                  errors.incident ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
              {errors.incident && (
                <div
                  className="text-red-500 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    width: "80px",
                  }}
                >
                  {errors.incident.message}
                </div>
              )}
            </div>

            {/* Outcome Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
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
                className={`border rounded-md p-2 w-20 ${
                  errors.outcome ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
              {errors.outcome && (
                <div
                  className="text-red-500 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    width: "80px",
                  }}
                >
                  {errors.outcome.message}
                </div>
              )}
            </div>

            {/* Authorities Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
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
                className={`border rounded-md p-2 w-20 ${
                  errors.authorities ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
              {errors.authorities && (
                <div
                  className="text-red-500 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    width: "80px",
                  }}
                >
                  {errors.authorities.message}
                </div>
              )}
            </div>

            {/* Details Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
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
                className={`border rounded-md p-2 w-20 ${
                  errors.details ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
              {errors.details && (
                <div
                  className="text-red-500 text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    width: "80px",
                  }}
                >
                  {errors.details.message}
                </div>
              )}
            </div>

            {/* Message Field */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠮᠧᠰᠰᠧᠵᠢ
              </p>
              <textarea
                {...register("message")}
                className="border border-gray-300 rounded-md p-2 w-48"
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
              } transition-colors`}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
