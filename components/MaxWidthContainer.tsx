import { cn } from "@/lib/utils";
import React from "react";

function MaxWidthWrapper({ className, children }: any) {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl  px-5 md:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
