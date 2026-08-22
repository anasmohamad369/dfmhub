import * as React from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-white dark:bg-[#09101f]/90 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-md transition-colors duration-200 ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
