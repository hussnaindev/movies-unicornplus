import { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head"; // Import Head
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies UnicornPlus",
  description: "All about movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* Google Tag Manager Script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BDX88Z8MCP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BDX88Z8MCP');
            `,
          }}
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
