import { useEffect, useState } from "react";
import api from "../utils/api";

const useFetchServicesBySalon = (salonId) => {
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get(
          `/services/servicesBySalon/${salonId}`
        );
        const grouped = {};

        response.forEach((item) => {
          if (!grouped[item.category_name]) {
            grouped[item.category_name] = [];
          }
          grouped[item.category_name].push({
            id: item.id,
            name: item.name,
            duration: item.duration,
            price: item.price,
          });
        });

        setServicesByCategory(grouped);
      } catch (err) {
        setError(err.message || "Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [salonId]);

  return { servicesByCategory, loading, error };
};

export default useFetchServicesBySalon;
