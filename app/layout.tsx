import { Navbar } from "@/components/Navbar"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const MontserratFont = Montserrat({
  subsets: ["latin"],
  preload: false,
})

export const metadata: Metadata = {
  title: "codewitch's laboratory",
  description: "A collection of magical experiments",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${MontserratFont.className} `}>
      <body className="flex min-h-dvh flex-col bg-base-100 text-base-content antialiased">
        <Navbar />
        <main className="relative grow">{children}</main>
      </body>
    </html>
  )
}
