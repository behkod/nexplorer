import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Nexplorer",
  description: "Next.js Explorer for Blockchains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background font-sans antialiased",
        fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <main className="container mx-auto py-10 flex flex-col items-center justify-between">
            <Header />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html >
  );
}
