import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import UserList2 from "./components/UserList2";
import AddUserForm2 from "./components/AddUserForm2";
import PostList from "./components/PostList";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList2 />} />
        <Route path="/new" element={<AddUserForm2 />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="*" element={<>Page Not Found!</>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

// import React from "react";
// import { QueryClient, QueryClientProvider } from "react-query";
// import UserList from "./components/UserList";
// import AddUserForm from "./components/AddUserForm";

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="flex flex-col w-lg items-center mt-8">
//         <h1 className="text-lg font-normal">React Query Users List</h1>
//         <UserList />
//         <AddUserForm />
//       </div>
//     </QueryClientProvider>
//   );
// }

// export default App;
