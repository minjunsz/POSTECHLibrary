import { useLazyQuery } from '@apollo/client';
import { Box } from '@chakra-ui/core';
import { Field, Form, Formik } from 'formik';
import { Button } from '../components/Button/Button';
import { Layout } from '../components/Layout';
import { PlotPoints } from '../components/PlotPoints/PlotPoints';
import { SelectOption, SelectWrapper } from '../components/Select/SelectComponents';
import { SeatsDocument, SeatsQuery, SeatsQueryVariables, SeatType } from '../generated/graphql';
import styles from "./index.module.scss";

const Index = () => {
  const [getSeats, { data: seatsData, loading: seatsLoading }] = useLazyQuery<SeatsQuery, SeatsQueryVariables>(SeatsDocument);

  let renderedResult: JSX.Element = <></>;
  if (seatsLoading) { renderedResult = <div className={styles.centerText}>Loading Seats...</div>; }
  else if (!seatsData) { renderedResult = <div className={styles.centerText}>No Data Loaded</div>; }
  else {
    renderedResult = (
      <Box mx='auto'> {/* TODO: add library map as background image */}
        <PlotPoints
          coords={seatsData.seats.map((seat) => [seat.xpos, seat.ypos])}
          boxSize="75%"
          boxColor="purple.200"
          dotSize="5%"
          dotColor={seatsData.seats.map((seat) => !seat.order ? "green.300" : "red.300")}
          hoverData={seatsData.seats.map((seat) => seat.seatCondition)}
        ></PlotPoints>
      </Box>);
  }

  return (
    <Layout>
      <section className={styles.responsiveGridSection}>
        <Formik
          initialValues={{
            floor: "5",
            needOutlet: false,
            seatType: Array<SeatType>()
          }}
          onSubmit={(values) => {
            const parsedValues = {
              ...values,
              floor: parseInt(values.floor)
            };
            getSeats({ variables: parsedValues });
          }}
        >
          {() => (
            <Form>
              <SelectWrapper name="floor" label="층을 선택하세요"  >
                <SelectOption optionContent="5층" value={5}></SelectOption>
                <SelectOption optionContent="4층" value={4}></SelectOption>
                <SelectOption optionContent="3층" value={3}></SelectOption>
              </SelectWrapper>
              <label htmlFor="needOutlet">
                <Field type="checkbox" name="needOutlet" id="needOutlet" />
                콘센트 필요
              </label>
              <div id="checkbox-group">자리 종류 선택</div>
              <div role="group" aria-labelledby="checkbox-group" className={styles.multiCheckbox} >
                {Object.keys(SeatType).map((key) => (
                  <label key={key}>
                    <Field type="checkbox" name="seatType" value={(SeatType as any)[key]} className={styles.addXMargin} />
                    {key}
                  </label>
                ))}
              </div>
              <Button label="검색하기" type='submit' />
            </Form>
          )}
        </Formik>
        <Box w="100%">{renderedResult}</Box>
      </section>
    </Layout>);
}

export default Index;