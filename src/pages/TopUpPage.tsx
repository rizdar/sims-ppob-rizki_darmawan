import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ProfileBanner from "../components/home/ProfileBanner";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import * as Constant from "../constant/Constant";
import useShowAlert from "../hooks/use-sweet-alert";
import { getAuthToken } from "../utils/getAuthToken";

const nominalList = [10000, 20000, 50000, 100000, 250000, 500000];

interface FormData {
  nominal: number;
}

export default function TopUpPage() {
  const token = getAuthToken();
  const [selectedNominal, setSelectedNominal] = useState<number | "">("");
  const { showAlert } = useShowAlert();
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<FormData>({ mode: "all" });

  const handleNominalClick = (nominal: number) => {
    setSelectedNominal(nominal);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post(
        `${Constant.BASEURL}/topup`,
        {
          top_up_amount: data.nominal,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Success!", "Top up berhasil!", "success").then((r) => {
        if (r.isConfirmed) {
          setSelectedNominal("");
          window.location.reload();
        }
      });
    } catch (error) {
      showAlert("Error!", "Gagal Top up", "error").then((r) => {
        if (r.isConfirmed) {
          setSelectedNominal("");
        }
      });
      console.log(error);
    }
  };

  useEffect(() => {
    setValue("nominal", Number(selectedNominal));
  }, [selectedNominal, setValue]);

  const isButtonDisabled =
    !selectedNominal || selectedNominal < 10000 || selectedNominal > 1000000;

  return (
    <Box paddingX={10}>
      <ProfileBanner />
      <Typography>Silakan masukan</Typography>
      <Typography variant="h6">Nominal Top Up</Typography>
      <Box display="flex" gap={1} alignItems="center">
        <Box flex={0.6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              placeholder="masukan nominal top up"
              {...register("nominal", { required: "nominal wajib diisi" })}
              value={selectedNominal}
              fullWidth
              onChange={(e) => setSelectedNominal(Number(e.target.value))}
              error={!!errors.nominal}
              helperText={errors.nominal ? String(errors.nominal.message) : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnOutlinedIcon style={{ color: "#abadb0" }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              sx={{ bgcolor: "orangered", padding: 2 }}
              variant="contained"
              fullWidth
              disabled={isButtonDisabled}
              type="submit"
            >
              Top Up
            </Button>
          </form>
        </Box>
        <Box bgcolor="InactiveCaption" flex={0.4}>
          <Grid container spacing={1}>
            {nominalList.map((nominal, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box
                  bgcolor="white"
                  borderRadius={1}
                  padding={2}
                  boxShadow={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ cursor: "pointer", "&:hover": { boxShadow: 3 } }}
                  onClick={() => handleNominalClick(nominal)}
                >
                  <Typography variant="body1">{`Rp ${nominal.toLocaleString()}`}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
