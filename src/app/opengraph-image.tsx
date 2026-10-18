import { ImageResponse } from "next/og";

export const alt = "Brian Ramoroka, web developer and SEO specialist in Cape Town";
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
          padding: "72px",
          background: "#0F0E0D",
          color: "#F5F5F4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: 96, height: 8, background: "#FBBF24" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>Brian Ramoroka</div>
          <div style={{ fontSize: 40, marginTop: 20, color: "#D6D3D1" }}>
            Web developer and SEO for Cape Town businesses
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#FBBF24" }}>brianramoroka.co.za</div>
      </div>
    ),
    size,
  );
}
