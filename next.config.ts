/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com', // อนุญาต Printful
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',    // อนุญาต Unsplash (สำหรับรูป Blog)
      },
    ],
  },
};

export default nextConfig; // หรือ module.exports = nextConfig ถ้าเป็นไฟล์ .js ธรรมดา