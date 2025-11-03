
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { launchGameApi } from "../services/launchGameApi ";
import phoneVerificationService from "../services/phoneVerificationService";
import turnoverService from "../services/TurnoverService";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { login, user, setUser } = useAuth();
  const [gameLaunchState, setGameLaunchState] = useState({
    show: false,
    gameUrl: "",
    // providerLogo: '',
    // providerName: '',
    userId: user?.userId || "",
    // userIp: ''
  });
  const [userBalance, setUserBalance] = useState();
  const [refreshing, setRefreshing] = useState(false);
  // const handleRefresh = async () => {
  //   try {
  //     // await handelUserDetails(userId);
  //     // if(userId){
  //     const response = await phoneVerificationService.user_balance_update();
  //     setUserBalance(response.balance);
  //     console.log("Balance Data:", response.balance);
  //     // }
  //   } catch (error) {
  //     console.error("Error fetching balance:", error);
  //   }
  // };

  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);

    // handelUserDetails(userId);
    try {
      // handelUserDetails();

      const response = await phoneVerificationService.user_balance_update();
      setUserBalance(response.balance);
      console.log("Balance Data updated:", response.balance);

      // if (response.data.hasOwnProperty("balance")) {
      //   (token); // Ensure token is available in scope
      // }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setTimeout(() => setRefreshing(false), 1000); // Proper finally block
    }
  };

  console.log("Launch game API response:", gameLaunchState.gameUrl);
  const [loading, setLoading] = useState(false);

  // ✅ Function to call API and show popup
  const launchGame = async (game) => {
    setLoading(true);
    handleRefresh(user.userId);
    try {
      const gameData = await launchGameApi(
        game.g_code,
        game.p_code,
        user.userId
      );
      setGameLaunchState({
        show: true,
        gameUrl: gameData.gameUrl,
      });
    } catch (error) {
      alert("Unable to launch game. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const closeGame = () => {
    setGameLaunchState({
      show: false,
      gameUrl: "",
      // providerLogo: '',
      // providerName: '',
      userName: "",
      userIp: "",
    });
    handleRefresh();
  };

  useEffect(() => {
    if (user?.userId) {
      handleRefresh();
    }
  }, [user?.userId]);

 //-------------------------------turnover--------------------------------------//
   const [turnoverData, setTurnoverData] = useState({
    active: [],
    completed: [],
    loading: false,
    lastUpdated: null
  });

   // Turnover API Functions
  const fetchActiveTurnover = useCallback(async () => {
    setTurnoverData(prev => ({ ...prev, loading: true }));
    
    try {
      const response = await turnoverService.getActiveTurnover();
      const data = response?.data || [];
      
      setTurnoverData(prev => ({
        ...prev,
        active: data,
        loading: false,
        lastUpdated: new Date().toISOString()
      }));
      
      return data;
    } catch (error) {
      console.error('Error fetching active turnover data:', error);
      setTurnoverData(prev => ({ 
        ...prev, 
        loading: false 
      }));
      throw error;
    }
  }, []);

  const fetchCompletedTurnover = useCallback(async () => {
    setTurnoverData(prev => ({ ...prev, loading: true }));
    
    try {
      const response = await turnoverService.getCompletedTurnover();
      const data = response?.data || [];
      
      setTurnoverData(prev => ({
        ...prev,
        completed: data,
        loading: false,
        lastUpdated: new Date().toISOString()
      }));
      
      return data;
    } catch (error) {
      console.error('Error fetching completed turnover data:', error);
      setTurnoverData(prev => ({ 
        ...prev, 
        loading: false 
      }));
      throw error;
    }
  }, []);
 //-------------------------------turnover--------------------------------------//

  const [settings, setSettings] = useState({
    currency: "BDT",
    language: "English",
    theme: "light",
  });
  const [walletBalance, setWalletBalance] = useState({
    main: 0,
    bonus: 0,
    vipPoints: 0,
  });
  const [promotions, setPromotions] = useState([]);
  const [games, setGames] = useState([]);
  const [banners, setBanners] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const updateUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const setLoadingState = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      timestamp: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);









  //----------------------vip-----------------------//

  const [vipData, setVipData] = useState({
    currentLevel: 'Copper',
    currentPoints: 341,
    experience: 118.68,
    nextLevelExperience: 500,
    nextLevel: 'Bronze',
    conversionRatio: 1200,
    minConversionPoints: 5000,
    history: [
      { year: 2025, month: 'Oct', level: 'Copper', experience: 118.68 },
      { year: 2025, month: 'Jul', level: 'Copper', experience: 9.67 },
      { year: 2025, month: 'Jun', level: 'Copper', experience: 163.65 },
      { year: 2025, month: 'May', level: 'Copper', experience: 0.3 }
    ],
    pointsRecords: {
      received: [],
      used: []
    }
  });

  const [conversionData, setConversionData] = useState({
    points: 0,
    money: 0
  });

  const updateConversionData = useCallback((field, value) => {
    setConversionData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-calculate the other field
      if (field === 'points') {
        newData.money = value / vipData.conversionRatio;
      } else if (field === 'money') {
        newData.points = value * vipData.conversionRatio;
      }
      
      return newData;
    });
  }, [vipData.conversionRatio]);

  const convertPoints = useCallback(() => {
    if (conversionData.points < vipData.minConversionPoints) {
      return { success: false, message: `Minimum ${vipData.minConversionPoints} VP required` };
    }
    
    if (conversionData.points > vipData.currentPoints) {
      return { success: false, message: 'Insufficient VIP Points' };
    }
    
    // Simulate API call
    setVipData(prev => ({
      ...prev,
      currentPoints: prev.currentPoints - conversionData.points
    }));
    
    setConversionData({ points: 0, money: 0 });
    
    return { success: true, message: 'Conversion successful!' };
  }, [conversionData.points, vipData.currentPoints, vipData.minConversionPoints]);

  //---------------------------vip-------------------------//

  const value = {
    user,
    settings,
    loading,
    walletBalance,
    promotions,
    games,
    banners,
    notifications,
    updateUser,
    updateSettings,
    setLoadingState,
    setWalletBalance,
    setPromotions,
    setGames,
    setBanners,
    addNotification,
    removeNotification,
    gameLaunchState,
    launchGame,
    closeGame,
    setGameLaunchState,
    login,
    userBalance,
    handleRefresh,
    refreshing,
     setRefreshing,
     vipData,
    conversionData,
    updateConversionData,
    convertPoints,
    setVipData,
       fetchActiveTurnover,
    fetchCompletedTurnover,
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};



