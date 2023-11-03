import { style } from "@vanilla-extract/css";

export const trainRoot = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

export const boxContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
  padding: "1rem",
});

export const box = style({
  width: "150px",
  height: "150px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #fefefe",
  cursor: "pointer",
});

export const trainButton = style({
  border: "2px solid red",
});
