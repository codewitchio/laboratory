"use client"
import { extractPageTitle, HOME_TITLE } from "@/lib/metadata"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const AnimatedLink = motion.create(Link)

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const [experimentTitle, setExperimentTitle] = useState<string>("")

  useEffect(() => {
    if (typeof document !== undefined) {
      setExperimentTitle(
        document.title !== HOME_TITLE ? extractPageTitle(document.title) : ""
      )
    }
  }, [pathname])

  // Note to self: If I end up not keeping this, turn it into an experiment page. It looks super nice, even if I'm unsure this is how I want it to work.
  return (
    <motion.nav
      layout
      className="card relative z-50 m-auto my-4 flex flex-row items-baseline bg-base-100 p-2 px-6"
    >
      <AnimatePresence initial={false}>
        {!isHomePage && (
          // TODO: Set color to subtle and regular on hover. Probably shouldn't use <Image> for this.
          <AnimatedLink
            href="/"
            className="flex cursor-pointer self-center"
            // layout animation doesn't seem to work with "gap", so we set a manual margin here instead
            initial={{ opacity: 0, width: 0, marginRight: 0 }}
            animate={{ opacity: 1, width: "auto", marginRight: 8 }}
            exit={{ opacity: 0, width: 0, marginRight: 0 }}
            whileHover={{ scale: 1.1 }}
            key="back-button"
          >
            <Image
              src="icons/arrow-small-left.svg"
              alt="Back"
              width={24}
              height={24}
              priority
            />
          </AnimatedLink>
        )}
        <span className="text-lg font-light" key="main-title">
          codewitch's laboratory
        </span>
        {experimentTitle && (
          <motion.span
            key={experimentTitle}
            className="overflow-hidden text-sm font-light text-nowrap text-subtle"
            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
          >
            {experimentTitle}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
