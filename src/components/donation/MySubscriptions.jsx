import Button from "@/components/common/Button";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MySubscriptions({ 
  userSubscriptions, 
  handleLogout,
  onUpdateSubscription,
  onCancelSubscription,
  onRefreshSubscriptions 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('mn-MN').format(amount) + '₮';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('mn-MN');
  };

  const handlePauseSubscription = async (subscriptionId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/donation/recurring/pause/${subscriptionId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('recurringDonationToken')}`,
          'Content-Type': 'application/json',
        },
      });
      
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
    <div className="hidden sm:block">
      {/* Desktop Version */}
      <div className="h-full flex gap-20 w-auto flex-shrink-0 mt-10">
        <div className="flex gap-16 p-8 m-4 h-full bg-[#48483D] text-white rounded-lg">
          <div className="flex gap-7">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠤᠨ ᠮᠡᠳᠡᠭᠦᠯᠡᠯ
            </h2>
            <p
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
              className="text-sm"
            >
              ᠲᠠᠨ ᠤ ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠢ ᠬᠠᠷᠤᠬᠤ ᠪᠠ ᠵᠠᠰᠠᠬᠤ
            </p>
          </div>

          {userSubscriptions.length > 0 ? (
            <div className="flex gap-7">
              <h2
                className="text-xl font-bold"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠲᠠᠨ ᠤ ᠬᠠᠨᠳᠢᠪ
              </h2>
              
              {userSubscriptions.map((subscription, index) => (
                <div key={index} className="flex gap-2">
                  <div className="bg-[#FFFF00] text-black p-4 rounded-lg">
                    <p
                      className="font-bold text-sm mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ: {formatAmount(subscription.amount)}
                    </p>
                    <p
                      className="text-xs mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      ᠴᠠᠷᠳ: ****{subscription.cardNumber?.slice(-4)}
                    </p>
                    <p
                      className="text-xs mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      ᠡᠬᠢᠯᠡᠯ: {formatDate(subscription.createdAt)}
                    </p>
                    <p
                      className="text-xs"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      ᠲᠦᠯᠦᠪ: {subscription.status === 'active' ? 'ᠢᠳᠡᠪᠬᠢᠲᠡᠢ' : subscription.status === 'paused' ? 'ᠵᠣᠭᠰᠣᠭᠠᠳ' : 'ᠴᠠᠷ᠎ᠠ'}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      text="ᠵᠠᠰᠠᠬᠤ"
                      className="text-black text-xs"
                      onClick={() => onUpdateSubscription(subscription.id)}
                      disabled={isLoading}
                    />
                    
                    {subscription.status === 'active' && (
                      <Button
                        text="ᠵᠣᠭᠰᠣᠬᠤᠯᠬᠤ"
                        className="text-black text-xs"
                        onClick={() => handlePauseSubscription(subscription.id)}
                        disabled={isLoading}
                      />
                    )}
                    
                    <Button
                      text="ᠴᠠᠷ᠎ᠠ"
                      className="text-black text-xs bg-red-500"
                      onClick={() => onCancelSubscription(subscription.id)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-7">
              <p
                className="text-lg"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠦᠭᠡᠢ ᠪᠠᠢᠨ᠎ᠠ
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-7">
            <h2
              className="text-xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠦᠵᠡᠯ
            </h2>
            
            <div className="flex flex-col gap-2">
              <Button
                text="ᠲᠦᠦᠬᠡ ᠬᠠᠷᠠᠬᠤ"
                className="text-black text-xs"
                onClick={() => {/* TODO: Show history */}}
              />
              
              <Button
                text="ᠰᠢᠨ᠎ᠡ ᠴᠠᠷᠳ ᠨᠡᠮᠡᠬᠦ"
                className="text-black text-xs"
                onClick={() => {/* TODO: Add card */}}
              />
              
              <Button
                text="ᠭᠠᠷᠬᠤ"
                className="text-black text-xs bg-red-200"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
