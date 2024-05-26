import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetails from "./pages/MovieDetails";
import TvShowDetails from "./pages/TvShowDetails";
import PersonDetails from "./pages/PersonDetails";
import NotFound from "./pages/NotFound";
import { MoviesPage } from "./pages/MoviesPage";
import { TvShowsPage } from "./pages/TvShowsPage";
import { PersonPage } from "./pages/PersonPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <div className="w-full h-20"></div>
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
        path: "/movie/details/:id",
        element: <MovieDetails />,
      },
      {
        path: "/movies/:category",
        element: <MoviesPage />,
      },
      {
        path: "/tv/details/:id",
        element: <TvShowDetails />,
      },
      {
        path: "/tv/:category",
        element: <TvShowsPage />,
      },
      {
        path: "/people/details/:id",
        element: <PersonDetails />,
      },
      {
        path: "/people/:category",
        element: <PersonPage />,
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
    <div className="relative w-screen min-h-screen flex justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="w-full mx-auto max-container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
