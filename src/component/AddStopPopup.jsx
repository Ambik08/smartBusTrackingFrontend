import React, { useState } from "react";
import toast from "react-hot-toast";

function AddStopPopup({ routeNumber, onClose, refreshStops }) {

    const [formData, setFormData] = useState({
        stopName: "",
        stopOrder: "",
        latitude: "",
        longitude: ""
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `http://localhost:8080/route/${routeNumber}/stop`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const message = await response.text();

            if (response.ok) {
                toast.success(message);
                refreshStops();
                onClose();
            } else {
                toast.error(message);
            }

        } catch (error) {
            toast.error("Error adding stop");
        }
    };

   
return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 backdrop-blur-sm sm:p-4">
    <div className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:rounded-3xl md:rounded-[32px]">
      <div className="p-4 sm:p-6 md:p-8">
        <div className="mb-6 sm:mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-500 sm:text-sm">
            SmartBus Tracking
          </p>

          <h2 className="text-2xl font-black text-slate-800 sm:text-3xl">
            Add Stop
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
            Add a stop with its order and geographic coordinates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Stop Name
            </label>

            <input
              type="text"
              placeholder="Enter stop name"
              value={formData.stopName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stopName: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Stop Order
            </label>

            <input
              type="number"
              placeholder="Enter stop order"
              value={formData.stopOrder}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stopOrder: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Latitude
            </label>

            <input
              type="number"
              step="any"
              placeholder="e.g. 17.3850"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  latitude: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Longitude
            </label>

            <input
              type="number"
              step="any"
              placeholder="e.g. 78.4867"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  longitude: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="btn min-h-11 w-full rounded-xl border-0 bg-slate-100 text-slate-700 hover:bg-slate-200 sm:flex-1 sm:rounded-2xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn min-h-11 w-full rounded-xl border-0 bg-cyan-500 text-white hover:bg-cyan-600 sm:flex-1 sm:rounded-2xl"
            >
              Save Stop
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}

export default AddStopPopup;