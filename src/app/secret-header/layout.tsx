import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lunara.fun | Twitter Header",
  description: "Twitter header image for Lunara.fun",
  robots: "noindex, nofollow",
};

export default function TwitterHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-navy min-h-screen py-8">
      {children}
    </div>
  );
} 