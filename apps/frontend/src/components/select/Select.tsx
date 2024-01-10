import { useRef, useState } from 'react';
import styles from './Select.module.scss';
import { Combobox } from '@headlessui/react';
import IconChevronDown from '../icons/ChevronDown.tsx';
import cn from 'classnames';

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ id: string; label: string }>;
  title?: string;
}

const Select = ({ value, onChange, options, title }: SelectProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredOptions =
    query === ''
      ? options
      : options.filter(option => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={value} onChange={v => onChange(v)}>
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <Combobox.Input
            ref={inputRef}
            className={styles.input}
            title={title}
            onFocus={() => inputRef.current?.select()}
            onChange={event => setQuery(event.target.value.toLocaleUpperCase())}
            displayValue={(id: string) => options.find(o => o.id === id)?.label || id}
          />
          <Combobox.Button className={styles.iconButton}>
            <IconChevronDown className={styles.icon} />
          </Combobox.Button>
        </div>
        <Combobox.Options className={styles.options}>
          {query.length >= 3 && query.length <= 4 && (
            <Combobox.Option className={styles.optionsItem} value={query.toLocaleUpperCase()}>
              Look up "{query}"
            </Combobox.Option>
          )}

          {filteredOptions.map(option => (
            <Combobox.Option
              className={cn(styles.optionsItemWrapper, {
                [styles.selected]: option.id === value,
              })}
              key={option.id}
              value={option.id}
            >
              {({ active, selected }) => (
                <span className={cn(styles.optionsItem, { [styles.selected]: selected, [styles.active]: active })}>
                  {option.label}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default Select;

// const Select = ({ children, value, onChange, ...props }: SelectProps) => {
//   const id = useId();
//   const [, set] = useState();
//
//   return (
//     <div {...props} className={cn(styles.wrapper, props.className)}>
//       <input type="text" list={id} onChange={this._onChange} />
//       <select value={value} onChange={e => onChange?.(e.target.value)} className={styles.select}>
//         {children}
//       </select>
//       <IconChevronDown className={styles.icon} />
//     </div>
//   );
// };
//
// export default Select;
