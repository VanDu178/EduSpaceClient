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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 active:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 dark:border-blue-600",
  secondary:
    "bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-white/10 dark:hover:bg-zinc-700",
  outline:
    "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-blue-950/40",
  ghost:
    "bg-transparent text-slate-700 border-transparent hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-white/10",
  danger:
    "bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 active:bg-red-800 dark:bg-red-600 dark:hover:bg-red-500 dark:border-red-600",
  gradient:
    "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent hover:opacity-95 active:opacity-90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-6 text-base gap-2.5 rounded-lg font-semibold",
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
      "inline-flex items-center justify-center font-medium border transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";
    const widthClass = fullWidth ? "w-full" : "";

    const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim();

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
        {children && <span>{children}</span>}
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
