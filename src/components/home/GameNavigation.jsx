// import React from 'react';
// import { hotGames } from '../../data/games';

// const GameNavigation = ({ categories, activeCategory, onCategoryChange }) => {
//   const renderGameContent = () => {
//     switch (activeCategory) {
//       case 'hot':
//         return (
//           <div className="content-box">
//             <div className="layout-brand">
//               <div className="card1">
//                 <ul>
//                   {hotGames.map(game => (
//                     <li
//                       key={game.id}
//                       className="game-item"
//                     >
//                       <a tabIndex="-1">
//                         <img
//                           loading="lazy"
//                           alt={game.alt}
//                           src={game.image}
//                         />
//                         <p>{game.name}</p>
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         );
//       // Add other cases for different categories
//       default:
//         return (
//           <div className="content-box">
//             <div className="no-games">
//               <p>à¦à¦‡ à¦¬à¦¿à¦­à¦¾à¦—à§‡ à¦•à§‹à¦¨ à¦—à§‡à¦® à¦ªà¦¾à¦“à¦¯à¦¼à¦¾ à¦¯à¦¾à¦¯à¦¼à¦¨à¦¿</p>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="game-nav-section">
//       <div id="nav" className="nav nav-category nav-auto">
//         {categories.map(category => (
//           <div
//             key={category.id}
//             className={`btn ${activeCategory === category.id ? 'selected' : ''}`}
//             onClick={() => onCategoryChange(category.id)}
//           >
//             <div className="icon">
//               <span
//                 className="item-icon"
//                 style={{ backgroundImage: `url(https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-${category.icon}.png?v=1759226853625)` }}
//               ></span>
//             </div>
//             <p>{category.name}</p>
//           </div>
//         ))}
//       </div>

//       <div className="nav-wrap">
//         <div id="nav-title" className="content-title">
//           <h2>
//             <span>{categories.find(cat => cat.id === activeCategory)?.name}</span>
//           </h2>
//         </div>

//         <div className="nav-content-wrap">
//           <div className="nav-content-inner">
//             {renderGameContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameNavigation;

// components/HomePage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Import custom hooks
import { useGamePlay } from "../../hooks/useGamePlay";
import { useRefreshBalance } from "../../hooks/useRefreshBalance";
import { useGameData } from "../../hooks/useGameData";
import { useScroll, useScrollFix } from "../../hooks/useScroll";
// import GamePopup from "../components/GamePopup";

export default () => {
  // const { modalShow, setModalShow } = props;
  const navigate = useNavigate();

  // Use custom hooks
  const { isPlaying, playGameData, showPopup, handlePlay, handleClosePopup } =
    useGamePlay();

  const { balance, refreshing, handleRefresh } = useRefreshBalance();

  const { data, loading, active, activeIndex, handleItemClick } = useGameData();

  const { isFixed, scrollStopped } = useScroll();

  const { userId, userDeatils } = useAuth();

  const onRefreshBalance = () => {
    if (userId) {
      handleRefresh(userId);
    }
  };

  const handleGamePlay = async (game) => {
    const result = await handlePlay(game);
    if (result.success && userId) {
      // Balance will be refreshed automatically after game closes
      console.log("Game launched successfully");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <div className="game-nav-container">
      <div
        className={`${
          scrollStopped ? "scroll-stopped " : ""
        } nav nav-category ${isFixed ? "active" : ""}nav-auto`}
      >
        {data.map((item, index) => (
          <div
            className={`btn ${index === activeIndex ? "selected" : ""}`}
            key={index}
            onClick={() => handleItemClick(index, item)}
          >
            <div className="icon">
              <span
                className="item-icon"
                style={{
                  backgroundImage: `url(${item?.image})`,
                }}
              ></span>
              <p>{item?.category_name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="nav-wrap">
        <div className="content-title">
          <h2>
            <span>{active?.category_name}</span>
          </h2>
        </div>
        <div className="nav-content-wrap">
          <div className="nav-content-inner">
            <div className="content-box">
              <div className="layout-brand">
                <div className="card1">
                  <ul>
                    {active?.uniqueProviders?.map((item, index) => {
                      if (activeIndex < 2) {
                        return (
                          <li key={index}>
                            <Link
                              onClick={() => handleGamePlay(item)}
                              className="game-link"
                            >
                              <img src={item.image_url} alt={item.company} />
                              <p>{item.company}</p>
                            </Link>
                          </li>
                        );
                      } else {
                        return (
                          <li key={index}>
                            <Link
                              to={`/gamesProvidersPage/${encodeURIComponent(
                                active.category_name
                              )}/${encodeURIComponent(item.providercode)}`}
                              className="game-link"
                            >
                              <img src={item.image_url} alt={item.company} />
                              <p>{item.company}</p>
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
