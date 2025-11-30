import Image from "next/image";
import Button from "@/components/common/Button";
import { countryData } from "@/utils/countryList";

export default function RecurringDonationDesktop({
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
    <div className="hidden sm:block">
      {/* Content Section */}
      <div className="h-full flex flex-col gap-8 w-auto flex-shrink-0 mt-10">
        <div className="flex gap-16 p-8 m-4 h-full bg-[#48483D] text-white rounded-lg">
          <div className="flex gap-7">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ
            </h2>
            <p
              style={{
                writingMode: "vertical-lr",
              }}
              className="text-sm"
            >
              ᠲᠠᠨ ᠳᠣᠤᠷᠠᠬᠢ ᠮᠡᠳᠡᢉᠡ ᠶᠢ ᠬᠠᠷᠲ ᠤᠨ ᠮᠡᠳᠡᢉᠡᠲᠡᠢ ᠠᠳᠠᠯᠢ ᠪᠢᢈᠢᠨᠡ ᠦᠦ
            </p>
          </div>

          <div className="flex gap-7">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠬᠠᠷᠢ ᠦᠦᠯ
            </h2>

            {/* Back to Once-time Button */}
            <div className="flex gap-2">
              <Button
                text="ᠨᠢᢉᠡᠨ ᠤᠳᠠᠭ᠎ᠠ ᠬᠠᠨᠳᠢᠪ"
                onClick={handleBackToOnceTime}
                className="text-black text-sm"
              />
            </div>
          </div>

          <div className="flex gap-7">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠪᠦᠷᠳᠦᢉᠦᠯ
            </h2>

            {/* Last Name (first in old web) */}
            <div className="flex gap-2">
              <p
                className="text-sm"
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
                className={`border rounded-md p-2 w-20 text-black ${
                  fullField && !lastName ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* First Name (second in old web) */}
            <div className="flex gap-2">
              <p
                className="text-sm"
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
                className={`border rounded-md p-2 w-20 text-black ${
                  fullField && !firstName ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Phone Number (third in old web) */}
            <div className="flex gap-2">
              <p
                className="text-sm"
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
                className={`border rounded-md p-2 w-20 text-black ${
                  fullField && !phoneNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Card Number (fourth in old web) */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠬᠠᠷᠲ ᠤᠨ 16 ᠣᠷᠣᠨᠲᠠᠢ ᠳᠤᠭᠠᠷ*
              </p>
              <input
                type="text"
                value={pan}
                onChange={(e) =>
                  setPan(e.target.value.replace(/\D/g, "").slice(0, 16))
                }
                maxLength={16}
                className={`border rounded-md p-2 w-20 text-black ${
                  fullField && !pan ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Email (fifth in old web) */}
            <div className="flex gap-2">
              <p
                className="text-sm"
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
                className={`border rounded-md p-2 w-20 text-black lowercase ${
                  fullField && !email ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            {/* Email Verification Button */}
            <div className="flex gap-2">
              <Button
                text={
                  timeLeft > 0
                    ? `${timeLeft}ᠰ ᠬᠦᠯᠢᢉᠡᠨ᠎ᠡ`
                    : isLoading
                    ? "ᠢᠯᠭᠡᢉᠦ..."
                    : "ᠬᠣᠳ ᠢᠯᠭᠡᢉᠦ"
                }
                onClick={sendEmailVerification}
                disabled={isLoading || timeLeft > 0 || !email}
                className={`text-black text-sm ${
                  isLoading || timeLeft > 0 || !email
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>

            {/* Verification Code (sixth in old web) */}
            <div className="flex gap-2">
              <p
                className="text-sm"
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
                placeholder="6 ᠣᠷᠣᠨ"
                className={`border rounded-md p-2 w-20 text-black ${
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
                className={`text-black ${
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
          </div>
        </div>

        {/* Login Form - Side by side like old web */}
        <div className="flex gap-16 p-8 max-w-min m-4 h-full bg-[#48483D] text-white rounded-lg">
          <div className="flex gap-7">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠲᠠ ᠡᠮᠦᠨ᠎ᠡ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ ᠪᠠᠢᢈᠠᠨ ᠤᠤ
            </h2>
            <p
              style={{
                writingMode: "vertical-lr",
              }}
              className="text-sm"
            >
              ᠬᠠᠳᠠᠭᠠᠯᠠᢉᠠᢉᠠᠢ ᠢᠮᠡᠶᠢᠯ ᠪᠠᠷ ᠨᠡᠪᠲᠡᠷᠡᢉᠦ
            </p>
          </div>

          <div className="flex gap-7">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠨᠡᠪᠲᠡᠷᠡᢉᠦ
            </h2>

            {/* Email */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠢᠮᠡᠶᠢᠯ*
              </p>
              <input
                type="email"
                className="border rounded-md p-2 w-20 text-black lowercase"
                style={{
                  writingMode: "vertical-lr",
                }}
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            {/* Email Verification Button */}
            <div className="flex gap-2">
              <Button
                text={loginTimeLeft > 0 ? `${loginTimeLeft}s` : "ᠬᠣᠳ ᠢᠯᠭᠡᢉᠦ"}
                className={`text-black text-sm ${
                  !loginEmail || loginTimeLeft > 0 || loginIsLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={sendLoginEmailCode}
                disabled={!loginEmail || loginTimeLeft > 0 || loginIsLoading}
              />
            </div>

            {/* Verification Code */}
            <div className="flex gap-2">
              <p
                className="text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠪᠠᠲᠠᠯᠭᠠᠠᠵᠤᠭᠤᠯᠬᠤ ᠬᠣᠳ*
              </p>
              <input
                type="text"
                maxLength={6}
                placeholder="6 ᠣᠷᠣᠨ"
                className="border rounded-md p-2 w-20 text-black"
                style={{
                  writingMode: "vertical-lr",
                }}
                value={loginVerifyCode}
                onChange={(e) => setLoginVerifyCode(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <div className="flex gap-2">
              <Button
                text="ᠨᠡᠪᠲᠡᠷᠡᢉᠦ"
                className={`text-black ${
                  !loginEmail || !loginVerifyCode || loginIsLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleLogin}
                disabled={!loginEmail || !loginVerifyCode || loginIsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
