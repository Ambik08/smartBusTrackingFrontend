import { div } from 'framer-motion/client';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate, useParams} from "react-router-dom"
import { ArrowLeft } from "lucide-react";

function BusLoginPage() {
  const [formData,setFormData] = useState({busNumber:"",password:""})
  const navigate=useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log("submit");
      try {
          const response = await fetch(`${API_URL}/bus/login`,
              {
                  method: "POST",
                  headers: {"Content-Type": "application/json",},
                  body: JSON.stringify({
                      busNumber:formData.busNumber,
                      password:formData.password
                  }),
              }
          );
          
          if(response.status===200){
            console.log("login")
            const {id,token} = await response.json();
            toast.success("Bus logged in successfully");
            localStorage.setItem("token",token)
             setTimeout(() => {
                  navigate(`/busDashboard/${id}`);
              }, 1500);
          }
          else{
            const text = await response.text();
            toast.error(text);
          }
      } 
    catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error in bus login page frontend");
    }
  }

return (
  <div className="relative flex min-h-screen min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-3 sm:p-5">
    <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-200 opacity-20 blur-3xl sm:left-10 sm:top-10 sm:h-72 sm:w-72"></div>

    <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-purple-200 opacity-20 blur-3xl sm:bottom-10 sm:right-10 sm:h-72 sm:w-72"></div>

    <div className="relative z-10 my-auto w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:rounded-[32px]">
      <div className="p-5 sm:p-7 md:p-8">
        <div className="relative mb-7 text-center sm:mb-8">
          <Link
            to="/"
            className="btn btn-circle absolute right-0 top-0 z-10 h-10 min-h-10 w-10 border border-slate-200 bg-white text-slate-700 shadow-md transition duration-300 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white sm:h-11 sm:min-h-11 sm:w-11"
            title="Back to Login Portal"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </Link>

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-3xl sm:h-20 sm:w-20 sm:rounded-3xl sm:text-4xl">
            🚍
          </div>

          <h1 className="text-3xl font-black text-slate-800 sm:text-4xl">
            Bus Login
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Driver Authentication Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Bus Number
            </label>

            <input
              type="text"
              placeholder="TG09AB1234"
              value={formData.busNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  busNumber: e.target.value,
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
              placeholder="******"
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
            className="btn h-12 min-h-12 w-full rounded-xl border-0 bg-cyan-500 text-base font-semibold text-white shadow-lg shadow-cyan-200 transition duration-300 hover:bg-cyan-600 sm:h-14 sm:min-h-14 sm:rounded-2xl sm:hover:scale-[1.02]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
);


}
export default BusLoginPage;