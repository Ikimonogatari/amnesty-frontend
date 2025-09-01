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
      <div className="p-4">
        <div
          className="bg-[#48483D] text-white rounded-lg p-6 mb-6"
          style={{
            opacity: isLoading ? 0.3 : 1,
            pointerEvents: isLoading ? "none" : "auto",
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ
          </h2>

          {/* Description */}
          <p className="text-sm mb-6 text-center">
            ᠲᠠᠨ ᠳᠣᠤᠷᠠᠬᠢ ᠮᠡᠳᠡᢉᠡ ᠶᠢ ᠬᠠᠷᠲ ᠤᠨ ᠮᠡᠳᠡᢉᠡᠲᠡᠢ ᠠᠳᠠᠯᠢ ᠪᠢᢈᠢᠨᠡ ᠦᠦ
          </p>

          {/* Back to Once-time Button */}
          <div className="mb-4">
            <Button
              text="← ᠨᠢᢉᠡᠨ ᠤᠳᠠᠭ᠎ᠠ ᠬᠠᠨᠳᠢᠪ"
              onClick={handleBackToOnceTime}
              className="w-full text-black text-sm"
            />
          </div>

          {/* Last Name (first in old web order) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ᠣᠪᠤᠭ *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full border rounded-md p-3 text-black ${
                fullField && !lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* First Name (second in old web order) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ᠨᠡᠷᠡ *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full border rounded-md p-3 text-black ${
                fullField && !firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Phone Number (third in old web order) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ᠤᠲᠠᠰᠤᠨ *</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength={8}
              className={`w-full border rounded-md p-3 text-black ${
                fullField && !phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Card Number (fourth in old web order) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              ᠬᠠᠷᠲ ᠤᠨ 16 ᠣᠷᠣᠨᠲᠠᠢ ᠳᠤᠭᠠᠷ *
            </label>
            <input
              type="text"
              value={pan}
              onChange={(e) =>
                setPan(e.target.value.replace(/\D/g, "").slice(0, 16))
              }
              maxLength={16}
              placeholder="16 ᠣᠷᠣᠨ ᠨᠦᠮᠡᠷ"
              className={`w-full border rounded-md p-3 text-black ${
                fullField && !pan ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Email and Verification (fifth in old web order) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ᠢᠮᠡᠶᠢᠯ *</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 border rounded-md p-3 text-black lowercase ${
                  fullField && !email ? "border-red-500" : "border-gray-300"
                }`}
              />
              <Button
                text={timeLeft > 0 ? `${timeLeft}ᠰ` : isLoading ? "..." : "ᠬᠣᠳ"}
                onClick={sendEmailVerification}
                disabled={isLoading || timeLeft > 0 || !email}
                className={`text-black text-sm ${
                  isLoading || timeLeft > 0 || !email
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>
          </div>

          {/* Verification Code (sixth in old web order) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              ᠪᠠᠲᠠᠯᠭᠠᠠᠵᠤᠭᠤᠯᠬᠤ ᠬᠣᠳ *
            </label>
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              maxLength={6}
              placeholder="6 ᠣᠷᠣᠨ ᠨᠦᠮᠡᠷ"
              className={`w-full border rounded-md p-3 text-black ${
                fullField && !verifyCode ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Submit Button */}
          <Button
            text={isLoading ? "ᠤᠨᠰᠢᠵᠤ ᠪᠠᠢᠨ᠎ᠠ..." : "ᠪᠦᠷᠳᠦᢉᠦᢉᠦ"}
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
            className={`w-full mb-4 ${
              isLoading ||
              !firstName ||
              !lastName ||
              !email ||
              !phoneNumber ||
              pan.length !== 16 ||
              verifyCode.length !== 6
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          />
        </div>

        {/* Login Form - Stacked on mobile like old web */}
        <div className="bg-[#48483D] text-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">
            ᠲᠠ ᠡᠮᠦᠨ᠎ᠡ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ ᠪᠠᠢᢈᠠᠨ ᠤᠤ?
          </h2>

          <p className="text-sm mb-6 text-center">
            ᠬᠠᠳᠠᠭᠠᠯᠠᢉᠠᢉᠠᠢ ᠢᠮᠡᠶᠢᠯ ᠪᠠᠷ ᠨᠡᠪᠲᠡᠷᠡᢉᠦ
          </p>

          {/* Email and Verification */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ᠢᠮᠡᠶᠢᠯ *</label>
            <div className="flex gap-2">
              <input
                type="email"
                className="flex-1 border rounded-md p-3 text-black lowercase"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <Button
                text={loginTimeLeft > 0 ? `${loginTimeLeft}s` : "ᠬᠣᠳ"}
                className={`text-black text-sm ${
                  !loginEmail || loginTimeLeft > 0 || loginIsLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={sendLoginEmailCode}
                disabled={!loginEmail || loginTimeLeft > 0 || loginIsLoading}
              />
            </div>
          </div>

          {/* Verification Code */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              ᠪᠠᠲᠠᠯᠭᠠᠠᠵᠤᠭᠤᠯᠬᠤ ᠬᠣᠳ *
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="6 ᠣᠷᠣᠨ ᠨᠦᠮᠡᠷ"
              className="w-full border rounded-md p-3 text-black"
              value={loginVerifyCode}
              onChange={(e) => setLoginVerifyCode(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <Button
            text="ᠨᠡᠪᠲᠡᠷᠡᢉᠦ"
            className={`w-full ${
              !loginEmail || !loginVerifyCode || loginIsLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleLogin}
            disabled={!loginEmail || !loginVerifyCode || loginIsLoading}
          />
        </div>

        {/* Information Section */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ</h3>
          <p className="text-sm text-gray-700 mb-4">
            ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ ᠶᠢᠨ ᠠᠷᠭᠠ ᠵᠠᠮ ᠢ ᠲᠠᠨ ᠳ᠋ᠤ ᠮᠡᠳᠡᠭᠦᠯᠬᠦ ᠪᠣᠯᠣᠨ᠎ᠠ᠃
            ᠲᠠᠨ ᠤ᠋ ᠬᠠᠷᠲ ᠢ ᠪᠦᠷᠳᠦᠯᠦᠨ᠎ᠡ ᠠᠦᠲᠣᠮᠠᠲ ᠬᠠᠨᠳᠢᠪ ᠢᠯᠡᢉᠡᠨ᠎ᠡ᠃
          </p>
          <p className="text-xs text-gray-600">
            ᠬᠣᠯᠪᠤᠭ᠎ᠠ: ᠤᠯᠠᠭᠠᠨᠪᠠᠭᠠᠲᠤᠷ ᠬᠣᠲᠠ᠂ ᠰᠦᢈᠡᠪᠠᠭᠠᠲᠤᠷ ᠳᠡᢉᠦᠷᢉᠡ᠂ ᠖-ᠷ ᠬᠣᠷᠢᠶ᠎ᠠ᠂ AB
            Center᠂ ᠗ ᠳᠠᠪᠬᠤᠷ
          </p>
        </div>
      </div>
    </div>
  );
}
