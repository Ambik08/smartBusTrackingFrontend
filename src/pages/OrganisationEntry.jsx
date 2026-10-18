
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function OrganisationEntry() {
  const [organisationName, setOrganisationName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = organisationName.trim();

    if (!name) {
      setError("Please enter your organisation name.");
      return;
    }

    setError("");

    navigate(`/${encodeURIComponent(name)}`);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 px-4 py-8 sm:px-6">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 sm:bg-[size:60px_60px]" />

      <div className="relative w-full max-w-lg">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-3xl shadow-lg shadow-cyan-200 sm:h-20 sm:w-20 sm:rounded-3xl sm:text-4xl">
            🚌
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 sm:text-sm sm:tracking-[0.3em]">
            SmartBus Tracking
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Welcome 
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500 sm:text-base">
            Enter your organisation name to view buses in your organisation.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-8 md:rounded-[32px] md:p-10">
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
              Find Your Organisation
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Enter the name of your college, school, or transport organisation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="organisationName"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Organisation Name
              </label>

              <input
                id="organisationName"
                type="text"
                placeholder="e.g. Sreenidhi Institute of Science and Technology"
                value={organisationName}
                onChange={(e) => {
                  setOrganisationName(e.target.value);
                  setError("");
                }}
                className={`input h-14 w-full rounded-xl border bg-slate-50 px-4 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none sm:rounded-2xl ${
                  error
                    ? "border-red-400 focus:border-red-400"
                    : "border-slate-200 focus:border-cyan-400"
                }`}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "organisation-error" : undefined}
              />

              {error && (
                <p
                  id="organisation-error"
                  className="mt-2 text-sm text-red-500"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn h-12 min-h-12 w-full rounded-xl border-0 bg-cyan-500 text-base font-bold text-white shadow-lg shadow-cyan-100 transition duration-300 hover:bg-cyan-600 sm:h-14 sm:min-h-14 sm:rounded-2xl"
            >
              Continue
              <span className="ml-1 text-xl">→</span>
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-xs text-slate-400">SMARTBUS PORTAL</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <p className="text-center text-xs leading-relaxed text-slate-500 sm:text-sm">
            Need access to the administration portal?{" "}
            <Link
              to="/allLogin"
              className="font-bold text-cyan-600 hover:text-cyan-700"
            >
              Login here
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          SmartBus Tracking · Smarter journeys, simpler travel.
        </p>
      </div>
    </div>
  );
}

export default OrganisationEntry;
