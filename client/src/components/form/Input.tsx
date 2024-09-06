import { forwardRef } from 'react';
interface InputProps {
  title: string;
  name: string;
  type: string;
  className: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: string;
  value: string;
  errorDiv: string;
  errorMessage: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <input
        type={props.type}
        className={props.className}
        id={props.name}
        ref={ref}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoComplete={props.autoComplete}
        value={props.value}
      />
      <div className={props.errorDiv}>{props.errorMessage}</div>
    </div>
  );
});
