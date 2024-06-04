import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import React, { Suspense } from "react";
import LoginComponent from "./components/Authentication";
import { ProfilePage } from "./pages/ProfilePage";
import { sessionId, useAppSelector } from "./store";

const Navbar = React.lazy(() => import("./components/Navbar"));
const Footer = React.lazy(() => import("./components/Footer"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const MovieDetails = React.lazy(() => import("./pages/MovieDetails"));
const MoviesPage = React.lazy(() => import("./pages/MoviesPage"));
const TvShowDetails = React.lazy(() => import("./pages/TvShowDetails"));
const TvShowsPage = React.lazy(() => import("./pages/TvShowsPage"));
const PersonDetails = React.lazy(() => import("./pages/PersonDetails"));
const PersonPage = React.lazy(() => import("./pages/PersonPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

interface IAppProps {}
const App: React.FC<IAppProps> = () => {
  const sessionToken = useAppSelector(sessionId);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Suspense fallback={<div>Navbar...</div>}>
            <Navbar />
          </Suspense>
          <div className="w-full h-20"></div>
          <Suspense fallback={<div>Content...</div>}>
            <Outlet />
          </Suspense>
          <Suspense fallback={<div>Footer...</div>}>
            <Footer />
          </Suspense>
        </>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>HomePage...</div>}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "/movie/details/:id",
          element: (
            <Suspense fallback={<div>MovieDetails...</div>}>
              <MovieDetails />
            </Suspense>
          ),
        },
        {
          path: "/movies/:category",
          element: (
            <Suspense fallback={<div>MoviesPage...</div>}>
              <MoviesPage />
            </Suspense>
          ),
        },
        {
          path: "/tv/details/:id",
          element: (
            <Suspense fallback={<div>TvShowDetails...</div>}>
              <TvShowDetails />
            </Suspense>
          ),
        },
        {
          path: "/tv/:category",
          element: (
            <Suspense fallback={<div>TvShowsPage...</div>}>
              <TvShowsPage />
            </Suspense>
          ),
        },
        {
          path: "/person/details/:id",
          element: (
            <Suspense fallback={<div>PersonDetails...</div>}>
              <PersonDetails />
            </Suspense>
          ),
        },
        {
          path: "/people/:category",
          element: (
            <Suspense fallback={<div>PersonPage...</div>}>
              <PersonPage />
            </Suspense>
          ),
        },
        {
          path: "/authentication",
          element: (
            <Suspense fallback={<div>Authentication...</div>}>
              <LoginComponent />
            </Suspense>
          ),
        },
        {
          path: "/profile/:username",
          element: (
            <Suspense fallback={<div>Profile...</div>}>
              <div>
                {sessionToken ? (
                  <ProfilePage />
                ) : (
                  <Navigate to="/authentication" />
                )}
              </div>
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<div>NotFound...</div>}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return (
    <div className="relative w-screen min-h-screen flex justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="w-full mx-auto max-container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
