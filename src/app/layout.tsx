import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Shivam Gaur | Software Developer",
  description: "Portfolio of Shivam Gaur, Software Developer based in NOIDA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsTracker />
          <Navbar />
          <main className="max-w-3xl mx-auto w-full min-h-screen flex flex-col pb-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
