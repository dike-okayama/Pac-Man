import { style } from "@vanilla-extract/css";

export const playRoot = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

export const board = style({
  display: "flex",
  flexDirection: "column",
});

export const row = style({
  display: "flex",
  flexDirection: "row",
});

export const cell = style({
  width: "30px",
  height: "30px",
  border: "5px solid #0e0e0e",
});

export const food = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  selectors: {
    "&:after": {
      content: '""',
      display: "block",
      width: "25%",
      height: "25%",
      backgroundColor: "#ffffff",
      borderRadius: "50%",
    },
  },
});
