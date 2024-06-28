import * as React from "react";

import { cn } from "@/utils/clsx";
import { SearchIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10",
          className
        )}
        ref={ref}
        placeholder="Search"
        {...props}
      />
      <SearchIcon className="text-muted-foreground absolute w-4 h-4 top-3 left-3" />
    </div>
  );
});
InputSearch.displayName = "InputSearch";

export { InputSearch };
