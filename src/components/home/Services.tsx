import axios from "axios";
import { useEffect, useState } from "react";
import * as Constant from "../../constant/Constant";
import { Box } from "@mui/material";
import { getAuthToken } from "../../utils/getAuthToken";
import { Link } from "react-router-dom";

type ServiceType = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

export default function Services() {
  const [services, setServices] = useState<ServiceType[]>([]);

  const token = getAuthToken();

  useEffect(() => {
    const fetcService = async () => {
      const response = await axios.get(`${Constant.BASEURL}/services`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(response.data.data);
    };

    fetcService();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        marginBottom: 4,
        width: "100%",
      }}
    >
      {services.length > 0 &&
        services.map((service) => (
          <Link
            to={`/bayar?service=${service.service_code}&service_icon=${service.service_icon}&service_tarif=${service.service_tariff}&service_name=${service.service_name}`}
            key={service.service_code}
            style={{
              textDecoration: "none",
              color: "inherit",
              fontFamily: "inherit",
              width: "100%",

              marginRight: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                alignItems: "center",
                // marginRight: 2,
                // width: "100px",
                width: "100%",
              }}
            >
              <img src={service.service_icon} />
              <small
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: 400,
                }}
              >
                {service.service_name}
              </small>
            </Box>
          </Link>
        ))}
    </Box>
  );
}
