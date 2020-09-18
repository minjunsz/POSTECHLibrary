import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SelectWrapper, SelectOption, SelectWrapperProps } from './SelectComponents';
import { Form, Formik } from 'formik';

export default {
  title: 'Form/Select',
  component: SelectWrapper,
  argTypes: {
  },
} as Meta;

export const Sample: Story<SelectWrapperProps> = (args) => (
  <Formik initialValues={{}} onSubmit={() => { }}>
    {() => (
      <Form>
        <SelectWrapper {...args} >
          <SelectOption optionContent="선택1" value="1"></SelectOption>
          <SelectOption optionContent="선택2" value="2"></SelectOption>
          <SelectOption optionContent="선택3" value="3"></SelectOption>
        </SelectWrapper>
      </Form>)}
  </Formik>
);
Sample.args = {
  name: 'SelectField',
  label: "Select Plz"
}