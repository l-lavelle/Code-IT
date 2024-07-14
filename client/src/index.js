import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Landing from "./components/Editor/Landing";
import Homepage from "./components/Homepage/Homepage";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/LoginSignup";
import QuestionsHomepage from "./components/QuestionsHomepage/QuestionsHomepage";
import FreeCode from "./components/Editor/FreeCode/FreeCode";
import Error from "./components/Error/Error";
import "bootstrap/dist/css/bootstrap.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/challenge/:question_Id",
        element: <Landing />,
      },
      {
        path: "/freeCode",
        element: <FreeCode />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "QuestionsHomepage",
        element: <QuestionsHomepage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
