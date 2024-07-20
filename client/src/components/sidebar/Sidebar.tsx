
"use client";

import { Sidebar } from "flowbite-react";
import { HiHome,HiSwitchHorizontal,HiOutlineCurrencyDollar,HiCog } from "react-icons/hi";


const CSideBar= () => {
  const routes = [
    {
      path: "/home",
      title: "Home",
      icon: HiHome, // Placeholder for the icon
    },
    // dashboard: {
    //   path: "/dashboard",
    //   title: "Dashboard",
    //   icon: "dashboard_icon", // Placeholder for the icon
    //   element: null // Placeholder for the component
    // },
    {
      path: "/transactions",
      title: "Transactions",
      icon: HiSwitchHorizontal, // Placeholder for the icon
    },
    {
      path: "/budgets",
      title: "Budgets",
      icon: HiOutlineCurrencyDollar, // Placeholder for the icon
    },
    {
      path: "/settings",
      title: "Settings",
      icon: HiCog, // Placeholder for the icon
    }
  ];
  return (
    <Sidebar className="h-full w-fit">
      <Sidebar.Logo href="" img="/assets/logo.png" imgAlt="bombaclat">
        <div className="flex flex-col items-start">
        <span className="drop-shadow-[0_1.2px_1.2px_rgba(103,156,51,1)] text-slate-50  tracking-tighter   text-2xl font-bold absolute">TRACK</span>
        <span className="ml-2 tracking-tighter  text-lime-700  text-2xl font-bold mt-[-10px]">MONEY</span>
      </div>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        {routes.map((route) => (
              <Sidebar.Item href={route.path} icon={route.icon} label="Pro" labelColor="dark">
                {route.title}
              </Sidebar.Item>
          ))}          
         
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default CSideBar