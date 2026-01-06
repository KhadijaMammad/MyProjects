import { useState } from "react";
import { useLoginMutation } from "../../../redux/services/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    if (!email || !password) return alert("Email və şifrə daxil edin");

    try {
      const response = await login({ email, password }).unwrap();
      console.log("Login Successful:", response);
      localStorage.setItem("accessToken", response.access_token);
      localStorage.setItem("refreshToken", response.refresh_token);
      alert(`Xoş gəldiniz, ${response.username}`);
    } catch (err: any) {
      console.error(err);
      alert(err?.data?.message || "Login uğursuz oldu");
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
                    <linearGradient id="brandGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#d946ef", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#137fec", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20.5 10.5C20.5 16.5 15.5 21 11.5 21C11.5 21 13 16 13 11C13 6.5 16.5 3 20.5 3V10.5Z"
                    fill="url(#brandGradient)"
                    opacity="0.8"
                  ></path>
                  <path d="M11.5 21C7.5 21 3.5 17 3.5 12C3.5 7 7.5 3 11.5 3V21Z" fill="url(#brandGradient)"></path>
                </svg>
              </div>
              <h2 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight tracking-tight">MRH</h2>
            </div>
            <h1 className="text-[#111418] dark:text-white text-[28px] font-bold leading-tight mb-2">Xoş gəlmisiniz</h1>
            <p className="text-[#637588] dark:text-[#9aaebf] text-sm font-medium">
              Platformaya daxil olmaq üçün məlumatlarınızı daxil edin
            </p>
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-5 px-8 pb-10 pt-4" onSubmit={(e) => e.preventDefault()}>
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[#111418] dark:text-white text-sm font-semibold leading-normal">
                Email
              </label>
              <div className="relative group">
                <input
                  id="email"
                  type="email"
                  placeholder="Email daxil edin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer form-input w-full rounded-lg border border-[#dbe0e6] dark:border-[#3e4a56] bg-white dark:bg-[#1A2633] text-[#111418] dark:text-white h-12 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] transition-all placeholder:text-[#9ca3af]"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] peer-focus:text-[#137fec] transition-colors pointer-events-none">
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-[#111418] dark:text-white text-sm font-semibold leading-normal">
                  Şifrə
                </label>
                <a className="text-xs font-semibold text-[#137fec] hover:text-[#d946ef] transition-colors" href="#">
                  Şifrəni unutmusunuz?
                </a>
              </div>
              <div className="relative group">
                <input
                  id="password"
                  type="password"
                  placeholder="Şifrənizi daxil edin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer form-input w-full rounded-lg border border-[#dbe0e6] dark:border-[#3e4a56] bg-white dark:bg-[#1A2633] text-[#111418] dark:text-white h-12 pl-11 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] transition-all placeholder:text-[#9ca3af]"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] peer-focus:text-[#137fec] transition-colors pointer-events-none">
                </div>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#637588] flex items-center justify-center cursor-pointer"
                >
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-linear-to-r from-fuchsia-600 to-[#137fec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-blue-500/20 mt-2"
            >
              <span className="truncate">{isLoading ? "Daxil olunur..." : "Daxil ol"}</span>
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">
                {(error as any).data?.message || "Login uğursuz oldu"}
              </p>
            )}
          </form>

          {/* Sign Up Footer */}
          <div className="bg-[#f8f9fa] dark:bg-[#151c24] border-t border-[#eff1f3] dark:border-[#2a3441] p-4 text-center">
            <p className="text-sm text-[#637588] dark:text-[#9aaebf]">
              Hesabınız yoxdur?{" "}
              <a className="font-bold text-[#137fec] hover:text-[#d946ef] transition-colors" href="#">
                Qeydiyyatdan keçin
              </a>
            </p>
          </div>
        </main>

        {/* Copyright Footer */}
        <footer className="text-center opacity-60 hover:opacity-100 transition-opacity">
          <p className="text-xs text-[#637588] dark:text-[#9aaebf]">© 2024 byMRH.az - Şəxsi İş Mühiti</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
