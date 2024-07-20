import { DarkThemeToggle } from "flowbite-react";
import CSideBar from "./components/sidebar/Sidebar";
import Home from "./main/Home";
import { Transactions } from "./main/transactions/Transactions";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Budgets } from "./main/budgets/Budgets";
import {Settings} from "./main/settings/Settings";

function App() {
  const routes = [
    {
      path: "/home",
      element: <Home/> // Component for Home
    },
    // dashboard: {
    //   path: "/dashboard",
    //   title: "Dashboard",
    //   icon: "dashboard_icon", // Placeholder for the icon
    //   element: null // Placeholder for the component
    // },
    {
      path: "/transactions",
      element: <Transactions/> //   Component for Transactions
    },
    {
      path: "/budgets",
      element: <Budgets/> // Component for Budgets
    },
    {
      path: "/settings",

      element: <Settings/> // Component for Settings
    }
  ];

  return (
    <Router>
      <div className="App flex h-screen w-screen bg-gray-100">
        <CSideBar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
           { routes.map((route) => (
              route.element ? (
                <Route key={route.path} path={route.path} element={route.element} />
              ) : null
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
