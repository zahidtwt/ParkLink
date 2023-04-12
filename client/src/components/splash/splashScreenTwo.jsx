import NavigationSVG from "./svg/navigationSVG";
import { HStack, Link, Text, VStack } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
function SplashScreenTwo() {
    return (
        <VStack
            spacing={10}
            p={5}
            textAlign={"center"}
            h={"100vh"}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <VStack h={20}></VStack>
            <NavigationSVG />
            <Text as="b" fontSize={"2xl"}>
                Quick Navigation
            </Text>
            <Text fontSize={"lg"} mt={"5!important"}>
                Find park near you
                <br /> and navigate fast!
            </Text>
            <HStack justifyContent={"center"} spacing={2}>
                <Link color="purple" href="#">
                    Skip
                </Link>
                <Link as={RouteLink} to="/splashthree" color="purple">
                    Next
                </Link>
            </HStack>
        </VStack>
    );
}

export default SplashScreenTwo;
