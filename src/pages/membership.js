import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import userApiService from "@/services/userApiService";
import MemberDesktop from "@/components/member/MemberDesktop";
import MemberMobile from "@/components/member/MemberMobile";
import SectionTitle from "@/components/common/SectionTitle";
import Layout from "@/components/layout/Layout";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function Member() {
  const router = useRouter();
  const { registered } = router.query;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuthStatus();

    if (registered === "true") {
      toast.success("ᠪᠦᠷᠲᠡᠭᠦᠯ ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠦᠦᠰᠦᠯᠡᠭᠡ! ᠲᠠ ᠨᠡᠪᠲᠡᠷᠡᠵᠦ ᠣᠷᠣᠵ ᠪᠣᠯᠨᠣ᠃");
    }
  }, [registered]);

  const checkAuthStatus = async () => {
    // Check for token in cookies first, fallback to localStorage
    const token = Cookies.get("amnesty_member_token") || localStorage.getItem("auth_token");
    if (token) {
      try {
        const userData = await userApiService.user.getProfile();
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        // Token is invalid, remove it from both places
        Cookies.remove("amnesty_member_token", { path: "/" });
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_expires");
        setIsLoggedIn(false);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Validation like old project
    if (!loginData.phone || String(loginData.phone).length !== 8) {
      toast.error("ᠲᠠ ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳᠤᠭᠠᠷᠠᠭ᠎ᠠ ᠵᠦᠪ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      return;
    }

    if (!loginData.password || loginData.password.length === 0) {
      toast.error("ᠲᠠ ᠨᠢᠭᠤᠴᠠ ᠦᠭᠡᠭ᠎ᠡ ᠣᠷᠣᠭᠤᠯᠨ᠎ᠠ ᠤᠤ!");
      return;
    }

    setLoading(true);
    try {
      const response = await userApiService.auth.login({
        phone: loginData.phone,
        password: loginData.password,
      });

      if (response.payload?.token) {
        // Token is already stored in cookies by the authService
        const userData = await userApiService.user.getProfile();
        setUser(userData);
        setIsLoggedIn(true);
        toast.success("ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠨᠡᠪᠲᠡᠷᠡᠯᠡᠭᠡ!");
        setLoginData({ phone: "", password: "" });
      }
    } catch (error) {
      toast.error(
        "ᠨᠡᠪᠲᠡᠷᠡᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ: " +
          (error.response?.data?.message ||
            error.message ||
            "ᠦᠨᠴᠠᠷᠠᠭᠤᠯᠠᠭᠰᠠᠨ ᠠᠯᠳᠠᠭ᠎ᠠ")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    userApiService.auth.logout();
    setIsLoggedIn(false);
    setUser(null);
    toast.success("ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠭᠠᠷᠯᠠᠭ᠎ᠠ");
  };

  return (
    <Layout>
      <MemberDesktop
        user={isLoggedIn ? user : null}
        onLogout={handleLogout}
        onLogin={handleLogin}
        loginData={loginData}
        setLoginData={setLoginData}
        loading={loading}
      />

      <MemberMobile
        user={isLoggedIn ? user : null}
        onLogout={handleLogout}
        onLogin={handleLogin}
        loginData={loginData}
        setLoginData={setLoginData}
        loading={loading}
      />
    </Layout>
  );
}
