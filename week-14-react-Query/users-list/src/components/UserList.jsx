import { useQuery } from "react-query";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Error fetching users");
  }
  return res.json();
};

function UserList() {
  const { data, isLoading, isError, error } = useQuery("users", fetchUsers);

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error: {error.message} </div>;

  return (
    <div className="m-6">
      <h2 className="font-medium text-lg underline text-red-500">Users List</h2>
      <ul className="list-decimal">
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
