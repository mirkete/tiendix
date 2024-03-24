import {createBrowserRouter} from "react-router-dom"
import { Error } from "./Error/Error.jsx"
import Login from "./Login/Login.jsx"
import Register from "./Register/Register.jsx"
import App from "../App.jsx"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error/>
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <Error/>
    },
    {
        path: "/register",
        element: <Register/>,
        errorElement: <Error/>
    }
], 
    {
        basename: "/app",
    }
)