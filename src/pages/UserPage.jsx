import React, { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useParams } from "react-router-dom";

function UserPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);

  const { orgName } = useParams();

  console.log("Organisation:", orgName);


 

  const fetchBuses = async () => {

    try {

      const response = await fetch(
        `${API_URL}/route/org/${orgName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {

        const data = await response.json();

        console.log("ROUTES:", data);

        setRoutes(data);

      } else {

        const text = await response.text();

        // toast.error(text);
      }

    } catch (error) {

      console.error("Fetch Error:", error);

      toast.error("Error in user frontend");
    }
  };



  useEffect(() => {

    if (!orgName) return;

    fetchBuses();

    const interval = setInterval(fetchBuses, 1000);

    return () => clearInterval(interval);

  }, [orgName]);




  useEffect(() => {

    if (!selectedBus) return;

    const updatedBus = routes
      .flatMap(route => route.buses || [])
      .find(bus => bus.id === selectedBus.id);

    if (
      updatedBus &&
      (
        updatedBus.latitude !== selectedBus.latitude ||
        updatedBus.longitude !== selectedBus.longitude
      )
    ) {

      setSelectedBus(updatedBus);
    }

  }, [routes]);



  useEffect(() => {

    if (!selectedRoute) return;

    const updatedRoute = routes.find(
      route => route.id === selectedRoute.id
    );

    if (updatedRoute) {

      setSelectedRoute(updatedRoute);
    }

  }, [routes]);



  const filteredRoutes = routes.filter(route =>
    route.routeNumber
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );




  const isLive =
    selectedBus?.latitude != null &&
    selectedBus?.longitude != null;



return (
  <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50">
    <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 sm:bg-[size:60px_60px]" />

    <div className="relative mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10">
      <div className="relative mb-7 flex flex-col gap-5 pr-1 sm:mb-10 sm:flex-row sm:items-start sm:justify-between sm:pr-16">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 sm:text-sm sm:tracking-[0.3em]">
            SmartBus Tracking
          </p>

          <h1 className="mt-2 text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Track Your Bus
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base lg:text-lg">
            Search a route and track buses in real-time.
          </p>
        </div>

        <Link
          to="/allLogin"
          className="btn btn-circle absolute right-0 top-0 h-11 min-h-11 w-11 border border-slate-200 bg-white shadow-lg transition duration-300 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white sm:static sm:h-12 sm:min-h-12 sm:w-12"
          title="Login Portal"
        >
          🔐
        </Link>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl sm:mb-8 sm:rounded-3xl sm:p-5 md:p-6">
        <input
          type="text"
          placeholder="Search Route Number..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedRoute(null);
            setSelectedBus(null);
          }}
          className="input h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base outline-none transition focus:border-cyan-400 focus:outline-none sm:h-14 sm:rounded-2xl sm:px-5 sm:text-lg"
        />
      </div>

      {!selectedRoute && (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              className="cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg transition duration-300 hover:shadow-2xl sm:rounded-3xl sm:hover:-translate-y-2"
            >
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />

              <div className="p-4 sm:p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Route Number
                </p>

                <h2 className="mb-5 break-words text-4xl font-black text-slate-900 sm:mb-6 sm:text-5xl">
                  {route.routeNumber}
                </h2>

                <div className="flex min-w-0 items-center justify-between gap-2">
                  <span className="min-w-0 flex-1 break-words text-sm font-semibold text-slate-700 sm:text-base">
                    {route.source}
                  </span>

                  <span className="shrink-0 text-2xl text-cyan-500 sm:text-3xl">
                    ⇄
                  </span>

                  <span className="min-w-0 flex-1 break-words text-right text-sm font-semibold text-slate-700 sm:text-base">
                    {route.destination}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {search.trim() !== "" &&
        filteredRoutes.length === 0 &&
        !selectedRoute && (
          <div className="rounded-2xl border border-slate-100 bg-white px-4 py-10 text-center shadow-xl sm:rounded-3xl sm:px-8 sm:py-14 md:rounded-[36px] md:px-12">
            <div className="mb-4 text-6xl sm:mb-6 sm:text-8xl">
              🔍
            </div>

            <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl md:text-4xl">
              Route Not Found
            </h2>

            <p className="break-words text-sm text-slate-500 sm:text-base md:text-lg">
              No route matches "{search}".
            </p>
          </div>
        )}

      {selectedRoute && (
        <>
          <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:mb-8 sm:rounded-3xl sm:p-6 md:rounded-[36px] md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 sm:text-sm">
                  Selected Route
                </p>

                <h2 className="mt-2 break-words text-4xl font-black text-slate-900 sm:text-5xl">
                  {selectedRoute.routeNumber}
                </h2>

                <div className="mt-4 flex min-w-0 items-center gap-2 sm:gap-4">
                  <span className="min-w-0 flex-1 break-words text-sm font-bold text-slate-700 sm:text-base">
                    {selectedRoute.source}
                  </span>

                  <span className="shrink-0 text-2xl text-cyan-500 sm:text-3xl">
                    ⇄
                  </span>

                  <span className="min-w-0 flex-1 break-words text-right text-sm font-bold text-slate-700 sm:text-base">
                    {selectedRoute.destination}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedRoute(null);
                  setSelectedBus(null);
                }}
                className="btn min-h-11 w-full rounded-xl border-slate-200 bg-white text-sm normal-case shadow-sm sm:w-auto sm:rounded-2xl sm:px-5 sm:text-base"
              >
                Change Route
              </button>
            </div>
          </div>

          <h2 className="mb-5 text-2xl font-black text-slate-900 sm:mb-6 sm:text-3xl md:text-4xl">
            Available Buses
          </h2>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="min-w-0 lg:col-span-1">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:rounded-3xl sm:p-5 md:p-6 lg:rounded-[36px]">
                <h2 className="mb-1 text-2xl font-black text-slate-900 sm:text-3xl">
                  Available Buses
                </h2>

                <p className="mb-5 text-sm leading-relaxed text-slate-500 sm:mb-6 sm:text-base">
                  Select a bus to view live tracking.
                </p>

                <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1 sm:max-h-[500px] sm:space-y-4 sm:pr-2 lg:max-h-[700px]">
                  {selectedRoute.buses?.map((bus) => (
                    <div
                      key={bus.id}
                      onClick={() => setSelectedBus(bus)}
                      className={`cursor-pointer rounded-2xl border p-3 transition duration-300 hover:shadow-lg sm:rounded-3xl sm:p-5 ${
                        selectedBus?.id === bus.id
                          ? "border-cyan-400 bg-cyan-50"
                          : "border-slate-100 bg-white"
                      }`}
                    >
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs uppercase tracking-[0.15em] text-slate-400 sm:tracking-[0.2em]">
                            Bus Number
                          </p>

                          <h2 className="mt-1 break-words text-xl font-black text-slate-900 sm:text-2xl">
                            🚌 {bus.busNumber}
                          </h2>

                          <div className="mt-2 flex min-w-0 items-center gap-2">
                            <span className="min-w-0 flex-1 break-words text-xs font-semibold text-slate-600 sm:text-sm">
                              {bus.source || selectedRoute.source}
                            </span>

                            <span className="shrink-0 text-lg font-bold text-cyan-500">
                              →
                            </span>

                            <span className="min-w-0 flex-1 break-words text-right text-xs font-semibold text-slate-600 sm:text-sm">
                              {bus.destination || selectedRoute.destination}
                            </span>
                          </div>
                        </div>

                        {bus.longitude != null &&
                        bus.latitude != null ? (
                          <div className="badge badge-success h-auto shrink-0 px-2 py-2 text-xs sm:px-3">
                            Active
                          </div>
                        ) : (
                          <div className="badge badge-error h-auto shrink-0 px-2 py-2 text-xs sm:px-3">
                            Inactive
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-2">
              {!selectedBus && (
                <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-100 bg-white px-4 py-10 shadow-xl sm:min-h-[400px] sm:rounded-3xl md:min-h-[500px] lg:min-h-[700px] lg:rounded-[36px]">
                  <div className="text-center">
                    <div className="mb-4 text-6xl sm:text-8xl">
                      🚌
                    </div>

                    <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl md:text-4xl">
                      Select a Bus
                    </h2>

                    <p className="text-sm text-slate-500 sm:text-base">
                      Choose a bus from the list to view tracking.
                    </p>
                  </div>
                </div>
              )}

              {selectedBus && isLive && (
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl sm:rounded-3xl lg:rounded-[36px]">
                  <div className="border-b border-slate-100 p-4 sm:p-5 md:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-cyan-500">
                          Live Tracking
                        </p>

                        <h2 className="mt-1 break-words text-2xl font-black text-slate-900 sm:text-3xl md:text-4xl">
                          🚌 {selectedBus.busNumber}
                        </h2>
                      </div>

                      <div className="badge badge-success h-auto w-fit px-3 py-3 text-xs sm:px-4 sm:text-sm">
                        Live Location
                      </div>
                    </div>
                  </div>

                  <div className="h-[350px] w-full sm:h-[450px] md:h-[550px] lg:h-[650px]">
                    <MapContainer
                      key={`${selectedBus.id}-${selectedBus.latitude}-${selectedBus.longitude}`}
                      center={[
                        Number(selectedBus.latitude),
                        Number(selectedBus.longitude),
                      ]}
                      zoom={15}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      <Marker
                        position={[
                          Number(selectedBus.latitude),
                          Number(selectedBus.longitude),
                        ]}
                      >
                        <Popup>
                          🚌 {selectedBus.busNumber}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              )}

              {selectedBus && !isLive && (
                <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-100 bg-white px-4 py-10 shadow-xl sm:min-h-[400px] sm:rounded-3xl md:min-h-[500px] lg:min-h-[700px] lg:rounded-[36px]">
                  <div className="text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-100 text-5xl sm:mb-6 sm:h-28 sm:w-28 sm:text-6xl">
                      📡
                    </div>

                    <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl md:text-4xl">
                      Bus Offline
                    </h2>

                    <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-500 sm:text-base md:text-lg">
                      This bus is currently not sharing its location.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);

}

export default UserPage;