import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import userApiService from "@/services/userApiService";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Edit2, Menu, X } from "lucide-react";
import { getLocale } from "@/utils/locale";


export default function UserProfile({ userData, userGroups }) {
  const router = useRouter();
  const [parentTabIndex, setParentTabIndex] = useState(0);
  const [childTabIndex, setChildTabIndex] = useState(0);
  const [userEvents, setUserEvents] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Tab definitions with Mongolian script
  const parentTabs = [
    { key: "my_profile", label: "ᠮᠢᠨᠦ ᠪᠦᠷᠲᠡᠭᠦᠯ" },
    { key: "events", label: "ᠡᠸᠡᠨᠲᠦᠦᠳ" },
    { key: "shop", label: "ᠡᠮᠨᠧᠰᠲᠢ ᠳᠡᠯᠭᠦᠦᠷ" },
    { key: "donation", label: "ᠬᠠᠨᠳᠢᠸ" },
    { key: "logout", label: "ᠭᠠᠷᠠᠬᠤ" },
  ];

  const childTabs = [
    { key: "my_info", label: "ᠮᠢᠨᠦ ᠲᠤᠬᠠᠢ" },
    { key: "my_events", label: "ᠮᠢᠨᠦ ᠣᠷᠣᠯᠴᠠᠰᠠᠨ ᠡᠸᠡᠨᠲᠦᠦᠳ" },
    { key: "my_subscriptions", label: "ᠲᠠᠲᠸᠠᠷ ᠲᠥᠯᠥᠯᠲᠦᠨ ᠦ ᠲᠦᠦᠬᠡ" },
    { key: "change_pass", label: "ᠨᠢᠭᠤᠴᠠ ᠦᠭᠡ ᠰᠣᠯᠢᠬᠤ" },
  ];

  // Add "Become Member" tab if not a member
  if (!userData?.payload?.isMember) {
    childTabs.push({
      key: "become_member",
      label: "ᠭᠢᠰᠦᠦᠨ ᠪᠣᠯᠬᠤ",
    });
  }

  useEffect(() => {
    const { profileUpdated, childTabIndex: queryChildTabIndex } = router.query;

    if (profileUpdated === "true") {
      toast.success("ᠪᠦᠷᠲᠡᠭᠦᠯ ᠰᠢᠨᠡᠴᠢᠯᠡᠭᠳᠡᠯᠡᠭ!");
      router.replace("/member");
    }

    if (queryChildTabIndex) {
      setChildTabIndex(Number(queryChildTabIndex));
      router.replace("/member");
    }
  }, [router.query]);

  useEffect(() => {
    if (childTabIndex === 1) {
      // My Events tab
      loadUserEvents();
    } else if (childTabIndex === 2) {
      // My Subscriptions tab
      loadPaymentHistory();
    }
  }, [childTabIndex]);

  const loadUserEvents = async () => {
    try {
      setLoading(true);
      const response = await userApiService.member.getUserEvents();
      console.log("Events API Response:", response);
      // Handle the proper API response structure: response.payload.data
      const eventsData = response?.payload?.data || [];
      console.log("Events data array:", eventsData);
      setUserEvents(Array.isArray(eventsData) ? eventsData : []);
    } catch (error) {
      console.error("Failed to load user events:", error);
      toast.error("ᠡᠸᠡᠨᠲ ᠠᠴᠠᠭᠠᠯᠠᠬᠤᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ");
      setUserEvents([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const loadPaymentHistory = async () => {
    try {
      setPaymentLoading(true);
      const response = await userApiService.member.getPaymentHistory();
      console.log("Payments API Response:", response);
      // Handle the proper API response structure: response.payload.data
      const paymentData = response?.payload?.data || [];
      console.log("Payments data array:", paymentData);
      setPaymentHistory(Array.isArray(paymentData) ? paymentData : []);
    } catch (error) {
      console.error("Failed to load payment history:", error);
      toast.error("ᠲᠥᠯᠪᠦᠷᠢ ᠶᠢᠨ ᠲᠡᠦᠬᠡ ᠠᠴᠠᠭᠠᠯᠠᠬᠤᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ");
      setPaymentHistory([]); // Set empty array on error
    } finally {
      setPaymentLoading(false);
    }
  };

  const onParentTabPress = (tab) => {
    switch (tab.key) {
      case "my_profile":
        // Stay on current page
        break;
      case "events":
        router.push("/participation/events");
        break;
      case "shop":
        router.push("/merch");
        break;
      case "donation":
        router.push("/donate");
        break;
      case "logout":
        logout();
        break;
    }
  };

  const logout = () => {
    try {
      // Clear authentication data
      userApiService.auth.logout();

      // Show success toast
      toast.success("ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠭᠠᠷᠯᠠᠭ!");

      // Force a page reload to /member to ensure clean state
      window.location.href = "/member";
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("ᠭᠠᠷᠠᠬᠤ ᠳᠤ᠋ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠭᠠᠷᠯᠠᠭ!");
    }
  };

  const onChildTabPress = (tab, index) => {
    setChildTabIndex(index);
  };

  const changeAvatar = () => {
    const fileInput = document.createElement("input");
    fileInput.style.display = "none";
    fileInput.type = "file";
    fileInput.name = "file";
    fileInput.accept = "image/jpg,image/jpeg,image/png";

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await userApiService.user.uploadAvatar(formData);
        toast.success("ᠠᠷᠠᠳ ᠤᠨ ᠵᠢᠷᠤᠭ ᠰᠢᠨᠡᠴᠢᠯᠡᠭᠳᠡᠯᠡᠭ!");
        router.push("/member?profileUpdated=true");
      } catch (error) {
        console.error("Avatar upload error:", error);
        toast.error(
          error?.response?.data?.message ||
            "ᠠᠷᠠᠳ ᠤᠨ ᠵᠢᠷᠤᠭ ᠰᠢᠨᠡᠴᠢᠯᠡᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ"
        );
      }
    };

    fileInput.click();
  };

  const user = userData?.payload;
  const userFullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.phone;
  // For CSS backgroundImage, we need to manually add basePath since Next.js doesn't auto-apply it
  const avatar = user?.avatar
    ? (user.avatar.startsWith("http") ? user.avatar : `/mng${user.avatar.startsWith('/') ? '' : '/'}${user.avatar}`)
    : "/mng/images/default-man.jpg";

  return (
    <div className="w-full h-screen overflow-y-hidden">
      {/* Mobile Header with Hamburger Menu and User Profile */}
      <div className="md:hidden">
        {/* Navigation Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <div
            className="text-lg font-bold font-mongolian"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠮᠧᠨᠦ
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Mobile User Profile Section - Always Visible */}
        <div className="p-4 bg-white border-b">
          <div className="w-full border p-5 h-fit flex flex-row justify-between items-center">
            <div className="flex flex-col justify-center items-center">
              <div
                className="relative w-[128px] h-[128px] bg-[#eee] rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${avatar})` }}
              >
                <div className="absolute top-0 right-[-15px] cursor-pointer">
                  <button onClick={changeAvatar}>
                    <Edit2 size={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm">
              <div className="flex flex-col">
                <div
                  className="font-bold font-mongolian"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ID:
                </div>
                <div
                  className="flex-1 text-right"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {user?.id}
                </div>
              </div>
            </div>
            <div
              className="mb-10 text-xl text-center"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userFullName}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Sidebar Content */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-4 border-b flex items-center justify-between">
              <div
                className="text-lg font-bold font-mongolian"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠨᠠᠸᠢᠭᠠᠴᠢ
              </div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 space-y-6 overflow-y-auto h-full">
              {/* Child Tabs */}
              <div className="flex flex-row gap-2 flex-wrap border-b pb-4">
                {childTabs.map((tab, index) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      onChildTabPress(tab, index);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg ${
                      index === childTabIndex
                        ? "bg-[#FFFF00] text-black"
                        : "bg-[#eee] text-black hover:bg-gray-300"
                    }`}
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Parent Navigation Tabs */}

              <div className="flex flex-row gap-2 flex-wrap">
                {parentTabs.map((tab, index) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      onParentTabPress(tab);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg ${
                      index === 0
                        ? "bg-[#FFFF00] text-black"
                        : "bg-[#eee] text-black hover:bg-gray-300"
                    }`}
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row gap-5 font-mongolian flex-1 p-4">
        <div className="flex flex-col md:flex-row gap-5 h-full max-h-screen overflow-y-auto">
          {/* Parent Navigation Tabs */}
          <div className="flex flex-col gap-5 flex-shrink-0 p-3 sm:p-0">
            {parentTabs.map((tab, index) => (
              <button
                key={tab.key}
                onClick={() => onParentTabPress(tab)}
                className={`px-3 py-2 text-md font-mongolian ${
                  index === 0
                    ? "bg-[#FFFF00] text-black"
                    : "bg-[#eee] text-black hover:bg-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Child Tabs */}
          <div className="border p-3 sm:p-5 flex-shrink-0 flex flex-col gap-5">
            {childTabs.map((tab, index) => (
              <button
                key={tab.key}
                onClick={() => onChildTabPress(tab, index)}
                className={`px-3 py-2 text-md font-mongolian ${
                  index === childTabIndex
                    ? "bg-[#FFFF00] text-black"
                    : "bg-[#eee] text-black hover:bg-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Left Sidebar - User Info */}
        <div className="flex-shrink-0 flex flex-col items-center gap-5">
          <div className="w-full lg:w-[280px] border p-5 h-fit flex flex-row justify-between items-center">
            <div className="flex flex-col justify-center items-center">
              <div
                className="relative w-[128px] h-[128px] bg-[#eee] rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${avatar})` }}
              >
                <div className="absolute top-0 right-[-15px] cursor-pointer">
                  <button onClick={changeAvatar}>
                    <Edit2 size={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm">
              <div className="flex flex-col">
                <div
                  className="font-bold font-mongolian"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ID:
                </div>
                <div
                  className="flex-1 text-right"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {user?.id}
                </div>
              </div>
            </div>
            <div
              className="mb-10 text-xl text-center"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userFullName}
            </div>
          </div>
          {/* Right Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Content Area */}
            <div className="flex-1 border p-5 overflow-y-auto">
              {childTabIndex === 0 && <MyInfo userData={user} />}
              {childTabIndex === 1 && (
                <MyEvents events={userEvents} loading={loading} />
              )}
              {childTabIndex === 2 && (
                <MySubscriptions
                  payments={paymentHistory}
                  loading={paymentLoading}
                />
              )}
              {childTabIndex === 3 && <ChangePassword />}
              {childTabIndex === 4 && !user?.isMember && (
                <BecomeMember userData={user} userGroups={userGroups} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Content Area */}
      <div className="md:hidden flex-1 p-4 overflow-y-auto">
        {childTabIndex === 0 && <MyInfo userData={user} />}
        {childTabIndex === 1 && (
          <MyEvents events={userEvents} loading={loading} />
        )}
        {childTabIndex === 2 && (
          <MySubscriptions payments={paymentHistory} loading={paymentLoading} />
        )}
        {childTabIndex === 3 && <ChangePassword />}
        {childTabIndex === 4 && !user?.isMember && (
          <BecomeMember userData={user} userGroups={userGroups} />
        )}
      </div>
    </div>
  );
}

// Component for My Info tab
function MyInfo({ userData }) {
  const formatDate = (dateString) => {
    if (!dateString) return "ᠣᠷᠣᠭᠤᠯᠠᠭᠠᠳ ᠦᠭᠡᠢ";
    const date = new Date(dateString);
    return date
      .toLocaleDateString(getLocale(), {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "/");
  };

  const getMembershipStatus = () => {
    if (userData?.isMember) return "ᠭᠢᠰᠦᠦᠨ";
    if (userData?.isMemberInfoConfirmed) return "ᠪᠠᠳᠤᠯᠠᠭᠠ ᠪᠠᠳᠤᠯᠠᠭᠰᠠᠨ";
    return "ᠭᠢᠰᠦᠦᠨ ᠪᠢᠰᠢ";
  };

  return (
    <div className="flex flex-row gap-5">
      {/* Membership Status Section */}
      <div className="flex flex-row gap-5">
        <h3
          className="text-lg font-bold mb-3 font-mongolian"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠭᠢᠰᠦᠦᠨ ᠴᠢᠯᠡᠯ ᠦᠨ ᠪᠠᠢᠳᠠᠯ
        </h3>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠭᠢᠰᠦᠦᠨ ᠴᠢᠯᠡᠯ ᠦᠨ ᠪᠠᠢᠳᠠᠯ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {getMembershipStatus()}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠡᠯᠡᠰᠦᠭᠰᠡᠨ ᠡᠳᠦᠷ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {formatDate(userData?.dateCreated)}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="flex flex-row gap-5">
        <h3
          className="text-lg font-bold mb-3 font-mongolian"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠬᠣᠯᠪᠣᠭᠠ ᠪᠠᠷᠢᠬᠤ ᠮᠡᠳᠡᠭᠡ
        </h3>
        <div className="flex flex-row gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳᠤᠭᠠᠷ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.phone || "ᠣᠷᠣᠭᠤᠯᠠᠭᠠᠳ ᠦᠭᠡᠢ"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠢ᠋ᠮᠡᠢᠯ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.email || "ᠣᠷᠣᠭᠤᠯᠠᠭᠠᠳ ᠦᠭᠡᠢ"}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="flex flex-row gap-5">
        <h3
          className="text-lg font-bold mb-3 font-mongolian"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠬᠤᠪᠢ ᠶᠢᠨ ᠮᠡᠳᠡᠭᠡ
        </h3>
        <div className="flex flex-row gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠨᠡᠷᠡ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.firstName || "ᠣᠷᠣᠭᠤᠯᠠᠭᠠᠳ ᠦᠭᠡᠢ"}
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠣᠪᠣᠭ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.lastName || "ᠣᠷᠣᠭᠤᠯᠠᠭᠠᠳ ᠦᠭᠡᠢ"}
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠬᠦᠢᠲᠡᠨ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.gender === "male"
                ? "ᠡᠷᠡᠭᠲᠡᠢ"
                : userData?.gender === "female"
                ? "ᠡᠮᠡᠭᠲᠡᠢ"
                : "ᠣᠷᠣᠭᠤᠯᠠᠭᠠᠳ ᠦᠭᠡᠢ"}
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠲᠥᠷᠥᠭᠰᠡᠨ ᠡᠳᠦᠷ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {formatDate(userData?.birthday)}
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠤᠯᠤᠰ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.country || "ᠣᠷᠣᠭᠤᠯᠠᠭᠠᠳ ᠦᠭᠡᠢ"}
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠬᠣᠲᠠ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.city || "ᠣᠷᠣᠭᠤᠯᠠᠭᠠᠳ ᠦᠭᠡᠢ"}
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠬᠠᠶᠢᠭ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.address || "ᠣᠷᠣᠭᠤᠯᠠᠭᠠᠳ ᠦᠭᠡᠢ"}
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠠᠵᠢᠯ ᠤᠨ ᠭᠠᠵᠠᠷ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.occupation || "ᠣᠷᠣᠭᠤᠯᠠᠭᠠᠳ ᠦᠭᠡᠢ"}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="flex flex-row gap-5">
        <h3
          className="text-lg font-bold mb-3 font-mongolian"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠰᠲᠠᠲᠢᠰᠲᠢᠺ
        </h3>
        <div className="flex flex-row gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠣᠨᠣᠭ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.points || 0}
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠡᠸᠡᠨᠲ ᠦᠨ ᠴᠠᠭ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.eventHours || 0}
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠣᠷᠣᠯᠴᠠᠭᠰᠠᠨ ᠡᠸᠡᠨᠲ:
            </label>
            <p
              className="text-sm text-gray-900"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {userData?.countEvents || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for My Events tab
function MyEvents({ events, loading }) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠠᠴᠠᠭᠠᠯᠠᠵᠤ ᠪᠠᠢᠨ᠎ᠠ...
        </p>
      </div>
    );
  }

  // Ensure events is always an array
  const eventsArray = Array.isArray(events) ? events : [];

  if (eventsArray.length === 0) {
    return (
      <div className="text-center py-8">
        <p
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠲᠠ ᠠᠯᠢ ᠡᠸᠡᠨᠲ ᠳ᠋ᠤ ᠣᠷᠣᠯᠴᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ ᠪᠠᠢᠨ᠎ᠠ
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3">
      <h2
        className="text-lg font-bold mb-4 font-mongolian"
        style={{
          writingMode: "vertical-lr",
        }}
      >
        ᠮᠢᠨᠦ ᠣᠷᠣᠯᠴᠠᠰᠠᠨ ᠡᠸᠡᠨᠲᠦᠦᠳ
      </h2>
      <div className="flex flex-row gap-3">
        {eventsArray.map((event, index) => (
          <div key={event.id || index} className="border rounded-lg p-4">
            <h3
              className="font-medium mb-2 font-mongolian"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {event.title || "ᠨᠡᠷᠡᠢᠳᠦᠯ ᠦᠭᠡᠢ"}
            </h3>
            <p className="text-sm text-gray-600">
              {event.start_date
                ? new Date(event.start_date).toLocaleDateString()
                : "ᠡᠳᠦᠷ ᠦᠭᠡᠢ"}
            </p>
            {event.address && (
              <p className="text-sm text-gray-500 mt-1">{event.address}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Component for My Subscriptions tab
function MySubscriptions({ payments = [], loading = false }) {
  // Handle loading state
  if (loading) {
    return (
      <div className="flex flex-row gap-3">
        <h2
          className="text-lg font-bold mb-4 font-mongolian"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠲᠠᠲᠸᠠᠷ ᠲᠥᠯᠥᠯᠲᠦᠨ ᠦ ᠲᠦᠦᠬᠡ
        </h2>
        <p
          className="text-gray-500"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠠᠴᠠᠭᠠᠯᠠᠵᠤ ᠪᠠᠢᠨ᠎ᠠ...
        </p>
      </div>
    );
  }

  // Handle empty payments
  if (!payments || payments.length === 0) {
    return (
      <div className="flex flex-row gap-3">
        <h2
          className="text-lg font-bold mb-4 font-mongolian"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠲᠠᠲᠸᠠᠷ ᠲᠥᠯᠥᠯᠲᠦᠨ ᠦ ᠲᠦᠦᠬᠡ
        </h2>
        <p
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠲᠥᠯᠦᠭᠰᠡᠨ ᠬᠠᠨᠳᠢᠸ ᠦᠭᠡᠢ ᠪᠠᠢᠨ᠎ᠠ
        </p>
      </div>
    );
  }

  // Ensure payments is an array
  const paymentsArray = Array.isArray(payments) ? payments : [];

  return (
    <div className="flex flex-row gap-3">
      <h2
        className="text-lg font-bold mb-4 font-mongolian"
        style={{
          writingMode: "vertical-lr",
        }}
      >
        ᠲᠠᠲᠸᠠᠷ ᠲᠥᠯᠥᠯᠲᠦᠨ ᠦ ᠲᠦᠦᠬᠡ
      </h2>
      <div className="flex flex-row gap-3">
        {paymentsArray.map((payment, index) => (
          <div key={payment.id || index} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3
                className="font-medium font-mongolian"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {payment.description || payment.type || "ᠬᠠᠨᠳᠢᠸ"}
              </h3>
              <span className="text-lg font-bold text-green-600">
                ₮{payment.amount || "0"}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {payment.created_at || payment.date
                  ? new Date(
                      payment.created_at || payment.date
                    ).toLocaleDateString()
                  : "ᠡᠳᠦᠷ ᠦᠭᠡᠢ"}
              </span>
              <span
                className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {payment.status === "paid"
                  ? "ᠲᠥᠯᠦᠭᠰᠡᠨ"
                  : payment.status || "ᠲᠥᠯᠦᠭᠰᠡᠨ"}
              </span>
            </div>
            {payment.invoice_id && (
              <p className="text-xs text-gray-500 mt-1">
                Invoice: #{payment.invoice_id}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Component for Change Password tab
function ChangePassword() {
  return (
    <div className="flex flex-row gap-3">
      <h2
        className="text-lg font-bold mb-4 font-mongolian"
        style={{
          writingMode: "vertical-lr",
        }}
      >
        ᠨᠢᠭᠤᠴᠠ ᠦᠭᠡ ᠰᠣᠯᠢᠬᠤ
      </h2>
      <p
        style={{
          writingMode: "vertical-lr",
        }}
      >
        ᠨᠢᠭᠤᠴᠠ ᠦᠭᠡ ᠰᠣᠯᠢᠬᠤ ᠬᠡᠰᠡᠭ ᠢᠯᠡᠷᠬᠦ ᠪᠣᠯᠣᠨ᠎ᠠ
      </p>
    </div>
  );
}

// Component for Become Member tab
function BecomeMember({ userData, userGroups }) {
  return (
    <div className="flex flex-row gap-3">
      <h2
        className="text-lg font-bold mb-4 font-mongolian"
        style={{
          writingMode: "vertical-lr",
        }}
      >
        ᠭᠢᠰᠦᠦᠨ ᠪᠣᠯᠬᠤ
      </h2>
      <p
        style={{
          writingMode: "vertical-lr",
        }}
      >
        ᠡᠮᠨᠧᠰᠲᠢ ᠶᠢᠨ ᠭᠢᠰᠦᠦᠨ ᠪᠣᠯᠬᠤ ᠬᠡᠰᠡᠭ ᠢᠯᠡᠷᠬᠦ ᠪᠣᠯᠣᠨ᠎ᠠ
      </p>
    </div>
  );
}
