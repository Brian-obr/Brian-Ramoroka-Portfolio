import { ImageResponse } from "next/og";

export const alt = "Brian Ramoroka — SEO Web Developer & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0c",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(255,184,0,0.18) 0%, rgba(10,10,12,0) 45%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#FFB800",
            fontSize: "28px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          SEO Web Developer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "96px",
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: "32px",
          }}
        >
          Brian Ramoroka
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "34px",
            color: "rgba(255,255,255,0.85)",
            marginBottom: "48px",
          }}
        >
          Software Engineer · Cape Town, South Africa
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            color: "#FFB800",
          }}
        >
          www.brianramoroka.co.za
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "12px",
            backgroundColor: "#FFB800",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
