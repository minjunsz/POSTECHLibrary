import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from 'next/router';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface loginProps { }

const Login: React.FC<loginProps> = ({ }) => {
  const router = useRouter();
  const [, register] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          seatNumber: "seat3",
          seatPassword: "3333",
          password: "1234",
        }}
        onSubmit={async (values, { setErrors }) => {
          const args = {
            ...values,
          };
          const response = await register({ args });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.order) {
            router.push('/');
          }
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

export default withUrqlClient(createUrqlClient)(Login);
