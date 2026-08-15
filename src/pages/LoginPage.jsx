import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!emailPattern.test(formData.email)) {
      errs.email = "Please provide a valid email format";
    }

    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 6) {
      errs.password = "Password must contain at least 6 characters";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(
      login({ email: formData.email, token: "session_auth_token_349872" })
    );
    navigate("/");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-sm w-full bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="text-center mb-5">
          <span className="bg-sky-600 text-white font-bold text-base px-2 py-0.5 rounded">
            TM
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-3">
            Account Sign In
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Authenticate to persist your session preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              placeholder="user@domain.com"
              className={`w-full border rounded px-3 py-1.5 text-xs focus:outline-none ${
                errors.email
                  ? "border-rose-500"
                  : "border-slate-300 focus:border-sky-500"
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              placeholder="••••••••"
              className={`w-full border rounded px-3 py-1.5 text-xs focus:outline-none ${
                errors.password
                  ? "border-rose-500"
                  : "border-slate-300 focus:border-sky-500"
              }`}
            />
            {errors.password && (
              <p className="text-[11px] text-rose-600 mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded text-xs font-bold transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
