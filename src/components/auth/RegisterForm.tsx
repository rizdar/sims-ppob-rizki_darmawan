import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { registerUser } from "../../actions/authAction";
import useSweetAlert from "../../hooks/use-sweet-alert";
import { Link, useNavigate } from "react-router-dom";
import * as Constant from "../../constant/Constant";

interface RegisterFormInputs {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterFormInputs>({ mode: "all" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const { showAlert } = useSweetAlert();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (success) {
      reset();
      showAlert("Success!", "Pendaftaran akun berhasil!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        }
      );
    }

    if (error) {
      showAlert("Error!", error, "error");
    }
  }, [success, error]);

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
        type="text"
        variant="outlined"
        margin="normal"
        placeholder="nama depan"
        {...register("first_name", { required: "nama depan wajib diisi" })}
        error={!!errors.first_name}
        helperText={errors.first_name ? String(errors.first_name.message) : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineOutlinedIcon style={{ color: "#abadb0" }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type="text"
        variant="outlined"
        margin="normal"
        placeholder="nama belakang"
        {...register("last_name", { required: "nama belakang wajib diisi" })}
        error={!!errors.last_name}
        helperText={errors.last_name ? String(errors.last_name.message) : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineOutlinedIcon style={{ color: "#abadb0" }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        type={showPassword ? "text" : "password"}
        variant="outlined"
        margin="normal"
        placeholder="buat password"
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
      <TextField
        type={showConfirmPassword ? "text" : "password"}
        variant="outlined"
        margin="normal"
        placeholder="konfirmasi password"
        error={!!errors.confirmPassword}
        helperText={
          errors.confirmPassword ? String(errors.confirmPassword.message) : ""
        }
        {...register("confirmPassword", {
          required: "konfirmasi password wajib diisi",
          validate: (value) =>
            value === watch("password") ||
            "konfirmasi password harus sama dengan password",
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon style={{ color: "#abadb0" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Registrasi"
        )}
      </Button>
      <Typography textAlign="center" color="textSecondary">
        Sudah punya akun? login {""}
        <Link
          to={Constant.LOGINPAGE}
          style={{ color: "orangered", textDecoration: "none" }}
        >
          disini
        </Link>
      </Typography>
    </form>
  );
}
