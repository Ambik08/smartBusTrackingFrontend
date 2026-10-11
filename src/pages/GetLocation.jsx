import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function RecenterButton({ position }) {
  const map = useMap();

  return (
    <button
      type="button"
      style={{
        position: "absolute",
        zIndex: 1000,
        top: "max(12px, env(safe-area-inset-top))",
        right: "max(12px, env(safe-area-inset-right))",
      }}
      className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-sm font-semibold text-slate-700 shadow-lg backdrop-blur-md transition duration-200 hover:bg-cyan-500 hover:text-white active:scale-95 sm:min-h-11 sm:rounded-2xl sm:px-4 sm:text-base"
      onClick={() => map.flyTo(position, 16)}
    >
      Recenter <span>📍</span>
    </button>
  );
}

function GetLocation() {
  const [position, setPosition] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newPosition = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        setPosition(newPosition);
        setInitialPosition((previousPosition) =>
          previousPosition ?? newPosition
        );
        setLocationError("");
      },
      (err) => {
        setLocationError(
          err.code === 1
            ? "Location permission denied. Please allow location access."
            : err.code === 3
              ? "Location request timed out. Please try again."
              : "Unable to get your location. Please check your GPS."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!initialPosition || !position) {
    return (
      <div className="flex min-h-[350px] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-cyan-50 px-5 py-10 text-center sm:min-h-[450px] sm:rounded-3xl">
        <div className="max-w-sm">
          <div className="mb-4 text-4xl">📍</div>
          <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
            {locationError ? "Location Unavailable" : "Getting Location..."}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            {locationError ||
              "Please allow location access and wait while we find your current position."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 shadow-lg sm:rounded-3xl">
      <MapContainer
        center={initialPosition}
        zoom={16}
        style={{
          height: "clamp(350px, 65vh, 700px)",
          minHeight: "350px",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>You are here 📍</Popup>
        </Marker>

        <RecenterButton position={position} />
      </MapContainer>
    </div>
  );
}

export default GetLocation;
