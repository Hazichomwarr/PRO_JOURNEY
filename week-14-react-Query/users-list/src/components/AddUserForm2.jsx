import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const AddUser = async (user) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error adding user");
  return res.json();
};

export default function AddUserForm2() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation(AddUser, {
    onMutate: async (newUser) => {
      await queryClient.cancelQueries("users");
      const prevUsers = queryClient.getQueryData("users");
      const newUserData = { id: Date.now(), name: newUser.name };
      queryClient.setQueryData("users", (oldData) => [...oldData, newUserData]);

      return { prevUsers, newUserData };
    },
    onError: (error, context) => {
      queryClient.setQueryData("users", context.prevUsers);
      console.error("Error adding user:", error);
    },
    onSuccess: (data, newUser) => {
      queryClient.setQueryData("users", (oldData) => {
        return oldData.map((user) =>
          user.name === newUser.name ? newUser : user
        );
      });
      console.log("User added successfully:", data);
      navigate("/users", { state: { message: "User added successfully!" } });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name };
    mutation.mutate(newUser);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-8 mx-auto w-fit">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
        className="p-2 border border-gray-300 rounded"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 ml-2"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? (
          <ThreeDots height={20} width={20} color="blue" />
        ) : (
          "Add User"
        )}
      </button>
      {mutation.isError && (
        <div className="text-red-500">Error: {mutation.error.message}</div>
      )}
    </form>
  );
}
