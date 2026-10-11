import React, { useState,useEffect } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate, useParams} from "react-router-dom"
import AddRoutePopUp from "../component/AddRoutePopUp.jsx"
import { div } from 'framer-motion/client';
import { LogOut } from "lucide-react";
import { Trash2 } from "lucide-react";
function DashboardPage() {
//   const orgName = JSON.parse(
//   localStorage.getItem("organisationName") || '""'
// );
const API_URL = import.meta.env.VITE_API_URL;
const navigate =useNavigate();
  const {orgName}=useParams();
  const [isAddRoute,setIsAddRoute]=useState(false);
  const [routes,setRoutes]=useState([]);
  const token = localStorage.getItem("token");
  const deleteRoute = async (routeNumber) => {

    if (!window.confirm("Delete this route?")) return;

    try {

        const response = await fetch(
            `${API_URL}/route/${routeNumber}`,
            {
                method: "DELETE",
                Authorization: `Bearer ${token}`
            }
        );

        const message = await response.text();

        if (response.ok) {
            toast.success(message);
            fetchRoutes();
        } 
        else if(message==="NRF"){
          console.log("no routes found")
        }else {
            toast.error(message);
        }

    } catch (e) {
        toast.error("Unable to delete route");
        console.log(e);
    }
};
      const fetchRoutes = async() =>{
    try {
          const response = await fetch(`${API_URL}/route/a/${orgName}`,
              {
                  method: "GET",
                  headers: {"Content-Type": "application/json",Authorization: `Bearer ${token}`},
              }
          );
          
          if(response.status===200){
            const data = await response.json();
            setRoutes(data);
          }
          else if(response.status==404){
          console.log("no routes found")
        }
          else{
            const text = await response.text();
            toast.error(text);
          }
      } 
    catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error in signup route fetching frontend");
    }
  }
  useEffect(()=>{
    fetchRoutes();
  },[])

return (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50">
    <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-200 opacity-20 blur-3xl sm:left-0 sm:top-0 sm:h-96 sm:w-96"></div>

    <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-200 opacity-20 blur-3xl sm:bottom-0 sm:right-0 sm:h-96 sm:w-96"></div>

    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:35px_35px] opacity-40 sm:bg-[size:60px_60px]"></div>

    <div className="relative z-10 mx-auto max-w-7xl p-3 sm:p-5 lg:p-6">
      <div className="mb-7 flex flex-col gap-5 sm:mb-9 sm:gap-6 lg:mb-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-500 sm:tracking-[0.3em]">
            SmartBus Dashboard
          </p>

          <h1 className="break-words text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
            {orgName}
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base lg:text-lg">
            Manage routes, buses and live tracking
          </p>
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <button
            onClick={() => setIsAddRoute(true)}
            className="btn h-11 min-h-11 flex-1 rounded-xl border-0 bg-cyan-500 px-4 text-sm text-white shadow-xl shadow-cyan-200 hover:bg-cyan-600 sm:h-12 sm:min-h-12 sm:flex-none sm:rounded-2xl sm:px-7 sm:text-base"
          >
            + Add Route
          </button>

          <button
            onClick={() => {
              localStorage.removeItem(token),
              toast.success("logged out successfully"),
              navigate("/allLogin")
            }}
            className="btn btn-square h-11 min-h-11 w-11 shrink-0 rounded-xl border-0 bg-red-500 text-white hover:bg-red-600 sm:h-12 sm:min-h-12 sm:w-12 sm:rounded-2xl"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {isAddRoute && (
        <AddRoutePopUp
          onClose={() => setIsAddRoute(false)}
          refreshRoutes={fetchRoutes}
          orgName={orgName}
        />
      )}

      {routes.length !== 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
          {routes.map((route) => (
            <div
              key={route.id}
              className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-white/90 shadow-lg backdrop-blur-xl transition duration-300 hover:shadow-2xl sm:rounded-3xl md:rounded-[32px] md:hover:-translate-y-2"
            >
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>

              <div className="p-4 sm:p-5 lg:p-6">
                <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6">
                  <div className="min-w-0">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                      Route
                    </p>

                    <h2 className="break-words text-2xl font-black text-slate-800 sm:text-3xl">
                      {route.routeNumber}
                    </h2>
                  </div>

                  <button
                    onClick={() => deleteRoute(route.routeNumber)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 shadow-sm transition duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg sm:h-11 sm:w-11 sm:rounded-2xl"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="mb-5 rounded-2xl bg-gradient-to-r from-slate-50 to-cyan-50 p-3 sm:mb-6 sm:rounded-3xl sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1 text-center">
                      <p className="mb-1 text-[10px] uppercase text-slate-400 sm:text-xs">
                        Source
                      </p>

                      <h3 className="break-words text-sm font-bold text-slate-800 sm:text-base">
                        {route.source}
                      </h3>
                    </div>

                    <div className="shrink-0 px-1 sm:px-3">
                      <div className="text-2xl font-bold text-cyan-500 sm:text-3xl">
                        ⇄
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 text-center">
                      <p className="mb-1 text-[10px] uppercase text-slate-400 sm:text-xs">
                        Destination
                      </p>

                      <h3 className="break-words text-sm font-bold text-slate-800 sm:text-base">
                        {route.destination}
                      </h3>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/route/${route.routeNumber}`}
                  className="btn h-11 min-h-11 w-full rounded-xl border-0 bg-cyan-500 px-3 text-sm font-semibold text-white shadow-lg shadow-cyan-200 transition duration-300 hover:bg-cyan-600 hover:shadow-2xl hover:shadow-cyan-300 sm:h-12 sm:min-h-12 sm:rounded-2xl sm:text-base md:hover:-translate-y-1"
                >
                  Manage Route →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-12 sm:py-20 lg:py-32">
          <div className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white/90 p-5 text-center shadow-xl backdrop-blur-xl sm:rounded-[36px] sm:p-8 lg:rounded-[40px] lg:p-12">
            <div className="mb-4 text-6xl sm:mb-6 sm:text-7xl">
              🚌
            </div>

            <h2 className="mb-3 text-2xl font-black text-slate-800 sm:text-3xl">
              No Routes Added
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-slate-500 sm:mb-8 sm:text-base">
              Create your first route and start tracking buses in real time.
            </p>

            <button
              onClick={() => setIsAddRoute(true)}
              className="btn h-11 min-h-11 w-full rounded-xl border-0 bg-cyan-500 px-6 text-white hover:bg-cyan-600 sm:h-12 sm:min-h-12 sm:w-auto sm:rounded-2xl sm:px-8"
            >
              Add First Route
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export default DashboardPage
