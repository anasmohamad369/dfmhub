import * as React from "react";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ value: valueProp, defaultValue, onValueChange, className = "", children, ...props }: TabsProps) {
  const [selectedValue, setSelectedValue] = React.useState(valueProp || defaultValue || "");

  const currentVal = valueProp !== undefined ? valueProp : selectedValue;

  const handleValueChange = React.useCallback(
    (val: string) => {
      if (valueProp === undefined) {
        setSelectedValue(val);
      }
      onValueChange?.(val);
    },
    [valueProp, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value: currentVal, onValueChange: handleValueChange }}>
      <div className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl bg-slate-200/80 dark:bg-slate-900/80 p-1.5 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-800 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, className = "", children, ...props }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => context.onValueChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${
        isActive
          ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md shadow-amber-500/20"
          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-slate-800/50"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, className = "", children, ...props }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.value !== value) return null;

  return (
    <div
      role="tabpanel"
      className={`mt-4 ring-offset-background focus-visible:outline-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
