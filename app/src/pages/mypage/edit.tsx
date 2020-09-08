import { Button, Flex, Heading, Select, Text, Textarea } from '@chakra-ui/core';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Wrapper } from '../../components/Wrapper';
import { SeatStatus, useCreateSeatConditionMutation, useMeQuery, useSeatQuery, useUpdateSeatConditionMutation } from '../../generated/graphql';

interface EditProps { }

const Edit: React.FC<EditProps> = ({ }) => {
  const router = useRouter();
  const { data: meData, loading: meLoading } = useMeQuery();
  const notLoggedIn = !meData?.me;
  const { data: seatData, loading: seatLoading } = useSeatQuery({
    skip: meLoading || notLoggedIn,
    variables: {
      seatId: meData?.me?.seatId!
    }
  });
  const [createCondition, { loading: createLoading }] = useCreateSeatConditionMutation({
    update: (cache, { data }) => {
      if (data?.createSeatCondition) {
        cache.modify({
          id: `Seat:${data.createSeatCondition.seatId}`,
          fields: {
            seatCondition() { return { ...(data.createSeatCondition) }; }
          }
        });
      }
    }
  })

  const [updateCondition, { loading: updateLoading }] = useUpdateSeatConditionMutation({
    update: (cache, { data }) => {
      if (data?.updateSeatCondition) {
        cache.modify({
          id: `Seat:${data.updateSeatCondition.seatId}`,
          fields: {
            seatCondition() { return { ...(data.updateSeatCondition) }; }
          }
        });
      }
    }
  });
  const [showUpdateError, setShowUpdateError] = useState(false);


  let content = (<div>Loading</div>)
  if (!meLoading) {
    if (notLoggedIn) { router.push('/'); }
    else if (!seatLoading) {
      if (!seatData?.seat) {
        content = (<div>server Error</div>); // TODO: add server Error component
      } else {
        content = (
          <Formik
            initialValues={{
              seatStatus: seatData.seat.seatCondition ? seatData.seat.seatCondition.status : SeatStatus.Fine,
              seatDescription: seatData.seat.seatCondition?.description
            }}
            onSubmit={async (values, { setErrors }) => {
              if (!seatData.seat.seatCondition) {
                console.log("create!");
                createCondition({
                  variables: {
                    conditions: {
                      seatId: seatData.seat.id,
                      status: values.seatStatus,
                      description: values.seatDescription
                    }
                  }
                }).then(result => {
                  if (result.errors || !result.data)
                    setShowUpdateError(true);
                  else
                    router.back();
                })
              }
              else {
                console.log("update!");
                console.log(seatData.seat.id,);
                console.log(values.seatStatus,);
                console.log(values.seatDescription);
                updateCondition({
                  variables: {
                    conditions: {
                      seatId: seatData.seat.id,
                      status: values.seatStatus,
                      description: values.seatDescription
                    }
                  }
                }).then(result => {
                  if (result.errors || !result.data)
                    setShowUpdateError(true);
                  else
                    router.back();
                })
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Heading size="md">{seatData.seat.floor}F | Seat {seatData.seat.id}</Heading>
                <Field as={Select} name="seatStatus" my={4}>
                  {Object.keys(SeatStatus).map((key) => (
                    <option value={(SeatStatus as any)[key]} key={key}>{key}</option>
                  ))}
                </Field>
                <Field as={Textarea} name="seatDescription"></Field>
                {showUpdateError ? <Text color="red.500" textAlign="right">Failed to update data</Text> : null}
                <Flex mt={4}>
                  <Button
                    type="submit"
                    isLoading={updateLoading || createLoading}
                    variantColor="teal"
                    ml="auto"
                  >
                    수정
                  </Button>
                  <Button
                    type="button"
                    variantColor="gray"
                    onClick={router.back}
                    ml={4}
                  >
                    취소
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        );
      }
    }
  }

  return (
    <Layout>
      <Wrapper variant='small'>
        {content}
      </Wrapper>
    </Layout>
  );
}

export default Edit;
