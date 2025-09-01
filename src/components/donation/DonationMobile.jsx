import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import Button from "@/components/common/Button";
import { countryData } from "@/utils/countryList";
import StaticHeader from "../common/StaticHeader";

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
          <h2 className="text-xl font-bold mb-4 text-center">ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ</h2>

          {/* Once/Monthly Toggle */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handleDonationTypeChange("once")}
              className={`flex-1 px-4 py-3 text-center text-sm font-medium rounded-md ${
                donationType === "once"
                  ? "bg-yellow-500 text-black"
                  : "bg-white text-black border border-gray-300"
              }`}
            >
              ᠨᠢᢉᠡᠨ ᠤᠳᠠᠭ᠎ᠠ
            </button>
            <button
              onClick={() => handleDonationTypeChange("monthly")}
              className={`flex-1 px-4 py-3 text-center text-sm font-medium rounded-md ${
                donationType === "monthly"
                  ? "bg-yellow-500 text-black"
                  : "bg-white text-black border border-gray-300"
              }`}
            >
              ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ
            </button>
          </div>

          {/* Amount Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ᠳᠦᠨ *</label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {amountOptions.map((amountOption) => (
                <button
                  key={amountOption}
                  onClick={() => chooseDonation(amountOption)}
                  className={`border rounded-md p-3 text-sm ${
                    amount === amountOption.toString()
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 text-black bg-white hover:bg-gray-100"
                  }`}
                >
                  {amountOption.toLocaleString()}₮
                </button>
              ))}
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="ᠪᠤᠰᠤᠳ ᠳᠦᠨ"
              className="w-full border border-gray-300 rounded-md p-3 text-black"
            />
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">ᠨᠡᠷ᠎ᠡ *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full border rounded-md p-3 text-black ${
                  fullField && !firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
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
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ᠢᠮᠡᠶᠢᠯ *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border rounded-md p-3 text-black ${
                fullField && !email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ᠤᠲᠠᠰᠤᠨ *</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full border rounded-md p-3 text-black ${
                fullField && !phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ᠤᠯᠤᠰ</label>
            <select
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-black text-right"
            >
              {countryData.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <Button
            text={isLoading ? "ᠢᠯᠭᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ..." : "ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ"}
            onClick={handleDonate}
            disabled={isLoading}
            className={`w-full mb-4 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />

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
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">
            ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨ ᠳ᠋ᠤᠷ
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            ᠢᠷᢉᠡᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᠦᠨ᠎ᠡ ᠲᠡᠢ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ
            ᠣᠷᠤᠭᠤᠯᠵᠤ᠂ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠲᠠᠨ ᠳ᠋ᠤ ᠪᠠᠶᠠᠷᠯᠠᠯ᠎ᠠ᠃
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
