import Button from "@/components/common/Button";
import { countryData } from "@/utils/countryList";
import { toMongolianNumbers } from "@/utils/fetcher";
import Link from "next/link";

export default function DonationDesktop({
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
  const usageItems = [
    { color: "#FFFF00", value: 38, label: "ᠰᠤᠳᠤᠯᠭ᠎ᠠ᠂ ᢈᠡᠪᠯᠡᠯ" },
    { color: "#111111", value: 29, label: "ᠻᠣᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠥᠷᠨᠢᢉᠦᠯᢈᠦ" },
    { color: "#4B4B4B", value: 23, label: "ᠢᠳᠡᠪᢈᠢᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠢ᠋ ᠳᠡᠮᠵᠢᢈᠦ" },
    { color: "#9E9E9E", value: 9, label: "ᢈᠥᠷᠦᠩᢉᠡ ᠪᠣᠰᠬᠠᠬᠤ" },
    { color: "#C7C7C7", value: 3, label: "ᠵᠠᠰᠠᠭᠯᠠᠯ" },
  ];
  const usageSlices = [
    usageItems[4],
    usageItems[0],
    usageItems[1],
    usageItems[2],
    usageItems[3],
  ];
  const usageTotal = usageSlices.reduce((sum, item) => sum + item.value, 0);
  let usageAcc = 0;
  const usageGradient = usageSlices
    .map((item) => {
      const start = (usageAcc / usageTotal) * 100;
      usageAcc += item.value;
      const end = (usageAcc / usageTotal) * 100;
      return `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    })
    .join(", ");

  return (
    <div className="hidden sm:block h-screen">
      {/* Content Section */}
      <div className="h-full relative flex justify-center items-center w-full">
        <div className="p-4 h-full">
            <div
              className="h-full rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: "url('/mng/images/donate/header-img-donation.jpg')",
              }}
            >
              <div className="flex gap-8 h-full">
                <div className="flex h-full mr-auto bg-black/50 backdrop-blur-lg text-white w-full max-w-xs rounded-xl items-start justify-center p-16 overflow-hidden gap-10">
                  <h1
                    className="text-3xl font-bold font-mongolian text-center max-h-full overflow-y-auto break-words"
                    style={{
                      writingMode: "vertical-rl",
                    }}
                  >
                    ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ
                  </h1>
                  <h1
                    className="text-xl font-bold font-mongolian max-h-full overflow-y-auto break-words"
                    style={{
                      writingMode: "vertical-rl",
                    }}
                  >
                    ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠱᠢᠨ᠋ᠯ ᠨᠢ ᠠᠯᠢᠪᠠ ᠤᠯᠤᠰ ᠲᠥᠷᠦ ᠶ᠋ᠢᠨ ᠦᠵᠡᠯ ᠰᠤᠷᠲᠠᠯ᠂ ᠱᠠᠰᠢᠨ ᠰᠢᠲᠦᠯᢉᠡ ᠡᠴᠡ ᠬᠠᠷᠠᠭᠠᠲᠤ ᠪᠤᠰᠤ ᠪᠠᠷ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠪᠠᠨ 
                    ᠶᠠᠪᠤᠭᠤᠯᠳᠠᠭ ᠪᠥᢉᠡᠳ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠤ᠋ᠳ᠂ ᠤᠯᠤᠰ ᠲᠥᠷᠦ ᠶ᠋ᠢᠨ ᠨᠠᠮ ᠤ᠋ᠳ ᠠ᠋ᠴᠠ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ᠂ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᢈᠦ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠰᠠᠩᢈᠦᠵᠢᠯᠲᠡ ᠠᠪᠳᠠᠭ ᠦᢉᠡᠢ
                  </h1>
                </div>

                <div className="m-4 bg-[#48483D] text-white rounded-lg p-8 flex gap-7">
                  <h2
                    className="text-2xl font-bold"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ
                  </h2>

                  {/* Once/Monthly Toggle */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => handleDonationTypeChange("once")}
                    className={`px-4 py-3 text-sm font-medium rounded-md ${
                      donationType === "once"
                        ? "bg-yellow-500 text-black"
                        : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                    }`}
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᠨᠢᢉᠡᠨ ᠤᠳᠠᠭ᠎ᠠ
                  </button>
                  <button
                    onClick={() => handleDonationTypeChange("monthly")}
                    className={`px-4 py-3 text-sm font-medium rounded-md ${
                      donationType === "monthly"
                        ? "bg-yellow-500 text-black"
                        : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                    }`}
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ
                  </button>
                </div>

                {/* Amount Selection */}
                <div className="flex gap-2">
                  <p
                    className="text-sm"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᠳᠦᠨ*
                  </p>
                  <div className="flex flex-col gap-2">
                    {amountOptions.map((amountOption) => (
                      <button
                        key={amountOption}
                        onClick={() => chooseDonation(amountOption)}
                        className={`border rounded-md p-2 w-20 text-sm ${
                          amount === amountOption.toString()
                            ? "bg-[#FFFF00] text-black"
                            : "border-gray-300 text-black bg-white hover:bg-gray-100"
                        }`}
                        style={{
                          writingMode: "vertical-lr",
                        }}
                      >
                        {toMongolianNumbers(amountOption)}₮
                      </button>
                    ))}
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="ᠪᠤᠰᠤᠳ ᠳᠦᠨ"
                      className="border border-gray-300 rounded-md p-2 w-20 text-black"
                      style={{
                        writingMode: "vertical-lr",
                      }}
                    />
                  </div>
                </div>

                {/* First Name */}
                <div className="flex gap-2">
                  <p
                    className="text-sm"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᠨᠡᠷ᠎ᠡ*
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

                {/* Last Name */}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`border rounded-md p-2 w-20 text-black ${
                      fullField && !email ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  />
                </div>

                {/* Phone Number */}
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

                {/* Country Selection */}
                <div className="flex gap-2">
                  <p
                    className="text-sm"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᠤᠯᠤᠰ
                  </p>
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-20 text-black text-start"
                    style={{
                      writingMode: "vertical-lr",
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
                  <Button
                    text={isLoading ? "ᠢᠯᠭᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ..." : "ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ"}
                    onClick={handleDonate}
                    disabled={isLoading}
                    className={`text-black ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                </div>

                {/* Payment Status */}
                {invoiceData && !paid && (
                  <div className="flex gap-2">
                    <p
                      className="text-sm text-yellow-400"
                      style={{
                        writingMode: "vertical-lr",
                      }}
                    >
                      ᠲᠥᠯᠪᠦᠷᠢ ᠬᠦᠯᠢᠶᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ...
                    </p>
                    <Button
                      text="QPay"
                      onClick={handleQPay}
                      disabled={isLoading}
                      className="text-sm text-black"
                    />
                  </div>
                )}

                {/* QPay QR Code */}
                {qpayData && (
                  <div className="flex gap-2">
                    <p
                      className="text-sm"
                      style={{
                        writingMode: "vertical-lr",
                      }}
                    >
                      QR ᠬᠣᠳ
                    </p>
                    <div className="bg-white p-2 rounded w-32 h-32">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`data:image/png;base64,${qpayData.invoice?.gatewayPayload?.qr_image || qpayData.qrImage}`}
                        alt="QPay QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="h-full flex gap-12 px-8">
          <div className="flex gap-6 max-w-[420px] bg-[#F1F1F1] p-8">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠲᠠᠨ ᠳ᠋ᠤ ᠪᠠᠶᠠᠷᠯᠠᠯ᠎ᠠ!
            </h2>
            <p
              className="text-sm"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᠦᠨ᠎ᠡ ᠲᠡᠢ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ ᠣᠷᠤᠭᠤᠯᠵᠤ᠂ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠲᠠᠨ ᠳ᠋ᠤ ᠪᠠᠶᠠᠷᠯᠠᠯ᠎ᠠ᠃  
              ᠶᠠᠭ ᠲᠠᠨᠢ ᠰᠢᠭ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠰᠠᠨᠠᠭ᠎ᠠ ᠲᠠᠯᠪᠢᠵᠤ᠂ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ ᠣᠷᠤᠭᠤᠯᠳᠠᠭ ᢈᠦᠮᠦᠰ ᠦ᠋ᠨ ᠬᠠᠨᠳᠢᠪ ᠢ᠋ᠶᠠᠷ ᠡᠮᠨᠧᠰᠲ᠋ᠢ 
              ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯ ᠦ᠋ᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠰᠠᠩᢈᠦᠵᠢᠳᠡᢉ᠃  ᠪᠢᠳᠡ ᠲᠠᠨ ᠤ᠋ ᠲᠥᠯᠦᢉᠰᠡᠨ ᠬᠠᠨᠳᠢᠪ ᠢ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠢ᠋ 
              ᠪᠤᠰᠤᠳ ᠲᠤ ᠲᠦᢉᠡᢉᠡᠵᠦ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ᠂ ᠬᠠᠮᠠᠭᠠᠯᠠᠳᠠᠭ ᢈᠦᠮᠦᠰ ᠢ᠋ ᠪᠡᠯᠡᠳᢈᠡᢈᠦ ᠳ᠋ᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ 
              ᠵᠣᠷᠢᠭᠲᠠᠨ ᠨᠤᠭᠤᠳ ᠤ᠋ᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠶ᠋ᠢ ᠳᠡᠮᠵᠢᢈᠦ ᠳ᠋ᠦ᠂ ᠦᠵᠡᠯ ᠪᠣᠳᠤᠯ ᠢ᠋ᠶᠠᠨ ᠢᠯᠡᠷᢈᠡᠶᠢᠯᠡᢈᠦ ᠡᠷᢈᠡ᠂ ᠢᠷᢉᠡᠨ ᠦ᠋ ᠨᠡᠶᠢᢉᠡᠮ ᠦ᠋ᠨ ᠣᠷᠤᠨ ᠵᠠᠢ ᠶ᠋ᠢ 
              ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ᠂ ᠠᠭᠤᠷ ᠠᠮᠢᠰᠬᠤᠯ ᠤ᠋ᠨ ᠰᠢᠳᠤᠷᠭᠤ ᠶᠣᠰᠤ ᠶ᠋ᠢ ᠱᠠᠭᠠᠷᠳᠠᠬᠤ ᠳ᠋ᠤ ᠵᠣᠷᠢᠭᠤᠯᠬᠤ ᠪᠣᠯᠤᠨ᠎ᠠ᠃
            </p>
          </div>
          <div className="flex gap-6 max-w-[420px] bg-white p-8">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠲᠠᠨ ᠤ᠋ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠬᠠᠨᠳᠢᠪ ᠳᠠᠷᠠᠭᠠᢈᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠢ᠋ᠶᠠᠷ ᠵᠠᠷᠤᠴᠠᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ᠃
            </h2>
            <p
              className="text-sm"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠲᠠᠨ ᠤ᠋ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠬᠠᠨᠳᠢᠪ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠤᠯᠤᠰ ᠣᠷᠤᠨ ᠨᠤᠭᠤᠳ ᠲᠤ ᠪᠣᠯᠵᠤ ᠪᠤᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠢ᠋ ᠪᠠᠷᠢᠮᠲᠠᠵᠢᠭᠤᠯᠬᠤ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᠵᠦ᠂ 
              ᠨᠥᠯᠦᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠠᠵᠢᠯ᠂ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠢᠳᠡᠪᢈᠢᠨ ᠨᠦ᠋ᢉᠦᠳ ᠢ᠋ ᠳᠡᠮᠵᠢᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠲᠦᢉᠡᢉᠡᢈᠦ 
              ᠰᠤᠷᠭᠠᠯᠲᠠ᠂ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠬᠤ ᠳ᠋ᠤ ᠵᠠᠷᠤᠴᠠᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ᠃  ᠪᠢᠳᠡ ᠲᠠᠨ ᠤ᠋ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᢉᠡᠢ ᠪᠡᠷ ᠡᠨᠡ ᠠᠵᠢᠯ ᠢ᠋ ᢈᠢᠵᠦ ᠴᠢᠳᠠᠬᠤ ᠦᢉᠡᠢ᠃  
              ᠲᠠ ᠲᠠᠶᠢᠯᠤᠨ ᢈᠡᠰᠡᢉ ᠡᠴᠡ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠪᠣᠯᠤᠨ ᠰᠠᠩᢈᠦᠦ ᠶ᠋ᠢᠨ ᠲᠠᠶᠢᠯᠤᠨ ᠲᠠᠢ ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ ᠲᠠᠨᠢᠯᠴᠠᠭᠠᠷᠠᠢ᠃
            </p>
          </div>
          <div className="flex gap-4 max-w-[420px] p-8">
            <Link href={"/about/3"}>
              <div
                className="bg-[#FFFF00] text-black text-xs font-bold px-2 py-2 rounded h-20 flex items-center justify-center"
                style={{ writingMode: "vertical-lr" }}
              >
                ᠲᠠᠶᠢᠯᠤᠨ
              </div>
            </Link>
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨ ᠦ᠋ᠯ ᠦ᠋ᠨ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ ᠣᠷᠤᠭᠤᠯᠵᠤ ᠪᠣᠯᠬᠤ ᠪᠤᠰᠤᠳ ᠠᠷᠭ᠎ᠠ ᠶ᠋ᠢ ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ ᠤᠩᠰᠢᠭᠠᠷᠠᠢ᠃
            </h2>
            <p
              className="text-sm"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠲᠡᠢ ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠲᠠᠢ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠢ᠋ᠶᠠᠷ ᠗᠐᠐᠐-᠔᠗᠐᠖ ᠤᠲᠠᠰᠤ ᠪᠠᠷ ᠬᠣᠯᠪᠤᠭᠳᠠᠵᠤ ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠠᠪᠤᠭᠠᠷᠠᠢ᠃
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 m-4">
            <div
              className="relative w-44 h-44 rounded-full"
              style={{
                backgroundImage: `conic-gradient(${usageGradient})`,
              }}
            >
              <div className="absolute inset-6 rounded-full bg-white"></div>
            </div>
            <div className="flex gap-6 items-start">
              {usageItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-2 items-center">
                  <span
                    className={`px-1 py-3 rounded-sm mt-1 text-xs font-bold ${item.color === "#111111" ? 'text-white' : 'text-black'}`}
                    style={{ 
                      backgroundColor: item.color,
                      writingMode: "vertical-lr",
                    }}
                  >{toMongolianNumbers(item.value)}%</span>
                  <div className="flex flex-col gap-1">
                    <div
                      className="text-xs"
                      style={{
                        writingMode: "vertical-lr",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6 bg-[#F1F1F1] p-6 rounded-lg w-full max-w-[600px]">
            {[
              { title: "ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠪᠤᠰᠤᠳ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ", description: "ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠦ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᠵᠡᢉᠦᠯᢈᠦ ᠮᠠᠰᠢ ᠣᠯᠠᠨ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ ᠪᠤᠢ᠃", href: "/donate/gift" },
              { title: "ᠬᠠᠨᠳᠢᠪ ᠤ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷᢈᠢ ᠲᠦᢉᠡᠮᠡᠯ ᠠᠰᠠᠭᠤᠯᠲᠠ ᠨᠤᠭᠤᠳ", description: "ᠲᠠᠨ ᠤ᠋ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠬᠠᠨᠳᠢᠪ ᠮᠠᠨ ᠤ᠋ ᠰᠤᠳᠤᠯᠭᠠᠨ ᠤ᠋ ᠪᠠᠭ ᠤ᠋ᠳ ᠲᠤ ᢈᠦᠮᠦᠨ ᠦ᠋ ​​ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠳᠠᠯᠳᠠ ᠵᠥᠷᠢᠴᠡᠯ ᠢ᠋ ᠢᠯᠡᠷᠡᢉᠦᠯᢈᠦ ᠳ᠋ᠦ ᠲᠤᠰᠠᠯᠠᠬᠤ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᢉᠡᠳ ᠡᠷᢈᠡ ᠮᠡᠳᠡᠯᠲᠡᠢ ᢈᠦᠮᠦᠰ ᠢ᠋ ᠡᠰᠡᠷᢉᠦᠴᠡᢈᠦ ᠠᠮᠢᠨ ᠴᠢᠬᠤᠯᠠ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ᠂ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠢ᠋ ᠰᠠᠩᢈᠦᠵᠢᢉᠦᠯᠳᠡᢉ᠃", href: "/donate/questions" },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 min-h-[400px] w-full bg-white border border-[#E3E3E3] rounded-lg p-6 items-stretch justify-between">
                <div className="flex gap-4">
                  {/* Title */}
                  <h2
                    className="text-lg font-bold" // Removed whitespace-nowrap
                    style={{ 
                      writingMode: "vertical-lr",
                      maxHeight: "340px", // Match the description limit
                      overflow: "hidden",
                      textOverflow: "ellipsis" 
                    }}
                  >
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="text-sm text-gray-700 leading-relaxed"
                    style={{
                      writingMode: "vertical-lr",
                      // We use 'max-height' to limit line length 
                      // and 'max-width' to limit the number of lines
                      maxHeight: "340px", 
                      maxWidth: "250px",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Button */}
                <Link href={item.href}>
                  <button
                    type="button"
                    className="border border-gray-500 rounded-md px-3 py-2 text-xs text-black bg-white hover:bg-gray-50 transition-colors"
                    style={{ writingMode: "vertical-lr" }}
                  >
                    ᠴᠠᠭᠠᠰᠢ ᠤᠩᠰᠢᠬᠤ
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
