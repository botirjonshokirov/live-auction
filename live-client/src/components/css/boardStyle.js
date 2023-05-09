export const adAreaStyle = {
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  gridGap: "1.2rem",
  justifyContent: "center",
  margin: "1rem",
};

export const boardStyle = {
  display: "flex",
  flexDirection: "column",
};

export const paginationStyle = {
  display: "flex",
  justifyContent: "center",
};

export const boardCardStyle = {
  width: "100%",
  height: "auto",
  maxWidth: 400,
  minHeight: 330,
  margin: "0 auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.12)",
  borderRadius: 8,
  overflow: "hidden",
  backgroundColor: "#ffffff",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
};
