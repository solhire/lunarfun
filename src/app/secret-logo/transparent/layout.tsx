import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lunara.fun | Transparent Logo",
  description: "Transparent logo for Lunara.fun",
  robots: "noindex, nofollow",
};

export default function TransparentLogoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="transparent-bg">
      {children}
    </div>
  );
} 