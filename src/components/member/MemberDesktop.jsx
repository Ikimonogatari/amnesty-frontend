import StaticHeader from "@/components/common/StaticHeader";
import { useRouter } from "next/router";
import SectionTitle from "../common/SectionTitle";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { authService } from "@/services/userApiService";
import { useState } from "react";

export default function MemberDesktop({
  user,
  onLogout,
  onLogin,
  loginData,
  setLoginData,
  loading,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      phone: "",
      password: "",
      rememberPassword: false,
    },
  });

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await authService.login({
        phone: data.phone,
        password: data.password,
      });

      if (response.payload?.token) {
        // Token is already stored in cookies by the authService
        toast.success("ᠠᠮᠵᠢᠯᠲᠲᠠᠢ ᠨᠡᠪᠲᠡᠷᠡᠯᠡᠭᠡ!");
        reset();
        // Trigger parent component to refresh user data
        router.push("/member");
      }
    } catch (error) {
      let errorMessage = "ᠦᠨᠴᠠᠷᠠᠭᠤᠯᠠᠭᠰᠠᠨ ᠠᠯᠳᠠᠭ᠎ᠠ";

      if (error.message && error.message.includes("JSON.parse")) {
        errorMessage = "ᠰᠡᠷᠪᠡᠷ ᠤᠨ ᠰᠠᠳᠠᠭᠠᠨ ᠠᠯᠳᠠᠭ᠎ᠠ - ᠳᠠᠬᠢᠨ ᠣᠷᠣᠯᠳᠣᠭ᠎ᠠ";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error("ᠨᠡᠪᠲᠡᠷᠡᠬᠦᠳ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠯᠠᠭ᠎ᠠ: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const LoginForm = () => (
    <div className="flex gap-20">
      <div className="flex gap-2">
        <h2
          className="text-2xl font-bold"
          style={{
            writingMode: "vertical-lr",
            textOrientation: "upright",
          }}
        >
          ᠲᠠ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠨ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠢ᠋ᠶᠠᠷ:
        </h2>
        <p
          className="text-sm"
          style={{
            writingMode: "vertical-lr",
            textOrientation: "upright",
          }}
        >
          ᠴᠢᠳᠠᠪᠤᠷᠢ ᠶ᠋ᠢ ᠨᠡᠮᠡᢉᠳᠡᢉᠦᠯᢈᠦ ᠰᠤᠷᠭᠠᠯᠲᠠ᠂ ᢈᠡᠯᠡᠯᠴᠡᢉᠦᠯᢉᠡ ᠳ᠋ᠦ ᠬᠠᠮᠤᠷᠤᠭᠳᠠᠬᠤ᠃{" "}
          <br />
          <br />
          ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠨᠣᠴᠤᠲᠠᠢ ᠵᠥᠷᠢᠴᠡᠯ ᠡᠴᠡ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ
          ᠲᠤᠰᠠᠯᠠᠵᠤ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠢ᠋ ᠲᠦᢉᠡᢉᠡᠨ ᠳᠡᠯᢉᠡᠷᠡᢉᠦᠯᢈᠦ᠃{" "}
          <br />
          <br />
          ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠢ᠋ᠶᠠᠷ ᢈᠢ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᢈᠢᠨ ᠤ᠋ ᠰᠡᢉᠦᠯ ᠦ᠋ᠨ ᠦᠶ᠎ᠡ
          ᠶ᠋ᠢᠨ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ᠂ ᠰᠤᠳᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢ ᠴᠠᠭ ᠠᠯᠳᠠᠯ ᠦᢉᠡᠢ ᠠᠪᠬᠤ᠃ <br />
          <br />
          ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠢ᠋ᠶᠠᠷ ᠦᠨᠳᠦᠰᠦᠨ ᠦ᠋᠂ ᠪᠦᠰᠡ ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ ᠪᠣᠯᠤᠨ
          ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠲᠦᠪᠰᠢᠨ ᠳ᠋ᠦ ᠭᠠᠷᠴᠤ ᠮᠠᠩᠯᠠᠶᠢᠯᠠᠬᠤ᠂ ᠮᠡᠳᢈᠡᠯᠴᠡᢈᠦ᠃ <br />
          <br />
          ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠶ᠋ᠢᠨ ᠠᠯᠢ ᠨᠢᢉᠡ ᠪᠦᠯᠦᢉ᠂ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠪᠠᠭ ᠲᠤ ᠣᠷᠤᠵᠤ᠂ ᠦᠨᠡᠲᠦ
          ᠵᠦᠢᠯ ᠨᠢᢉᠡ ᠲᠡᠢ ᠨᠠᠶᠢᠵᠠ ᠨᠥᢈᠦᠳ᠂ ᠬᠠᠮᠲᠤ ᠣᠯᠠᠨ ᠲᠠᠢ ᠪᠣᠯᠬᠤ᠃
          <br />
          <br />
          ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠪᠣᠯᠤᠨ ᠳᠣᠲᠤᠭᠠᠳᠤ ᠶ᠋ᠢᠨ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ
          ᠠᠵᠢᠯ ᠳ᠋ᠤ ᠴᠠᢈᠢᠮ᠂ ᠴᠠᢈᠢᠮ ᠪᠤᠰᠤ ᢈᠡᠯᠪᠡᠷᠢ ᠪᠡᠷ ᠣᠷᠤᠯᠴᠠᠬᠤ᠂ ᠥᠷᠨᠢᢉᠦᠯᢈᠦ᠂ ᠥᠪᠡᠷ ᠦ᠋ᠨ
          ᠮᠡᠳᠡᠯᢉᠡ᠂
        </p>
      </div>
      <div className="flex gap-2">
        <h2
          className="text-2xl font-bold"
          style={{
            writingMode: "vertical-lr",
            textOrientation: "upright",
          }}
        >
          ᠬᠤᠪᠢ ᠶ᠋ᠢᠨ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠢ᠋ᠶᠡᠨ ᠤᠰᠠᠳᠬᠠᠬᠤ:
        </h2>
        <p
          className="text-sm"
          style={{
            writingMode: "vertical-lr",
            textOrientation: "upright",
          }}
        >
          ᠲᠠ ᠸᠧᠪᠰᠠᠶᠢᠲ ᠢ᠋ᠶᠠᠷ ᠡᠰᠡᠪᠡᠯ ᠵᠣᠷᠢᠭᠲᠠᠨ ᠠᠫᠫᠯᠢᠻᠧᠶᠢᠱᠢᠨ᠋ ᠢ᠋ᠶᠡᠷ ᠨᠡᠪᠲᠡᠷᠡᠵᠦ ᠥᠪᠡᠷ
          ᠦ᠋ᠨ ᠬᠤᠪᠢ ᠶ᠋ᠢᠨ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠢ᠋ᠶᠡᠨ ᠤᠰᠠᠳᠬᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃
        </p>
        <div className="flex flex-col gap-2">
          <Link
            target="_blank"
            href="https://www.play.google.com/store/apps/details?id=com.amnest.amnest"
          >
            <Image
              src="/images/google-play.png"
              alt="Google Play"
              width={121}
              height={46}
            />
          </Link>
          <Link
            target="_blank"
            href="https://apps.apple.com/app/id15800000000000000"
          >
            <Image
              src="/images/app-store.png"
              alt="App Store"
              width={121}
              height={46}
            />
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="flex gap-2">
        {/* Phone Field */}
        <div className="flex gap-2">
          <p
            className="text-sm"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳ᠋ᠤᠭᠠᠷ:
          </p>
          <input
            {...register("phone", { required: true })}
            type="text"
            className="border border-gray-300 rounded-md p-2 w-20"
            placeholder="᠙᠙᠑᠒᠓᠔᠕᠖"
            maxLength="8"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          />
        </div>

        {/* Password Field */}
        <div className="flex gap-2">
          <p
            className="text-sm"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠨᠢᠭᠤᠴᠠ ᠦᢉᠡ:
          </p>
          <input
            {...register("password", { required: true })}
            type="password"
            className="border border-gray-300 rounded-md p-2 w-20"
            placeholder="ᠨᠢᠭᠤᠴᠠ ᠦᠭᠡ"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          />
        </div>

        {/* Remember Password Checkbox */}
        <div className="flex flex-col gap-2">
          <p
            className="text-sm"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠨᠢᠭᠤᠴᠠ ᠦᢉᠡ ᠰᠠᠨᠠᠭᠤᠯᠬᠤ
          </p>
          <input
            {...register("rememberPassword")}
            type="checkbox"
            className="w-4 h-4 mt-1"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-2 ml-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`p-2 rounded-md text-sm font-bold bg-[#FFFF00] text-black flex items-center justify-center ${
              isLoading
                ? "cursor-not-allowed opacity-70"
                : "hover:brightness-105 transition-all"
            }`}
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              width: "60px",
            }}
          >
            {isLoading ? "ᠨᠡᠪᠲᠡᠷᠡᠵᠦ ᠪᠠᠢᠨᠠ..." : "ᠨᠡᠪᠲᠡᠷᠡᢈᠦ"}
          </button>
        </div>

        {/* Links */}
        <div className="flex gap-2">
          <p
            onClick={() => router.push("/register")}
            className="p-2 text-sm font-bold cursor-pointer text-center flex items-center justify-center"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              width: "60px",
            }}
          >
            ᠨᠢᠭᠤᠴᠠ ᠦᢉᠡ ᠮᠠᠷᠲᠠᠭᠰᠠᠨ?
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/reset-password")}
            className="p-2 rounded-md text-sm font-bold bg-[#FFFF00] text-black flex items-center justify-center hover:brightness-105 transition-all"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
              width: "60px",
            }}
          >
            ᠪᠦᠷᠢᠳᢈᠡᠯ ᠡᢉᠦᠰᢈᠡᢈᠦ
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="h-full hidden sm:flex gap-20 w-auto flex-shrink-0">
      <StaticHeader
        image="/images/news1.png"
        alt="Member Page Header"
        width="90rem"
        title="ᠭᠢᠰᠦᠦᠨᠴᠢᠯᠡᠯ"
      />
      <div className="flex gap-16 p-4 h-full">
        <div className="flex gap-2">
          <h2
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠶᠠᠭᠠᢈᠢᠭᠠᠳ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠴᠢᠬᠤᠯᠠ ᠪᠤᠢ?
          </h2>
          <p
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
            className="text-sm"
          >
            ᠵᠥᠷᠢᠴᠡᢉᠦᠯᠦᠨ ᠠᠮᠢᠳᠤᠷᠠᠵᠤ ᠪᠠᠶᠢᠭ᠎ᠠ ᠪᠠᠨ ᠪᠢᠳᠡ ᠠᠩᠵᠠᠭᠠᠷᠠᠳᠠᠭ ᠦᢉᠡᠢ᠃ ᠬᠠᠷᠢᠨ ᢈᠦᠮᠦᠨ
            ᠪᠦᠷᠢ ᠳ᠋ᠦ ᠡᠨᠡ ᠨᠥᢈᠦᠴᠡᠯ ᠪᠠᠶᠢᠳᠠᠯ ᠢ᠋ ᠰᠠᠶᠢᠵᠢᠷᠠᠭᠤᠯᠬᠤ ᠮᠠᠰᠢ ᠶᠡᢈᠡ ᠪᠣᠯᠤᠮᠵᠢ
            ᠪᠠᠶᠢᠳᠠᠭ᠃ ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠡᢈᠡ ᠳᠡᠯᠡᢈᠡᠢ ᠳ᠋ᠦ ᠮᠡᠨᠳᠦᠯᠡᢈᠦ ᠳ᠋ᠡᢉᠡᠨ ᠥᠪᠡᠷᠰᠡᠳ ᠦ᠋ᠨ
            ᠵᠠᠶᠠᠭᠠᠭᠳᠠᠮᠠᠯ ᠡᠷᢈᠡ ᠲᠡᠢ ᠪᠡᠨ ᠲᠥᠷᠦᠳᠡᢉ᠃ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠳᠡᢉ ᠦᢉᠡᠢ ᠡᠴᠡ ᠪᠣᠯᠵᠤ
            ᠡᠳᠦᠷ ᠪᠦᠷᠢ ᠡᠷᢈᠡ ᠪᠡᠨ
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
