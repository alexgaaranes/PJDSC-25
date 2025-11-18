/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configs
  allowedDevOrigins: [
    'http://192.168.56.1:3000', // The address your server thinks it's running on
    'http://192.168.1.105:3000', // Example: The address your phone is using
  ],
};

module.exports = nextConfig;