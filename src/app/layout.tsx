import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ฝ่ายบำรุงรักษาระบบไฟฟ้า(ฝบร.) - PMD",
  description: "ฝ่ายบำรุงรักษาระบบไฟฟ้า(ฝบร.) - PMD",
  icons: {
    icon: "/meaicon.svg",
    shortcut: "/meaicon.svg",
    apple: "/meaicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
