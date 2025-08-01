import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const NAVLINKS = [
  {
    path: "/top-up",
    label: "Top Up",
  },
  {
    path: "/transaction",
    label: "Transaction",
  },
  {
    path: "/profile",
    label: "Akun",
  },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      paddingY={2}
      paddingX={10}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box>
            <img src={logo} alt="logo" />
          </Box>
          <Typography>SIMS PPOB</Typography>
        </Box>
      </Link>

      <Box display="flex" gap={2}>
        {NAVLINKS.map((n) => (
          <Link
            to={n.path}
            key={n.label}
            style={{
              textDecoration: "none",
              color: location.pathname === n.path ? "orangered" : "inherit",
              fontWeight: location.pathname === n.path ? "bold" : "normal",
            }}
          >
            <Typography variant="subtitle1">{n.label}</Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
