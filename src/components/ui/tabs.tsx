import * as React from "react";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined,
);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  value: valueProp,
  defaultValue,
  onValueChange,
  className = "",
  children,
  ...props
}: TabsProps) {
  const [selectedValue, setSelectedValue] = React.useState(
    valueProp || defaultValue || "",
  );

  const currentVal = valueProp !== undefined ? valueProp : selectedValue;

  const handleValueChange = React.useCallback(
    (val: string) => {
      if (valueProp === undefined) {
        setSelectedValue(val);
      }
      onValueChange?.(val);
    },
    [valueProp, onValueChange],
  );

  return (
    <TabsContext.Provider
      value={{ value: currentVal, onValueChange: handleValueChange }}
    >
      <div className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}
export function TabsList({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-flex items-center justify-start rounded-full p-1 text-slate-500 dark:text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({
  value,
  className = "",
  children,
  ...props
}: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => context.onValueChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({
  value,
  className = "",
  children,
  ...props
}: TabsContentProps) {
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
