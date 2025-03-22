// next.config.js
import { withContentlayer } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, swcMinify: true, output: 'standalone' }

export default withContentlayer(nextConfig)
