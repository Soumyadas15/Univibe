/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com",
            "i.ibb.co"
        ]
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
