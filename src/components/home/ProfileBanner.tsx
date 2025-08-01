import { Box, IconButton, Typography } from "@mui/material";
import bgSaldo from "../../assets/images/background-saldo.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchProfile, getBalance } from "../../actions/profileAction";
import profileAvatar from "../../assets/images/profile.png";
import LoadingIndicator from "../common/Loading";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ProfileBanner() {
  const [showBalance, setShowBalance] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { firstName, lastName, profileImage, loading, balance } = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(getBalance());
  }, [dispatch]);

  const handleToggleBalance = () => {
    setShowBalance((prevState) => !prevState);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={8}
    >
      <Box flex={0.4}>
        <img
          src={
            profileImage &&
            profileImage !==
              "https://minio.nutech-integrasi.com/take-home-test/null"
              ? profileImage
              : profileAvatar
          }
          alt="profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Typography mt={1}>Selamat Datang,</Typography>
        {firstName && lastName && (
          <Typography variant="h5">{`${firstName} ${lastName}`}</Typography>
        )}
      </Box>
      <Box
        flex={0.6}
        bgcolor="orangered"
        color="white"
        borderRadius={2}
        boxShadow={3}
        display="flex"
        flexDirection="column"
        gap={1}
        padding={4}
        sx={{
          backgroundImage: `url(${bgSaldo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography>Saldo Anda</Typography>
        <Typography variant="h5">
          {showBalance
            ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(Number(balance))
            : "Rp **********"}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography>Lihat Saldo</Typography>
          <IconButton onClick={handleToggleBalance} sx={{ color: "white" }}>
            {showBalance ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
