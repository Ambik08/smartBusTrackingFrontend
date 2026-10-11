import React,{useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"
import AddBusPopUp from "../component/AddBusPopUp";
import { LogOut } from "lucide-react";
import { Trash2 } from "lucide-react";
function RoutePage() {
  const API_URL = import.meta.env.VITE_API_URL;
    const {routeNumber} =useParams();
    const [isAddBus,setIsAddBus]=useState(false);
    const token = localStorage.getItem("token");
     const [resData,setResData] = useState({routeNumber:"",source:"",destination:"",buses:[]}) 
     const navigate = useNavigate();
    const deleteBus = async (busNumber) => {

    if (!window.confirm("Are you sure you want to delete this bus?")) return;

    try {

        const response = await fetch(
            `${API_URL}/bus/${busNumber}`,
            {
                method: "DELETE",
                headers:{Authorization: `Bearer ${token}`}
            }
        );

        const message = await response.text();

        if (response.ok) {
            toast.success(message);
            fetchRouteByRouteNumber(); // Refresh buses
        } else {
            toast.error(message);
        }

    } catch (error) {
    console.log(error);
    toast.error(error.message);
}

};
        const fetchRouteByRouteNumber = async () => {
          console.log("Fetching...");
        try {
            const response = await fetch(
            `${API_URL}/route/${routeNumber}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}` },
            }
            );

            if (response.status === 200) {
            const data = await response.json();
            setResData(data);
            } else {
            const text = await response.text();
            toast.error(text);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Error in RoutePage frontend");
        }
        };
    useEffect(()=>{ 
      fetchRouteByRouteNumber()
      const interval = setInterval(
        fetchRouteByRouteNumber,
        1000
    );
    return () => clearInterval(interval);
    },[])

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
    <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:35px_35px] opacity-50 sm:bg-[size:60px_60px]"></div>

    <div className="relative mx-auto max-w-7xl p-3 sm:p-5 lg:p-6">
      {isAddBus && (
        <AddBusPopUp
          onClose={() => setIsAddBus(false)}
          refreshRoutes={fetchRouteByRouteNumber}
        />
      )}

      <div className="mb-7 flex flex-col gap-5 sm:mb-9 lg:mb-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-500 sm:text-sm sm:tracking-[0.3em]">
            Route Details
          </p>

          <h1 className="mt-2 break-words text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {resData.routeNumber}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-5">
            <span className="break-words text-xl font-bold text-slate-700 sm:text-2xl lg:text-3xl">
              {resData.source}
            </span>

            <span className="text-2xl font-black text-cyan-500 sm:text-3xl lg:text-4xl">
              ⇄
            </span>

            <span className="break-words text-xl font-bold text-slate-700 sm:text-2xl lg:text-3xl">
              {resData.destination}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 lg:justify-end">
          <button
            onClick={() => navigate(`/route/${routeNumber}/stops`)}
            className="btn h-11 min-h-11 w-full rounded-xl border border-cyan-500 bg-white px-3 text-xs text-cyan-500 hover:bg-cyan-500 hover:text-white sm:w-auto sm:rounded-2xl sm:px-4 sm:text-sm"
          >
            📍 Manage Stops
          </button>

          <button
            onClick={() => setIsAddBus(true)}
            className="btn h-11 min-h-11 w-full rounded-xl border-0 bg-cyan-500 px-3 text-xs text-white shadow-xl shadow-cyan-200 transition duration-300 hover:bg-cyan-600 hover:shadow-cyan-300 sm:w-auto sm:rounded-2xl sm:px-6 sm:text-sm md:hover:-translate-y-1"
          >
            + Add Bus
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token"),
              toast.success("logout successfully"),
              navigate("/allLogin")
            }}
            className="btn btn-square col-span-2 h-11 min-h-11 w-full rounded-xl border-0 bg-red-500 text-white hover:bg-red-600 sm:col-span-1 sm:h-12 sm:min-h-12 sm:w-12 sm:rounded-2xl"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
          Buses
        </h2>

        <p className="mt-2 text-sm text-slate-500 sm:text-base lg:text-lg">
          Buses operating on this route
        </p>
      </div>

      {resData.buses.length !== 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:gap-8">
          {resData.buses.map((bus) => (
            <div
              key={bus.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl transition duration-300 hover:shadow-2xl sm:rounded-3xl lg:rounded-[36px] md:hover:-translate-y-2"
            >
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>

              <div className="p-4 sm:p-5 lg:p-7">
                <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6">
                  <div className="min-w-0">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400 sm:tracking-[0.25em]">
                      Bus Number
                    </p>

                    <h2 className="break-words text-xl font-black text-slate-900 sm:text-2xl lg:text-3xl xl:text-4xl">
                      🚌 {bus.busNumber}
                    </h2>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-3 sm:flex-row sm:items-center">
                    {bus.longitude != null && bus.latitude != null ? (
                      <div className="badge badge-success px-3 py-3 text-xs sm:px-4">
                        Active
                      </div>
                    ) : (
                      <div className="badge badge-error px-3 py-3 text-xs sm:px-4">
                        Inactive
                      </div>
                    )}

                    <button
                      onClick={() => deleteBus(bus.busNumber)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 shadow-md transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg sm:h-11 sm:w-11 sm:rounded-2xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3 sm:rounded-3xl sm:p-5 lg:p-6">
                  <div className="grid grid-cols-3 items-center gap-1 sm:gap-3">
                    <div className="min-w-0 text-center">
                      <p className="mb-2 text-[10px] uppercase text-slate-400 sm:text-xs">
                        Source
                      </p>

                      <h3 className="break-words text-sm font-bold text-slate-800 sm:text-base lg:text-xl">
                        {bus.source}
                      </h3>
                    </div>

                    <div className="text-center">
                      <span className="text-2xl font-black text-cyan-500 sm:text-4xl lg:text-5xl">
                        ⇄
                      </span>
                    </div>

                    <div className="min-w-0 text-center">
                      <p className="mb-2 text-[10px] uppercase text-slate-400 sm:text-xs">
                        Destination
                      </p>

                      <h3 className="break-words text-sm font-bold text-slate-800 sm:text-base lg:text-xl">
                        {bus.destination}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-100 bg-white p-5 text-center shadow-xl sm:rounded-[36px] sm:p-8 lg:p-16">
          <div className="mb-4 text-6xl sm:mb-6 sm:text-7xl lg:text-8xl">
            🚌
          </div>

          <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
            No Buses Found
          </h2>

          <p className="mb-6 text-sm text-slate-500 sm:mb-8 sm:text-base lg:text-lg">
            Add your first bus to start live tracking.
          </p>

          <button
            onClick={() => setIsAddBus(true)}
            className="btn h-11 min-h-11 w-full rounded-xl border-0 bg-cyan-500 px-6 text-white shadow-xl shadow-cyan-200 hover:bg-cyan-600 sm:h-12 sm:min-h-12 sm:w-auto sm:rounded-2xl sm:px-8"
          >
            Add First Bus
          </button>
        </div>
      )}
    </div>
  </div>
);

}

export default RoutePage
