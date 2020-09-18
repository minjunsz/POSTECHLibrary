import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from 'next/router';
import React from "react";
import { InputField } from "../../components/InputField/InputField";
import { Layout } from "../../components/Layout";
import { Wrapper } from "../../components/Wrapper";
import { MeDocument, MeQuery, useCreateOrderMutation } from '../../generated/graphql';
import { toErrorMap } from "../../utils/toErrorMap";

interface registerProps { }

const Register: React.FC<registerProps> = ({ }) => {
  const router = useRouter();
  const [register] = useCreateOrderMutation({
    update: (cache, { data }) => {
      if (data?.createOrder.order) {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data.createOrder.order,
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
              startAt: "2021-08-23T12:38:24.791Z", //TODO: implement spinner to select time
              endAt: "2021-08-24T12:38:24.791Z"
            }}
            onSubmit={async (values, { setErrors }) => {
              const args = {
                ...values,
                seatId: parseInt(values.seatId)
              };
              const response = await register({ variables: { args } });
              if (response.data?.createOrder.errors) {
                setErrors(toErrorMap(response.data.createOrder.errors));
              } else if (response.data?.createOrder.order) {
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
                  register
            </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Layout >
  );
};

export default Register;
