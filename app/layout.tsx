import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProviders from "@/providers/SupabaseProviders";
import ToasterProvider from "@/providers/ToasterProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note Nest",
  description:
    "Spotify Clone App. Code with Antonio. 20th March 2024, Wednesday.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <SupabaseProviders>
          <UserProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProviders>
      </body>
    </html>
  );
}
