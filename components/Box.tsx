import { twMerge } from "tailwind-merge";

interface BoxProps {
  className?: string;
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `h-fit w-full rounded-lg bg-alphaColor backdrop-blur-md`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
