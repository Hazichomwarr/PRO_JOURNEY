//components/layout/UserProfileForm.tsx
import React, { useEffect, useState } from "react";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import { useFlashStore } from "../../store/flashStore";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import InputField from "../../components/ui/InputField";
import { useAuthStore } from "../../store/authStore";

export default function EditUserProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const { state, dispatch, handleChange } = useRegisterForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get(`/users/${user?.id}`);
        console.log("res.data ->", res.data);
        const userData = res.data;

        // preload reducer fields
        Object.entries(userData).forEach(([key, value]) => {
          if (key === "image") {
            dispatch({
              type: "SET_FIELD",
              field: key as any,
              value: value != null ? String(value) : "",
            });
          } else {
            dispatch({
              type: "SET_FIELD",
              field: key as any,
              value: value != null ? String(value) : "",
            });
          }
        });
      } catch (err) {
        useFlashStore.getState().addFlash("Could not load user", "error");
        navigate("/dashboard/settings");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("firstName", state.firstName);
      formData.append("lastName", state.lastName);
      formData.append("email", state.email);
      formData.append("phone", state.phone);
      formData.append("city", state.city);
      formData.append("state", state.state);

      //Append file ONLY if file object exists
      if (state.image instanceof File) {
        formData.append("image", state.image);
      }
      const res = await axiosClient.patch(`/users/${user?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      //Auto refresh the UI to get the updated data
      setUser(res.data);

      useFlashStore
        .getState()
        .addFlash("Profile Updated successfully!", "success");
      navigate("/dashboard/overview");
    } catch (err: any) {
      console.log("Registration error:", err.response?.data || err.message);
      useFlashStore
        .getState()
        .addFlash("Something went wrong. Try again later", "info");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="w-full">
      <form
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-md space-y-4"
        onSubmit={handleUpdate}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Update your Profile
        </h2>

        {/* NAME */}
        <div className="grid grid-cols-2 gap-3">
          <InputField
            value={state.firstName}
            changeFn={handleChange("firstName")}
            type="text"
            placeholder="First Name"
          />
          <InputField
            value={state.lastName}
            changeFn={handleChange("lastName")}
            type="text"
            placeholder="Last Name"
          />
        </div>

        {/* CONTACT */}
        <div className="grid grid-cols-2 gap-3">
          <InputField
            value={state.email}
            changeFn={handleChange("email")}
            type="email"
            placeholder="Email"
          />
          <InputField
            value={state.phone}
            changeFn={handleChange("phone")}
            type="text"
            placeholder="Phone"
          />
        </div>

        {/* LOCATION */}
        <div className="grid grid-cols-2 gap-3">
          <InputField
            value={state.city}
            changeFn={handleChange("city")}
            type="text"
            placeholder="City"
          />
          <InputField
            value={state.state}
            changeFn={handleChange("state")}
            type="text"
            placeholder="State"
          />
        </div>

        {/* IMAGE */}
        <label className="flex items-center gap-6 text-gray-700">
          <span>{state.image ? "Change Picture" : "Add Picture"}</span>

          <input type="file" onChange={handleChange("image")} />
        </label>

        {/* Save button*/}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
