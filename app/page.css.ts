import { style } from "@vanilla-extract/css";

export const homeRoot = style({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const buttonContainer = style({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
});

export const buttonWrapper = style({
  width: "content-fit",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
});
