import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import userApiService from "@/services/userApiService";
import MemberDesktop from "@/components/member/MemberDesktop";
import MemberMobile from "@/components/member/MemberMobile";
import UserProfile from "@/components/member/UserProfile";
import SectionTitle from "@/components/common/SectionTitle";
import Layout from "@/components/layout/Layout";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function Member() {
  const router = useRouter();
  const { registered } = router.query;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userGroups, setUserGroups] = useState(null);
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
    const token =
      Cookies.get("amnesty_member_token") || localStorage.getItem("auth_token");
    if (token) {
      try {
        const userData = await userApiService.user.getProfile();
        setUser(userData);
        setIsLoggedIn(true);

        // Also load user groups for the profile
        try {
          const groups = await userApiService.user.getUserGroups();
          setUserGroups(groups);
        } catch (groupError) {
          console.error("Failed to load user groups:", groupError);
        }
      } catch (error) {
        // Token is invalid, remove it from both places
        Cookies.remove("amnesty_member_token", { path: "/" });
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_expires");
        setIsLoggedIn(false);
      }
    }
  };

  const handleLogin = async () => {
    try {
      // Check auth status after successful login from child components
      await checkAuthStatus();
      router.push("/member");
    } catch (error) {
      console.error("Error refreshing auth status:", error);
    }
  };

  const handleLogout = () => {
    userApiService.auth.logout();
    setIsLoggedIn(false);
    setUser(null);
    toast.success("ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠭᠠᠷᠯᠠᠭ᠎ᠠ");
    router.push("/member");
  };

  if (isLoggedIn && user) {
    return (
      <Layout>
        <UserProfile userData={user} userGroups={userGroups} />
      </Layout>
    );
  }

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
