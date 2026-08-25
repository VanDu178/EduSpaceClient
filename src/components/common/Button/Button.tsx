import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "gradient";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRounded = "md" | "lg" | "xl" | "2xl" | "full";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-btn-primary text-white border-btn-primary hover:bg-btn-primary-hover hover:border-btn-primary-hover active:opacity-90 disabled:hover:bg-btn-primary disabled:hover:border-btn-primary",
  secondary:
    "bg-white text-primary border border-primary/40 hover:border-primary hover:bg-primary-light/30 active:bg-primary-light/60 disabled:hover:border-primary/40 disabled:hover:bg-white",
  outline:
    "bg-white text-primary border border-slate-200 hover:border-primary disabled:hover:border-slate-200 disabled:hover:bg-white",
  ghost:
    "bg-transparent text-slate-700 border-transparent hover:bg-[#ddf3fe]/30 disabled:hover:bg-transparent",
  danger:
    "bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 active:bg-red-800 disabled:hover:bg-red-600 disabled:hover:border-red-600",
  gradient:
    "bg-btn-primary text-white border-btn-primary hover:bg-btn-primary-hover hover:border-btn-primary-hover active:opacity-90 disabled:hover:bg-btn-primary disabled:hover:border-btn-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5 font-semibold",
};

const roundedClasses: Record<ButtonRounded, string> = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = "full",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const baseClasses =
      "inline-flex items-center justify-center font-medium border transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer whitespace-nowrap";
    const widthClass = fullWidth ? "w-full" : "";
    const roundedClass = roundedClasses[rounded] || "rounded-full";

    const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClass} ${widthClass} ${className}`.trim();

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={combinedClassName}
        {...props}
      >
        {isLoading && (
          <ArrowPathIcon className={`animate-spin text-current ${iconSizeClasses[size]}`} />
        )}
        {!isLoading && leftIcon && (
          <span className={`inline-flex items-center shrink-0 ${iconSizeClasses[size]}`}>
            {leftIcon}
          </span>
        )}
        {children && <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>}
        {!isLoading && rightIcon && (
          <span className={`inline-flex items-center shrink-0 ${iconSizeClasses[size]}`}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
