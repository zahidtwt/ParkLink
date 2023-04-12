import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/authentication/login/login";
import Signup from "./components/authentication/signup/signup-step-one";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import Toggle from "./components/toggle";
import SplashScreenOne from "./components/splash/splashScreenOne";
import SplashScreenTwo from "./components/splash/splashScreenTwo";
import SplashScreenThree from "./components/splash/splashScreenThree";
import GetOTP from "./components/authentication/signup/getotp";
import CreateAccount from "./components/authentication/signup/createAccount";
function App() {
    return (
        <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Navigate to="/welcome" />} />
                <Route path="/welcome" element={<SplashScreenOne />} />
                <Route path="splashtwo" element={<SplashScreenTwo />} />
                <Route path="splashthree" element={<SplashScreenThree />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/otpverification" element={<GetOTP />} />
                <Route path="/createAccount" element={<CreateAccount />} />
            </Routes>
            {/* <Footer /> */}
            <Toggle />
        </ChakraProvider>
    );
}

export default App;
