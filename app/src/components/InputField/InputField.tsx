import React, { InputHTMLAttributes } from 'react'
import { useField } from 'formik';
import styles from "./InputField.module.scss";

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  fontSize?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, fontSize = "1rem", ...props }) => {
  const [field, meta,] = useField(props);
  const isInvalid = meta.touched && meta.error;
  return (
    <div className={styles.formControl} style={{ fontSize }}>
      <div className={styles.animatedInput}>
        <input {...field} {...props} id={field.name} />
        <label
          htmlFor={field.name}
          className={[
            `${styles.inputLabel}`, `${isInvalid ? styles.invalidField : null}`].join(' ')}
        >
          <span className={styles.labelContent}>{label}</span>
        </label>
      </div>
      {isInvalid ? <div className={styles.errorMessage}>{meta.error}</div> : null}
      {/* <div className={styles.errorMessage}>test error</div> */}
    </div>
  );
};