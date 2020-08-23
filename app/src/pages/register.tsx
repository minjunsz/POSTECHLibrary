import React from "react";
import { Formik, Form } from "formik";
import { FormControl, FormErrorMessage, FormLabel, Input, Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";

interface registerProps { }

const Register: React.FC<registerProps> = ({ }) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          seatNumber: "seat3",
          seatPassword: "3333",
          password: "1234",
          startAt: "2020-08-23T12:38:24.791Z",
          endAt: "2020-08-24T12:38:24.791Z"
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="seatNumber"
              placeholder="enter seat number"
              label="seat number"
            />
            <Box mt={4}>
              <InputField
                name="seatPassword"
                placeholder="enter seat password"
                label="seat password"
                type='password'
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="enter user password"
                label="user password"
                type='password'
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
