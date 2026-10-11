import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

function AdminDashboardPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);
  const navigate=useNavigate();
  const token = localStorage.getItem("token");
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setUsers(data);
      } else {
        const text = await response.text();
        toast.error(text);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateAccept = async (user) => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userName: user.userName,
          accepted: !user.accepted,
          active: user.active,
        }),
      });

      if (response.status === 200) {
        toast.success("User updated");
        fetchUsers();
      } else {
        const text = await response.text();
        toast.error(text);
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  const updateActive = async (user) => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userName: user.userName,
          accepted: user.accepted,
          active: !user.active,
        }),
      });

      if (response.status === 200) {
        toast.success("User updated");
        fetchUsers();
      } else {
        const text = await response.text();
        toast.error(text);
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };


return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-3 sm:p-5 lg:p-6">
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <p className="mb-2 text-xs sm:text-sm font-bold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-cyan-500">
          ADMIN PORTAL
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-slate-900 break-words">
          Organisation Management
        </h1>

        <p className="mt-2 text-sm sm:text-base lg:text-lg text-slate-500">
          Manage organisation's approvals and access
        </p>
      </div>

      <div className="flex justify-end mb-6 sm:mb-8 lg:mb-10">
        <button
          onClick={() => {
            localStorage.removeItem(token),
            toast.success("Admin successfully logged out"),
            navigate("/allLogin")
          }}
          className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-red-500 text-white shadow-lg shadow-red-200 transition-colors hover:bg-red-600"
        >
          <LogOut size={20} />
        </button>
      </div>

      {users.length === 0 ? (
        <div className="rounded-3xl sm:rounded-[36px] border border-slate-100 bg-white px-4 py-12 sm:p-16 lg:p-20 text-center shadow-xl">
          <div className="mb-5 text-6xl sm:text-7xl lg:text-8xl">
            👥
          </div>

          <h2 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
            No Users Found
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-500">
            No organizations have registered yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white shadow-lg transition duration-300 hover:shadow-2xl md:hover:-translate-y-1"
            >
              <div
                className={`h-1 ${
                  user.accepted
                    ? "bg-green-500"
                    : "bg-orange-400"
                }`}
              ></div>

              <div className="p-4 sm:p-5 lg:p-6">
                <div className="mb-5 sm:mb-6 min-w-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Organization
                  </p>

                  <h2 className="mt-2 break-words text-2xl sm:text-3xl font-black text-slate-900">
                    {user.userName}
                  </h2>
                </div>

                <div className="mb-5 sm:mb-6 space-y-3">
                  <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl sm:rounded-2xl bg-slate-50 p-3">
                    <span className="text-sm sm:text-base font-medium text-slate-600">
                      Approval
                    </span>

                    <div
                      className={`badge shrink-0 ${
                        user.accepted
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {user.accepted ? "Approved" : "Pending"}
                    </div>
                  </div>

                  <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl sm:rounded-2xl bg-slate-50 p-3">
                    <span className="text-sm sm:text-base font-medium text-slate-600">
                      Status
                    </span>

                    <div
                      className={`badge shrink-0 ${
                        user.active
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={() => updateAccept(user)}
                    className={`btn min-h-11 h-auto w-full whitespace-normal rounded-xl sm:rounded-2xl border-0 px-2 text-xs sm:text-sm md:text-base text-white ${
                      user.accepted
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {user.accepted ? "Revoke" : "Approve"}
                  </button>

                  <button
                    onClick={() => updateActive(user)}
                    className={`btn min-h-11 h-auto w-full whitespace-normal rounded-xl sm:rounded-2xl border-0 px-2 text-xs sm:text-sm md:text-base text-white ${
                      user.active
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-cyan-500 hover:bg-cyan-600"
                    }`}
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}

export default AdminDashboardPage;