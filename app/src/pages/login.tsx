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
import { Layout } from "../components/Layout";

interface loginProps { }

const Login: React.FC<loginProps> = ({ }) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{
            seatId: "1",
            seatPassword: "1",
            password: "1234",
          }}
          onSubmit={async (values, { setErrors }) => {
            const args = {
              ...values,
              seatId: parseInt(values.seatId)
            };
            const response = await login({ args });
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
                name="seatId"
                placeholder="enter seat id"
                label="seat id"
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
                login
            </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
