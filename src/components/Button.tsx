import clsx from "clsx";
import { ReactElement } from "react";

interface IButtonProps {
  id?: string;
  title: string;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  containerClass?: string;
}

const Button = ({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
}: IButtonProps) => {
  return (
    <button
      id={id}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black",
        containerClass
      )}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden text-xs uppercase">
        <div className="translate-y-0 skew-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-6">
          {title}
        </div>
        <div className="absolute translate-y-[165%] skew-y-6 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
