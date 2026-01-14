import type { Metadata } from "next";
import { Providers } from "./providers";
import Script from "next/script";
import { gilroy } from "@/components/ui/fonts";
import MainLayout from "@/components/Layouts/Main";

export const metadata: Metadata = {
  title: "Andressa Urach",
  icons: {
    icon: "/heart.png",
  },
  description: "Liberte-se com os melhores conteúdos da Andressa Urach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <Script src="https://api.marchabb.com/v1/js" strategy="lazyOnload" />
      </head>
      <body
        style={{
          height: "100dvh",
          backgroundColor: "#FFFFFF",
          color: "#000000",
          fontStyle: "normal",
          fontWeight: "500",
        }}
        className={gilroy.className}
      >
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
