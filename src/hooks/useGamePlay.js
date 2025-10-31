// hooks/useGamePlay.js
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
export const useGamePlay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playGameData, setPlayGameData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { userId, setIsLoginNotify } = useAuth();

  const handlePlay = async (game) => {
    if (isPlaying) return;

    setIsPlaying(true);

    try {
      if (userId) {
        const response = await fetch(
          "http://localhost:5000/api/v1/launch_gamePlayer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              userId,
              game_id: "0",
              g_type: game.g_type,
              p_code: game.providercode,
            }),
          }
        );

        const data = await response.json();

        if (data.errMsg === "Success" && userId) {
          setPlayGameData(data);
          setShowPopup(true);
        }
      } else {
        setIsLoginNotify("আপনাকে লগইন করতে হবে খেলার জন্য যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ করুন আমাদের সাথে। এটা একেবারেই ফ্রী!");
      }
    } catch (error) {
      console.error("Error launching game:", error);
      setIsLoginNotify("আপনাকে লগইন করতে হবে খেলার জন্য যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ করুন আমাদের সাথে। এটা একেবারেই ফ্রী!");
    } finally {
      setIsPlaying(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPlayGameData(null);
  };

  return {
    isPlaying,
    playGameData,
    showPopup,
    handlePlay,
    handleClosePopup,
    setShowPopup,
    setPlayGameData
  };
};