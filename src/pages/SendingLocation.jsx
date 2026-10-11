import React, { useEffect, useState } from "react";

function SendingLocation() {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [gpsStatus, setGpsStatus] = useState("Connecting");
    const [apiStatus, setApiStatus] = useState("Waiting");

    const busNumber = "dkbus";

    const sendLocation = async (lat, lng) => {
        try {
            const response = await fetch(
                `${API_URL}/bus/location`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        longitude: lng,
                        latitude: lat,
                        busNumber: busNumber,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            setApiStatus("Synced");
            await response.text();
        } catch (error) {
            console.error("Fetch Error:", error);
            setApiStatus("Sync Failed");
        }
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setGpsStatus("Not Supported");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                setLatitude(lat);
                setLongitude(lng);
                setGpsStatus("Connected");

                sendLocation(lat, lng);
            },
            (err) => {
                console.error("GPS Error:", err);
                setGpsStatus(
                    err.code === 1
                        ? "Permission Denied"
                        : err.code === 3
                            ? "Request Timed Out"
                            : "Unavailable"
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 px-3 py-8 sm:px-5 sm:py-12">
            <div className="mx-auto w-full max-w-2xl">
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl sm:rounded-[32px]">
                    <div className="h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>

                    <div className="p-5 sm:p-8 md:p-10">
                        <div className="mb-7 flex items-center gap-4 sm:mb-9">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-3xl sm:h-16 sm:w-16">
                                🚌
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 sm:text-sm sm:tracking-[0.3em]">
                                    SmartBus Live
                                </p>

                                <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl md:text-4xl">
                                    GPS Tracking
                                </h1>
                            </div>
                        </div>

                        <div className="mb-6 rounded-2xl bg-slate-50 p-4 sm:p-5">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Bus Number
                            </p>

                            <h2 className="break-words text-xl font-black text-slate-800 sm:text-2xl">
                                {busNumber}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div className="rounded-2xl border border-slate-100 p-4 sm:p-5">
                                <p className="mb-3 text-sm font-medium text-slate-500">
                                    GPS Status
                                </p>

                                <div className="flex items-center gap-2">
                                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                                        gpsStatus === "Connected"
                                            ? "bg-green-500"
                                            : gpsStatus === "Connecting"
                                                ? "animate-pulse bg-amber-500"
                                                : "bg-red-500"
                                    }`}></span>

                                    <span className="break-words text-sm font-bold text-slate-800 sm:text-base">
                                        {gpsStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-100 p-4 sm:p-5">
                                <p className="mb-3 text-sm font-medium text-slate-500">
                                    Server Status
                                </p>

                                <div className="flex items-center gap-2">
                                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                                        apiStatus === "Synced"
                                            ? "bg-green-500"
                                            : apiStatus === "Sync Failed"
                                                ? "bg-red-500"
                                                : "bg-amber-500"
                                    }`}></span>

                                    <span className="break-words text-sm font-bold text-slate-800 sm:text-base">
                                        {apiStatus}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 p-4 sm:mt-7 sm:p-6">
                            <h3 className="mb-4 text-base font-bold text-slate-800 sm:text-lg">
                                Current Coordinates
                            </h3>

                            <div className="space-y-4">
                                <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                                    <span className="text-sm text-slate-500">
                                        Latitude
                                    </span>

                                    <span className="break-all font-mono text-sm font-semibold text-slate-800 sm:text-base sm:text-right">
                                        {latitude !== null
                                            ? latitude.toFixed(6)
                                            : "Waiting for GPS..."}
                                    </span>
                                </div>

                                <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                                    <span className="text-sm text-slate-500">
                                        Longitude
                                    </span>

                                    <span className="break-all font-mono text-sm font-semibold text-slate-800 sm:text-base sm:text-right">
                                        {longitude !== null
                                            ? longitude.toFixed(6)
                                            : "Waiting for GPS..."}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="mt-5 text-center text-xs leading-relaxed text-slate-400 sm:text-sm">
                            Keep location permissions enabled while sharing your live bus location.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SendingLocation;