import * as React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block ${className}`}
        {...props}
      >
        {children}
        {required && <span className="text-amber-600 dark:text-amber-500 ml-1">*</span>}
      </label>
    );
  }
);
Label.displayName = "Label";

export { Label };
