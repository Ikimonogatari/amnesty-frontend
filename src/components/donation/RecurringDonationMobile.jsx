import Button from "@/components/common/Button";
import { countryData } from "@/utils/countryList";

export default function RecurringDonationMobile({
  // Form data
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  pan,
  setPan,
  verifyCode,
  setVerifyCode,

  // UI states
  isLoading,
  fullField,
  timeLeft,

  // Functions
  sendEmailVerification,
  handleRecurringDonation,
  handleBackToOnceTime,

  // Login form props
  loginEmail,
  setLoginEmail,
  loginVerifyCode,
  setLoginVerifyCode,
  loginIsLoading,
  loginTimeLeft,
  sendLoginEmailCode,
  handleLogin,
}) {
  return (
    <div className="w-full min-h-screen bg-white md:hidden">
      {/* Registration Form */}
      <div
        className="bg-[#48483D] text-white rounded-lg p-6 m-4"
        style={{
          opacity: isLoading ? 0.3 : 1,
          pointerEvents: isLoading ? "none" : "auto",
        }}
      >
        <div className="flex gap-7 mb-4">
          <h2
            className="text-xl font-bold flex-shrink-0 max-h-[200px]"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠰᠠᠷ᠎ᠠ ᠪᠣᠯᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠡᠷᢉᠦᢈᠦ
          </h2>
          <p
            style={{
              writingMode: "vertical-lr",
            }}
            className="text-sm flex-1 max-h-[200px] overflow-x-auto"
          >
            ᠲᠠ ᠳᠣᠣᠷᠠᢈᠢ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠢ᠋ ᠶᠠᠭ ᠻᠠᠷᠲ ᠤ᠋ᠨ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠲᠡᠢ ᠢᠵᠢᠯ ᠪᠢᠴᠢᠨ᠎ᠡ ᠦᠦ! <br />
            ᠦᢉᠡ ᠦᠰᠦᢉ ᠦ᠋ᠨ ᠵᠥᠷᠢᢉᠦᠦᠲᠡᠢ ᠪᠠᠶᠢᠬᠤ ᠲᠣᢈᠢᠶᠠᠯᠳᠤᠯ ᠳ᠋ᠤ ᠠᠵᠢᠯᠯᠠᠬᠤ ᠦᢉᠡᠢ ᠪᠣᠯᠬᠤ ᠶ᠋ᠢ ᠠᠩᠬᠠᠷᠤᠨ᠎ᠠ ᠤᠤ!
          </p>
        </div>

        {/* Form Fields - Contact Form Style */}
        <div className="flex gap-4 w-full mt-4">
          <h2
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠪᠦᠷᠳᠦᢉᠦᢉᠦ
          </h2>

          <div className="flex gap-2 overflow-x-auto w-full">
            {/* Last Name */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠣᠪᠤᠭ*
              </p>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`border rounded-md p-2 w-16 text-xs ${
                  fullField && !lastName ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* First Name */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠨᠡᠷᠡ*
              </p>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`border rounded-md p-2 w-16 text-xs ${
                  fullField && !firstName ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Phone Number */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠤᠲᠠᠰᠤᠨ*
              </p>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={8}
                className={`border rounded-md p-2 w-16 text-xs ${
                  fullField && !phoneNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Card Number */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠻᠠᠷᠲ ᠤ᠋ᠨ ᠑᠖ ᠣᠷᠤᠨ ᠲᠠᠢ ᠳ᠋ᠤᠭᠠᠷ*
              </p>
              <input
                type="text"
                value={pan}
                onChange={(e) =>
                  setPan(e.target.value.replace(/\D/g, "").slice(0, 16))
                }
                maxLength={16}
                className={`border rounded-md p-2 w-16 text-xs ${
                  fullField && !pan ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Email */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠢᠮᠡᠶᠢᠯ*
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border rounded-md p-2 w-16 text-xs lowercase ${
                  fullField && !email ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Email Verification Button */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={sendEmailVerification}
                disabled={isLoading || timeLeft > 0 || !email}
                className={`bg-[#FFFF00] rounded-[8px] px-2 py-3 text-xs font-bold text-black ${
                  isLoading || timeLeft > 0 || !email
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:brightness-105"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {timeLeft > 0
                  ? `${timeLeft}ᠰ ᠬᠦᠯᠢᢉᠡᠨ᠎ᠡ`
                  : isLoading
                  ? "ᠢᠯᠭᠡᢉᠦ..."
                  : "ᠬᠣᠳ ᠢᠯᠭᠡᢉᠦ"}
              </button>
            </div>

            {/* Verification Code */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠪᠠᠲᠠᠯᠭᠠᠠᠵᠤᠭᠤᠯᠬᠤ ᠬᠣᠳ*
              </p>
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                maxLength={6}
                placeholder="᠖ ᠣᠷᠣᠨ"
                className={`border rounded-md p-2 w-16 text-xs ${
                  fullField && !verifyCode
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRecurringDonation}
                disabled={
                  isLoading ||
                  !firstName ||
                  !lastName ||
                  !email ||
                  !phoneNumber ||
                  pan.length !== 16 ||
                  verifyCode.length !== 6
                }
                className={`bg-[#FFFF00] rounded-[8px] px-2 py-3 text-xs font-bold text-black ${
                  isLoading ||
                  !firstName ||
                  !lastName ||
                  !email ||
                  !phoneNumber ||
                  pan.length !== 16 ||
                  verifyCode.length !== 6
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:brightness-105"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {isLoading ? "ᠤᠨᠰᠢᠵᠤ ᠪᠠᠢᠨ᠎ᠠ..." : "ᠪᠦᠷᠳᠦᢉᠦᢉᠦ"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="bg-[#48483D] text-white rounded-lg p-6 m-4">
        {/* Traditional Mongolian Header */}

        <div className="flex gap-7 mb-4">
          <h2
            className="text-xl font-bold flex-shrink-0 max-h-[200px]"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠲᠠ ᠡᠮᠦᠨ᠎ᠡ ᠬᠠᠨᠳᠢᠪ ᠥᢉᠴᠦ ᠪᠠᠶᠢᠭᠰᠠᠨ ᠤᠤ?
          </h2>
          <p
            style={{
              writingMode: "vertical-lr",
            }}
            className="text-sm flex-1 max-h-[200px] overflow-x-auto"
          >
            ᠲᠠ ᠬᠠᠨᠳᠢᠪ ᠥᢉᠴᠦ ᠪᠠᠶᠢᠬᠤ ᠳ᠋ᠤ ᠪᠠᠨ ᠠᠰᠢᠭᠯᠠᠵᠤ ᠪᠠᠶᠢᠭᠰᠠᠨ ᠢᠮᠧᠶᠢᠯ ᠬᠠᠶ᠋ᠢᠭ ᠢ᠋ᠶᠠᠷ ᠨᠡᠪᠲᠡᠷᠡᠵᠦ ᠣᠷᠤᠨ᠎ᠠ ᠤᠤ!
          </p>
        </div>

        {/* Login Form Fields - Contact Form Style */}
        <div className="flex gap-4 w-full mt-4">
          <h2
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠨᠡᠪᠲᠡᠷᠡᢉᠦ
          </h2>

          <div className="flex gap-2 overflow-x-auto w-full">
            {/* Email */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠢᠮᠡᠶᠢᠯ*
              </p>
              <input
                type="email"
                className="border rounded-md p-2 w-16 text-xs lowercase border-gray-300"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Email Verification Button */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={sendLoginEmailCode}
                disabled={!loginEmail || loginTimeLeft > 0 || loginIsLoading}
                className={`bg-[#FFFF00] rounded-[8px] px-2 py-3 text-xs font-bold text-black ${
                  !loginEmail || loginTimeLeft > 0 || loginIsLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:brightness-105"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {loginTimeLeft > 0 ? `${loginTimeLeft}ᠰ` : "ᠬᠣᠳ ᠢᠯᠭᠡᢉᠦ"}
              </button>
            </div>

            {/* Verification Code */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠪᠠᠲᠠᠯᠭᠠᠠᠵᠤᠭᠤᠯᠬᠤ ᠬᠣᠳ*
              </p>
              <input
                type="text"
                maxLength={6}
                placeholder="᠖ ᠣᠷᠣᠨ"
                className="border rounded-md p-2 w-16 text-xs border-gray-300"
                value={loginVerifyCode}
                onChange={(e) => setLoginVerifyCode(e.target.value)}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Login Button */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleLogin}
                disabled={!loginEmail || !loginVerifyCode || loginIsLoading}
                className={`bg-[#FFFF00] rounded-[8px] px-2 py-3 text-xs font-bold text-black ${
                  !loginEmail || !loginVerifyCode || loginIsLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:brightness-105"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠨᠡᠪᠲᠡᠷᠡᢉᠦ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
