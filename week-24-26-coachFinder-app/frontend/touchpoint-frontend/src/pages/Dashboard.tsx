//pages/dashboard.tsx
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/userApi";
import { LoaderIcon } from "lucide-react";

export default function Dashboard() {
  console.log("inside dashboard..");
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: 1,
  });

  // 3. Display the Loading State and Message
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <LoaderIcon className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (isError) return <p>Error loading user data</p>;
  if (!user) return null;

  console.log("USER ->", user); //all-Users

  return (
    <div>
      <h1>Welcome back, {user.firstName}!</h1>
      <p className="text-gray-600 mt-2">
        Email: {user.email} <br />
        Role: {user.role}
      </p>
    </div>
  );
}

// // pages/Dashboard.tsx
// import { useEffect, useState } from "react";
// import { LoaderIcon } from "lucide-react";
// import axiosClient from "../lib/axiosClient";

// export default function Dashboard() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   console.log("inside dashboard..");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         console.log("Fetching current user...");
//         const res = await axiosClient.get("/users/me"); // simple endpoint
//         console.log("Response received:", res);
//         setUser(res.data);
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         setError("Failed to fetch user");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex flex-col items-center justify-center gap-3">
//         <LoaderIcon className="w-8 h-8 animate-spin text-blue-500" />
//         <span>Loading...</span>
//       </div>
//     );

//   if (error) return <p>{error}</p>;
//   if (!user) return <p>No user data</p>;
//   console.log("user ->", user);
//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-semibold">
//         Welcome back, {user[0].firstName}
//       </h1>
//       <p className="text-gray-600 mt-2">Email: {user[0].email}</p>
//     </div>
//   );
// }
