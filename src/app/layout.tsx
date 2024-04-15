import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Head>
        <title>VMDL - Law firm & Cover group</title>
        <meta name="description" content="VMDL est un cabinet d'avocat spécialisé dans la représentation de footballeurs professionnels. Offrant des services juridiques complets et personnalisés pour protéger vos intérêts à chaque étape de votre carrière." />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon/vmdl.ico" />
        <meta property="og:title" content="VMDL - Law firm & Cover group" />
        <meta property="og:description" content="VMDL est un cabinet d'avocat spécialisé dans la représentation de footballeurs professionnels." />
        <meta property="og:type" content="website" />
      </Head>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
