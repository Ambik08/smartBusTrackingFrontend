import React,{useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"
import { source } from 'framer-motion/client';

function AddBusPage({onClose,refreshRoutes}) {
    const [formData,setFormData] = useState({busNumber:"",password:"",source:"",destination:""})
    const {routeNumber}=useParams();
    const navigate=useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("submit");
        try {
            const response = await fetch(`${API_URL}/bus/${routeNumber}`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json",
                      Authorization: `Bearer ${token}`},
                    body: JSON.stringify({
                        busNumber:formData.busNumber,
                        password:formData.password,
                        source:formData.source,
                        destination:formData.destination
                    }),
                }
            );
            console.log(formData);
            const text = await response.text();
            if(response.status===201){
              toast.success(text);
              if(refreshRoutes){
                  refreshRoutes();
              }
                onClose();
            }
            else{
                toast.error(text);
            }
        } 
        catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Error in AddBusPage frontend");
        }
    }


return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 backdrop-blur-sm sm:p-4">
    <div className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:rounded-3xl md:rounded-[32px]">
      <div className="overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-3 sm:mb-8">
          <div className="min-w-0">
            <h1 className="text-2xl font-black text-slate-800 sm:text-3xl">
              Add Bus
            </h1>

            <p className="mt-1 text-sm leading-relaxed text-slate-500 sm:text-base">
              Register a new bus for this route
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="btn btn-circle btn-ghost h-9 min-h-9 w-9 shrink-0 text-lg sm:h-10 sm:min-h-10 sm:w-10"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Bus Number
            </label>

            <input
              type="text"
              placeholder="TGXXXX"
              value={formData.busNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  busNumber: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-700 focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
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
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-700 focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Source
            </label>

            <input
              type="text"
              placeholder="Starting Point"
              value={formData.source}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  source: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-700 focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Destination
            </label>

            <input
              type="text"
              placeholder="Ending Point"
              value={formData.destination}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  destination: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base text-slate-700 focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="btn min-h-11 w-full rounded-xl border-0 bg-slate-100 text-slate-700 sm:flex-1 sm:rounded-2xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn min-h-11 w-full rounded-xl border-0 bg-cyan-500 text-white hover:bg-cyan-600 sm:flex-1 sm:rounded-2xl"
            >
              Add Bus
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}

export default AddBusPage
