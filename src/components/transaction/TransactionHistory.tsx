import { Box, Button, CircularProgress, Typography } from "@mui/material";
import * as Constant from "../../constant/Constant";
import { useEffect, useState } from "react";
import axios from "axios";

interface Transaction {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

const token = localStorage.getItem("token");

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${Constant.BASEURL}/transaction/history`,

        {
          params: { offset: page, limit: 5 },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.records;

      if (data.length < 3) setHasMore(false);

      setTransactions((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page < 1) {
      setPage(1);
      return;
    }
    fetchTransactions(page);
  }, [page]);

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {transactions.length > 0 &&
        transactions.map((d) => (
          <Box
            key={d.invoice_number + Math.random()}
            padding={2}
            border={1}
            borderColor="#e1e5ed"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  color={d.transaction_type === "PAYMENT" ? "error" : "success"}
                  variant="h6"
                  mb={1}
                >
                  {d.transaction_type === "PAYMENT" ? (
                    <span>-</span>
                  ) : (
                    <span>+</span>
                  )}{" "}
                  Rp. {d.total_amount}
                </Typography>
                <Box display="flex" gap={2} alignItems="center" color="gray">
                  <Typography fontSize={10}>
                    {new Date(d.created_on).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </Typography>
                  <Typography fontSize={10}>
                    {new Date(d.created_on)
                      .toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC",
                        hour12: false,
                      })
                      .replace(":", ".")}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography>{d.description}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      {isLoading ? (
        <CircularProgress size={24} />
      ) : (
        hasMore && (
          <Button
            variant="text"
            sx={{ color: "orangered", textTransform: "none" }}
            onClick={handleShowMore}
          >
            Show more
          </Button>
        )
      )}
    </Box>
  );
}
