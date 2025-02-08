"use client"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AnimatedLink = motion.create(Link)

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <motion.nav
      layout
      className="card relative z-50 m-auto my-4 flex flex-row bg-base-100 p-2 px-6"
    >
      <AnimatePresence initial={false}>
        {/* TODO: Add hover animation */}
        {!isHomePage && (
          <AnimatedLink
            href="/"
            className="flex cursor-pointer"
            // layout animation doesn't seem to work with "gap", so we set a manual margin here instead
            initial={{ opacity: 0, width: 0, marginRight: 0 }}
            animate={{ opacity: 1, width: "auto", marginRight: 8 }}
            exit={{ opacity: 0, width: 0, marginRight: 0 }}
            key="back-button"
          >
            <Image
              src="icons/arrow-small-left.svg"
              alt="Back"
              width={24}
              height={24}
            />
          </AnimatedLink>
        )}
        <Link href="/" className="text-xl font-light normal-case link-hover">
          codewitch's laboratory
        </Link>
        {/* TODO: Add subtitle based on page/route */}
      </AnimatePresence>
    </motion.nav>
  )
}
