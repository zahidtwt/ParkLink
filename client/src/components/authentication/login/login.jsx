import {
    Flex,
    Input,
    VStack,
    Button,
    Text,
    InputGroup,
    InputRightElement,
    Link,
    FormControl,
    InputLeftAddon,
} from "@chakra-ui/react";
import { Link as reactLink } from "react-router-dom";
import ParkLinksvg from "../../common/parkLinksvg";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
export default function Login() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

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
                    <VStack h={15}></VStack>

                    <InputGroup>
                        <InputLeftAddon children="+880" />
                        <Input type="tel" placeholder="Phone number" />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            // variant={"filled"}
                            id="password"
                        />
                        <InputRightElement>
                            <Text h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? <ViewOffIcon /> : <ViewIcon />}
                            </Text>
                        </InputRightElement>
                    </InputGroup>
                    <Button size="lg" colorScheme="purple" w={"100%"}>
                        Login
                    </Button>
                    <Text fontSize={"md"}>
                        New User?{" "}
                        <Link color="purple" as={reactLink} to="/signup">
                            Sign Up!
                        </Link>
                    </Text>
                </VStack>
            </Flex>
        </FormControl>
    );
}
