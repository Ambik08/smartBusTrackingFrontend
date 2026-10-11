import { div, h1, p } from 'framer-motion/client';
import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
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
  const API_URL = import.meta.env.VITE_API_URL;
  const map = useMap();

  return (
    <button
      style={{
        position: "absolute",
        zIndex: 1000,
        top: 10,
        right: 10,
        padding: "10px",
      }}
      onClick={() => map.flyTo(position, 16)}
    >
      Recenter 📍
    </button>
  );
}
function BusDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
    const [latitude, setLatitude] = useState(null);
    const [position, setPosition] = useState(null);
    const [initialPosition, setInitialPosition] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const busNumber = "dkbus";
    const navigate = useNavigate();
    const [rideStarted, setRideStarted] = useState(false);
    const {id} = useParams();
    const [direction, setDirection] = useState("");
    const [resData,setResData]=useState({})
    const token = localStorage.getItem("token");
    const handleToggle = () => {
        setRideStarted(!rideStarted);
    };
    useEffect(()=>{
        const fetchBus = async ()=>{
            try { 
                const response = await fetch(`${API_URL}/bus/${id}`,
                    {
                        method: "GET",
                        headers: {"Content-Type": "application/json",Authorization: `Bearer ${token}`},
                    }
                );
                if(response.status===200){
                    const data = await response.json();
                    setResData(data);
                }
                else{
                    const text =await response.text();
                    toast.error(text);
                }
            } 
            catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Error in busDashboard frontend");
            }
        }
        fetchBus()
    },[])
    

    useEffect(() => {
    const fetchData = async () => {
            if(!rideStarted){
                setLatitude(null)
                setLongitude(null)
                setPosition(null);
                setInitialPosition(null);
                const response = await fetch(`${API_URL}/bus/busLoc/${id}`,{
                        method: "PUT",
                        headers: {"Content-Type": "application/json",Authorization: `Bearer ${token}`},
                    }
                );
                const text =await response.text();
                if(response.status===200){
                    toast.success("Location updated to null")
                }
                else{
                    toast.error(text);
                }
            }
            
        };
        fetchData();
    }, [rideStarted]);

    const sendLocation = async (lat, lng) => {
        console.log("sendLocation called");
            try {
                    const response = await fetch(`${API_URL}/bus/location`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                id:id,
                                longitude: lng,
                                latitude: lat,
                                busNumber: resData.busNumber,
                            }),
                        }
                    );
                    console.log("Status:", response.status);
                    const text = await response.text();
                    console.log("Response:", text);
                } 
                catch (error) {
                    console.error("Fetch Error:", error);
        }
    }
    useEffect(() => {
        if (!rideStarted) return;
        console.log("SendingLocation Mounted");
        if (!navigator.geolocation) {
            console.log("Geolocation not supported");
            return;
        }
        const watchId = navigator.geolocation.watchPosition((pos) => {
            console.log("GPS Callback Running");
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            console.log("Latitude:", lat);
            console.log("Longitude:", lng);

            setLatitude(lat);
            setLongitude(lng);
            setPosition([lat, lng]);
            if (!initialPosition) {
                setInitialPosition([lat, lng]);
            }
            sendLocation(lat, lng);
        },
        (err) => {

            console.log("GPS Error:", err);

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
}, [rideStarted]);


return (
  <>
    {!rideStarted ? (
      <div className="flex min-h-screen min-h-[100dvh] items-center justify-center bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-3 sm:p-5 lg:p-6">
        <div className="w-full max-w-4xl">
          <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-2xl sm:rounded-[32px] sm:p-7 md:rounded-[40px] md:p-10">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-cyan-500 sm:text-sm sm:tracking-[0.3em]">
              SmartBus Live
            </p>

            <div className="mb-5 flex justify-end sm:mb-8">
              <button
                onClick={() => navigate("/allLogin")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg shadow-red-200 transition-colors hover:bg-red-600 sm:h-12 sm:w-12 sm:rounded-2xl"
              >
                <LogOut size={20} />
              </button>
            </div>

            <h1 className="break-words text-center text-4xl font-black text-slate-800 sm:text-6xl md:text-7xl">
              {resData.busNumber}
            </h1>

            <p className="mt-3 text-center text-base text-slate-500 sm:mt-4 sm:text-lg">
              Ready for departure
            </p>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
              <button
                onClick={() => setDirection("one")}
                className={`min-w-0 rounded-2xl border-2 p-5 text-left transition duration-300 sm:rounded-3xl sm:p-7 md:rounded-[32px] md:p-8 ${
                  direction === "one"
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 hover:border-cyan-300"
                }`}
              >
                <p className="mb-3 text-xs uppercase tracking-widest text-slate-500 sm:mb-4 sm:text-sm">
                  Forward Route
                </p>

                <h2 className="break-words text-2xl font-black text-slate-800 sm:text-3xl">
                  {resData.source}
                </h2>

                <div className="my-3 text-3xl text-cyan-500 sm:my-4 sm:text-4xl">
                  →
                </div>

                <h2 className="break-words text-2xl font-black text-slate-800 sm:text-3xl">
                  {resData.destination}
                </h2>
              </button>

              <button
                onClick={() => setDirection("two")}
                className={`min-w-0 rounded-2xl border-2 p-5 text-left transition duration-300 sm:rounded-3xl sm:p-7 md:rounded-[32px] md:p-8 ${
                  direction === "two"
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 hover:border-cyan-300"
                }`}
              >
                <p className="mb-3 text-xs uppercase tracking-widest text-slate-500 sm:mb-4 sm:text-sm">
                  Return Route
                </p>

                <h2 className="break-words text-2xl font-black text-slate-800 sm:text-3xl">
                  {resData.destination}
                </h2>

                <div className="my-3 text-3xl text-cyan-500 sm:my-4 sm:text-4xl">
                  →
                </div>

                <h2 className="break-words text-2xl font-black text-slate-800 sm:text-3xl">
                  {resData.source}
                </h2>
              </button>
            </div>

            <div className="mt-7 flex justify-center sm:mt-9 md:mt-12">
              <button
                onClick={handleToggle}
                className="btn h-12 min-h-12 w-full max-w-sm rounded-xl border-0 bg-cyan-500 px-6 text-base text-white shadow-xl transition-colors hover:bg-cyan-600 sm:h-14 sm:min-h-14 sm:rounded-2xl sm:text-lg"
              >
                BEGIN JOURNEY
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="relative h-screen h-[100dvh] w-full overflow-hidden">
        {position && initialPosition && (
          <MapContainer
            center={initialPosition}
            zoom={16}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Popup>
                🚌 {resData.busNumber}
              </Popup>
            </Marker>

            <RecenterButton position={position} />
          </MapContainer>
        )}

        <div className="absolute left-3 right-3 top-3 z-[1000] sm:left-5 sm:right-5 sm:top-5">
          <div className="rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-5 md:rounded-[32px] md:p-6">
            <div className="flex min-w-0 items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500 sm:text-xs sm:tracking-[0.3em]">
                  Live Tracking
                </p>

                <h1 className="mt-1 break-words text-2xl font-black text-slate-800 sm:text-3xl md:text-4xl">
                  {resData.busNumber}
                </h1>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse sm:h-3 sm:w-3"></div>

                <span className="text-sm font-bold text-green-600 sm:text-base">
                  LIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 z-[1000] sm:bottom-5 sm:left-5 sm:right-5">
          <div className="rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-5 md:rounded-[32px] md:p-6">
            <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between md:gap-5">
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs text-slate-500 sm:text-sm">
                  Current Route
                </p>

                <h2 className="break-words text-lg font-black leading-snug text-slate-800 sm:text-xl md:text-2xl">
                  {direction === "one"
                    ? `${resData.source} → ${resData.destination}`
                    : `${resData.destination} → ${resData.source}`}
                </h2>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                <p className="text-xs text-slate-500 sm:text-sm">
                  GPS Status
                </p>

                <h2 className="text-sm font-bold text-green-600 sm:text-base">
                  Connected
                </h2>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="fixed bottom-36 right-4 z-[1200] flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-sm font-black text-white shadow-2xl transition-colors hover:bg-red-600 sm:bottom-40 sm:right-6 sm:h-20 sm:w-20 sm:text-base md:bottom-32 md:right-8 md:h-24 md:w-24"
        >
          STOP
        </button>
      </div>
    )}
  </>
);

}

export default BusDashboard


