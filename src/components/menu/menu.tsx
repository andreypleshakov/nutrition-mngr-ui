import "./menu.css";
import Dashboard from "../../assets/icons/dashboard.svg?react";
import MyFood from "../../assets/icons/myfood.svg?react";
import Stats from "../../assets/icons/stats.svg?react";
import { Link, useLocation } from "react-router-dom";

const pages = [
  {
    name: "Dashboard",
    path: "/",
    iconSrc: Dashboard,
  },
  {
    name: "My Food",
    path: "/myfood",
    iconSrc: MyFood,
  },
//   {
//     name: "Stats",
//     path: "/stats",
//     iconSrc: Stats,
//   },
];

export const Menu = () => {
  const location = useLocation();
  return (
    <nav className="bottom-nav">
      {pages.map((page) => {
        const Icon = page.iconSrc;
        return (
          <div key={page.path}>
            <Link
              to={page.path}
              className={`${
                page.path === location.pathname ? "active" : "inactive"
              }`}
            >
              <Icon />
            </Link>
          </div>
        );
      })}
    </nav>
  );
};
