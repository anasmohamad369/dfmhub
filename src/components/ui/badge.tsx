import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    let variantStyles = "bg-slate-900 text-slate-50 hover:bg-slate-900/80";
    if (variant === "secondary") {
      variantStyles = "bg-slate-100 text-slate-900 hover:bg-slate-100/80";
    } else if (variant === "destructive") {
      variantStyles = "bg-red-500 text-slate-50 hover:bg-red-500/80";
    } else if (variant === "outline") {
      variantStyles = "text-slate-950 border border-slate-200";
    }

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 border-transparent ${variantStyles} ${className}`}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
