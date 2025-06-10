import { useEffect, useState } from "react";
import api from "../api";

const useLikedSalons = (userId) => {
    const [salons, setSalons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        setError(null);

        api.get(`/gen/favourites/getFavoritesByUserId/${userId}`)
            .then(res => {
                // Map backend fields to card props
                const mappedSalons = (res.data?.data || []).map((salon) => ({
                    id: salon.id,
                    name: salon.name,
                    rating: parseFloat(salon.rating),
                    address: salon.location,
                    image: salon.image,
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