// // contexts/AppContext.js
// // contexts/AppContext.js
// import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import { launchGameApi } from "../services/launchGameApi ";
// import phoneVerificationService from "../services/phoneVerificationService";
// import turnoverService from "../services/TurnoverService";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const { login, user, setUser } = useAuth();
//   const [gameLaunchState, setGameLaunchState] = useState({
//     show: false,
//     gameUrl: "",
//     userId: user?.userId || "",
//   });
  
//   const [userBalance, setUserBalance] = useState(0);
//   const [refreshing, setRefreshing] = useState(false);
  
//   // Turnover State - COMPLETE STATE
//   const [turnoverData, setTurnoverData] = useState({
//     totalTurnover: 0,
//     availableTurnover: 0,
//     requiredTurnover: 0,
//     progressPercentage: 0,
//     turnoverRecords: [],
//     loading: false,
//     lastUpdated: null
//   });

//   // Balance refresh function
//   const handleRefresh = async () => {
//     if (refreshing) return;
//     setRefreshing(true);

//     try {
//       const response = await phoneVerificationService.user_balance_update();
//       setUserBalance(response.balance);
//       console.log("Balance Data updated:", response.balance);
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//     } finally {
//       setTimeout(() => setRefreshing(false), 1000);
//     }
//   };

//   // Turnover Functions - COMPLETE IMPLEMENTATION
//   const fetchTurnoverData = useCallback(async (period = 'today') => {
//     setTurnoverData(prev => ({ ...prev, loading: true }));
    
//     try {
//       const response = await turnoverService.getTurnoverData(period);
//       const data = response?.data || {};
      
//       setTurnoverData({
//         totalTurnover: data.totalTurnover || 0,
//         availableTurnover: data.availableTurnover || 0,
//         requiredTurnover: data.requiredTurnover || 0,
//         progressPercentage: data.progressPercentage || 0,
//         turnoverRecords: data.turnoverRecords || [],
//         loading: false,
//         lastUpdated: new Date().toISOString()
//       });
//       return data;
//     } catch (error) {
//       console.error('Error fetching turnover data:', error);
//       setTurnoverData(prev => ({ 
//         ...prev, 
//         loading: false 
//       }));
//       throw error;
//     }
//   }, []);

//   const refreshTurnoverData = useCallback(async (period = 'today') => {
//     return await fetchTurnoverData(period);
//   }, [fetchTurnoverData]);

