import { Box, Typography } from "@mui/material";
import ProfileBanner from "../components/home/ProfileBanner";
import TransactionHistory from "../components/transaction/TransactionHistory";

export default function TransactionHistoryPage() {
  return (
    <Box paddingX={10}>
      <ProfileBanner />
      <Typography variant="h6" mb={2}>
        Semua Transaksi
      </Typography>
      <TransactionHistory />
    </Box>
  );
}
