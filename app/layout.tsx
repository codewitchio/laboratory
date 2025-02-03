import { Navbar } from "@/components/Navbar"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const MontserratFont = Montserrat({
  subsets: ["latin"],
  preload: true,
})

export const metadata: Metadata = {
  title: "codewitch's laboratory",
  description: "A collection of magical experiments",
  appleWebApp: {
    title: "codewitch's laboratory",
    // statusBarStyle: "black-translucent",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${MontserratFont.className} `}>
      {/* <meta name="apple-mobile-web-app-title" content="MyWebSite" /> */}
      <body className="flex min-h-dvh flex-col bg-base-200 text-base-content antialiased">
        <Navbar />
        <main className="relative grow">{children}</main>
      </body>
    </html>
  )
}
