import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        type={type}
        disabled={disabled}
        className={twMerge(
          `w-full rounded-full border border-transparent px-3 py-1.5  bg-secondaryColor/60 shadow-md disabled:cursor-not-allowed disabled:opacity-50 text-black font-semibold hover:text-black hover:scale-105 transition`,
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
