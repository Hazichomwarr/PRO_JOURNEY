//components/layout/EditProfileForm.tsx
import React, { useState } from "react";
import { updateUser } from "../../../api/userApi";
import { UserPublic, useUserStore } from "../../../store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function EditProfileForm() {
  const { user, setUser } = useUserStore();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    city: user?.city ?? "",
    state: user?.state ?? "",
  });

  // const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
  //   "idle"
  // );

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateUser, // error: Type '(id: string, updates: Partial<UserPublic>) => Promise<any>' is not assignable to type 'MutationFunction<UserPublic, string>'.
    onSuccess: (updatedUser: UserPublic) => {
      setUser(updatedUser); //in Zustand
      queryClient.setQueryData(["user"], updatedUser); //sync React Query cache
    },
  });

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setStatus("saving");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    //setStatus("done")
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData); //ts yells: Argument of type '{ firstName: string; lastName: string; email: string; phone: string; city: string; state: string; }' is not assignable to parameter of type 'string'.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white rounded-xl shadow p-6 space-y-5"
    >
      <h2>Edit Profile</h2>

      {/* First + Last + Email */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 rounded-md w-full"
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-2 rounded-md w-full"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border p-2 rounded-md w-full"
        />
      </div>

      {/* City + State */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="border p-2 rounded-md w-full"
        />
        <input
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          className="border p-2 rounded-md w-full"
        />
      </div>

      {/* Update feedback */}
      <div className="flex justify-end">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all">
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {isSuccess && (
        <p className="text-green-600 text-sm font-medium text-center">
          Profile updated successfully ✅
        </p>
      )}
    </form>
  );
}
