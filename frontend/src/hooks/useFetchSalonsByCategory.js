import { useState, useEffect } from "react";

const useFetchSalonsByCategory = (categoryId) => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/gen/salons/salonsByCategory/${categoryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch salons by category");
        }
        const data = await response.json();
        console.log("Fetched salons: ", data);

        // Fetch average rating for each salon
        const salonsWithRatings = await Promise.all(
          data.map(async (salon) => {
            const ratingResponse = await fetch(`http://localhost:3000/api/v1/gen/reviews/averageRating/${salon.id}`);
            const ratingData = await ratingResponse.json();
            return { ...salon, averageRating: ratingData.data || "N/A" }; // Add averageRating to each salon
          })
        );

        setSalons(salonsWithRatings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [categoryId]);

  return { salons, loading, error };
};

export default useFetchSalonsByCategory;