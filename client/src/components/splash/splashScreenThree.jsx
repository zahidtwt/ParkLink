import { Button, Text, VStack } from "@chakra-ui/react";
import EasyPaymentsvg from "./svg/easyPaymentsvg";
import { Link } from "react-router-dom";
function SplashScreenThree() {
    return (
        <VStack
            spacing={10}
            p={5}
            textAlign={"center"}
            h={"100vh"}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <VStack h={20}></VStack>
            <EasyPaymentsvg />
            <Text as="b" fontSize={"2xl"}>
                Easy Payment
            </Text>
            <Text fontSize={"lg"} mt={"5!important"}>
                Pay hassle free parking fee
                <br /> on the go!
            </Text>
            <Link to="/login">
                <Button
                    colorScheme="purple"
                    w={"100%"}
                    shadow={"xl"}
                    size={"lg"}>
                    Get Started
                </Button>
            </Link>
        </VStack>
    );
}

export default SplashScreenThree;
