"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../button";
import { cn } from "@/utils/clsx";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center px-4 bg-white border-b h-12">
      <Link href="/" className="text-primary font-semibold">
        Synapsis Test
      </Link>
      <div className="flex items-center gap-5">
        <div className="flex gap-3">
          <Button asChild>
            <Link
              href="/staff"
              className={cn("text-blue-500", {
                "font-bold": pathname === "/staff",
              })}
            >
              Go To User &gt;&gt;
            </Link>
          </Button>
          <Link
            href="/divisi"
            className={cn("text-blue-500", {
              "font-bold": pathname === "/divisi",
            })}
          >
            Divisi
          </Link>
        </div>
        <Button
          onClick={async () => {
            router.replace("/auth");
          }}
          variant="destructive"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
