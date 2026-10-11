import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AddStopPopup from "../component/AddStopPopUp";
// import EditStopPopup from "../component/EditStopPopup";
import StopCard from "../component/StopCard";

function StopsPage() {
    const API_URL = import.meta.env.VITE_API_URL;

    const { routeNumber } = useParams();

    const [stops, setStops] = useState([]);
    const [isAddStop, setIsAddStop] = useState(false);
    const [isEditStop, setIsEditStop] = useState(false);
    const [selectedStop, setSelectedStop] = useState(null);

    const fetchStops = async () => {

        try {

            const response = await fetch(
                `${API_URL}/route/${routeNumber}/stops`
            );

            if (response.ok) {
                const data = await response.json();
                setStops(data);
            } else {
                toast.error(await response.text());
            }

        } catch (error) {
            toast.error("Error fetching stops");
        }

    };

    useEffect(() => {
        fetchStops();
    }, []);

    const deleteStop = async (id) => {

        if (!window.confirm("Delete this stop?")) return;

        try {

            const response = await fetch(
                `http://localhost:8080/route/stop/${id}`,
                {
                    method: "DELETE"
                }
            );

            const message = await response.text();

            if (response.ok) {
                toast.success(message);
                fetchStops();
            } else {
                toast.error(message);
            }

        } catch (error) {
            toast.error("Error deleting stop");
        }

    };


return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 px-3 py-6 sm:px-5 sm:py-8 lg:px-6 lg:py-10">
    <div className="mx-auto max-w-7xl">
      <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-500 sm:text-sm sm:tracking-[0.3em]">
            SmartBus Dashboard
          </p>

          <h1 className="break-words text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
            Stops - {routeNumber}
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage stops along this route
          </p>
        </div>

        <button
          onClick={() => setIsAddStop(true)}
          className="btn h-11 min-h-11 w-full rounded-xl border-0 bg-cyan-500 px-5 text-white shadow-lg shadow-cyan-200 transition duration-300 hover:bg-cyan-600 sm:w-auto sm:rounded-2xl sm:px-7"
        >
          + Add Stop
        </button>
      </div>

      <div className="mb-6 h-px bg-gradient-to-r from-cyan-200 via-slate-200 to-transparent sm:mb-8"></div>

      {stops.length === 0 ? (
        <div className="rounded-3xl border border-slate-100 bg-white px-5 py-12 text-center shadow-lg sm:rounded-[36px] sm:px-10 sm:py-16">
          <div className="mb-5 text-6xl sm:text-7xl">
            📍
          </div>

          <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">
            No Stops Found
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
            Add your first stop to start managing pickup and drop-off locations.
          </p>

          <button
            onClick={() => setIsAddStop(true)}
            className="btn mt-6 h-11 min-h-11 w-full rounded-xl border-0 bg-cyan-500 px-6 text-white hover:bg-cyan-600 sm:w-auto sm:rounded-2xl sm:px-8"
          >
            Add First Stop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
          {stops.map((stop) => (
            <StopCard
              key={stop.id}
              stop={stop}
              onDelete={() => deleteStop(stop.id)}
              onEdit={() => {
                setSelectedStop(stop);
                setIsEditStop(true);
              }}
            />
          ))}
        </div>
      )}

      {isAddStop && (
        <AddStopPopup
          routeNumber={routeNumber}
          onClose={() => setIsAddStop(false)}
          refreshStops={fetchStops}
        />
      )}

      {isEditStop && (
        <EditStopPopup
          stop={selectedStop}
          onClose={() => setIsEditStop(false)}
          refreshStops={fetchStops}
        />
      )}
    </div>
  </div>
);
}

export default StopsPage;