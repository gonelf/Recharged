import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reacquire – Turn Every Trial into a Paying Customer",
    short_name: "Reacquire",
    description:
      "Turn free trials into paying customers with Stripe pre-auth payment capture, AI signup optimization, dispute protection, and revenue analytics.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["business", "finance", "productivity"],
  };
}
