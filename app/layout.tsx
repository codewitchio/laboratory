import { Navbar } from "@/components/Navbar"
import type { Metadata, Viewport } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const MontserratFont = Montserrat({
  subsets: ["latin"],
  preload: true,
})

export const metadata: Metadata = {
  title: "codewitch's laboratory",
  description: "A collection of magical experiments",
}

export const viewport: Viewport = {
  themeColor: "#E1E6D9", // Lemonade theme bg-base-200
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${MontserratFont.className} bg-base-200 text-base-content`}
    >
      <body className="flex min-h-dvh flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
