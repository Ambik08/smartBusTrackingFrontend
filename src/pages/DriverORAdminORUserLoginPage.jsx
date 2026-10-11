import React from 'react'
import { Link } from 'react-router'
import { ArrowLeft } from "lucide-react";
function DriverORAdminORUserLoginPage() {

return (
  <div className="relative flex min-h-screen min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 px-3 py-8 sm:px-5 sm:py-10 lg:px-6 lg:py-12">
    <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-200 opacity-20 blur-3xl sm:left-0 sm:top-0 sm:h-[500px] sm:w-[500px]"></div>

    <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-200 opacity-20 blur-3xl sm:bottom-0 sm:right-0 sm:h-[500px] sm:w-[500px]"></div>

    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:35px_35px] opacity-40 sm:bg-[size:60px_60px]"></div>

    <div className="relative z-10 mx-auto w-full max-w-5xl">
      <div className="relative mb-10 text-center sm:mb-12 lg:mb-16">
        <Link
          to="/"
          className="btn btn-circle absolute right-0 top-0 z-10 h-10 min-h-10 w-10 border border-slate-200 bg-white text-slate-700 shadow-md transition duration-300 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white sm:h-12 sm:min-h-12 sm:w-12"
          title="Back to Login Portal"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </Link>

        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-100 to-blue-100 text-4xl shadow-xl shadow-cyan-100 sm:mb-7 sm:h-24 sm:w-24 sm:text-5xl lg:mb-8 lg:h-28 lg:w-28 lg:rounded-[32px] lg:text-6xl">
          🚌
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-500 sm:text-sm sm:tracking-[0.35em]">
          SmartBus Platform
        </p>

        <h1 className="mt-3 break-words text-4xl font-black text-slate-900 sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl">
          SmartBus
        </h1>

        <p className="mx-auto mt-4 max-w-2xl px-2 text-base leading-relaxed text-slate-500 sm:mt-5 sm:text-lg lg:text-xl">
          A modern platform for organizations, drivers and passengers to
          manage, monitor and track buses in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <Link
          to="/login"
          className="group flex min-w-0 flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-lg transition duration-300 hover:shadow-2xl sm:p-7 lg:rounded-[36px] lg:p-8 md:hover:-translate-y-2"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-4xl transition duration-300 group-hover:scale-110 sm:mb-6 sm:h-20 sm:w-20 sm:rounded-3xl sm:text-5xl">
            🏢
          </div>

          <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">
            Organization
          </h2>

          <p className="mb-6 flex-1 leading-relaxed text-slate-500 sm:mb-8">
            Manage routes, buses and monitor live tracking from your dashboard.
          </p>

          <div className="btn min-h-12 w-full rounded-xl border-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm text-white hover:from-cyan-600 hover:to-blue-600 sm:rounded-2xl sm:text-base">
            Organisation Login →
          </div>
        </Link>

        <Link
          to="/bus/login"
          className="group flex min-w-0 flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-lg transition duration-300 hover:shadow-2xl sm:p-7 lg:rounded-[36px] lg:p-8 md:hover:-translate-y-2"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-4xl transition duration-300 group-hover:scale-110 sm:mb-6 sm:h-20 sm:w-20 sm:rounded-3xl sm:text-5xl">
            🚍
          </div>

          <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">
            Driver
          </h2>

          <p className="mb-6 flex-1 leading-relaxed text-slate-500 sm:mb-8">
            Start rides, share live GPS location and update passengers in
            real-time.
          </p>

          <div className="btn min-h-12 w-full rounded-xl border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-sm text-white hover:from-green-600 hover:to-emerald-600 sm:rounded-2xl sm:text-base">
            Bus Login →
          </div>
        </Link>

        <Link
          to="/admin/login"
          className="group flex min-w-0 flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-lg transition duration-300 hover:shadow-2xl sm:p-7 lg:rounded-[36px] lg:p-8 md:col-span-2 md:mx-auto md:w-full md:max-w-xl lg:col-span-1 lg:max-w-none md:hover:-translate-y-2"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-4xl transition duration-300 group-hover:scale-110 sm:mb-6 sm:h-20 sm:w-20 sm:rounded-3xl sm:text-5xl">
            🛡️
          </div>

          <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">
            Admin
          </h2>

          <p className="mb-6 flex-1 leading-relaxed text-slate-500 sm:mb-8">
            Control organizations, approve registrations and manage the entire
            SmartBus platform.
          </p>

          <div className="btn min-h-12 w-full rounded-xl border-0 bg-gradient-to-r from-violet-500 to-indigo-500 text-sm text-white hover:from-violet-600 hover:to-indigo-600 sm:rounded-2xl sm:text-base">
            Admin Login →
          </div>
        </Link>
      </div>
    </div>
  </div>
);

}

export default DriverORAdminORUserLoginPage
