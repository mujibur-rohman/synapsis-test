"use client";

import { Button } from "@/components/ui/button";
import Wrapper from "@/components/element/wrapper";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Wrapper className="h-[50vh] flex flex-col justify-center items-center gap-y-3">
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </Wrapper>
  );
}
