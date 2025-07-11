import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Blog, PostsContext } from "./pages/Blog";
import { Post } from "./pages/Post";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />}>
          <Route path=":id" element={<Post />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
