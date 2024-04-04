import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import SupabaseProviders from "@/providers/SupabaseProviders";
import Player from "@/components/Player";

// const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note Nest",
  description:
    "Spotify Clone App. Code with Antonio. 20th March 2024, Wednesday.",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className="font-primaryFont">
        <ToasterProvider />
        <SupabaseProviders>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProviders>
      </body>
    </html>
  );
}
