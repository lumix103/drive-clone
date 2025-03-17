import Link from "next/link";
import Image from "next/image";

import { FileText, Lock, Share2, Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import { signInRedirect } from "~/server/actions";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <header className="w-full border-b">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
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
          <form action={signInRedirect}>
            <Button type="submit" size="sm">
              Sign In
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1">
        <section className="flex w-full justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Store, share, and collaborate on files and folders
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Securely access your content anywhere, anytime. Your files
                    in one place, accessible from any device.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <form action={signInRedirect}>
                    <Button type="submit" size="lg" className="px-8">
                      Get Started
                    </Button>
                  </form>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/logo.webp"
                  alt="DriveClone Dashboard Preview"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Features
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Everything you need to manage your files in one place
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4 text-center">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <Upload className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Easy Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop files to upload them to your cloud storage
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4 text-center">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Simple Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  Share files and folders with anyone, even if they don&apos;t
                  have an account
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4 text-center">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">File Preview</h3>
                <p className="text-sm text-muted-foreground">
                  Preview documents, images, and videos without downloading them
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4 text-center">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Secure Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Your files are encrypted and stored securely in the cloud
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex w-full justify-center py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to get started?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who trust DriveClone for their file
                storage needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <form action={signInRedirect}>
                <Button type="submit" size="lg" className="px-8">
                  Get Started
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="flex flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row md:px-6">
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
    </div>
  );
}
