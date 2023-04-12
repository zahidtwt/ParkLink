import { Button, useColorMode, Box } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
function Toggle() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box position="fixed" top="20px" right={["16px", "84px"]} zIndex={1}>
            <Button
                onClick={toggleColorMode}
                borderRadius={"100"}
                w={12}
                h={12}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
        </Box>
    );
}

export default Toggle;
