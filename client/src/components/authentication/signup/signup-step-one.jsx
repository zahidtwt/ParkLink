import {
    Flex,
    Input,
    VStack,
    Button,
    Text,
    InputGroup,
    FormControl,
    InputLeftAddon,
} from "@chakra-ui/react";
import ParkLinksvg from "../../common/parkLinksvg";
import { Link } from "react-router-dom";
export default function Signup() {
    return (
        <FormControl isRequired>
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
                    <ParkLinksvg />
                    <VStack h={10} />
                    <Text fontSize={"2xl"}>Enter your phone number</Text>
                    <InputGroup>
                        <InputLeftAddon children="+880" />
                        <Input type="tel" placeholder="Phone number" />
                    </InputGroup>
                    <Link to="/otpverification">
                        <Button size={"lg"} colorScheme="purple" w={"100%"}>
                            Get OTP
                        </Button>
                    </Link>
                </VStack>
            </Flex>
        </FormControl>
    );
}
