import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {Link, useNavigate, useParams} from "react-router-dom"
import { ArrowLeft } from "lucide-react";
function AdminLoginPage() {
     const [formData,setFormData] = useState({userName:"",password:""})
     const API_URL = import.meta.env.VITE_API_URL;
     const navigate = useNavigate();
  const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log("submit");
      console.group(formData);
      try {
          const response = await fetch(`${API_URL}/admin`,
              {
                  method: "POST",
                  headers: {"Content-Type": "application/json",},
                  body: JSON.stringify({
                      username:formData.userName,
                      password:formData.password
                  }), 
              }
          );  
          if(response.status===200){
            const token = await response.text();
            localStorage.setItem("token",token);
            toast.success("Admin successfully logged in");
             setTimeout(() => {
                  navigate("/admin/dashboard");
              }, 2000);
          }
          else{
            const text = await response.text();
            console.log(text);
            toast.error("error from backend");
          }
      } 
    catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error in admin login frontend");
    }
  }

return (
  <div className="relative flex min-h-screen min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-3 sm:p-5">
    <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-cyan-200 opacity-20 blur-3xl sm:left-10 sm:top-10 sm:h-80 sm:w-80"></div>

    <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-blue-200 opacity-20 blur-3xl sm:bottom-10 sm:right-10 sm:h-80 sm:w-80"></div>

    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:35px_35px] opacity-40 sm:bg-[size:60px_60px]"></div>

    <div className="relative z-10 my-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-slate-100 border-t-4 border-t-cyan-500 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] sm:rounded-[36px]">
        <div className="p-5 sm:p-8 md:p-10">
          <div className="relative mb-7 text-center sm:mb-10">
            <Link
              to="/"
              className="btn btn-circle absolute right-0 top-0 z-10 h-10 min-h-10 w-10 border border-slate-200 bg-white text-slate-700 shadow-md transition duration-300 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white sm:h-11 sm:min-h-11 sm:w-11"
              title="Back to Login Portal"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </Link>

            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-100 to-cyan-50 text-4xl shadow-lg shadow-cyan-100 sm:mb-5 sm:h-24 sm:w-24 sm:rounded-[30px] sm:text-5xl">
              🛡️
            </div>

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-500 sm:text-sm sm:tracking-[0.35em]">
              ADMIN PORTAL
            </p>

            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              SmartBus
            </h1>

            <p className="mt-2 text-base text-slate-500 sm:mt-3 sm:text-lg">
              Fleet Management Dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userName: e.target.value,
                  })
                }
                className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-700 focus:border-cyan-400 focus:outline-none sm:h-14 sm:rounded-2xl"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-700 focus:border-cyan-400 focus:outline-none sm:h-14 sm:rounded-2xl"
              />
            </div>

            <button
              type="submit"
              className="btn h-12 min-h-12 w-full rounded-xl border-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-bold text-white shadow-xl shadow-cyan-200 transition duration-300 hover:from-cyan-600 hover:to-blue-600 sm:h-14 sm:min-h-14 sm:rounded-2xl sm:text-base sm:hover:scale-[1.02]"
            >
              Login to Dashboard →
            </button>
          </form>

          <div className="divider my-6 text-sm text-slate-400 sm:my-8">
            Admin Access
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default AdminLoginPage
