import {
    HStack,
    PinInput,
    PinInputField,
    Flex,
    VStack,
    Button,
    Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
function GetOTP() {
    return (
        <Flex
            height={"90vh"}
            justifyContent={"center"}
            justifyItems={"center"}
            alignItems={"center"}>
            <VStack
                shadow={"md"}
                w="350px"
                p="10px"
                spacing={10}
                borderRadius={10}>
                <HStack>
                    <PinInput size="lg" otp colorScheme="blue">
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                    </PinInput>
                </HStack>
                <Text fontSize={"md"}>
                    Didn't receive code?{" "}
                    <Link color="purple" to="/signup" fontWeight={"bold"}>
                        <b>Resend</b>
                    </Link>
                </Text>
                <Link to="/otpverification">
                    <Button size="lg" colorScheme="purple" w={"100%"}>
                        Submit
                    </Button>
                </Link>
            </VStack>
        </Flex>
    );
}
export default GetOTP;
