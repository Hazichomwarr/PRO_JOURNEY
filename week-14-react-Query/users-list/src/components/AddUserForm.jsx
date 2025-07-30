import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const addUser = async (user) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "applicstion/json" },
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
    onSuccess: (data) => {
      //invalidate the 'users' query and refetch the list of users
      queryClient.invalidateQueries("users");
      console.log("User added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding user:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name };
    mutation.mutate(newUser);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user's name"
      />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Adding User..." : "Add User"}
      </button>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
    </form>
  );
}

export default AddUserForm;
