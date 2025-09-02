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
        <div className="flex flex-row gap-2">
          {/* Traditional Mongolian Header */}
          <h2
            className="text-sm font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ
          </h2>

          {/* Back Button */}
          <Button
            text="ᠨᠢᢉᠡᠨ ᠤᠳᠠᠭ᠎ᠠ ᠬᠠᠨᠳᠢᠪ"
            onClick={handleBackToOnceTime}
            className="text-black text-sm max-h-max"
          />
        </div>

        {/* Form Fields - Contact Form Style */}
        <div className="flex gap-4 w-full mt-4">
          <h2
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
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
                  textOrientation: "upright",
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
                  textOrientation: "upright",
                }}
              />
            </div>

            {/* First Name */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
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
                  textOrientation: "upright",
                }}
              />
            </div>

            {/* Phone Number */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
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
                  textOrientation: "upright",
                }}
              />
            </div>

            {/* Card Number */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠬᠠᠷᠲ ᠤᠨ 16 ᠣᠷᠣᠨ*
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
                  textOrientation: "upright",
                }}
              />
            </div>

            {/* Email */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
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
                  textOrientation: "upright",
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
                  textOrientation: "upright",
                }}
              >
                {timeLeft > 0
                  ? `${timeLeft}ᠰ`
                  : isLoading
                  ? "..."
                  : "ᠬᠣᠳ ᠢᠯᠭᠡᢉᠦ"}
              </button>
            </div>

            {/* Verification Code */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠪᠠᠲᠠᠯᠭᠠᠠᠵᠤᠭᠤᠯᠬᠤ ᠬᠣᠳ*
              </p>
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                maxLength={6}
                placeholder="6"
                className={`border rounded-md p-2 w-16 text-xs ${
                  fullField && !verifyCode
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
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
                  textOrientation: "upright",
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

        <div className="flex flex-row gap-2">
          <h2
            className="text-sm font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠲᠠ ᠡᠮᠦᠨ᠎ᠡ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ ᠪᠠᠢᢈᠠᠨ ᠤᠤ
          </h2>

          <p
            className="text-xs"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              minHeight: "80px",
            }}
          >
            ᠬᠠᠳᠠᠭᠠᠯᠠᢉᠠᢉᠠᠢ ᠢᠮᠡᠶᠢᠯ ᠪᠠᠷ ᠨᠡᠪᠲᠡᠷᠡᢉᠦ
          </p>
        </div>

        {/* Login Form Fields - Contact Form Style */}
        <div className="flex gap-4 w-full mt-4">
          <h2
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
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
                  textOrientation: "upright",
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
                  textOrientation: "upright",
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
                  textOrientation: "upright",
                }}
              >
                {loginTimeLeft > 0 ? `${loginTimeLeft}s` : "ᠬᠣᠳ ᠢᠯᠭᠡᢉᠦ"}
              </button>
            </div>

            {/* Verification Code */}
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠪᠠᠲᠠᠯᠭᠠᠠᠵᠤᠭᠤᠯᠬᠤ ᠬᠣᠳ*
              </p>
              <input
                type="text"
                maxLength={6}
                placeholder=""
                className="border rounded-md p-2 w-16 text-xs border-gray-300"
                value={loginVerifyCode}
                onChange={(e) => setLoginVerifyCode(e.target.value)}
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
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
                  textOrientation: "upright",
                }}
              >
                ᠨᠡᠪᠲᠡᠷᠡᢉᠦ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-gray-100 p-6 m-4 rounded-lg">
        <div className="flex flex-row gap-2 max-h-[300px]">
          <h3
            className="text-lg font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ
          </h3>
          <p
            className="text-sm text-gray-700 max-w-xs"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ ᠶᠢᠨ ᠠᠷᠭᠠ ᠵᠠᠮ ᠢ ᠲᠠᠨ ᠳ᠋ᠤ ᠮᠡᠳᠡᠭᠦᠯᠬᠦ ᠪᠣᠯᠣᠨ᠎ᠠ᠃
            ᠲᠠᠨ ᠤ᠋ ᠬᠠᠷᠲ ᠢ ᠪᠦᠷᠳᠦᠯᠦᠨ᠎ᠡ ᠠᠦᠲᠣᠮᠠᠲ ᠬᠠᠨᠳᠢᠪ ᠢᠯᠡᢉᠡᠨ᠎ᠡ᠃
          </p>
          <p
            className="text-xs text-gray-600 max-w-xs"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠬᠣᠯᠪᠤᠭ᠎ᠠ: ᠤᠯᠠᠭᠠᠨᠪᠠᠭᠠᠲᠤᠷ ᠬᠣᠲᠠ᠂ ᠰᠦᢈᠡᠪᠠᠭᠠᠲᠤᠷ ᠳᠡᢉᠦᠷᢉᠡ᠂ ᠖-ᠷ ᠬᠣᠷᠢᠶ᠎ᠠ᠂ AB
            Center᠂ ᠗ ᠳᠠᠪᠬᠤᠷ
          </p>
        </div>
      </div>
    </div>
  );
}
