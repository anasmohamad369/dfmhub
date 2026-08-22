import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    let variantStyles =
      "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold";
    if (variant === "secondary") {
      variantStyles =
        "bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold border border-slate-700";
    } else if (variant === "outline") {
      variantStyles =
        "border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 font-semibold";
    } else if (variant === "ghost") {
      variantStyles =
        "text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium";
    }

    let sizeStyles = "px-5 py-3 text-sm rounded-lg";
    if (size === "sm") sizeStyles = "px-3 py-1.5 text-xs rounded-md";
    if (size === "lg") sizeStyles = "px-6 py-4 text-base rounded-xl";

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
