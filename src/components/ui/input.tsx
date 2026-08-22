import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`w-full bg-slate-50 dark:bg-[#040914] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border border-slate-300 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-slate-100 dark:focus:bg-[#040914] rounded-xl text-sm transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            icon ? "pl-10 pr-4 py-3" : "px-4 py-3"
          } ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
