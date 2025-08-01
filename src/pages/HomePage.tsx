import { Box } from "@mui/material";

import ProfileBanner from "../components/home/ProfileBanner";
import Services from "../components/home/Services";
import SliderBanner from "../components/home/SliderBanner";

export default function HomePage() {
  return (
    <Box paddingX={10}>
      <ProfileBanner />
      <Services />
      <SliderBanner />
    </Box>
  );
}
