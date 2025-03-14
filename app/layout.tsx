import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";

export const metadata: Metadata = {
  title: "Danang Treasure Hunt",
  description: "Explore Danang through an exciting treasure hunt adventure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">{children}</main>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
