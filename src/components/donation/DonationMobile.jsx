import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import Button from "@/components/common/Button";
import { countryData } from "@/utils/countryList";
import StaticHeader from "../common/StaticHeader";
import { toMongolianNumbers } from "@/utils/fetcher";

export default function DonationMobile({
  // Form data
  amount,
  setAmount,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  selectedCountryCode,
  setSelectedCountryCode,

  // Donation type
  donationType,
  setDonationType,

  // Payment states
  isLoading,
  invoiceData,
  qpayData,
  paid,
  checkPaid,

  // Error handling
  fullField,

  // Functions
  chooseDonation,
  handleDonate,
  handleQPay,
  handleDonationTypeChange,
}) {
  // Amount options for donation
  const amountOptions = [20000, 50000, 100000];

  return (
    <div className="w-full min-h-screen bg-white md:hidden">
      <div className="p-4">
        <div className="bg-[#48483D] text-white rounded-lg p-6 mb-6">
          {/* Once/Monthly Toggle */}
          <div className="flex gap-3 mb-6">
            <h2
              className="text-xl font-bold mb-4 text-center"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ
            </h2>

            <button
              onClick={() => handleDonationTypeChange("once")}
              className={`p-2 text-center text-sm font-medium rounded-md ${
                donationType === "once"
                  ? "bg-yellow-500 text-black"
                  : "bg-white text-black border border-gray-300"
              }`}
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠨᠢᢉᠡᠨ ᠤᠳᠠᠭ᠎ᠠ
            </button>
            <button
              onClick={() => handleDonationTypeChange("monthly")}
              className={`p-2 text-center text-sm font-medium rounded-md ${
                donationType === "monthly"
                  ? "bg-yellow-500 text-black"
                  : "bg-white text-black border border-gray-300"
              }`}
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ
            </button>
          </div>

          {/* Amount Selection */}
          <div className="mb-4 flex flex-row gap-2 max-h-[250px]">
            <label
              className="block text-sm font-medium mb-2"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠳᠦᠨ *
            </label>
            <div className="flex flex-row gap-2 mb-2">
              {amountOptions.map((amountOption) => (
                <button
                  key={amountOption}
                  onClick={() => chooseDonation(amountOption)}
                  className={`border rounded-md p-3 text-sm ${
                    amount === amountOption.toString()
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 text-black bg-white hover:bg-gray-100"
                  }`}
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {toMongolianNumbers(amountOption)}₮
                </button>
              ))}
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="ᠪᠤᠰᠤᠳ ᠳᠦᠨ"
              className="border border-gray-300 p-3 text-sm max-w-min rounded-md text-black"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            />
          </div>

          {/* Personal Information - Contact Form Style */}
          <div className="flex gap-7 mt-4 w-full">
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
              {/* First Name */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠨᠡᠷ᠎ᠡ*
                </p>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`border rounded-md p-2 w-16 text-xs ${
                    fullField && !firstName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                />
              </div>

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
                    fullField && !lastName
                      ? "border-red-500"
                      : "border-gray-300"
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

              {/* Phone */}
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

              {/* Country */}
              <div className="flex gap-2">
                <p
                  className="text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠤᠯᠤᠰ
                </p>
                <select
                  value={selectedCountryCode}
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-20 text-xs text-black"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {countryData.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDonate}
                  disabled={isLoading}
                  className={`bg-[#FFFF00] rounded-[8px] px-2 py-3 text-xs font-bold text-black ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:brightness-105"
                  }`}
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {isLoading ? "ᠢᠯᠭᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ..." : "ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ"}
                </button>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          {invoiceData && !paid && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              <p className="mb-2">ᠲᠥᠯᠪᠦᠷᠢ ᠬᠦᠯᠢᠶᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ...</p>
              <Button
                text="QPay"
                onClick={handleQPay}
                disabled={isLoading}
                className="w-full text-black"
              />
            </div>
          )}

          {/* QPay QR Code */}
          {qpayData && (
            <div className="mb-4 text-center">
              <p className="mb-2">QR ᠬᠣᠳ ᠢ᠋ ᠰᠬᠠᠨ ᠬᠢᠵᠦ ᠲᠥᠯᠪᠦᠷᠢ ᠬᠢᠭᠠᠷᠠᠢ</p>
              <div className="inline-block bg-white p-4 rounded">
                <img
                  src={qpayData.invoice?.qr_image || qpayData.qrImage}
                  alt="QPay QR Code"
                  className="w-48 h-48"
                />
              </div>
            </div>
          )}
        </div>

        {/* Information Section */}
        <div className="bg-gray-100 p-6 rounded-lg flex flex-row gap-2 max-h-[300px]">
          <h3
            className="text-lg font-bold mb-4"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨ ᠳ᠋ᠤᠷ
          </h3>
          <p
            className="text-sm text-gray-700 mb-4"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠢᠷᢉᠡᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᠦᠨ᠎ᠡ ᠲᠡᠢ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ
            ᠣᠷᠤᠭᠤᠯᠵᠤ᠂ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠲᠠᠨ ᠳ᠋ᠤ ᠪᠠᠶᠠᠷᠯᠠᠯ᠎ᠠ᠃
          </p>
          <p
            className="text-xs text-gray-600"
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
