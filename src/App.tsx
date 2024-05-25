import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetails from "./pages/MovieDetails";
import TvShowDetails from "./pages/TvShowDetails";
import PersonDetails from "./pages/PersonDetails";
import NotFound from "./pages/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "/tv/:id",
        element: <TvShowDetails />,
      },
      {
        path: "/person/:id",
        element: <PersonDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {
  return (
    <div className="relative w-screen flex justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="w-full mx-auto max-container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
