import "./globals.css";

export const metadata = {
  title: "AI Focus",
  description: "Measure the stability of your attention.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}