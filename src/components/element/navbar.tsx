"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/utils/clsx";
import Wrapper from "./wrapper";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Wrapper className="sticky top-0 flex justify-between items-center px-4 bg-white border-b h-12">
      <Link href="/" className="text-primary font-semibold">
        Synapsis Test
      </Link>
      <div className="flex items-center gap-5">
        <div className="flex gap-3">
          <Button asChild>
            <Link
              href="/users"
              className={cn("text-blue-500", {
                "font-bold": pathname === "/staff",
              })}
            >
              Go To User &gt;&gt;
            </Link>
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
