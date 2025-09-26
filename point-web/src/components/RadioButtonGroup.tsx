import { ReactNode } from 'react';
import './RadioButtonGroup.css';

export interface RadioButtonGroupProps {
  children: ReactNode;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  gap?: 'small' | 'medium' | 'large';
}

export default function RadioButtonGroup({
  children,
  name,
  value,
  onChange,
  disabled = false,
  direction = 'vertical',
  gap = 'medium',
}: RadioButtonGroupProps) {
  const baseClasses = 'radio-button-group';
  const directionClass = `radio-button-group--${direction}`;
  const gapClass = `radio-button-group--gap-${gap}`;

  const classes = [baseClasses, directionClass, gapClass].join(' ');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(event.target.value);
    }
  };

  return (
    <div className={classes} onChange={handleChange}>
      {children}
    </div>
  );
}