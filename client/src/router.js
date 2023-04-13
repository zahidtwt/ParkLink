import { createBrowserRouter, Navigate } from "react-router-dom";
import SplashScreenOne from "./components/splash/splashScreenOne";
import SplashScreenTwo from "./components/splash/splashScreenTwo";
import SplashScreenThree from "./components/splash/splashScreenThree";
import InitialCheck from "./components/authentication/login/initial";
import Login from "./components/authentication/login/login";
import Signup from "./components/authentication/signup/signup";
import GetOTP from "./components/authentication/signup/getotp";
import PageNotFound from "./components/common/pageNotFound";
import Recovery from "./components/authentication/login/recovery";
import Reset from "./components/authentication/login/reset";
import Profile from "./components/authentication/profile/profile";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/welcome" />,
    },
    {
        path: "/welcome",
        element: <SplashScreenOne />,
    },
    {
        path: "splashtwo",
        element: <SplashScreenTwo />,
    },
    {
        path: "splashthree",
        element: <SplashScreenThree />,
    },
    {
        path: "/login",
        element: <InitialCheck />,
    },
    {
        path: "/loginpass",
        element: <Login />,
    },
    {
        path: "/recovery",
        element: <Recovery />,
    },
    {
        path: "/reset",
        element: <Reset />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/otpverification",
        element: <GetOTP />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);

export default router;
