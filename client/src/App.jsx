import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import Toggle from "./components/toggle";
import router from "./router";
function App() {
    return (
        <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <RouterProvider router={router}></RouterProvider>
            <Toggle />
        </ChakraProvider>
    );
}

export default App;
