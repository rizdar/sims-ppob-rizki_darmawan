import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Constant from "../../constant/Constant";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authAction";
import { AppDispatch, RootState } from "../../store";
import useSweetAlert from "../../hooks/use-sweet-alert";
import { clearError } from "../../store/authSlice";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({ mode: "all" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );
  const { showAlert } = useSweetAlert();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (success) {
      reset();
      showAlert("Success!", "Berhasil masuk!", "success").then((result) => {
        if (result.isConfirmed) {
          dispatch(clearError());
          navigate("/");
          window.location.reload();
        }
      });
    }

    if (error) {
      showAlert("Error!", error, "error").then((result) => {
        if (result.isConfirmed) {
          dispatch(clearError());
        }
      });
    }
  }, [success, error]);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <TextField
        type="email"
        variant="outlined"
        margin="normal"
        placeholder="masukan email anda"
        {...register("email", {
          required: "email wajib diisi",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "email tidak valid",
          },
        })}
        error={!!errors.email}
        helperText={errors.email ? String(errors.email.message) : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmailOutlinedIcon style={{ color: "#abadb0" }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type={showPassword ? "text" : "password"}
        variant="outlined"
        margin="normal"
        placeholder="masukan password anda"
        {...register("password", {
          required: "password wajib diisi",
          minLength: {
            value: 8,
            message: "password setidaknya terdiri dari 8 karakter",
          },
        })}
        error={!!errors.password}
        helperText={errors.password ? String(errors.password.message) : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon style={{ color: "#abadb0" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ marginY: 2, backgroundColor: "orangered" }}
        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Masuk"}
      </Button>
      <Typography textAlign="center" color="textSecondary">
        Belum punya akun? registrasi {""}
        <Link
          to={Constant.REGISTERPAGE}
          style={{ color: "orangered", textDecoration: "none" }}
        >
          disini
        </Link>
      </Typography>
    </form>
  );
}
