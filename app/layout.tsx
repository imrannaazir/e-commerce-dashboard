import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import ReduxProvider from "@/redux/ReduxProvider";
import ModalProvider from "@/providers/modal-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>
            <ModalProvider />
            {children}
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
