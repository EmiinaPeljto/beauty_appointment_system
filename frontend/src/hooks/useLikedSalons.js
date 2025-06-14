import { useEffect, useState } from "react";
import api from "../utils/api";

const useLikedSalons = (userId) => {
    const [salons, setSalons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        setError(null);

        api.get(`/favourites/getFavoritesByUserId/${userId}`)
            .then(response => {
                const salonsList = response.data || [];
                const mappedSalons = salonsList.map((salon) => ({
                    id: salon.id,
                    image: salon.image,
                    name: salon.name,
                    address: salon.location,
                    rating: salon.rating,
                }));
                setSalons(mappedSalons);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [userId]);

    return { salons, loading, error };
};

export default useLikedSalons;