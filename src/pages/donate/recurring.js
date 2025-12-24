import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import RecurringDonationDesktop from "@/components/donation/RecurringDonationDesktop";
import RecurringDonationMobile from "@/components/donation/RecurringDonationMobile";
import MySubscriptions from "@/components/donation/MySubscriptions";
import MySubscriptionsMobile from "@/components/donation/MySubscriptionsMobile";
import { donationService } from "@/services/userApiService";
import { getCountryByCode } from "@/utils/countryList";
import toast from "react-hot-toast";

export default function RecurringDonation() {
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pan, setPan] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [fullField, setFullField] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginVerifyCode, setLoginVerifyCode] = useState("");
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [loginTimeLeft, setLoginTimeLeft] = useState(0);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  // Send email verification code
  const sendEmailVerification = async () => {
    if (!email || email.trim() === "") {
      toast.error("ᠢ᠋ᠮᠧᠢᠯ ᠬᠠᠶᠠᠭ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("ᠢ᠋ᠮᠧᠢᠯ ᠬᠠᠶᠠᠭ ᠤᠨ ᠹᠣᠷᠮᠠᠲ ᠪᠤᠷᠤᠤ ᠪᠠᠢᠨ᠎ᠠ!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await donationService.recurring.verifyEmail(email);
      if (response.success) {
        toast.success("ᠪᠠᠳᠤᠯᠠᠯᠲᠠ ᠶᠢᠨ ᠬᠣᠳ ᠢᠯᠭᠡᠭᠡᠭᠦᠯᠦᠭᠡ!");
        setTimeLeft(60); // Start 60 second countdown
      } else {
        toast.error(response.message || "ᠬᠣᠳ ᠢᠯᠭᠡᠭᠡᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ");
      }
    } catch (error) {
      toast.error(error.message || "ᠬᠣᠳ ᠢᠯᠭᠡᠭᠡᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle recurring donation submission
  const handleRecurringDonation = async () => {
    // Validation
    if (!firstName || firstName.trim() === "") {
      toast.error("ᠨᠡᠷᠡ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      setFullField(true);
      return;
    }

    if (!lastName || lastName.trim() === "") {
      toast.error("ᠣᠪᠤᠭ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      setFullField(true);
      return;
    }

    if (!email || email.trim() === "") {
      toast.error("ᠢᠮᠡᠶᠢᠯ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      setFullField(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("ᠢᠮᠡᠶᠢᠯ ᠤᠨ ᠹᠣᠷᠮᠠᠲ ᠪᠤᠷᠤᠤ ᠪᠠᠢᠨ᠎ᠠ!");
      setFullField(true);
      return;
    }

    if (!phoneNumber || phoneNumber.trim() === "") {
      toast.error("ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳᠤᠭᠠᠷ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      setFullField(true);
      return;
    }

    if (phoneNumber.length !== 8) {
      toast.error("ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳᠤᠭᠠᠷ 8 ᠣᠷᠣᠨ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ!");
      setFullField(true);
      return;
    }

    if (!pan || pan.length !== 16) {
      toast.error("ᠬᠠᠷᠲ ᠤᠨ ᠳᠤᠭᠠᠷ 16 ᠣᠷᠣᠨ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ!");
      setFullField(true);
      return;
    }

    if (!verifyCode || verifyCode.length !== 6) {
      toast.error("ᠪᠠᠲᠠᠯᠭᠠᠠᠵᠤᠭᠤᠯᠬᠤ ᠬᠣᠳ 6 ᠣᠷᠣᠨ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ!");
      setFullField(true);
      return;
    }

    // Clear previous errors
    setFullField(false);

    setIsLoading(true);
    try {
      const response = await donationService.recurring.register({
        firstName,
        lastName,
        email,
        phone: phoneNumber,
        pan,
        verifyCode,
      });

      if (response.success) {
        toast.success("ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠪᠦᠷᠳᠦᢉᠬᠦᢉᠦᠯᠦᠭᠡ!");
        if (response.payload?.wallet?.redirect_url) {
          window.location.href = response.payload.wallet.redirect_url;
        }
      } else {
        toast.error(response.message || "ᠪᠦᠷᠳᠦᠯᠳᠡ ᠦᠦᠰᠦᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "ᠪᠦᠷᠳᠦᠯᠳᠡ ᠦᠦᠰᠦᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate back to one-time donation
  const handleBackToOnceTime = () => {
    window.location.href = "/donation";
  };

  // Fetch user subscriptions
  const fetchUserSubscriptions = async (token) => {
    try {
      const response = await fetch("/mng/api/donation/recurring/subscriptions", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      if (data.success) {
        setUserSubscriptions(data.payload || []);
      }
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("recurringDonationToken");
    localStorage.removeItem("recurringDonationExpires");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserSubscriptions([]);
    toast.success("ᠠᠮᠵᠢᠯᠲᠠᠢ ᠭᠠᠷᠯᠠ!");
  };

  // Check for existing authentication on page load
  useEffect(() => {
    const token = localStorage.getItem("recurringDonationToken");
    const expires = localStorage.getItem("recurringDonationExpires");
    
    if (token && expires) {
      const now = Math.floor(Date.now() / 1000);
      if (parseInt(expires) > now) {
        setAuthToken(token);
        setIsAuthenticated(true);
        fetchUserSubscriptions(token);
      } else {
        // Token expired, clear it
        localStorage.removeItem("recurringDonationToken");
        localStorage.removeItem("recurringDonationExpires");
      }
    }
  }, []);

  // Login form functions
  const sendLoginEmailCode = async () => {
    if (!loginEmail) {
      toast.error("ᠢᠮᠡᠶᠢᠯ ᠣᠷᠣᠭᠤᠯᠤᠨ ᠠ");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      toast.error("ᠢᠮᠡᠶᠢᠯ ᠤᠨ ᢉᠤᠷᠭᠠᠨ ᠪᠤᠷᠤᠤ");
      return;
    }

    setLoginIsLoading(true);
    try {
      const response = await donationService.recurring.verifyEmail(loginEmail);

      if (response.success) {
        toast.success("ᠪᠠᠲᠠᠯᠭᠠᠠᠵᠤᠭᠤᠯᠬᠤ ᠬᠣᠳ ᠢᠯᠭᠡᢉᠡᢉᠡᠢ!");
        setLoginTimeLeft(60); // 1 minute countdown
      } else {
        toast.error(response.message || "ᠬᠣᠳ ᠢᠯᠭᠡᢉᠦᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "ᠬᠣᠳ ᠢᠯᠭᠡᢉᠦᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ";
      toast.error(errorMessage);
    } finally {
      setLoginIsLoading(false);
    }
  };

  const handleLogin = async () => {
    // Validation
    if (!loginEmail || !loginVerifyCode) {
      toast.error("ᠪᠦᠬᠦᠢ ᠲᠠᠯᠪᠠᠷ ᠢ ᠪᠦᠷᠳᠦᠯ");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      toast.error("ᠢᠮᠡᠶᠢᠯ ᠤᠨ ᢉᠤᠷᠭᠠᠨ ᠪᠤᠷᠤᠤ");
      return;
    }

    if (loginVerifyCode.length !== 6) {
      toast.error("ᠪᠠᠲᠠᠯᠭᠠᠠᠵᠤᠭᠤᠯᠬᠤ ᠬᠣᠳ 6 ᠣᠷᠣᠨ ᠪᠠᠢᠬᠤ ᠦᠦᠰᠦᠨ");
      return;
    }

    setLoginIsLoading(true);
    try {
      const response = await donationService.recurring.login({
        email: loginEmail,
        verifyCode: loginVerifyCode,
      });

      if (response.success) {
        toast.success("ᠠᠮᠵᠢᠯᠲᠠᠢ ᠨᠡᠪᠲᠡᠷᠡᢉᠡᢉᠡᠢ!");
        
        // Store authentication token in localStorage
        if (response.payload?.token?.bearer) {
          localStorage.setItem("recurringDonationToken", response.payload.token.bearer);
          localStorage.setItem("recurringDonationExpires", response.payload.token.expires);
          setAuthToken(response.payload.token.bearer);
          setIsAuthenticated(true);
          
          // Fetch user's subscription data
          await fetchUserSubscriptions(response.payload.token.bearer);
        }
      } else {
        toast.error(response.message || "ᠨᠡᠪᠲᠡᠷᠡᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "ᠨᠡᠪᠲᠡᠷᠡᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ";
      toast.error(errorMessage);
    } finally {
      setLoginIsLoading(false);
    }
  };

  // Countdown timer for email verification
  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Countdown timer for login email verification
  useEffect(() => {
    let interval;
    if (loginTimeLeft > 0) {
      interval = setInterval(() => {
        setLoginTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loginTimeLeft]);

  // Props to pass to components
  const recurringDonationProps = {
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
  };

  // Subscription management callbacks
  const handleUpdateSubscription = (subscriptionId) => {
    // TODO: Implement subscription update modal
    toast.info("ᠵᠠᠰᠠᠬᠤ ᠬᠡᠷᠡᠭᠯᠡᠯ ᠤᠨ ᠬᠢᠨᠠᠨ ᠪᠠᠢᠭᠤᠯᠤᠯᠲᠠ");
  };

  const handleCancelSubscription = async (subscriptionId) => {
    if (confirm("ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠢ ᠴᠠᠷ᠎ᠠ ᠬᠢᠬᠦ ᠦᠦ?")) {
      try {
        const response = await fetch(`/mng/api/donation/recurring/cancel/${subscriptionId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        if (data.success) {
          toast.success("ᠰᠠᠷ ᠪᠣᠯᠤᠭᠠᠨ ᠬᠠᠨᠳᠢᠪ ᠢ ᠴᠠᠷᠠᠯᠠᠪᠠ!");
          await fetchUserSubscriptions(authToken);
        } else {
          toast.error(data.message || "ᠴᠠᠷᠠᠯᠬᠤᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ");
        }
      } catch (error) {
        toast.error("ᠴᠠᠷᠠᠯᠬᠤᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ");
      }
    }
  };

  const handleRefreshSubscriptions = () => {
    if (authToken) {
      fetchUserSubscriptions(authToken);
    }
  };

  return (
    <Layout>
      {isAuthenticated ? (
        // Show subscription management if logged in
        <>
          <MySubscriptions 
            userSubscriptions={userSubscriptions}
            handleLogout={handleLogout}
            onUpdateSubscription={handleUpdateSubscription}
            onCancelSubscription={handleCancelSubscription}
            onRefreshSubscriptions={handleRefreshSubscriptions}
          />
          <MySubscriptionsMobile 
            userSubscriptions={userSubscriptions}
            handleLogout={handleLogout}
            onUpdateSubscription={handleUpdateSubscription}
            onCancelSubscription={handleCancelSubscription}
            onRefreshSubscriptions={handleRefreshSubscriptions}
          />
        </>
      ) : (
        // Show registration/login forms if not logged in
        <>
          <RecurringDonationDesktop {...recurringDonationProps} />
          <RecurringDonationMobile {...recurringDonationProps} />
        </>
      )}
    </Layout>
  );
}
