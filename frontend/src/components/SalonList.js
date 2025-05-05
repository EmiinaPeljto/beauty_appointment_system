import React, { useEffect, useState } from 'react';
import api from '../api';

const SalonList = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const res = await api.get('/salons/salonsByCategory/1');
        setSalons(res.data);
      } catch (err) {
        setError('Failed to fetch salons');
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Salons</h2>
      <ul>
        {salons.map((salon) => (
          <li key={salon.id}>{salon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalonList;