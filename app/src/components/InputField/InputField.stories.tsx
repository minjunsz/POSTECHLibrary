import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { InputField, InputFieldProps } from './InputField';
import { Form, Formik } from 'formik';

export default {
  title: 'Form/Input',
  component: InputField,
  argTypes: {
  },
} as Meta;

const Template: Story<InputFieldProps> = (args) => (
  <Formik initialValues={{}} onSubmit={() => { }}>
    {() => (
      <Form>
        <InputField {...args} />
      </Form>)}
  </Formik>
);

export const Default = Template.bind({});
Default.args = {
  name: "name",
  label: "Label",
  autoComplete: "off",
  type: 'password'
};

export const LargeFont = Template.bind({});
LargeFont.args = {
  name: "name",
  label: "Label",
  autoComplete: "off",
  fontSize: "1.5rem"
};

// export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
