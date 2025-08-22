import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import userApiService from "@/services/userApiService";
import Layout from "@/components/layout/Layout";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    groupId: 1,
    subGroupId: null,
    phone: "",
    phoneVerifyCode: "",
    password: "",
    passwordConfirm: "",
  });

  const [groups, setGroups] = useState({
    userGroups: [],
    userSubGroups: [],
  });

  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [availableAfter, setAvailableAfter] = useState(null);
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [isSubGroupDropdownOpen, setIsSubGroupDropdownOpen] = useState(false);

  // Load user groups on component mount
  useEffect(() => {
    loadUserGroups();
  }, []);

  // Countdown timer for SMS code
  useEffect(() => {
    let interval = null;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && availableAfter) {
      setAvailableAfter(null);
    }
    return () => clearInterval(interval);
  }, [timeLeft, availableAfter]);

  // Close dropdowns when clicking outside (same as contact page)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isGroupDropdownOpen &&
        !event.target.closest(".group-dropdown-container")
      ) {
        setIsGroupDropdownOpen(false);
      }
      if (
        isSubGroupDropdownOpen &&
        !event.target.closest(".subgroup-dropdown-container")
      ) {
        setIsSubGroupDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isGroupDropdownOpen, isSubGroupDropdownOpen]);

  const loadUserGroups = async () => {
    try {
      const response = await userApiService.user.getUserGroups();
      setGroups(response.payload || response);
    } catch (error) {
      // Provide default groups as fallback
      setGroups({
        userGroups: [
          { id: 1, title: "ᠠᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ" },
          { id: 2, title: "ᠣᠷᠣᠨ ᠨᠤᠲᠤᠭ ᠤᠨ ᠪᠦᠯᠦᠭ" },
          { id: 3, title: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠪᠦᠯᠦᠭ" },
        ],
        userSubGroups: [
          { id: 1, userGroupId: 1, title: "ᠤᠯᠠᠭᠠᠨᠪᠠᠭᠠᠲᠤᠷ" },
          { id: 2, userGroupId: 1, title: "ᠳᠠᠷᠬᠠᠨ" },
          { id: 3, userGroupId: 2, title: "ᠰᠤᠷᠭᠠᠯᠲᠠ" },
          { id: 4, userGroupId: 2, title: "ᠠᠵᠢᠯ ᠤᠨ ᠪᠠᠢᠭᠤᠯᠯᠠᠭᠠ" },
          { id: 5, userGroupId: 3, title: "ᠡᠮᠡᠭᠲᠡᠢ ᠶᠢᠨ ᠡᠷᠬᠡ" },
          { id: 6, userGroupId: 3, title: "ᠡᠷᠡᠭᠲᠡᠢ ᠶᠢᠨ ᠡᠷᠬᠡ" },
        ],
      });
      console.warn(
        "ᠪᠦᠯᠦᠭ ᠦᠨ ᠮᠡᠳᠡᢉᠡᠯᠦᠯ ᠠᠴᠠᠭᠠᠯᠠᢈᠠᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ, ᠠᠨᠠᠭᠠᠬᠢ ᠪᠦᠯᠦᠭ ᠢ ᠬᠡᠷᠡᠭᠯᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ",
        error
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset subgroup when group changes
    if (name === "groupId") {
      setFormData((prev) => ({
        ...prev,
        subGroupId: null,
      }));
    }
  };

  const sendSmsCode = async () => {
    if (loading) return;

    // Validation like old project
    if (!formData.phone || String(formData.phone).length !== 8) {
      const errorMessage = "ᠲᠠ ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳᠤᠭᠠᠷᠠᠭ᠎ᠠ ᠵᠦᠪ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!";
      toast.error(errorMessage);
      return;
    }

    setLoading(true);
    try {
      const response = await userApiService.auth.sendVerificationCode(
        formData.phone
      );
      if (response.payload?.availableAfter) {
        const availableTime = response.payload.availableAfter;
        const currentTime = Math.floor(Date.now() / 1000);
        setTimeLeft(availableTime - currentTime);
        setAvailableAfter(availableTime);
      }
      const successMessage =
        "ᠲᠠᠨ ᠤ᠋ ᠤᠲᠠᠰᠤᠨ ᠳ᠋ᠤ 6 ᠣᠷᠣᠨᠲᠠᠢ ᠻᠣᠳ ᠢᠯᠭᠡᢉᠡᠯᠡᢉᠡ! ᠲᠠ ᠻᠣᠳ ᠢ᠋ᠭ ᠪᠠᠲᠠᠯᠭᠠᠵᠤᠭᠤᠯᠠᢈᠤ ᠻᠣᠳ ᢈᠡᠰᠦᠭ ᠲᠦ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!";
      toast.success(successMessage, { duration: 6000 });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "ᠻᠣᠳ ᠢᠯᠭᠡᢉᠡᢈᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    console.log("=== FORM SUBMISSION DEBUG ===");
    console.log("Full formData:", JSON.stringify(formData, null, 2));

    // Enhanced validation like old project
    if (!formData.groupId) {
      const errorMessage = "ᠲᠠ ᠪᠦᠯᠦᠭ ᠢ᠋ᠭ ᠰᠣᠩᠭᠣᠨ᠎ᠠ ᠤᠤ!";
      toast.error(errorMessage);
      return;
    }

    if (!formData.subGroupId) {
      console.log(
        "SubGroupId validation failed:",
        formData.subGroupId,
        typeof formData.subGroupId
      );
      const errorMessage = "ᠲᠠ ᠳᠡᠳ ᠪᠦᠯᠦᠭ ᠢ᠋ᠭ ᠰᠣᠩᠭᠣᠨ᠎ᠠ ᠤᠤ!";
      toast.error(errorMessage);
      return;
    }

    if (!formData.phone || String(formData.phone).length !== 8) {
      const errorMessage = "ᠲᠠ ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳᠤᠭᠠᠷᠠᠭ᠎ᠠ ᠵᠦᠪ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!";
      toast.error(errorMessage);
      return;
    }

    if (!formData.phoneVerifyCode || formData.phoneVerifyCode.length !== 6) {
      const errorMessage = "ᠲᠠ 6 ᠣᠷᠣᠨᠲᠠᠢ ᠪᠠᠲᠠᠯᠭᠠᠵᠤᠭᠤᠯᠠᢈᠤ ᠻᠣᠳ ᠢ᠋ᠭ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!";
      toast.error(errorMessage);
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      const errorMessage =
        "ᠨᠢᠭᠤᠴᠠ ᠦᠭᠡ ᠬᠠᠮᠤᠭᠢᠢᠨ ᠪᠠᠭᠠᠳᠠᠭ᠎ᠠ 6 ᠲᠡᠮᠳᠡᠭᠲᠦ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ!";
      toast.error(errorMessage);
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      const errorMessage = "ᠨᠢᠭᠤᠴᠠ ᠦᠭᠡ ᠲᠠᠠᠷᠠᢈᠤᠭᠦᠢ ᠪᠠᠢᠨ᠎ᠠ!";
      toast.error(errorMessage);
      return;
    }

    setLoading(true);
    try {
      await userApiService.auth.register({
        groupId: formData.groupId,
        subGroupId: formData.subGroupId,
        phone: formData.phone,
        phoneVerifyCode: formData.phoneVerifyCode,
        password: formData.password,
      });

      toast.success("ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠪᠦᠷᠲᠦᠭᠡᠯᠡᠭᠡ!");
      router.push("/member?registered=true");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "ᠪᠦᠷᠲᠦᠭᠡᠯ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.groupId &&
      formData.subGroupId &&
      formData.phone.length === 8 &&
      formData.phoneVerifyCode.length === 6 &&
      formData.password.length >= 6 &&
      formData.password === formData.passwordConfirm
    );
  };

  const canSendCode = formData.phone.length === 8 && timeLeft === 0;

  // Filter subgroups based on selected group
  const availableSubGroups =
    groups.userSubGroups?.filter(
      (subGroup) => subGroup.userGroupId === formData.groupId
    ) || [];

  // Debug logging
  console.log("Current formData:", formData);
  console.log("Available subgroups:", availableSubGroups);

  return (
    <Layout>
      <div className="container mx-auto px-4 w-full flex justify-center items-center bg-[#363636] min-h-screen h-full py-10">
        <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full p-8 lg:p-12 flex flex-col sm:flex-row gap-6">
            {/* Title */}
            <div className="text-center mb-8">
              <h1
                className="text-3xl font-bold text-gray-800"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                  margin: "0 auto",
                }}
              >
                ᠪᠦᠷᠲᠦᠭᠦᠯᢈᠦ
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto"
            >
              {/* Mobile: Grid layout for better spacing */}
              <div className="grid grid-cols-3 gap-4 md:contents">
                {/* Group Selection */}
                <div className="flex flex-row gap-2 col-span-1 md:col-span-1">
                  <label
                    className="text-lg font-medium text-gray-700 md:block"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ᠪᠦᠯᠦᠭ*:
                  </label>
                  <div className="relative group-dropdown-container">
                    <button
                      type="button"
                      onClick={() =>
                        setIsGroupDropdownOpen(!isGroupDropdownOpen)
                      }
                      className="border-2 border-gray-300 pl-1 text-center rounded-lg flex-1 md:w-12 bg-white text-sm"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        height: "auto",
                        minHeight: "2.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.5rem 0.25rem",
                      }}
                    >
                      {formData.groupId
                        ? groups.userGroups?.find(
                            (group) => group.id === formData.groupId
                          )?.title || "ᠰᠣᠩᠭᠣᠨ᠎ᠠ ᠤᠤ"
                        : "ᠰᠣᠩᠭᠣᠨ᠎ᠠ ᠤᠤ"}{" "}
                      {isGroupDropdownOpen ? "◀" : "▶"}
                    </button>
                    {isGroupDropdownOpen && (
                      <div className="absolute top-0 left-24 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex">
                        {groups.userGroups?.map((group) => (
                          <button
                            key={group.id}
                            type="button"
                            onClick={() => {
                              console.log("Setting groupId to:", group.id);
                              setFormData((prev) => ({
                                ...prev,
                                groupId: group.id,
                                subGroupId: null,
                              }));
                              setIsGroupDropdownOpen(false);
                            }}
                            className="block w-20 p-2 text-xs hover:bg-gray-100 border-r border-gray-200 last:border-r-0"
                            style={{
                              writingMode: "vertical-lr",
                              textOrientation: "upright",
                            }}
                          >
                            {group.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Sub Group Selection */}
                <div className="flex flex-row gap-2 col-span-1 md:col-span-1">
                  <label
                    className="text-lg font-medium text-gray-700"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ᠳᠡᠳ ᠪᠦᠯᠦᠭ*:
                  </label>
                  <div className="relative subgroup-dropdown-container">
                    <button
                      type="button"
                      onClick={() =>
                        formData.groupId &&
                        setIsSubGroupDropdownOpen(!isSubGroupDropdownOpen)
                      }
                      disabled={!formData.groupId}
                      className={`border-2 border-gray-300 pl-1 text-center rounded-lg flex-1 md:w-12 bg-white text-sm ${
                        !formData.groupId ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        height: "auto",
                        minHeight: "2.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.5rem 0.25rem",
                      }}
                    >
                      {formData.subGroupId
                        ? availableSubGroups.find(
                            (subGroup) => subGroup.id === formData.subGroupId
                          )?.title || "ᠰᠣᠩᠭᠣᠨ᠎ᠠ ᠤᠤ"
                        : "ᠰᠣᠩᠭᠣᠨ᠎ᠠ ᠤᠤ"}{" "}
                      {isSubGroupDropdownOpen ? "◀" : "▶"}
                    </button>
                    {isSubGroupDropdownOpen && formData.groupId && (
                      <div className="absolute top-0 left-24 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex">
                        <button
                          type="button"
                          onClick={() => {
                            console.log("Clearing subGroupId");
                            setFormData((prev) => ({
                              ...prev,
                              subGroupId: null,
                            }));
                            setIsSubGroupDropdownOpen(false);
                          }}
                          className="block w-20 p-2 text-xs hover:bg-gray-100 border-r border-gray-200"
                          style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                          }}
                        >
                          ᠰᠣᠩᠭᠣᠨ᠎ᠠ ᠤᠤ
                        </button>
                        {availableSubGroups.map((subGroup) => (
                          <button
                            key={subGroup.id}
                            type="button"
                            onClick={() => {
                              console.log(
                                "Setting subGroupId to:",
                                subGroup.id
                              );
                              setFormData((prev) => ({
                                ...prev,
                                subGroupId: subGroup.id,
                              }));
                              setIsSubGroupDropdownOpen(false);
                            }}
                            className="block w-20 p-2 text-xs hover:bg-gray-100 border-r border-gray-200 last:border-r-0"
                            style={{
                              writingMode: "vertical-lr",
                              textOrientation: "upright",
                            }}
                          >
                            {subGroup.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Phone Number */}
                <div className="flex flex-row gap-2 col-span-1 md:col-span-1">
                  <label
                    className="text-lg font-medium text-gray-700"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳᠤᠭᠠᠷ*:
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 text-center rounded-lg flex-1 md:w-12"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    placeholder="xxxxxxxx"
                    maxLength="8"
                  />
                </div>
                {/* Verification Code */}
                <div className="flex flex-row gap-2 col-span-1 md:col-span-1">
                  <label
                    className="text-lg font-medium text-gray-700"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ᠪᠠᠲᠠᠯᠭᠠᠵᠤᠭᠤᠯᠠᢈᠤ ᠻᠣᠳ*:
                  </label>
                  <input
                    name="phoneVerifyCode"
                    type="tel"
                    value={formData.phoneVerifyCode}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 p-3 rounded-lg text-center flex-1 md:w-12"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    placeholder="xxxxxx"
                    maxLength="6"
                  />
                </div>
                {/* Send Code Button */}
                <div className="flex justify-center col-span-1">
                  <Button
                    text={
                      timeLeft > 0 ? `ᠻᠣᠳ ᠢᠯᠭᠡᢉᠦ (${timeLeft})` : "ᠻᠣᠳ ᠢᠯᠭᠡᢉᠦ"
                    }
                    type="secondary"
                    disabled={!canSendCode || loading}
                    onClick={sendSmsCode}
                    className="py-2 px-4 text-lg"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-row gap-2 col-span-1 md:col-span-1">
                  <label
                    className="text-lg font-medium text-gray-700"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ᠨᠢᠭᠤᠴᠠ ᠦᠭᠡ*:
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 p-3 rounded-lg text-center flex-1 md:w-12"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    placeholder="ᠬᠠᠮᠤᠭᠢᠢᠨ ᠪᠠᠭᠠᠳᠠᠭ᠎ᠠ 6 ᠲᠡᠮᠳᠡᠭᠲᠦ"
                  />
                </div>
                {/* Confirm Password */}
                <div className="flex flex-row gap-2 col-span-1 md:col-span-1">
                  <label
                    className="text-lg font-medium text-gray-700"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ᠨᠢᠭᠤᠴᠠ ᠦᠭᠡ ᠳᠠᠪᠲᠠᢈᠤ*:
                  </label>
                  <input
                    name="passwordConfirm"
                    type="password"
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 p-3 rounded-lg text-center flex-1 md:w-12"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    placeholder="ᠨᠢᠭᠤᠴᠠ ᠦᠭᠡᠭ᠎ᠡ ᠳᠠᠬᠢᠨ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ"
                  />
                </div>
                {/* Submit Button and Back to Login Link */}
                <div className="flex justify-center gap-4 col-span-2 md:col-span-1">
                  <Button
                    text={loading ? "ᠤᠨᠰᠢᠵᠤ ᠪᠠᠢᠨ᠎ᠠ..." : "ᠪᠦᠷᠲᠦᠭᠡᠯ ᠦᠦᠰᠭᠡᢈᠦ"}
                    type="primary"
                    disabled={!isFormValid() || loading}
                    onClick={handleSubmit}
                    className="py-3 px-3 min-h-max text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => router.push("/member")}
                    className="text-blue-600 hover:text-blue-800 py-3 px-4"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                      height: "auto",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    ᠨᠡᠪᠲᠡᠷᠡᢈᠦ ᢈᠤᠤᠳᠠᠰ ᠷᠤᠤ ᠪᠤᠴᠠᢈᠤ
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
