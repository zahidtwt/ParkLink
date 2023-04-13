import {
    Flex,
    Input,
    VStack,
    Button,
    InputGroup,
    FormControl,
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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Reset() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirm_password: "",
        },
        validate: async (values) => {
            const errors = {};
            if (values.password !== values.confirm_password) {
                errors.password = "Password doesn't match!";
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
    // formik setup for form validation
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
                    <Heading>Reset Password</Heading>

                    <form onSubmit={formik.handleSubmit}>
                        <Box h={""} mb={5}>
                            {formik.errors.password && (
                                <Alert status="error">
                                    <AlertIcon />
                                    <AlertTitle>
                                        {formik.errors.password}
                                    </AlertTitle>
                                </Alert>
                            )}
                        </Box>

                        <Box mb={5}>
                            <InputGroup>
                                <Input
                                    {...formik.getFieldProps("password")}
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    placeholder="Enter New Password"
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
                            <Box mb={5}></Box>
                            <InputGroup>
                                <Input
                                    {...formik.getFieldProps(
                                        "confirm_password"
                                    )}
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    placeholder="Repeat Password"
                                    // variant={"filled"}
                                    id="confirm_password"
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
                        </Box>

                        <Button
                            size="lg"
                            colorScheme="purple"
                            w={"100%"}
                            type="submit">
                            Next
                        </Button>
                    </form>
                </VStack>
            </Flex>
        </FormControl>
    );
}
