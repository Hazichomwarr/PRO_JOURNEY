import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library

const addUser = async (user) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error("Error adding user");
  }
  return res.json(); //return the added user
};

function AddUserForm() {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(addUser, {
    onMutate: async (newUser) => {
      //Cancel any outgoing requests (optional)
      await queryClient.cancelQueries("users");

      //Snapshot the previous users data
      const previousUsers = queryClient.getQueryData("users");

      //Optimistically update the 'users' query with the new user
      const newUserWithId = { id: uuidv4(), name: newUser.name };

      queryClient.setQueryData("users", (oldData) => [
        ...oldData,
        newUserWithId,
      ]); //generate a temporary ID until the real one comes

      //Return context to revert on error
      return { previousUsers, newUserWithId };
    },

    onError: (error, newUser, context) => {
      //Revert to the previous state if there's an error
      queryClient.setQueryData("users", context.previousUsers);
      console.error("Error adding user:", error);
    },
    onSuccess: (data, newUser) => {
      console.log("newUserID:", newUser.id);
      // When the mutation succeeds, replace the optimistic data with the real user
      queryClient.setQueryData("users", (oldData) => {
        //update the optimistic entry with the real Id from the server
        return oldData.map((user) =>
          user.name === newUser.name ? { ...user, id: newUser.id } : user
        );
      });
      console.log("User added successfully:", data);
    },
    // onSettled: () => {
    //   //Invalidate the 'users' query to trigger a refetch and update the UI
    //   queryClient.invalidateQueries("users");
    // },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name };
    mutation.mutate(newUser);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 ml-2 hover:bg-blue-400"
      >
        {mutation.isLoading ? "Adding..." : "Add User"}
      </button>
      {mutation.isError && (
        <div className="text-red-500">Error: {mutation.error.message}</div>
      )}
    </form>
  );
}

export default AddUserForm;
