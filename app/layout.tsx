import "./globals.css";

export const metadata = {
  title: "AI Focus",
  description: "Train attention with hold and release focus trials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}