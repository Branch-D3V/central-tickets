import type { Metadata } from "next";
import { Providers } from "./providers";
import { gilroy } from "@/components/ui/fonts";
import MainLayout from "@/components/Layouts/Main";

export const metadata: Metadata = {
  title: "Hub do Operador",
  icons: {
    icon: "/support-ticket.png",
  },
  description: "Hub do Operador - Sistema de Gestão de Tickets de Suporte",
  other: {
    "x-developed-by": "Dev LSeyth",
    "x-project": "central-tickets",
    "x-build-signature": "Pedro Lisboa(Seyth) Developer-2026",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={gilroy.className}
        style={{
          minHeight: "100dvh",
          backgroundColor: "#FFFFFF",
          color: "#000000",
          fontStyle: "normal",
          fontWeight: "500",
        }}
      >
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
