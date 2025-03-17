import Link from "next/link";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <>
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.webp"
              alt="DriveClone Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold">DriveClone</span>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center py-12">
        <div className="mx-auto w-full max-w-md space-y-6 px-4">
          <div className="space-y-2 text-center">
            <div className="rounded-lg border p-2 text-3xl font-bold">
              <SignInButton forceRedirectUrl={"/drive"} />
            </div>
            <p className="text-muted-foreground">With your Google account</p>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DriveClone. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
