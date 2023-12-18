/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // reactStrictMode: true,
    env: {
        REACT_APP_IS_PROD: false,
        REACT_APP_PROD_URL_PREFIX: 'https://manager-api.oktagon.mn'
    }
}

module.exports = nextConfig
