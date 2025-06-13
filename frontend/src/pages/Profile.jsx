import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import UpcomingAppointments from "../components/UpcomingAppointments";
import CompletedAppointments from "../components/CompletedAppointments";
import Likes from "../components/Likes";
import { useAuth } from "../contexts/AuthContext";
import useUpcomingAppointments from "../hooks/useUpcomingAppointments";
import api from "../utils/api";

const Profile = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("Upcoming Appointments");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user) return;
      try {
        const data = await api.get(`/users/${user.id}`);
        setUserDetails(data);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };
    fetchUserDetails();
  }, [user]);

  // Use the hook to fetch upcoming appointments
  const {
    appointments,
    loading: apptLoading,
    error: apptError,
  } = useUpcomingAppointments(userDetails?.id);

  if (!userDetails) return <div>Loading...</div>;

  // Render the correct tab content
  let tabContent = null;
  if (activeTab === "Upcoming Appointments") {
    tabContent = (
      <UpcomingAppointments
        appointments={appointments}
        loading={apptLoading}
        error={apptError}
      />
    );
  } else if (activeTab === "Completed Appointments") {
    tabContent = <CompletedAppointments />;
  } else if (activeTab === "Likes") {
    tabContent = <Likes />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileCard
        name={`${userDetails.first_name} ${userDetails.last_name}`}
        email={userDetails.email}
        phone={userDetails.phone_number}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      {tabContent}
    </div>
  );
};

export default Profile;
