import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from 'next/router';
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation, MeQuery, MeDocument } from '../generated/graphql';
import { toErrorMap } from "../utils/toErrorMap";

interface loginProps { }

const Login: React.FC<loginProps> = ({ }) => {
  const router = useRouter();
  const [login] = useLoginMutation({
    update: (cache, { data }) => {
      if (data?.login.order) {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data.login.order,
          },
        });
      }
    }
  });
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
            const response = await login({ variables: { args } });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.order) {
              router.push('/mypage');
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

export default Login;
