import GirlWithCarSVG from "./svg/girlWithCar";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SplashScreenOne() {
    return (
        <VStack
            spacing={10}
            p={5}
            textAlign={"center"}
            h={"100vh"}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <VStack h={20}></VStack>
            <GirlWithCarSVG />
            <Text as="b" fontSize={"2xl"}>
                Best Parking Spots
            </Text>
            <Text fontSize={"lg"} mt={"5!important"}>
                Find the best, secured
                <br /> and affordable parking near you!
            </Text>
            <HStack justifyContent={"center"} spacing={2}>
                <Link color="purple" href="#">
                    Skip
                </Link>
                <Link to="/splashtwo" color="purple">
                    Next
                </Link>
            </HStack>
        </VStack>
    );
}

export default SplashScreenOne;
