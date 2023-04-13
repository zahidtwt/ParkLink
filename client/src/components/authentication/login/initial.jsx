import {
    Flex,
    Input,
    VStack,
    Button,
    InputGroup,
    FormControl,
    InputLeftAddon,
    WrapItem,
    Avatar,
    Box,
    AlertIcon,
    AlertTitle,
    Alert,
} from "@chakra-ui/react";

import avatar from "./avatar.svg";
import { useFormik } from "formik";

export default function InitialCheck() {
    const formik = useFormik({
        initialValues: {
            number: "",
        },
        validate: async (values) => {
            const errors = {};
            if (!values.number) {
                errors.number = "Can't leave empty";
            } else if (values.number.length !== 10) {
                errors.number = "Invalid Number";
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
                        <Box h={"50px"}>
                            {formik.errors.number && (
                                <Alert status="error">
                                    <AlertIcon />
                                    <AlertTitle>
                                        {formik.errors.number}
                                    </AlertTitle>
                                </Alert>
                            )}
                        </Box>

                        <Box mb={5}>
                            <InputGroup>
                                <InputLeftAddon children="+880" />
                                <Input
                                    {...formik.getFieldProps("number")}
                                    type="tel"
                                    placeholder="Phone number"
                                    name="number"
                                />
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
