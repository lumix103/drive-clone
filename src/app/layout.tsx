import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "./_providers/posthog-provider";

export const metadata: Metadata = {
  title: "Drive Clone",
  description: "A clone of Google Drive but not as good",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <PostHogProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body>{children}</body>
        </html>
      </PostHogProvider>
    </ClerkProvider>
  );
}
