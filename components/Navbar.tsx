import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="card relative z-50 m-auto my-4 flex flex-row bg-base-100 p-2 px-6">
      {/* TODO: The antialiasing on the hover scaling doesn't look amazing */}
      {/* TODO: Only show back button when on non-home pages */}
      <Link
        href="/"
        className="me-2 flex cursor-pointer transition-all hover:scale-110"
      >
        <Image
          src="icons/arrow-small-left.svg"
          alt="Back"
          width={24}
          height={24}
        />
      </Link>
      <Link href="/" className="text-xl font-light normal-case link-hover">
        codewitch's laboratory
      </Link>
      {/* TODO: Add subtitle based on page/route */}
    </nav>
  )
}
