/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        // Uploadthing url
        hostname: "gn2layagbk.ufs.sh",
      },
    ],
  },
}

export default nextConfig
