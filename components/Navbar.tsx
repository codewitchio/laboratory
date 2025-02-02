import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 w-page navbar px-4 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-center">
        <Link href="/" className="text-xl normal-case link-hover">
          codewitch's laboratory
        </Link>
        {/* TODO: Add subtitle based on page/route */}

        {/* <ul className="menu menu-horizontal gap-4 px-1">
          <li>
            <Link
              href="https://github.com/codewitchio/laboratory"
              className="font-medium text-base-content link-hover"
            >
              Github
            </Link>
          </li>
        </ul> */}
      </div>
    </nav>
  )
}
