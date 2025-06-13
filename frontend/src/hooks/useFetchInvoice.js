import { useEffect, useState } from "react";
import axios from "axios";

const useFetchInvoice = (appointment_id) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!appointment_id) return;
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:3000/api/v1/gen/invoices/getInvoice/${appointment_id}`)
      .then((res) => setInvoice(res.data))
      .catch(() => setError("Failed to fetch invoice"))
      .finally(() => setLoading(false));
  }, [appointment_id]);

  return { invoice, loading, error };
};

export default useFetchInvoice;