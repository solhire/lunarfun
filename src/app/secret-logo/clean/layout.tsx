import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lunara.fun | Clean Logo",
  description: "Clean logo for Lunara.fun",
  robots: "noindex, nofollow",
};

export default function CleanLogoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-navy">
      {children}
    </div>
  );
} 