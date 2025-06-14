import { useEffect, useState } from "react";
import api from "../utils/api";

const useFetchInvoice = (appointment_id) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!appointment_id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.get(`/invoices/getInvoice/${appointment_id}`);
        setInvoice(data);
      } catch (err) {
        setError(err.message || "Failed to fetch invoice");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [appointment_id]);

  return { invoice, loading, error };
};

export default useFetchInvoice;