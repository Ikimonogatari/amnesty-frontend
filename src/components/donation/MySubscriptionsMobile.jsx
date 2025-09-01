import Button from "@/components/common/Button";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MySubscriptionsMobile({ 
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
    <div className="w-full min-h-screen bg-white md:hidden">
      <div className="p-4">
        <div className="bg-[#48483D] text-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">
            ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠤᠨ ᠮᠡᠳᠡᠭᠦᠯᠡᠯ
          </h2>

          <p className="text-sm mb-6 text-center">
            ᠲᠠᠨ ᠤ ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠢ ᠬᠠᠷᠤᠬᠤ ᠪᠠ ᠵᠠᠰᠠᠬᠤ
          </p>

          {userSubscriptions.length > 0 ? (
            <div className="space-y-4">
              {userSubscriptions.map((subscription, index) => (
                <div key={index} className="bg-[#FFFF00] text-black p-4 rounded-lg">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">
                      ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ
                    </h3>
                    <p className="text-2xl font-bold mb-2">
                      {formatAmount(subscription.amount)}
                    </p>
                    <div className="text-sm space-y-1">
                      <p>ᠴᠠᠷᠳ: ****{subscription.cardNumber?.slice(-4)}</p>
                      <p>ᠡᠬᠢᠯᠡᠯ: {formatDate(subscription.createdAt)}</p>
                      <p>ᠲᠦᠯᠦᠪ: {subscription.status === 'active' ? 'ᠢᠳᠡᠪᠬᠢᠲᠡᠢ' : subscription.status === 'paused' ? 'ᠵᠣᠭᠰᠣᠭᠠᠳ' : 'ᠴᠠᠷ᠎ᠠ'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      text="ᠵᠠᠰᠠᠬᠤ"
                      className="text-black text-sm bg-white"
                      onClick={() => onUpdateSubscription(subscription.id)}
                      disabled={isLoading}
                    />
                    
                    {subscription.status === 'active' && (
                      <Button
                        text="ᠵᠣᠭᠰᠣᠬᠤᠯᠬᠤ"
                        className="text-black text-sm bg-white"
                        onClick={() => handlePauseSubscription(subscription.id)}
                        disabled={isLoading}
                      />
                    )}
                    
                    <Button
                      text="ᠴᠠᠷ᠎ᠠ"
                      className="text-white text-sm bg-red-500"
                      onClick={() => onCancelSubscription(subscription.id)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg mb-4">
                ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠦᠭᠡᠢ ᠪᠠᠢᠨ᠎ᠠ
              </p>
              <p className="text-sm opacity-70">
                ᠰᠢᠨ᠎ᠡ ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠳᠣᠣᠰ ᠪᠦᠷᠳᠦᠭᠦᠯᠦᠬᠦ ᠲᠦ ᠳ᠋ᠤᠮᠳᠠᠳᠤ ᠲᠠᠯᠪᠠᠷ ᠢ ᠪᠦᠷᠳᠦᠯᠦᠨ᠎ᠡ
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <Button
              text="ᠲᠦᠦᠬᠡ ᠬᠠᠷᠠᠬᠤ"
              className="w-full text-black bg-white"
              onClick={() => {/* TODO: Show history */}}
            />
            
            <Button
              text="ᠰᠢᠨ᠎ᠡ ᠴᠠᠷᠳ ᠨᠡᠮᠡᠬᠦ"
              className="w-full text-black bg-white"
              onClick={() => {/* TODO: Add card */}}
            />
            
            <Button
              text="ᠭᠠᠷᠬᠤ"
              className="w-full text-white bg-red-500"
              onClick={handleLogout}
            />
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ</h3>
          <p className="text-sm text-gray-700 mb-4">
            ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠥᢉᢉᠦ ᠶᠢᠨ ᠠᠷᠭᠠ ᠵᠠᠮ ᠢ ᠲᠠᠨ ᠳ᠋ᠤ ᠮᠡᠳᠡᠭᠦᠯᠬᠦ ᠪᠣᠯᠣᠨ᠎ᠠ᠃ ᠲᠠᠨ ᠤ᠋ ᠬᠠᠷᠲ ᠢ ᠪᠦᠷᠳᠦᠯᠦᠨ᠎ᠡ ᠠᠦᠲᠣᠮᠠᠲ ᠬᠠᠨᠳᠢᠪ ᠢᠯᠡᢉᠡᠨ᠎ᠡ᠃
          </p>
          <p className="text-xs text-gray-600">
            ᠬᠣᠯᠪᠤᠭ᠎ᠠ: ᠤᠯᠠᠭᠠᠨᠪᠠᠭᠠᠲᠤᠷ ᠬᠣᠲᠠ᠂ ᠰᠦᢈᠡᠪᠠᠭᠠᠲᠤᠷ ᠳᠡᢉᠦᠷᢉᠡ᠂ ᠖-ᠷ ᠬᠣᠷᠢᠶ᠎ᠠ᠂ AB Center᠂ ᠗ ᠳᠠᠪᠬᠤᠷ
          </p>
        </div>
      </div>
    </div>
  );
}
