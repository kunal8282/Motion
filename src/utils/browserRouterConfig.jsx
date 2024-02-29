import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import AuthPage from "../Pages/AuthPage";

const browserRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children : [
            {
                path : '/',
                element : <HomePage />
            },
            {
                path: '/auth',
                element : <AuthPage />
            }
        ]
    }
])

export default browserRouter;