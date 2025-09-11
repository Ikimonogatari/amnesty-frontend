import Button from "@/components/common/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatCurrency, formatDate as formatDateUtil } from "@/utils/locale";

export default function MySubscriptionsMobile({
  userSubscriptions,
  handleLogout,
  onUpdateSubscription,
  onCancelSubscription,
  onRefreshSubscriptions,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const formatAmount = (amount) => {
    return formatCurrency(amount);
  };

  const formatDate = (dateString) => {
    return formatDateUtil(dateString);
  };

  const handlePauseSubscription = async (subscriptionId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/donation/recurring/pause/${subscriptionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "recurringDonationToken"
            )}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠢ ᠵᠣᠭᠰᠣᠬᠤᠯᠠᠪᠠ!");
        onRefreshSubscriptions();
      } else {
        toast.error(data.message || "ᠵᠣᠭᠰᠣᠬᠤᠯᠬᠤᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ");
      }
    } catch (error) {
      toast.error("ᠵᠣᠭᠰᠣᠬᠤᠯᠬᠤᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white md:hidden">
      {/* Subscription Management */}
      <div className="bg-[#48483D] text-white rounded-lg p-6 m-4">
        {/* Traditional Mongolian Header */}
        <div className="flex justify-center mb-6">
          <h2
            className="text-2xl font-bold text-center"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              minHeight: "120px",
            }}
          >
            ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠤᠨ ᠮᠡᠳᠡᠭᠦᠯᠡᠯ
          </h2>
        </div>

        {/* Description */}
        <div className="flex justify-center mb-6">
          <p
            className="text-sm text-center"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              minHeight: "80px",
            }}
          >
            ᠲᠠᠨ ᠤ ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠢ ᠬᠠᠷᠤᠬᠤ ᠪᠠ ᠵᠠᠰᠠᠬᠤ
          </p>
        </div>

        {userSubscriptions.length > 0 ? (
          <div className="space-y-6">
            {userSubscriptions.map((subscription, index) => (
              <div
                key={index}
                className="bg-[#FFFF00] text-black p-4 rounded-lg"
              >
                {/* Subscription Details in Traditional Mongolian Style */}
                <div className="flex justify-center gap-6 mb-4">
                  {/* Amount */}
                  <div className="flex flex-col items-center">
                    <p
                      className="text-sm font-medium mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        minHeight: "40px",
                      }}
                    >
                      ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ
                    </p>
                    <p
                      className="text-lg font-bold"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        minHeight: "60px",
                      }}
                    >
                      {formatAmount(subscription.amount)}
                    </p>
                  </div>

                  {/* Card */}
                  <div className="flex flex-col items-center">
                    <p
                      className="text-sm font-medium mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        minHeight: "40px",
                      }}
                    >
                      ᠴᠠᠷᠳ
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        minHeight: "60px",
                      }}
                    >
                      ****{subscription.cardNumber?.slice(-4) || "0000"}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col items-center">
                    <p
                      className="text-sm font-medium mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        minHeight: "40px",
                      }}
                    >
                      ᠡᠬᠢᠯᠡᠯ
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        minHeight: "60px",
                      }}
                    >
                      {formatDate(subscription.createdAt)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-center">
                    <p
                      className="text-sm font-medium mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        minHeight: "40px",
                      }}
                    >
                      ᠲᠦᠯᠦᠪ
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                        minHeight: "60px",
                      }}
                    >
                      {subscription.status === "active"
                        ? "ᠢᠳᠡᠪᠬᠢᠲᠡᠢ"
                        : subscription.status === "paused"
                        ? "ᠵᠣᠭᠰᠣᠭᠠᠳ"
                        : "ᠴᠠᠷ᠎ᠠ"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-2">
                  <Button
                    text="ᠵᠠᠰᠠᠬᠤ"
                    className="text-black text-sm bg-white px-3 py-1"
                    onClick={() => onUpdateSubscription(subscription.id)}
                    disabled={isLoading}
                  />

                  {subscription.status === "active" && (
                    <Button
                      text="ᠵᠣᠭᠰᠣᠬᠤᠯᠬᠤ"
                      className="text-black text-sm bg-white px-3 py-1"
                      onClick={() => handlePauseSubscription(subscription.id)}
                      disabled={isLoading}
                    />
                  )}

                  <Button
                    text="ᠴᠠᠷ᠎ᠠ"
                    className="text-white text-sm bg-red-500 px-3 py-1"
                    onClick={() => onCancelSubscription(subscription.id)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <div className="text-center">
              <p
                className="text-lg mb-4"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                  minHeight: "80px",
                }}
              >
                ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠦᠭᠡᠢ ᠪᠠᠢᠨ᠎ᠠ
              </p>
            </div>
          </div>
        )}

        {/* Management Buttons */}
        <div className="mt-6 flex justify-center gap-3">
          <Button
            text="ᠲᠦᠦᠬᠡ ᠬᠠᠷᠠᠬᠤ"
            className="text-black bg-white text-sm px-4 py-2"
            onClick={() => {
              /* TODO: Show history */
            }}
          />

          <Button
            text="ᠰᠢᠨ᠎ᠡ ᠴᠠᠷᠳ ᠨᠡᠮᠡᠬᠦ"
            className="text-black bg-white text-sm px-4 py-2"
            onClick={() => {
              /* TODO: Add card */
            }}
          />

          <Button
            text="ᠭᠠᠷᠬᠤ"
            className="text-white bg-red-500 text-sm px-4 py-2"
            onClick={handleLogout}
          />
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-gray-100 p-6 m-4 rounded-lg">
        <div className="flex justify-center mb-4">
          <h3
            className="text-lg font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              minHeight: "80px",
            }}
          >
            ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ
          </h3>
        </div>
        <div className="flex justify-center mb-4">
          <p
            className="text-sm text-gray-700 text-center max-w-xs"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              minHeight: "120px",
            }}
          >
            ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ ᠶᠢᠨ ᠠᠷᠭᠠ ᠵᠠᠮ ᠢ ᠲᠠᠨ ᠳ᠋ᠤ ᠮᠡᠳᠡᠭᠦᠯᠬᠦ ᠪᠣᠯᠣᠨ᠎ᠠ᠃
            ᠲᠠᠨ ᠤ᠋ ᠬᠠᠷᠲ ᠢ ᠪᠦᠷᠳᠦᠯᠦᠨ᠎ᠡ ᠠᠦᠲᠣᠮᠠᠲ ᠬᠠᠨᠳᠢᠪ ᠢᠯᠡᢉᠡᠨ᠎ᠡ᠃
          </p>
        </div>
        <div className="flex justify-center">
          <p
            className="text-xs text-gray-600 text-center max-w-xs"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              minHeight: "60px",
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
