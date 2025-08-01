import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",

        fontFamily: "Arial, sans-serif",
      }}
    >
      <CircularProgress sx={{ color: "orangered" }} />
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
};

export default LoadingIndicator;
