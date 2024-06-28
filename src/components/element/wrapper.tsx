import { cn } from "@/utils/clsx";
import { ReactNode } from "react";

function Wrapper({ children, className }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto max-w-screen-2xl w-full px-5 md:px-20", className)}>{children}</div>;
}

export default Wrapper;
