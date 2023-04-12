import {
    Flex,
    Input,
    VStack,
    Button,
    Text,
    InputGroup,
    FormControl,
    InputRightElement,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function CreateAccount() {
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
                    spacing={5}
                    borderRadius={10}>
                    <VStack h={15}></VStack>

                    <Input type="tel" placeholder="Your Name" />
                    <Input type="email" placeholder="Email Address" />

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

                    <InputGroup>
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Confirm Password"
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
                        Create Account
                    </Button>
                    <Text fontSize={"md"}>
                        New User? <Link to="/signup"></Link>
                    </Text>
                </VStack>
            </Flex>
        </FormControl>
    );
}

export default CreateAccount;
