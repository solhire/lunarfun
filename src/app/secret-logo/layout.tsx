import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lunara.fun | Secret Logo",
  description: "Secret logo page for Lunara.fun",
  robots: "noindex, nofollow",
};

export default function SecretLogoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
} 