import { useEffect, useState } from "react";
import axios from "axios";

const useFetchServicesBySalon = (salonId) => {
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/gen/services/servicesBySalon/${salonId}`);
        const grouped = {};

        response.data.forEach((item) => {
          if (!grouped[item.category_name]) {
            grouped[item.category_name] = [];
          }
          grouped[item.category_name].push({
            name: item.name,
            duration: item.duration,
            price: item.price
          });
        });

        setServicesByCategory(grouped);
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [salonId]);

  return { servicesByCategory, loading, error };
};

export default useFetchServicesBySalon;
