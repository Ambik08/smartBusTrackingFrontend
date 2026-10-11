import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"

function SignUpPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData,setFormData] = useState({orgName:"",email:"",phoneNumber:"",userName:"",password:""})
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log("submit");
      try {
          const response = await fetch(`${API_URL}/user/signup`,
              {
                  method: "POST",
                  headers: {"Content-Type": "application/json",},
                  body: JSON.stringify({
                      organisationName:formData.orgName,
                      email:formData.email,
                      phoneNumber:formData.phoneNumber,
                      userName:formData.userName,
                      password:formData.password
                  }),
              }
          );
          console.log(formData);
          const text = await response.text();
          if(response.status===201){
            toast.success(text);
             setTimeout(() => {
                  navigate("/login");
              }, 2000);
          }
          else{
            toast.error(text);
          }
      } 
    catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error in signup frontend");
    }

  }
  

return (
  <div className="relative flex min-h-screen min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-3 sm:p-5">
    <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan-200 opacity-20 blur-3xl sm:left-0 sm:top-0 sm:h-96 sm:w-96"></div>

    <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-blue-200 opacity-20 blur-3xl sm:bottom-0 sm:right-0 sm:h-96 sm:w-96"></div>

    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:35px_35px] opacity-40 sm:bg-[size:60px_60px]"></div>

    <div className="relative z-10 my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] sm:rounded-[36px] lg:rounded-[40px]">
      <div className="h-1.5 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500"></div>

      <div className="p-5 sm:p-7 md:p-10">
        <div className="mb-7 text-center sm:mb-10">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-100 to-blue-100 text-4xl shadow-lg shadow-cyan-100 sm:mb-6 sm:h-24 sm:w-24 sm:rounded-[28px] sm:text-5xl">
            🚌
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-500 sm:text-sm sm:tracking-[0.35em]">
            SmartBus
          </p>

          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
            Create Account
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500 sm:text-base lg:text-lg">
            Start managing routes and buses effortlessly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Organisation Name
            </label>

            <input
              type="text"
              placeholder="Enter organisation name"
              value={formData.orgName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  orgName: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-700 focus:border-cyan-400 focus:outline-none sm:h-14 sm:rounded-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Email Address
            </label>

            <input
              type="email"
              placeholder="company@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-700 focus:border-cyan-400 focus:outline-none sm:h-14 sm:rounded-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phoneNumber: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-700 focus:border-cyan-400 focus:outline-none sm:h-14 sm:rounded-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Username
            </label>

            <input
              type="text"
              placeholder="Choose a username"
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
              placeholder="Create a secure password"
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
            className="btn mt-2 h-12 min-h-12 w-full rounded-xl border-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-bold text-white shadow-xl shadow-cyan-200 transition duration-300 hover:from-cyan-600 hover:to-blue-600 sm:mt-3 sm:h-14 sm:min-h-14 sm:rounded-2xl sm:text-base sm:hover:scale-[1.02]"
          >
            Create Account →
          </button>
        </form>

        <div className="divider my-6 text-xs text-slate-400 sm:my-8 sm:text-sm">
          Smart Bus Tracking
        </div>

        <p className="text-center text-sm leading-relaxed text-slate-500 sm:text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-cyan-500 transition duration-300 hover:text-cyan-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default SignUpPage
