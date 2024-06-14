import {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  children?: ReactNode | string;
  label?: ReactNode | string;
};

const Input = (
  { children, className, label, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const randomId = `${label ? `${label}-` : ""}${Math.random() * 100}`;

  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label htmlFor={props.id ?? randomId} className="text-lg">
          {label}
        </label>
      ) : null}
      <input
        id={props.id ?? randomId}
        ref={ref}
        {...props}
        className={`${className} p-2 outline outline-1 rounded-sm`}
      />
    </div>
  );
};

export default forwardRef(Input);
