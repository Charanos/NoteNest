import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, disabled, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        type={type}
        disabled={disabled}
        className={twMerge(
          `flex w-full rounded-md bg-alphaColor border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-textColor/60 disabled:cursor-not-allowed disabled:opacity-55 focus: outline-none`,
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
