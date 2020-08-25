import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useCreateOrderMutation } from '../generated/graphql';
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from 'next/router';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps { }

const Register: React.FC<registerProps> = ({ }) => {
  const router = useRouter();
  const [, register] = useCreateOrderMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          seatNumber: "seat3",
          seatPassword: "3333",
          password: "1234",
          startAt: "2020-08-23T12:38:24.791Z", //TODO: implement spinner to select time
          endAt: "2020-08-24T12:38:24.791Z"
        }}
        onSubmit={async (values, { setErrors }) => {
          const args = {
            ...values,
            startAt: "2020-08-25T12:38:24.791Z",
            endAt: new Date('October 26, 2020 00:00:00')
          };
          const response = await register({ args });
          if (response.data?.createOrder.errors) {
            setErrors(toErrorMap(response.data.createOrder.errors));
          } else if (response.data?.createOrder.order) {
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

export default withUrqlClient(createUrqlClient)(Register);
