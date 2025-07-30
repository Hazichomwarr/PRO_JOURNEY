import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col w-lg items-center mt-8">
        <h1 className="text-lg font-normal">React Query Users List</h1>
        <UserList />
        <AddUserForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
