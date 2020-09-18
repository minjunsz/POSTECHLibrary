import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  primary?: boolean,
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  type = 'button',
  ...props
}) => {
  const mode: string = primary ? styles.storybookButtonPrimary : styles.storybookButtonSecondary;
  const sizeMode: string = size === 'small' ? styles.storybookButtonSmall : (
    size === 'medium' ? styles.storybookButtonMedium : styles.storybookButtonLarge)
  return (
    <button
      type={type}
      className={[
        `${styles.storybookButton}`, sizeMode, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
