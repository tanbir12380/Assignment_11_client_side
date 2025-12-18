import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import "./Profile.css";
import Header from "./Header";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const { data: fullUser, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-11-server-rosy-five.vercel.app/user/${user.email}`,
        {
          headers: {
            accesstoken: user.accessToken,
          },
        }
      );
      return res.json();
    },
  });

  if (isLoading) return <p>Loading profile...</p>;

  if (!fullUser) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const photoVariants = {
    hidden: { opacity: 0, y: -80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="profile-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />

      <motion.div className="profile-card-pro" variants={cardVariants}>
        <motion.div className="profile-card" variants={cardVariants}>
          <motion.div className="profile-photo" variants={photoVariants}>
            <img src={fullUser.photoURL} alt={fullUser.name} />
          </motion.div>

          <motion.div className="profile-details" variants={containerVariants}>
            <motion.h2 className="profile-name" variants={itemVariants}>
              {fullUser.name}
            </motion.h2>
            <motion.p className="profile-email" variants={itemVariants}>
              {fullUser.email}
            </motion.p>
            <motion.p className="profile-role" variants={itemVariants}>
              Role: {fullUser.role}
            </motion.p>
            <motion.p className="profile-created" variants={itemVariants}>
              Member since: {new Date(fullUser.createdAt).toLocaleDateString()}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
