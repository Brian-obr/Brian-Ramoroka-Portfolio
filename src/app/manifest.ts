import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brian Ramoroka, Web Developer",
    short_name: "Brian Ramoroka",
    start_url: "/",
    display: "browser",
    background_color: "#0F0E0D",
    theme_color: "#0F0E0D",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
