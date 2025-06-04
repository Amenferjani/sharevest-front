import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // only hide spinners on <input type="number">
    const numberReset = type === "number"
      ? "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
      : ""

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base" +
            " ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium" +
            " file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none" +
            " focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" +
            " disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-zinc-800 text-white",
          // append the removal classes if it's a number input
          numberReset,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
)
Input.displayName = "Input"

export { Input }
