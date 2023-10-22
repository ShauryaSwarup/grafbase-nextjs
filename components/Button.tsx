import React, { MouseEventHandler } from "react";
type Props = {
    title: string;
    type?: "button" | "submit";
    leftIcon?: string | null;
    rightIcon?: string | null;
    isSubmitting?: boolean;
    bgColor?: string;
    textColor?: string;
    handleClick?: MouseEventHandler;
};
const Button = ({
    title,
    type,
    leftIcon,
    rightIcon,
    isSubmitting,
    bgColor,
    textColor,
    handleClick,
}: Props) => {
    return (
        <button
            type={type || "button"}
            disabled={isSubmitting}
            className={`flexCenter gap-3 px-4 py-3 ${
                isSubmitting
                    ? "bg-black/50"
                    : bgColor
                    ? bgColor
                    : "bg-primary-purple"
            } rounded-xl text-sm font-medium max-md:w-full ${
                textColor ? textColor : "text-white"
            }`}
            onClick={handleClick}
        >
            {leftIcon && (
                <img src={leftIcon} alt='left' width={14} height={14} />
            )}
            {title}
            {rightIcon && (
                <img src={rightIcon} alt='right' width={14} height={14} />
            )}
        </button>
    );
};

export default Button;
