import "./App.css";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Menu } from "./components/menu/menu";

const Dashboard = lazy(() => import("./pages/dashboard"));
const MyFood = lazy(() => import("./pages/my-food"));
const Stats = lazy(() => import("./pages/stats"));

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/myfood" element={<MyFood />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
      <Menu />
    </>
  );
};
