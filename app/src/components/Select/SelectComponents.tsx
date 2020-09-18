import React, { SelectHTMLAttributes, OptionHTMLAttributes } from 'react';
import styles from "./Select.module.scss";
import { Field } from 'formik';

export type SelectWrapperProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  fontSize?: string;
}

export const SelectWrapper: React.FC<SelectWrapperProps> = ({ name, label, fontSize = "1rem", children, ...props }) => {
  return (
    <div className={styles.customSelect} style={{ fontSize }}>
      <Field as='select' {...props} id={name} name={name}>
        {children}
      </Field>
      <label htmlFor={name} className={styles.selectLabel} >
        <span className={styles.labelContent}>{label}</span>
      </label>
      <span className={styles.customArrow}></span>
    </div>
  );
};

export type SelectOptionProps = OptionHTMLAttributes<HTMLOptionElement> & {
  value: string | number;
  optionContent: string;
};

export const SelectOption: React.FC<SelectOptionProps> = ({ value, optionContent, ...props }) => {
  return (
    <option value={value} {...props} >{optionContent}</option>
  );
};