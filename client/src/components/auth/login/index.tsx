import { useState } from "react";
import { useLoginMutation } from "../../../redux/services/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../../utils/auth";
import { setUser } from "../../../redux/slices/auth/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email || !password) return;

    try {
      const response = await login({ email, password }).unwrap();
      const { accessToken, refreshToken, user } = response.data;

      if (accessToken && refreshToken) {
        setAuth(accessToken, refreshToken, user);
        dispatch(setUser(user));
        toast.success("Uğurla daxil oldunuz!");
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login uğursuz oldu");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-105 flex flex-col gap-6 animate-fade-in">
        {/* Login Card */}
        <main className="bg-white dark:bg-[#1A2633] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#eff1f3] dark:border-[#2a3441] overflow-hidden">
          {/* Branding Header */}
          <div className="flex flex-col items-center pt-10 pb-4 px-8 text-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 relative">
                <svg className="size-full" fill="none" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient
                      id="brandGradient"
                      x1="0%"
                      x2="100%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#d946ef", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#137fec", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20.5 10.5C20.5 16.5 15.5 21 11.5 21C11.5 21 13 16 13 11C13 6.5 16.5 3 20.5 3V10.5Z"
                    fill="url(#brandGradient)"
                    opacity="0.8"
                  ></path>
                  <path
                    d="M11.5 21C7.5 21 3.5 17 3.5 12C3.5 7 7.5 3 11.5 3V21Z"
                    fill="url(#brandGradient)"
                  ></path>
                </svg>
              </div>
              <h2 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight tracking-tight">
                MRH
              </h2>
            </div>
            <h1 className="text-[#111418] dark:text-white text-[28px] font-bold leading-tight mb-2">
              Xoş gəlmisiniz
            </h1>
            <p className="text-[#637588] dark:text-[#9aaebf] text-sm font-medium">
              Platformaya daxil olmaq üçün məlumatlarınızı daxil edin
            </p>
          </div>

          {/* Login Form */}
          <form
            className="flex flex-col gap-5 px-8 pb-10 pt-4"
            onSubmit={handleLogin}
          >
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[#111418] dark:text-white text-sm font-semibold leading-normal"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email daxil edin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input w-full rounded-lg border border-[#dbe0e6] dark:border-[#3e4a56] bg-white dark:bg-[#1A2633] text-[#111418] dark:text-white h-12 pl-4 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[#111418] dark:text-white text-sm font-semibold leading-normal"
              >
                Şifrə
              </label>
              <input
                id="password"
                type="password"
                placeholder="Şifrənizi daxil edin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input w-full rounded-lg border border-[#dbe0e6] dark:border-[#3e4a56] bg-white dark:bg-[#1A2633] text-[#111418] dark:text-white h-12 pl-4 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec]"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg h-12 px-4 bg-linear-to-r from-fuchsia-600 to-[#137fec] text-white text-sm font-bold hover:opacity-90 transition-all"
            >
              {isLoading ? "Daxil olunur..." : "Daxil ol"}
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">
                {(error as any).data?.message || "Login uğursuz oldu"}
              </p>
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
