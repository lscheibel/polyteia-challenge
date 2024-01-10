import React from 'react';
import cn from 'classnames';
import styles from './RadioInput.module.scss';

export interface RadioInputProps extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  children: React.ReactNode;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioInput = ({ children, name, value, checked, onChange, ...props }: RadioInputProps) => {
  return (
    <label {...props} className={cn(styles.label, { [styles.isChecked]: checked }, props.className)}>
      {children}
      <input
        className={styles.input}
        type={'radio'}
        name={name}
        value={value}
        checked={checked}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
};

export default RadioInput;
