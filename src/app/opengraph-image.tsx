import { ImageResponse } from "next/og";

// A real 1200x630 PNG (the old og:image was a 3992x6000 portrait declared as 1200x630).
export const alt = "Brian Ramoroka, Front-end Developer in Cape Town";
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0A0A0C",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#FFB800", textTransform: "uppercase" }}>
          brianramoroka.co.za
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}>Brian Ramoroka</div>
          <div style={{ fontSize: 44, marginTop: 24, color: "#D4D4D8" }}>Front-end Developer · Cape Town</div>
        </div>
        <div style={{ display: "flex", height: 8, width: 160, background: "#FFB800" }} />
      </div>
    ),
    size,
  );
}
