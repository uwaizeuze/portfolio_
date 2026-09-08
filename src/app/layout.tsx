import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Owais Ahmad — Software Engineer | React.js / Next.js / Node.js",
  description:
    "Software Engineer with 4+ years of experience building scalable, user-focused web applications using React.js, Next.js, Node.js, Express.js, and MongoDB.",
  keywords: [
    "Owais Ahmad",
    "Software Engineer",
    "React.js",
    "Next.js",
    "Node.js",
    "Frontend Developer",
    "Full Stack Developer",
    "Srinagar",
    "India",
  ],
  authors: [{ name: "Owais Ahmad", url: "https://linkedin.com/in/owais-ahmad-87093a225" }],
  creator: "Owais Ahmad",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Owais Ahmad — Software Engineer",
    description:
      "Building scalable, user-focused web applications with React, Next.js, and Node.js.",
    siteName: "Owais Ahmad Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Owais Ahmad — Software Engineer",
    description:
      "Building scalable, user-focused web applications with React, Next.js, and Node.js.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <AppProviders>
          <main>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
