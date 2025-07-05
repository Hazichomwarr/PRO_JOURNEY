import { useState } from "react";
import { Form } from "./components/Form";

export default function App() {
  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {}; //defining beforehand the errors object

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.includes("@")) newErrors.email = "Invalid email format";
    if (!email.includes(".")) newErrors.email = "Invalid email format";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("✅ Submitted:", { name, email });
    }
  }

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">📝 Raw Form</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border bg-white rounded"
      >
        <Form />
        {/* <div className="mb-4">
          <label htmlFor="name" className="font-semibold block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="font-semibold block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:cursor-not-allowed"
          // disabled={Object.keys(errors).length !== 0}
        >
          Submit
        </button> */}
      </form>
    </main>
  );
}
