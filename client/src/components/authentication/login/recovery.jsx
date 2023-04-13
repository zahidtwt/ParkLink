import {
    Flex,
    Input,
    VStack,
    Button,
    InputGroup,
    FormControl,
    WrapItem,
    Avatar,
    Box,
    AlertIcon,
    AlertTitle,
    Alert,
    InputRightElement,
    Text,
} from "@chakra-ui/react";

import avatar from "./avatar.svg";
import { useFormik } from "formik";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Recovery() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const formik = useFormik({
        initialValues: {
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
                    <WrapItem>
                        <Avatar size="2xl" name="Segun Adebayo" src={avatar} />{" "}
                    </WrapItem>
                    <VStack h={15}></VStack>

                    <form onSubmit={formik.handleSubmit}>
                        <Box h={"50px"} mb={5}>
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
