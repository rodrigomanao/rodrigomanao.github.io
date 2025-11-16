import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Rodrigo Manão Portfolio",
  description: "Cyberpunk-themed developer portfolio showcasing projects and skills",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#000000' }}>
      <body style={{ backgroundColor: '#000000' }}>
        {children}
      </body>
    </html>
  );
}
