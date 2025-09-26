import { InputHTMLAttributes, ReactNode } from 'react';
import './RadioButton.css';

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function RadioButton({
  label,
  name,
  value,
  checked = false,
  disabled = false,
  size = 'medium',
  className = '',
  ...props
}: RadioButtonProps) {
  const baseClasses = 'radio-button';
  const sizeClass = `radio-button--${size}`;
  const disabledClass = disabled ? 'radio-button--disabled' : '';

  const classes = [baseClasses, sizeClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        className="radio-button__input"
        {...props}
      />
      <span className="radio-button__custom"></span>
      <span className="radio-button__label">{label}</span>
    </label>
  );
}