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
  border: "3px solid #fefefe",
  borderRadius: "5%",
  cursor: "pointer",
  gap: "1rem",
});

export const trainButton = style({
  width: "150px",
  height: "150px",
  borderColor: "red",
  borderRadius: "50%",
  textAlign: "center",
});
