/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // reactStrictMode: true,
    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    // trailingSlash: true,
    
    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    // skipTrailingSlashRedirect: true,
    
    // Optional: Change the output directory `out` -> `dist`
    // distDir: 'dist',
    eslint: { 
        ignoreDuringBuilds: true
    },
    env: {
        api_url: '43.231.113.215'
    }
}
module.exports = nextConfig