//   const getTurnoverStats = useCallback(() => {
//     return {
//       totalTurnover: turnoverData.totalTurnover,
//       availableTurnover: turnoverData.availableTurnover,
//       requiredTurnover: turnoverData.requiredTurnover,
//       progressPercentage: turnoverData.progressPercentage,
//       lastUpdated: turnoverData.lastUpdated
//     };
//   }, [turnoverData]);

//   // Initialize turnover data when user is authenticated
//   useEffect(() => {
//     if (user?.userId) {
//       handleRefresh();
//       fetchTurnoverData('today');
//     }
//   }, [user?.userId, fetchTurnoverData]);

//   const [loading, setLoading] = useState(false);

//   // Game launch function
//   const launchGame = async (game) => {
//     setLoading(true);
//     handleRefresh(user.userId);
//     try {
//       const gameData = await launchGameApi(
//         game.g_code,
//         game.p_code,
//         user.userId
//       );
//       setGameLaunchState({
//         show: true,
//         gameUrl: gameData.gameUrl,
//       });
//     } catch (error) {
//       alert("Unable to launch game. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeGame = () => {
//     setGameLaunchState({
//       show: false,
//       gameUrl: "",
//       userName: "",
//       userIp: "",
//     });
//     handleRefresh();
//   };

//   const [settings, setSettings] = useState({
//     currency: "BDT",
//     language: "English",
//     theme: "light",
//   });

//   const [walletBalance, setWalletBalance] = useState({
//     main: 0,
//     bonus: 0,
//     vipPoints: 0,
//   });

//   const updateUser = useCallback((userData) => {
//     setUser(userData);
//   }, [setUser]);

//   const updateSettings = useCallback((newSettings) => {
//     setSettings((prev) => ({ ...prev, ...newSettings }));
//   }, []);

//   const setLoadingState = useCallback((isLoading) => {
//     setLoading(isLoading);
//   }, []);

//   // VIP Data (existing code)
//   const [vipData, setVipData] = useState({
//     currentLevel: 'Copper',
//     currentPoints: 341,
//     experience: 118.68,
//     nextLevelExperience: 500,
//     nextLevel: 'Bronze',
//     conversionRatio: 1200,
//     minConversionPoints: 5000,
//     history: [
//       { year: 2025, month: 'Oct', level: 'Copper', experience: 118.68 },
//       { year: 2025, month: 'Jul', level: 'Copper', experience: 9.67 },
//       { year: 2025, month: 'Jun', level: 'Copper', experience: 163.65 },
//       { year: 2025, month: 'May', level: 'Copper', experience: 0.3 }
//     ],
//     pointsRecords: {
//       received: [],
//       used: []
//     }
//   });

//   const [conversionData, setConversionData] = useState({
//     points: 0,
//     money: 0
//   });

//   const updateConversionData = useCallback((field, value) => {
//     setConversionData(prev => {
//       const newData = { ...prev, [field]: value };
      
//       if (field === 'points') {
//         newData.money = value / vipData.conversionRatio;
//       } else if (field === 'money') {
//         newData.points = value * vipData.conversionRatio;
//       }
      
//       return newData;
//     });
//   }, [vipData.conversionRatio]);

//   const convertPoints = useCallback(() => {
//     if (conversionData.points < vipData.minConversionPoints) {
//       return { success: false, message: `Minimum ${vipData.minConversionPoints} VP required` };
//     }
    
//     if (conversionData.points > vipData.currentPoints) {
//       return { success: false, message: 'Insufficient VIP Points' };
//     }
    
//     setVipData(prev => ({
//       ...prev,
//       currentPoints: prev.currentPoints - conversionData.points
//     }));
    
//     setConversionData({ points: 0, money: 0 });
    
//     return { success: true, message: 'Conversion successful!' };
//   }, [conversionData.points, vipData.currentPoints, vipData.minConversionPoints]);

//   // Complete context value
//   const value = {
//     user,
//     settings,
//     loading,
//     walletBalance,
//     updateUser,
//     updateSettings,
//     setLoadingState,
//     setWalletBalance,
//     gameLaunchState,
//     launchGame,
//     closeGame,
//     setGameLaunchState,
//     login,
//     userBalance,
//     handleRefresh,
//     refreshing,
//     setRefreshing,
    
//     // Turnover functions - EXPORTED
//     turnoverData,
//     fetchTurnoverData,
//     refreshTurnoverData,
//     getTurnoverStats,
    
//     // VIP functions
//     vipData,
//     conversionData,
//     updateConversionData,
//     convertPoints,
//     setVipData
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useApp must be used within an AppProvider");
//   }
//   return context;
// };