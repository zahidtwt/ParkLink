import { Button, useColorMode, Box, useToast } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
function Toggle() {
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast();
    const handleClick = () => {
        toggleColorMode();
        toast({
            status: "success",
            // position: "top",
            title: "Success",
            description: "Mode Changed!",
            duration: 2000,
            isClosable: true,
        });
    };
    return (
        <Box position="fixed" top="20px" right={["16px", "84px"]} zIndex={1}>
            <Button onClick={handleClick} borderRadius={"100"} w={12} h={12}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
        </Box>
    );
}

export default Toggle;
