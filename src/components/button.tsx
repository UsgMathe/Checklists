import { ButtonHTMLAttributes, ReactNode } from 'react';

const variants = {
  default: 'bg-violet-600 hover:bg-violet-700',
  destructive: 'bg-red-600 hover:bg-red-700',
  outline: 'outline text-black outline-1',
};
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode | string;
  variant?: keyof typeof variants;
};

const Button = ({
  children,
  className,
  variant = 'default',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${className} ${variants[variant]} font-medium text-white px-6 py-3 transition-all duration-200 hover:scale-95 rounded-md flex gap-2 justify-center items-center`}
    >
      {children}
    </button>
  );
};

export default Button;
