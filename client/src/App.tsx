import { DarkThemeToggle } from "flowbite-react";
import CSideBar from "./components/sidebar/Sidebar";
import Home from "./main/Home";
import { Transactions } from "./main/transactions/Transactions";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Budgets } from "./main/budgets/Budgets";
import {Settings} from "./main/settings/Settings";
import { Login } from "./main/login/Login";
import {useState} from 'react';
import Register from "./main/register/Register";
import CreateProfile from "./main/profile/createProfile";
import ProtectedRoute from "./components/protected/Protected";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home/>, // Component for Home
      protected: true
    },
    // dashboard: {
    //   path: "/dashboard",
    //   title: "Dashboard",
    //   icon: "dashboard_icon", // Placeholder for the icon
    //   element: null // Placeholder for the component
    // },
    {
      path: "/transactions",
      element: <Transactions/>,
      protected: true
      //   Component for Transactions
    },
    {
      path: "/budgets",
      element: <Budgets/>,
      protected: true
      // Component for Budgets
    },
    {
      path: "/settings",

      element: <Settings/>,
      protected: true
      // Component for Settings
    },
    {
      path: "/login",
      element:<Login/>,
      protected: false

    },
    {
      path: "/register",
      element:<Register/>,
      protected: false

    },
    {
      path:"/create-profile",
      element:<CreateProfile/>,
      protected: true
    }
  ];

  return (
    <Router>
      <div className="App flex justify-center h-screen w-screen bg-gray-100">
      <Routes>
      {routes.map((route, index) => (
                  route.protected ? 
                    <Route 
                    key={index} 
                      path={route.path} 
                      element={<ProtectedRoute>{route.element}</ProtectedRoute>} 
                      />
                      : 
                    <Route 
                      key={index} 
                      path={route.path} 
                      element={route.element} 
                    />
                ))}
                </Routes>
      </div>
    </Router>
  );
}

export default App;
