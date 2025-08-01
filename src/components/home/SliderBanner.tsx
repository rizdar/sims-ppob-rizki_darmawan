import axios from "axios";
import { useEffect, useState } from "react";
import * as Constant from "../../constant/Constant";

import { Box, Typography } from "@mui/material";
import { getAuthToken } from "../../utils/getAuthToken";

type BannerType = {
  banner_name: string;
  banner_image: string;
  description: string;
};

export default function SliderBanner() {
  const [banners, setBanners] = useState<BannerType[]>([]);

  const token = getAuthToken();

  useEffect(() => {
    const fetcService = async () => {
      const response = await axios.get(`${Constant.BASEURL}/banner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBanners(response.data.data);
    };

    fetcService();
  }, []);

  return (
    <Box>
      <Typography fontWeight={400}>Temukan promo menarik</Typography>
      <Box
        mt={2}
        sx={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          gap: 2,
          whiteSpace: "nowrap",
        }}
      >
        {banners.map((b) => (
          <Box key={b.banner_name} width="100%">
            <img
              src={b.banner_image}
              alt={b.banner_name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
