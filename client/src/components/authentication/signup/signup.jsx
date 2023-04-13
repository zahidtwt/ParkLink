import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Flex,
    Input,
    VStack,
    Button,
    InputGroup,
    FormControl,
    InputLeftAddon,
    Box,
    AlertIcon,
    AlertTitle,
    Alert,
    InputRightElement,
    Text,
    Heading,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import { useState } from "react";

export default function Signup() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const formik = useFormik({
        initialValues: {
            number: "1953534243",
            name: "",
            email: "",
            password: "",
        },
        validate: async (values) => {
            const errors = {};
            if (!values.password) {
                errors.password = "Can't leave empty";
            } else if (values.password.length <= 6) {
                errors.password = "Minimum 6 characters required.";
            }
            return errors;
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            console.log(values);
        },
    });

    return (
        <FormControl isRequired>
            <Flex
                height={"90vh"}
                justifyContent={"center"}
                justifyItems={"center"}
                alignItems={"center"}>
                <VStack shadow={"md"} w="350px" p="10px" borderRadius={10}>
                    <VStack h={15}></VStack>
                    <form onSubmit={formik.handleSubmit}>
                        <VStack spacing={5}>
                            <Heading mb={10}>Welcome to ParkLink</Heading>

                            <InputGroup>
                                <InputLeftAddon children="+880" />
                                <Input
                                    {...formik.getFieldProps("number")}
                                    type="tel"
                                    placeholder="Phone number"
                                    name="number"
                                    disabled
                                />
                            </InputGroup>
                            <Input
                                {...formik.getFieldProps("name")}
                                type="text"
                                placeholder="Full Name"
                                id="name"
                            />
                            <Input
                                {...formik.getFieldProps("email")}
                                type="email"
                                id="email"
                                placeholder="Email Address"
                            />
                            <InputGroup>
                                <Input
                                    {...formik.getFieldProps("password")}
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    placeholder="Password"
                                    // variant={"filled"}
                                    id="password"
                                />

                                <InputRightElement>
                                    <Text
                                        h="1.75rem"
                                        size="sm"
                                        onClick={handleClick}>
                                        {show ? <ViewOffIcon /> : <ViewIcon />}
                                    </Text>
                                </InputRightElement>
                            </InputGroup>
                            <Box>
                                {formik.errors.password && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertTitle>
                                            {formik.errors.password}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </Box>
                            <Button
                                size="lg"
                                colorScheme="purple"
                                w={"100%"}
                                type="submit">
                                Sign up
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Flex>
        </FormControl>
    );
}
