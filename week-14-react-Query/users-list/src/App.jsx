import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserList } from "./components/UserList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>React Query Users List</h1>
        <UserList />
      </div>
    </QueryClientProvider>
  );
}
