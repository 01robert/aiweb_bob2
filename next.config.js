/** @type {import('next').NextConfig} */
const nextConfig = {
  // 你的配置选项
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  }
}

module.exports = nextConfig 