import { Box, Typography } from "@mui/material";
import bgIlustrasi from "../../assets/images/illustrasi-auth.png";
import logo from "../../assets/images/logo.png";
import LoginForm from "./LoginForm";
export default function Login() {
  return (
    <Box display="flex" height="100vh">
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding={6}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" gap={1} mb={1}>
            <img src={logo} alt="logo" />
            <Typography variant="h6">SIMS PPOB</Typography>
          </Box>
          <Typography variant="h6" mb={2}>
            Masuk atau buat akun untuk memulai
          </Typography>
        </Box>
        <LoginForm />
      </Box>
      <Box
        flex={1}
        sx={{
          backgroundImage: `url(${bgIlustrasi})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
}
