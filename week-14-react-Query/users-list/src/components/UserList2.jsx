import { useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) throw new Error("Error fetching users");
  return res.json();
};

export default function UserList2() {
  const { data, isLoading, isError, error } = useQuery("users", getUsers);
  const location = useLocation();
  const { message } = location.state || {};

  const [showMessage, setShowMessage] = useState(!!message);

  //Automatically dismisss the message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  //function to dismiss the message manually
  const dismissMessage = () => {
    setShowMessage(false);
  };

  if (isLoading) return <ThreeDots color="#00bbfff" height={80} width={80} />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="my-6 mx-auto w-1/2 shadow-lg p-10 border rounded-md">
      {showMessage && message && (
        <div className=" flex gap-6 p-4 text-green-500 text-lg text-center font-medium bg-green-100 mb-4 relative">
          <span>{message}</span>
          <button
            className="text-gray-400 bg-gray-100 absolute top-0 right-0 p-2 rounded font-bold"
            onClick={dismissMessage}
          >
            X
          </button>
        </div>
      )}
      <h2 className="font-bold text-lg underline text-red-600">Users List</h2>
      <ul className="list-decimal">
        {data.map((user) => (
          <li key={user.id} className="mt-3 hover:underline">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
