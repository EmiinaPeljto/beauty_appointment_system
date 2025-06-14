import { useState, useEffect } from "react";
import api from "../utils/api";

const useFetchSalonsByCategory = (categoryIds) => {
  const [salonsData, setSalonsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllSalons = async () => {
      if (!categoryIds || categoryIds.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const dataPromises = categoryIds.map(async (categoryId) => {
          const salonsForCategory = await api.get(`/salons/salonsByCategory/${categoryId}`);

          const salonsWithRatings = await Promise.all(
            salonsForCategory.map(async (salon) => {
              const ratingData = await api.get(`/reviews/averageRating/${salon.id}`);
              return { ...salon, averageRating: ratingData.data || "N/A" };
            })
          );

          return { categoryId, salons: salonsWithRatings };
        });

        const results = await Promise.all(dataPromises);
        setSalonsData(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSalons();
  }, [categoryIds]);

  return { salonsData, isLoading, error };
};

export default useFetchSalonsByCategory;