const nextConfig = {
  images: {
    domains: ["tekomod.online"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
  env: {
    LIQPAY_PUBLIC_KEY: process.env.LIQPAY_PUBLIC_KEY,
    LIQPAY_PRIVATE_KEY: process.env.LIQPAY_PRIVATE_KEY,
  },
};

export default nextConfig;
