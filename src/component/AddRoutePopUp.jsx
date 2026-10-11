    import React from 'react'
    import  { useState } from 'react'
    import toast from 'react-hot-toast';
    function AddRoutePopUp({onClose,refreshRoutes,orgName}) {
        const [formData,setFormData] = useState({routeNumber:"",source:"",destination:""})
        const token = localStorage.getItem("token");
        const API_URL = import.meta.env.VITE_API_URL;

     
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!token) {
    toast.error("Session expired. Please log in again.");
    return;
  }

  if (!orgName) {
    toast.error("Organization name is missing.");
    return;
  }

  if (
    !formData.routeNumber.trim() ||
    !formData.source.trim() ||
    !formData.destination.trim()
  ) {
    toast.error("Please fill in all route fields.");
    return;
  }

  try {
    const url =
      `${API_URL}/route/${encodeURIComponent(orgName)}`;

    console.log("Creating route at:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        routeNumber: formData.routeNumber.trim(),
        source: formData.source.trim(),
        destination: formData.destination.trim(),
      }),
    });

    const text = await response.text();

    console.log("Route creation status:", response.status);
    console.log("Route creation response:", text);

    if (!response.ok) {
      toast.error(
        `Unable to add route (${response.status}): ${
          text || response.statusText
        }`
      );
      return;
    }

    toast.success(text || "Route added successfully");

    await refreshRoutes();
    onClose();
  } catch (error) {
    console.error("Route creation failed:", error);
    toast.error("Unable to connect to the backend.");
  }
};

    


return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 backdrop-blur-sm sm:p-4">
    <div className="flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:rounded-3xl md:rounded-[32px]">
      <div className="overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-3 sm:mb-7">
          <div className="min-w-0">
            <h1 className="text-2xl font-black text-slate-800 sm:text-3xl">
              Add Route
            </h1>

            <p className="mt-1 text-sm leading-relaxed text-slate-500 sm:text-base">
              Create a new bus route
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="btn btn-circle btn-ghost h-9 min-h-9 w-9 shrink-0 sm:h-10 sm:min-h-10 sm:w-10"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Route Number
            </label>

            <input
              type="text"
              placeholder="300A/21"
              value={formData.routeNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  routeNumber: e.target.value,
                })
              }
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
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
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
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
              className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-base focus:border-cyan-400 focus:outline-none sm:rounded-2xl"
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
              Add Route
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

    }

    export default AddRoutePopUp
