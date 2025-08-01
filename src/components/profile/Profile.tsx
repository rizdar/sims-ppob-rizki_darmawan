import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import LoadingIndicator from "../common/Loading";
import { fetchProfile, updateProfile } from "../../actions/profileAction";
import profileAvatar from "../../assets/images/profile.png";
import { useForm } from "react-hook-form";
import useSweetAlert from "../../hooks/use-sweet-alert";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { resetState } from "../../store/profileSlice";
import axios from "axios";
import * as Constant from "../../constant/Constant";
import EditIcon from "@mui/icons-material/Edit";
import { getAuthToken } from "../../utils/getAuthToken";

interface UpdateUserInput {
  email: string;
  first_name: string;
  last_name: string;
}

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);
  const { showAlert } = useSweetAlert();
  const navigate = useNavigate();

  const { firstName, lastName, email, profileImage, loading, error, success } =
    useSelector((state: RootState) => state.profile);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<UpdateUserInput>({
    mode: "onBlur",
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const token = getAuthToken();

        await axios.put(`${Constant.BASEURL}/profile/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState);
    clearErrors();
  };

  useEffect(() => {
    if (email && firstName && lastName) {
      reset({
        email: email,
        first_name: firstName,
        last_name: lastName,
      });
    }
  }, [email, firstName, lastName]);

  useEffect(() => {
    if (success) {
      showAlert("Success!", "Profile berhasil diubah!", "success").then((r) => {
        if (r.isConfirmed) {
          setIsEditing(false);
          dispatch(resetState());
          window.location.reload();
        }
      });
    }
    if (error) {
      showAlert("Error!", error, "error");
    }
  }, [error, success]);

  const onSubmit = (formData: UpdateUserInput) => {
    dispatch(updateProfile(formData));
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={1}
        >
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <Box display="flex" justifyContent="center" position="relative">
            {preview ? (
              <img
                src={preview}
                alt="avatar"
                style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                onClick={() => document.getElementById("image-upload")?.click()}
              />
            ) : (
              <img
                src={
                  profileImage &&
                  profileImage !==
                    "https://minio.nutech-integrasi.com/take-home-test/null"
                    ? profileImage
                    : profileAvatar
                }
                onClick={() => document.getElementById("image-upload")?.click()}
                alt="avatar"
                style={{ borderRadius: "50%", width: "100px", height: "100px" }}
              />
            )}
            <IconButton
              style={{
                position: "absolute",
                bottom: 0,
                right: -18,
                borderRadius: "50%",
              }}
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <Typography>
            {firstName && lastName && `${firstName}  ${lastName}`}
          </Typography>
        </Box>
      </Box>
      <Box width="40%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <FormControl variant="outlined" fullWidth margin="normal">
            <TextField
              id="email"
              type="email"
              variant="outlined"
              disabled={!isEditing}
              {...register("email", {
                required: "email wajib diisi",

                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "email tidak valid",
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailOutlinedIcon style={{ color: "#abadb0" }} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <InputLabel htmlFor="firts_name">Nama Depan</InputLabel>
          <FormControl variant="outlined" fullWidth margin="normal">
            <TextField
              id="firts_name"
              type="string"
              variant="outlined"
              disabled={!isEditing}
              {...register("first_name", {
                required: "nama depan wajib diisi",
              })}
              error={!!errors.first_name}
              helperText={
                errors.first_name ? String(errors.first_name.message) : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon style={{ color: "#abadb0" }} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <InputLabel htmlFor="last_name">Nama Belakang</InputLabel>
          <FormControl variant="outlined" fullWidth margin="normal">
            <TextField
              id="last_name"
              type="string"
              variant="outlined"
              disabled={!isEditing}
              {...register("last_name", {
                required: "nama depan wajib diisi",
              })}
              error={!!errors.last_name}
              helperText={
                errors.last_name ? String(errors.last_name.message) : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon style={{ color: "#abadb0" }} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Box display="flex" flexDirection="column" gap={1} mt={1}>
            {isEditing && (
              <>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "orangered" }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </Button>
                <Button
                  variant="outlined"
                  style={{ color: "orangered", borderColor: "orangered" }}
                  onClick={handleEditToggle}
                  type="button"
                >
                  Batalkan
                </Button>
              </>
            )}
            {!isEditing && (
              <>
                <Button
                  variant="outlined"
                  style={{ color: "orangered", borderColor: "orangered" }}
                  onClick={handleEditToggle}
                  type="button"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "orangered" }}
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                    window.location.reload();
                  }}
                  type="button"
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
