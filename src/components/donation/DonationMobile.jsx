import Button from "@/components/common/Button";
import { countryData } from "@/utils/countryList";
import StaticHeader from "../common/StaticHeader";
import { toMongolianNumbers } from "@/utils/fetcher";
import Link from "next/link";

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

  // Payment states
  isLoading,
  invoiceData,
  qpayData,
  paid,

  // Error handling
  fullField,

  // Functions
  chooseDonation,
  handleDonate,
  handleQPay,
  handleDonationTypeChange,
}) {
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
    <div className="w-full min-h-screen bg-white md:hidden">
      <StaticHeader
        image="/mng/images/donate/header-img-donation.jpg"
        alt="Donation Page Header"
        width="100%"
        title="ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ"
        // desc="ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠱᠢᠨ᠋ᠯ ᠨᠢ ᠠᠯᠢᠪᠠ ᠤᠯᠤᠰ ᠲᠥᠷᠦ ᠶ᠋ᠢᠨ ᠦᠵᠡᠯ ᠰᠤᠷᠲᠠᠯ᠂ ᠱᠠᠰᠢᠨ ᠰᠢᠲᠦᠯᢉᠡ ᠡᠴᠡ ᠬᠠᠷᠠᠭᠠᠲᠤ ᠪᠤᠰᠤ ᠪᠠᠷ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠪᠠᠨ ᠶᠠᠪᠤᠭᠤᠯᠳᠠᠭ ᠪᠥᢉᠡᠳ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠤ᠋ᠳ᠂ ᠤᠯᠤᠰ ᠲᠥᠷᠦ ᠶ᠋ᠢᠨ ᠨᠠᠮ ᠤ᠋ᠳ ᠠ᠋ᠴᠠ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ᠂ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᢈᠦ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠰᠠᠩᢈᠦᠵᠢᠯᠲᠡ ᠠᠪᠳᠠᠭ ᠦᢉᠡᠢ᠃  ᠡᠶᠢᠮᠦ ᠡᠴᠡ ᠲᠠᠨ ᠤ᠋ ᠬᠠᠨᠳᠢᠪ ᠪᠢᠳᠡᠨ ᠦ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ ᠮᠠᠰᠢ ᠴᠢᠬᠤᠯᠠ ᠶᠠᠭᠤᠮ᠎ᠠ᠃"
      />

      <div className="bg-[#48483D] text-white rounded-lg p-6 m-4">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-row gap-2">
            <h2
              className="text-sm font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ
            </h2>
            <p
              className="text-sm font-bold"
              style={{
                writingMode: "vertical-lr",
                maxHeight: "150px",
              }}
            >
              ᠶᠠᠭ ᠣᠳᠤ ᠪᠢᠳᠡᠨ ᠳ᠋ᠦ ᠬᠠᠨᠳᠢᠪ ᠢᠯᠡᢉᠡᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠡᠷᢈᠡ ᠪᠡᠨ ᠡᠳ᠋ᠯᠡᠳᠡᢉ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢ ᠪᠦᠲᠦᢉᠡᢈᠦ ᠳ᠋ᠦ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ᠃
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleDonationTypeChange("once")}
              className={`rounded-[8px] px-2 py-3 text-xs font-bold ${
                donationType === "once"
                  ? "bg-[#FFFF00] text-black"
                  : "bg-white text-black border border-gray-300"
              }`}
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠨᠢᢉᠡᠨ ᠤᠳᠠᠭ᠎ᠠ
            </button>
            <button
              onClick={() => handleDonationTypeChange("monthly")}
              className={`rounded-[8px] px-2 py-3 text-xs font-bold ${
                donationType === "monthly"
                  ? "bg-[#FFFF00] text-black"
                  : "bg-white text-black border border-gray-300"
              }`}
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ
            </button>
          </div>
        </div>

        <div className="flex gap-4 w-full mt-4">
          <div className="flex gap-2 overflow-x-auto w-full">
            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠳᠦᠨ*
              </p>
              <div className="flex gap-2">
                {amountOptions.map((amountOption) => (
                  <button
                    key={amountOption}
                    onClick={() => chooseDonation(amountOption)}
                    className={`border rounded-md p-2 w-16 text-xs ${
                      amount === amountOption.toString()
                        ? "bg-[#FFFF00] text-black border-[#FFFF00]"
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
                  className="border border-gray-300 rounded-md p-2 w-16 text-xs text-black"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <p
                className="text-xs"
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
                className={`border rounded-md p-2 w-16 text-xs text-black ${
                  fullField && !firstName ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

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
                className={`border rounded-md p-2 w-16 text-xs text-black ${
                  fullField && !lastName ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

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
                className={`border rounded-md p-2 w-16 text-xs lowercase text-black ${
                  fullField && !email ? "border-red-500" : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

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
                className={`border rounded-md p-2 w-16 text-xs text-black ${
                  fullField && !phoneNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </div>

            <div className="flex gap-2">
              <p
                className="text-xs"
                style={{
                  writingMode: "vertical-lr",
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
                }}
              >
                {countryData.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDonate}
                disabled={isLoading}
                className={`bg-[#FFFF00] rounded-[8px] px-2 py-3 text-xs font-bold text-black ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {isLoading ? "ᠢᠯᠭᠡᠵᠦ ᠪᠠᠢᠨ᠎ᠠ..." : "ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ"}
              </button>
            </div>
          </div>
        </div>

        {invoiceData && !paid && (
          <div className="flex gap-2 mt-4">
            <p
              className="text-xs text-yellow-300"
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
              className="text-black text-xs"
            />
          </div>
        )}

        {qpayData && (
          <div className="flex gap-2 mt-4">
            <p
              className="text-xs"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              QR ᠬᠣᠳ
            </p>
            <div className="bg-white p-2 rounded w-28 h-28">
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

      <div className="bg-gray-100 p-6 m-4 rounded-lg">
        <div className="flex flex-row gap-2 max-h-[300px]">
          <h3
            className="text-lg font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠲᠠᠨ ᠳ᠋ᠤ ᠪᠠᠶᠠᠷᠯᠠᠯ᠎ᠠ!
          </h3>
          <p
            className="text-sm text-gray-700 overflow-x-auto"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᠦᠨ᠎ᠡ ᠲᠡᠢ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ ᠣᠷᠤᠭᠤᠯᠵᠤ᠂ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠲᠠᠨ ᠳ᠋ᠤ ᠪᠠᠶᠠᠷᠯᠠᠯ᠎ᠠ᠃  
            ᠶᠠᠭ ᠲᠠᠨᠢ ᠰᠢᠭ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠰᠠᠨᠠᠭ᠎ᠠ ᠲᠠᠯᠪᠢᠵᠤ᠂ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ ᠣᠷᠤᠭᠤᠯᠳᠠᠭ ᢈᠦᠮᠦᠰ ᠦ᠋ᠨ ᠬᠠᠨᠳᠢᠪ ᠢ᠋ᠶᠠᠷ ᠡᠮᠨᠧᠰᠲ᠋ᠢ 
            ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯ ᠦ᠋ᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠰᠠᠩᢈᠦᠵᠢᠳᠡᢉ᠃  ᠪᠢᠳᠡ ᠲᠠᠨ ᠤ᠋ ᠲᠥᠯᠦᢉᠰᠡᠨ ᠬᠠᠨᠳᠢᠪ ᠢ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠢ᠋ ᠪᠤᠰᠤᠳ ᠲᠤ 
            ᠲᠦᢉᠡᢉᠡᠵᠦ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ᠂ ᠱᠠᠭᠠᠷᠳᠠᠳᠠᠭ᠂ ᠬᠠᠮᠠᠭᠠᠯᠠᠳᠠᠭ ᢈᠦᠮᠦᠰ ᠢ᠋ ᠪᠡᠯᠡᠳᢈᠡᢈᠦ ᠳ᠋ᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ ᠵᠣᠷᠢᠭᠲᠠᠨ ᠨᠤᠭᠤᠳ ᠤ᠋ᠨ 
            ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠶ᠋ᠢ ᠳᠡᠮᠵᠢᢈᠦ ᠳ᠋ᠦ᠂ ᠦᠵᠡᠯ ᠪᠣᠳᠤᠯ ᠢ᠋ᠶᠠᠨ ᠢᠯᠡᠷᢈᠡᠶᠢᠯᠡᢈᠦ ᠡᠷᢈᠡ᠂ ᠢᠷᢉᠡᠨ ᠦ᠋ ᠨᠡᠶᠢᢉᠡᠮ ᠦ᠋ᠨ ᠣᠷᠤᠨ ᠵᠠᠢ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ᠂ ᠠᠭᠤᠷ 
            ᠠᠮᠢᠰᠬᠤᠯ ᠤ᠋ᠨ ᠰᠢᠳᠤᠷᠭᠤ ᠶᠣᠰᠤ ᠶ᠋ᠢ ᠱᠠᠭᠠᠷᠳᠠᠬᠤ ᠳ᠋ᠤ ᠵᠣᠷᠢᠭᠤᠯᠬᠤ ᠪᠣᠯᠤᠨ᠎ᠠ᠃
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white p-4 m-4 rounded-lg border border-gray-200">
        <div className="flex gap-4 overflow-x-auto">
          <h2
            className="text-sm font-bold" // Removed whitespace-nowrap
            style={{ 
              writingMode: "vertical-lr",
              maxHeight: "340px", // Match the description limit
              overflow: "hidden",
              textOverflow: "ellipsis" 
            }}
          >
            ᠲᠠᠨ ᠤ᠋ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠬᠠᠨᠳᠢᠪ ᠳᠠᠷᠠᠭᠠᢈᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠢ᠋ᠶᠠᠷ ᠵᠠᠷᠤᠴᠠᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ᠃
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
              overflow: "auto",
              textOverflow: "ellipsis"
            }}
          >
            ᠲᠠᠨ ᠤ᠋ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠬᠠᠨᠳᠢᠪ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠤᠯᠤᠰ ᠣᠷᠤᠨ ᠨᠤᠭᠤᠳ ᠲᠤ ᠪᠣᠯᠵᠤ ᠪᠤᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠢ᠋ ᠪᠠᠷᠢᠮᠲᠠᠵᠢᠭᠤᠯᠬᠤ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᢈᠢᠵᠦ᠂ 
            ᠨᠥᠯᠦᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠠᠵᠢᠯ᠂ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠢᠳᠡᠪᢈᠢᠨ ᠨᠦ᠋ᢉᠦᠳ ᠢ᠋ ᠳᠡᠮᠵᠢᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠲᠦᢉᠡᢉᠡᢈᠦ 
            ᠰᠤᠷᠭᠠᠯᠲᠠ᠂ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠬᠤ ᠳ᠋ᠤ ᠵᠠᠷᠤᠴᠠᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ᠃  ᠪᠢᠳᠡ ᠲᠠᠨ ᠤ᠋ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᢉᠡᠢ ᠪᠡᠷ ᠡᠨᠡ ᠠᠵᠢᠯ ᠢ᠋ ᢈᠢᠵᠦ ᠴᠢᠳᠠᠬᠤ ᠦᢉᠡᠢ᠃ 
              ᠲᠠ ᠲᠠᠶᠢᠯᠤᠨ ᢈᠡᠰᠡᢉ ᠡᠴᠡ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠪᠣᠯᠤᠨ ᠰᠠᠩᢈᠦᠦ ᠶ᠋ᠢᠨ ᠲᠠᠶᠢᠯᠤᠨ ᠲᠠᠢ ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ ᠲᠠᠨᠢᠯᠴᠠᠭᠠᠷᠠᠢ᠃
          </p>
        </div>
        
        <div className="flex gap-3 justify-between">
          <div className="flex flex-col items-center gap-3">
            <div
              className="relative w-24 h-24 rounded-full"
              style={{
                backgroundImage: `conic-gradient(${usageGradient})`,
              }}
            >
              <div className="absolute inset-3 rounded-full bg-white"></div>
            </div>

            <div className="flex flex-row gap-4 items-start">
              {usageItems.map((item) => (
                <div key={item.label} className="flex gap-2 items-start">
                  <span
                    className="w-2 h-2 rounded-sm mt-1"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <div className="flex flex-col gap-1">
                    <div
                      className="text-[10px] text-black"
                      style={{
                        writingMode: "vertical-lr",
                      }}
                    >
                      {toMongolianNumbers(item.value)}%
                    </div>
                    <div
                      className="text-[10px] text-black"
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
          <Link href={"/about/3"}>
            <div
              className="bg-[#FFFF00] text-black text-xs font-bold px-2 py-2 rounded h-20 flex items-center justify-center"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠲᠠᠶᠢᠯᠤᠨ
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-gray-100 p-6 m-4 rounded-lg">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            {[
              { title: "ᠬᠠᠨᠳᠢᠪ ᠥᢉᢈᠦ ᠪᠤᠰᠤᠳ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ", description: "ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠦ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᠵᠡᢉᠦᠯᢈᠦ ᠮᠠᠰᠢ ᠣᠯᠠᠨ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ ᠪᠤᠢ᠃", href: "/donate/gift" },
              { title: "ᠬᠠᠨᠳᠢᠪ ᠤ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷᢈᠢ ᠲᠦᢉᠡᠮᠡᠯ ᠠᠰᠠᠭᠤᠯᠲᠠ ᠨᠤᠭᠤᠳ", description: "ᠲᠠᠨ ᠤ᠋ ᠥᢉᢉᠦᢉᠰᠡᠨ ᠬᠠᠨᠳᠢᠪ ᠮᠠᠨ ᠤ᠋ ᠰᠤᠳᠤᠯᠭᠠᠨ ᠤ᠋ ᠪᠠᠭ ᠤ᠋ᠳ ᠲᠤ ᢈᠦᠮᠦᠨ ᠦ᠋ ​​ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠳᠠᠯᠳᠠ ᠵᠥᠷᠢᠴᠡᠯ ᠢ᠋ ᠢᠯᠡᠷᠡᢉᠦᠯᢈᠦ ᠳ᠋ᠦ ᠲᠤᠰᠠᠯᠠᠬᠤ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᢉᠡᠳ ᠡᠷᢈᠡ ᠮᠡᠳᠡᠯᠲᠡᠢ ᢈᠦᠮᠦᠰ ᠢ᠋ ᠡᠰᠡᠷᢉᠦᠴᠡᢈᠦ ᠠᠮᠢᠨ ᠴᠢᠬᠤᠯᠠ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ᠂ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠢ᠋ ᠰᠠᠩᢈᠦᠵᠢᢉᠦᠯᠳᠡᢉ᠃", href: "/donate/questions" },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 max-h-[300px] w-full bg-white border border-[#E3E3E3] rounded-lg p-6 items-stretch justify-between">
                <div className="flex gap-4">
                  <h2
                    className="text-sm font-bold" // Removed whitespace-nowrap
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
                <Link href={item.href}>
                  <button
                    type="button"
                    className="border border-gray-400 rounded-sm px-2 py-1 text-[10px] text-black"
                    style={{
                      writingMode: "vertical-lr",
                    }}
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
