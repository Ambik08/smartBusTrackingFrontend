import React from "react";

function StopCard({ stop, onEdit, onDelete }) {


return (
  <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:border-cyan-200 hover:shadow-lg sm:mb-4 sm:rounded-3xl sm:p-5 md:p-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-sm font-bold text-cyan-700">
            {stop.stopOrder}
          </span>

          <h3 className="break-words text-lg font-bold text-slate-800 sm:text-xl">
            {stop.stopName}
          </h3>
        </div>

        <div className="mt-3 space-y-2 rounded-xl bg-slate-50 p-3 sm:rounded-2xl sm:p-4">
          <p className="break-all text-sm text-slate-600 sm:text-base">
            <span className="font-semibold text-slate-700">
              Latitude:
            </span>{" "}
            {stop.latitude}
          </p>

          <p className="break-all text-sm text-slate-600 sm:text-base">
            <span className="font-semibold text-slate-700">
              Longitude:
            </span>{" "}
            {stop.longitude}
          </p>
        </div>
      </div>

      <div className="flex w-full gap-3 sm:w-auto sm:shrink-0">
        <button
          onClick={onEdit}
          className="btn min-h-10 flex-1 rounded-xl border-0 bg-cyan-500 px-4 text-white hover:bg-cyan-600 sm:flex-none sm:rounded-2xl"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="btn min-h-10 flex-1 rounded-xl border-0 bg-red-500 px-4 text-white hover:bg-red-600 sm:flex-none sm:rounded-2xl"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
}

export default StopCard;