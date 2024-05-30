import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, sessionId, useAppDispatch, useAppSelector } from "../store";

interface INavbarProps {}

interface NavItem {
  title: string;
  path: null | string;
  submenus?: {
    title: string;
    path: string;
  }[];
}

const Navbar: React.FunctionComponent<INavbarProps> = () => {
  const navItems: NavItem[] = [
    {
      title: "Movies",
      path: null,
      submenus: [
        { title: "Popular", path: "/movies/popular" },
        { title: "Now Playing", path: "/movies/now_playing" },
        { title: "Upcoming", path: "/movies/upcoming" },
        { title: "Top Rated", path: "/movies/top_rated" },
      ],
    },
    {
      title: "Tv Shows",
      path: null,
      submenus: [
        { title: "Popular", path: "/tv/popular" },
        { title: "Airing Today", path: "/tv/airing_today" },
        { title: "Top Rated", path: "/tv/top_rated" },
        { title: "On The Air", path: "/tv/on_the_air" },
      ],
    },
    {
      title: "People",
      path: null,
      submenus: [{ title: "Popular", path: "/people/popular" }],
    },
  ];

  const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const navRef = React.useRef<HTMLDivElement>(null);
  const sessionToken = useAppSelector(sessionId);
  const dispatch = useAppDispatch();

  const handleMouseOver = (title: string) => {
    setOpenSubMenu(title);
  };

  const handleMouseLeave = () => {
    setOpenSubMenu(null);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenus();
    } else {
      setIsMenuOpen(true);
    }
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setOpenSubMenu(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      closeMenus();
    }
  };
  const handleAuthentication = () => {
    if (sessionToken) {
      dispatch(logout());
    } else {
      navigate("/authentication");
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 text-xs md:text-sm border-b border-gray-200 dark:border-gray-600"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <NavLink to="/" onClick={closeMenus}>
          <div>
            <img
              src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
              alt="logo"
              className="h-10 md:h-12 lg:h-14"
            />
          </div>
        </NavLink>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleAuthentication}
          >
            {sessionToken ? "SignOut" : "SignIn/SignUp"}
          </button>

          {/* Hamburger menu */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-md bg-gray-50 max-md:divide-y max-md:divide-gray-100 max-md:dark:divide-gray-600 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navItems.map((item) => (
              <li key={item.title}>
                <div
                  className="relative group"
                  onMouseOver={() => handleMouseOver(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.path ? (
                    <NavLink to={item.path} onClick={closeMenus}>
                      <div className="px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400">
                        {item.title}
                      </div>
                    </NavLink>
                  ) : (
                    <div className="px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400">
                      {item.title}
                    </div>
                  )}
                  {item.submenus && (
                    <div
                      className={`absolute left-0 group-hover:block z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                        openSubMenu === item.title ? "block" : "hidden"
                      }`}
                    >
                      {item.submenus.map((submenu) => (
                        <NavLink
                          key={submenu.path}
                          to={submenu.path}
                          className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                          onClick={closeMenus}
                        >
                          {submenu.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
