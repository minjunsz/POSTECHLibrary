import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from 'next/router';
import React from "react";
import { InputField } from "../components/InputField/InputField";
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
        <Box w="fit-content" mx="auto">
          <Formik
            initialValues={{
              seatId: "",
              seatPassword: "",
              password: "",
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
                  label="seat id"
                />
                <Box mt={2}>
                  <InputField
                    name="seatPassword"
                    label="seat password"
                    type='password'
                  />
                </Box>
                <Box mt={2}>
                  <InputField
                    name="password"
                    label="user password"
                    type='password'
                  />
                </Box>
                <Button
                  mt={2}
                  type="submit"
                  isLoading={isSubmitting}
                  variantColor="teal"
                >
                  login
            </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default Login;
