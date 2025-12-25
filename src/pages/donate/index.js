import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import DonationDesktop from "@/components/donation/DonationDesktop";
import DonationMobile from "@/components/donation/DonationMobile";
import { donationService } from "@/services/userApiService";
import { getCountryByCode } from "@/utils/countryList";
import toast from "react-hot-toast";

export default function Donation() {
  // Form state
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("MN");

  // Donation type (once or monthly)
  const [donationType, setDonationType] = useState("once"); // "once" or "monthly"

  // Payment states
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [qpayData, setQpayData] = useState(null);
  const [paid, setPaid] = useState(false);
  const [checkPaid, setCheckPaid] = useState(false);

  // Error handling
  const [fullField, setFullField] = useState(false);

  // Choose donation amount
  const chooseDonation = (selectedAmount) => {
    setAmount(selectedAmount.toString());
    setFullField(false);
  };

  // Handle donation submission
  const handleDonate = async () => {
    let donationAmount = parseInt(amount);
    if (isNaN(donationAmount)) {
      donationAmount = 0;
    }

    // Enhanced validation like old project
    if (!firstName || firstName.trim() === "") {
      toast.error("ᠨᠡᠷ᠎ᠡ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      setFullField("incomplete");
      return;
    }

    if (!lastName || lastName.trim() === "") {
      toast.error("ᠣᠪᠣᠭ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      setFullField("incomplete");
      return;
    }

    if (!email || email.trim() === "") {
      toast.error("ᠢ᠋ᠮᠧᠢᠯ ᠬᠠᠶᠠᠭ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      setFullField("incomplete");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("ᠢ᠋ᠮᠧᠢᠯ ᠬᠠᠶᠠᠭ ᠤᠨ ᠹᠣᠷᠮᠠᠲ ᠪᠤᠷᠤᠤ ᠪᠠᠢᠨ᠎ᠠ!");
      setFullField("incomplete");
      return;
    }

    if (!phoneNumber || phoneNumber.trim() === "") {
      toast.error("ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳᠤᠭᠠᠷ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      setFullField("incomplete");
      return;
    }

    // Phone number validation (8 digits for Mongolia)
    if (selectedCountryCode === "MN" && phoneNumber.length !== 8) {
      toast.error("ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳᠤᠭᠠᠷ 8 ᠣᠷᠣᠨ ᠪᠠᠢᠬᠤ ᠬᠡᠷᠡᠭᠲᠡᠢ!");
      setFullField("incomplete");
      return;
    }

    if (donationAmount <= 0) {
      toast.error("ᠬᠠᠨᠳᠢᠪ ᠤᠨ ᠳᠦᠨ ᠢ᠋ᠭ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      return;
    }

    // Clear previous errors
    setFullField(false);

    setIsLoading(true);
    try {
      const response1 = await donationService.createAnonymousDonation({
        amount: donationAmount,
        email: String(email),
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
        country: selectedCountryCode,
      });

      if (response1.success && response1.payload) {
        setInvoiceData(response1.payload);
        toast.success("ᠬᠠᠨᠳᠢᠪ ᠤᠨ ᠮᠡᠳᠡᠭᠡ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠦᠦᠰᠦᠯᠡᠭᠡ!");

        // Check donation status
        const response2 = await donationService.checkDonationStatus(
          response1.payload.code
        );

        if (response2.success && response2.payload) {
          setCheckPaid(true);
          setInvoiceData(response2.payload);
        }
      } else {
        const errorMessage =
          response1.message || "ᠬᠠᠨᠳᠢᠪ ᠦᠦᠰᠦᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ";
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "ᠬᠠᠨᠳᠢᠪ ᠦᠦᠰᠦᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle QPay payment
  const handleQPay = async () => {
    if (!invoiceData) return;

    setIsLoading(true);
    try {
      const qpayResponse = await donationService.createBankQPayDonation({
        invoiceCode: invoiceData.code,
      });

      if (qpayResponse.success && qpayResponse.payload) {
        setQpayData(qpayResponse.payload);
        toast.success("QPay ᠲᠥᠯᠪᠦᠷᠢ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠦᠦᠰᠦᠯᠡᠭᠡ!");
      } else {
        const errorMessage =
          qpayResponse.message || "QPay ᠦᠦᠰᠦᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ";
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "QPay ᠦᠦᠰᠦᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle donation type selection
  const handleDonationTypeChange = (type) => {
    setDonationType(type);
    if (type === "monthly") {
      // Navigate to recurring donation page
      window.location.href = "/donate/recurring";
    }
  };

  // Check payment status periodically
  useEffect(() => {
    let interval;
    if (checkPaid && invoiceData) {
      interval = setInterval(async () => {
        try {
          const statusResponse = await donationService.checkDonationStatus(
            invoiceData.code
          );
          if (
            statusResponse.success &&
            statusResponse.payload.status === "paid"
          ) {
            setPaid(true);
            setCheckPaid(false);
            clearInterval(interval);
            toast.success("ᠬᠠᠨᠳᠢᠪ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠲᠥᠯᠦᠭᠦᠯᠦᠭᠡ! ᠲᠠᠨᠳ ᠪᠠᠶᠠᠷᠯᠠᠯᠠᠭ᠎ᠠ!");
          }
        } catch (error) {}
      }, 2000); // Check every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [checkPaid, invoiceData]);

  // Donation props to pass to components
  const donationProps = {
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
  };

  return (
    <Layout>
      <DonationDesktop {...donationProps} />
      <DonationMobile {...donationProps} />
    </Layout>
  );
}
