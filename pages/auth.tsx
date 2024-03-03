import Input from "@/components/input";
import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Auth = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const togglePage = () => {
    setIsLogin((pre) => !pre);
  };

  const register = async () => {
    try {
      const response = await axios.post("/api/register", {
        name: userName,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const login = async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (isLogin) {
      login();
    } else {
      register();
    }
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="w-full bg-black h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {isLogin ? "Login" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {!isLogin && (
                <Input
                  id="username"
                  placeholder="Username"
                  type="text"
                  onChange={(e: any) => setUserName(e.target.value)}
                  value={userName}
                />
              )}

              <Input
                id="email"
                placeholder="Email"
                type="email"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                id="password"
                placeholder="Password"
                type="password"
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10
             hover:bg-red-700 transition"
              onClick={handleSubmit}
            >
              {isLogin ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {isLogin
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={togglePage}
              >
                {isLogin ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
