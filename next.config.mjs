/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        // Uploadthing url
        hostname: "gn2layagbk.ufs.sh",
        protocol: "https",
        pathname: "/f/**",
      },
    ],
  },
}

export default nextConfig
