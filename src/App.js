
// // App.js - Updated version
// import React from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { AppProvider, useApp } from './contexts/AppContext';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import RootLayout from './components/layouts/RootLayout';
// import HomePage from './components/pages/HomePage';
// import LoginPage from './components/pages/LoginPage';
// import ProfilePage from './components/pages/ProfilePage';
// import Deposite from './components/member/Funds/Deposite';
// import RegisterPage from './components/pages/RegisterPage';
// import PromotionPage from './components/pages/PromotionPage';
// import PopupLayout from './components/layouts/PopupLayout';
// import GamesProvidersPage from './components/GamesProvidersPage';
// import McdPopupPage from './components/layouts/McdPopupPage';
// import Notification from './components/layouts/Notification';
// import { useNotificationState } from './hooks/useNotificationState';
// import MemberMenu from './components/common/MemberMenu';
// import PersonalInfoPage from './components/member/PersonalInfo/PersonalInfoPage';
// import AddPhoneNumber from './components/member/AddPhoneNumber/AddPhoneNumber';
// import VerificationCode from './components/member/AddPhoneNumber/VerificationCode';
// import ReferBonusPopup from './components/pages/ReferBonusPopup';
// import ChangePassword from './components/member/ChangePassword/ChangePassword';
// import InboxPage from './components/member/InboxPage/InboxPage';
// import TransactionRecords from './components/member/TransactionRecords/TransactionRecords';
// import BettingRecords from './components/member/BettingRecord/BettingRecords';
// import MyPromotionPage from './components/member/PromotionPage/MyPromotionPage';
// import RealTimeBonus from './components/member/RealTimeBonus/RealTimeBonus';
// import GameLaunchPopup from './components/layouts/GameLaunchPopup';
// import FundsPage from './components/member/Funds/FundsPage';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();
//   if (loading) return <div className="loading-fullscreen">লোড হচ্ছে...</div>;
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// const PublicRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();
//   if (loading) return <div className="loading-fullscreen">লোড হচ্ছে...</div>;
//   return !isAuthenticated ? children : <Navigate to="/" />;
// };

// const AppWithNotifications = ({ children }) => {
//   const notificationState = useNotificationState();

//   const childrenWithProps = React.Children.map(children, child => {
//     if (React.isValidElement(child)) {
//       return React.cloneElement(child, {
//         showError: notificationState.showError,
//         showSuccess: notificationState.showSuccess,
//         showWarning: notificationState.showWarning,
//         showInfo: notificationState.showInfo
//       });
//     }
//     return child;
//   });

//   return (
//     <>
//       {childrenWithProps}
//       <Notification
//         isOpen={notificationState.notification.isOpen}
//         onClose={notificationState.hideNotification}
//         title={notificationState.notification.title}
//         message={notificationState.notification.message}
//         type={notificationState.notification.type}
//         autoClose={notificationState.notification.autoClose}
//         autoCloseDuration={notificationState.notification.autoCloseDuration}
//         position={notificationState.notification.position}
//       />
//     </>
//   );
// };

// function AppContent({ showError, showSuccess, showWarning, showInfo }) {
//   const location = useLocation();
//   const background = location.state?.background;
//   const { gameLaunchState, closeGame, launchGame, setGameLaunchState } = useApp();
//   console.log("setGameLaunchState", gameLaunchState);
//   return (
//     <>
//       {/* Main Routes */}
//       <Routes location={background || location}>
//         <Route path="/" element={<RootLayout
//           showError={showError}
//           showSuccess={showSuccess}
//           showWarning={showWarning}
//           showInfo={showInfo}
//         />}>
//           <Route index element={<HomePage
//             showError={showError}
//             showSuccess={showSuccess}
//           />} />
//           <Route path="gamesProvidersPage/:category_name/:providercode" element={<GamesProvidersPage
//             showError={showError}
//             showSuccess={showSuccess}
//           />} />
//         </Route>

//         {/* Add direct routes for popups */}
//         <Route path="/login" element={
//           <PublicRoute>
//             <PopupLayout>
//               <LoginPage
//                 showError={showError}
//                 showSuccess={showSuccess}
//                 showWarning={showWarning}
//                 showInfo={showInfo}
//               />
//             </PopupLayout>
//           </PublicRoute>
//         } />
//         <Route path="/register" element={
//           <PublicRoute>
//             <PopupLayout>
//               <RegisterPage
//                 showError={showError}
//                 showSuccess={showSuccess}
//                 showWarning={showWarning}
//                 showInfo={showInfo}
//               />
//             </PopupLayout>
//           </PublicRoute>
//         } />
//       </Routes>

//       {/* Popup Routes - Only render when there's a background location */}
//       {background && (
//         <Routes>
//           <Route path="/login" element={
//             <PopupLayout>
//               <LoginPage
//                 showError={showError}
//                 showSuccess={showSuccess}
//                 showWarning={showWarning}
//                 showInfo={showInfo}
//               />
//             </PopupLayout>
//           } />
//           <Route path="/register" element={
//             <PopupLayout>
//               <RegisterPage
//                 showError={showError}
//                 showSuccess={showSuccess}
//                 showWarning={showWarning}
//                 showInfo={showInfo}
//               />
//             </PopupLayout>
//           } />
//           <Route path="/promotion" element={
//             <PublicRoute>
//               <PopupLayout>
//                 <PromotionPage
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </PublicRoute>
//           } />
//           <Route path="/deposit/*" element={
//             <ProtectedRoute>
//               <PopupLayout>
//                 <FundsPage
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/account" element={
//             <ProtectedRoute>
//               <PopupLayout>
//                 <MemberMenu
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/profile" element={
//             <ProtectedRoute>
//               <PopupLayout>
//                 <PersonalInfoPage
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/profile" element={
//             <ProtectedRoute>
//               <PopupLayout>
//                 <PersonalInfoPage
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/add_phone_number" element={
//             <ProtectedRoute>
//               <PopupLayout showBackButton={true} >
//                 <AddPhoneNumber
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}

//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/verify_code" element={
//             <ProtectedRoute>
//               <PopupLayout showBackButton={true} className="third-party-login verify-code">
//                 <VerificationCode
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           // In App.js - Add to the routes
//           // Add this import


//           // Add this route in the popup routes section (inside background &&)
//           <Route path="/transaction-records" element={
//             <ProtectedRoute>
//               <PopupLayout>
//                 <TransactionRecords
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           // In App.js - Add this route to the popup routes section
//           <Route path="/inbox" element={
//             <ProtectedRoute>
//               <PopupLayout className="third-party-login verify-code">
//                 <InboxPage
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/real-time-bonus" element={
//             <ProtectedRoute>
//               <PopupLayout className="third-party-login verify-code">
//                 <RealTimeBonus
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/my_promotion" element={
//             <ProtectedRoute>
//               <PopupLayout className="third-party-login verify-code">
//                 <MyPromotionPage
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/betting-records" element={
//             <ProtectedRoute>
//               <PopupLayout className="third-party-login verify-code">
//                 <BettingRecords
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/change-password" className="member-content" element={
//             <ProtectedRoute>
//               <PopupLayout >
//                 <ChangePassword
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/refer-bonus" element={
//             <ProtectedRoute>
//               <PopupLayout >
//                 <ReferBonusPopup
//                   showError={showError}
//                   showSuccess={showSuccess}
//                   showWarning={showWarning}
//                   showInfo={showInfo}
//                 />
//               </PopupLayout>
//             </ProtectedRoute>
//           } />

//         </Routes>
//       )}
//       <ProtectedRoute>
//         <GameLaunchPopup
//           show={gameLaunchState?.show}
//           onClose={closeGame}
//           gameUrl={gameLaunchState?.gameUrl}
//           // providerLogo={gameLaunchState.providerLogo}
//           // providerName={gameLaunchState.providerName}
//           userName={gameLaunchState?.userName}
//         // userIp={gameLaunchState.userIp}
//         />
//       </ProtectedRoute>
//     </>
//   );
// }

// function App() {


//   return (
//     <AuthProvider>
//       <AppProvider>
//         <AppWithNotifications>
//           <AppContent />
//         </AppWithNotifications>
//         <McdPopupPage />

//       </AppProvider>
//     </AuthProvider>
//   );
// }

// export default App;



// App.js - Updated version
// App.js - Fixed version
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import RootLayout from './components/layouts/RootLayout';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import FundsPage from './components/member/Funds/FundsPage';
import RegisterPage from './components/pages/RegisterPage';
import PromotionPage from './components/pages/PromotionPage';
import PopupLayout from './components/layouts/PopupLayout';
import GamesProvidersPage from './components/GamesProvidersPage';
import McdPopupPage from './components/layouts/McdPopupPage';
import Notification from './components/layouts/Notification';
import { useNotificationState } from './hooks/useNotificationState';
import MemberMenu from './components/common/MemberMenu';
import PersonalInfoPage from './components/member/PersonalInfo/PersonalInfoPage';
import AddPhoneNumber from './components/member/AddPhoneNumber/AddPhoneNumber';
import VerificationCode from './components/member/AddPhoneNumber/VerificationCode';
import ReferBonusPopup from './components/pages/ReferBonusPopup';
import ChangePassword from './components/member/ChangePassword/ChangePassword';
import InboxPage from './components/member/InboxPage/InboxPage';
import TransactionRecords from './components/member/TransactionRecords/TransactionRecords';
import BettingRecords from './components/member/BettingRecord/BettingRecords';
import MyPromotionPage from './components/member/PromotionPage/MyPromotionPage';
import RealTimeBonus from './components/member/RealTimeBonus/RealTimeBonus';
import GameLaunchPopup from './components/layouts/GameLaunchPopup';
import VIPMain from './components/member/VIP/VIPMain';
import VIPHistory from './components/member/VIP/VIPHistory';
import VIPPointsRecords from './components/member/VIP/VIPPointsRecords';
import TurnoverPage from './components/member/Turnover/TurnoverPage';
import TurnoverPopup from './components/member/Turnover/TurnoverPopup'; // Add this import

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="loading-fullscreen">লোড হচ্ছে...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="loading-fullscreen">লোড হচ্ছে...</div>;
  return !isAuthenticated ? children : <Navigate to="/" />;
};

const AppWithNotifications = ({ children }) => {
  const notificationState = useNotificationState();

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        showError: notificationState.showError,
        showSuccess: notificationState.showSuccess,
        showWarning: notificationState.showWarning,
        showInfo: notificationState.showInfo
      });
    }
    return child;
  });

  return (
    <>
      {childrenWithProps}
      <Notification
        isOpen={notificationState.notification.isOpen}
        onClose={notificationState.hideNotification}
        title={notificationState.notification.title}
        message={notificationState.notification.message}
        type={notificationState.notification.type}
        autoClose={notificationState.notification.autoClose}
        autoCloseDuration={notificationState.notification.autoCloseDuration}
        position={notificationState.notification.position}
      />
    </>
  );
};

function AppContent({ showError, showSuccess, showWarning, showInfo }) {
  const location = useLocation();
  const background = location.state?.background;
  const { gameLaunchState, closeGame } = useApp();

  return (
    <>
      {/* Main Routes */}
      <Routes location={background || location}>
        <Route path="/" element={
          <RootLayout
            showError={showError}
            showSuccess={showSuccess}
            showWarning={showWarning}
            showInfo={showInfo}
          />
        }>
          <Route index element={
            <HomePage
              showError={showError}
              showSuccess={showSuccess}
            />
          } />
          <Route path="gamesProvidersPage/:category_name/:providercode" element={
            <GamesProvidersPage
              showError={showError}
              showSuccess={showSuccess}
            />
          } />
        </Route>

        {/* Direct routes for popups */}
        <Route path="/login" element={
          <PublicRoute>
            <PopupLayout>
              <LoginPage
                showError={showError}
                showSuccess={showSuccess}
                showWarning={showWarning}
                showInfo={showInfo}
              />
            </PopupLayout>
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <PopupLayout>
              <RegisterPage
                showError={showError}
                showSuccess={showSuccess}
                showWarning={showWarning}
                showInfo={showInfo}
              />
            </PopupLayout>
          </PublicRoute>
        } />
      </Routes>

      {/* Popup Routes */}
      {background && (
        <Routes>
          <Route path="/login" element={
            <PopupLayout>
              <LoginPage
                showError={showError}
                showSuccess={showSuccess}
                showWarning={showWarning}
                showInfo={showInfo}
              />
            </PopupLayout>
          } />
          <Route path="/register" element={
            <PopupLayout>
              <RegisterPage
                showError={showError}
                showSuccess={showSuccess}
                showWarning={showWarning}
                showInfo={showInfo}
              />
            </PopupLayout>
          } />
          <Route path="/promotion" element={
            <PublicRoute>
              <PopupLayout>
                <PromotionPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </PublicRoute>
          } />

          {/* Updated Funds Route */}
          <Route path="/deposit" element={
            <ProtectedRoute>
              <PopupLayout>
                <FundsPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/withdrawal" element={
            <ProtectedRoute>
              <PopupLayout>
                <FundsPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />

          <Route path="/account" element={
            <ProtectedRoute>
              <PopupLayout>
                <MemberMenu
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <PopupLayout>
                <PersonalInfoPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/add_phone_number" element={
            <ProtectedRoute>
              <PopupLayout showBackButton={true}>
                <AddPhoneNumber
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/verify_code" element={
            <ProtectedRoute>
              <PopupLayout showBackButton={true} className="third-party-login verify-code">
                <VerificationCode
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/transaction-records" element={
            <ProtectedRoute>
              <PopupLayout>
                <TransactionRecords
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/inbox" element={
            <ProtectedRoute>
              <PopupLayout className="third-party-login verify-code">
                <InboxPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/real-time-bonus" element={
            <ProtectedRoute>
              <PopupLayout className="third-party-login verify-code">
                <RealTimeBonus
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/my_promotion" element={
            <ProtectedRoute>
              <PopupLayout className="third-party-login verify-code">
                <MyPromotionPage
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/betting-records" element={
            <ProtectedRoute>
              <PopupLayout className="third-party-login verify-code">
                <BettingRecords
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/change-password" element={
            <ProtectedRoute>
              <PopupLayout>
                <ChangePassword
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/refer-bonus" element={
            <ProtectedRoute>
              <PopupLayout>
                <ReferBonusPopup
                  showError={showError}
                  showSuccess={showSuccess}
                  showWarning={showWarning}
                  showInfo={showInfo}
                />
              </PopupLayout>
            </ProtectedRoute>
          } />

          <Route path="/vip-points-exchange" element={
            <ProtectedRoute>
              <PopupLayout title="My VIP">
                <VIPMain />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/vip-history" element={
            <ProtectedRoute>
              <PopupLayout title="VIP History" showBackButton={true}>
                <VIPHistory />
              </PopupLayout>
            </ProtectedRoute>
          } />
          <Route path="/vip-points-records" element={
            <ProtectedRoute>
              <PopupLayout title="VIP Points (VP)" showBackButton={true}>
                <VIPPointsRecords />
              </PopupLayout>
            </ProtectedRoute>
          } />

          {/* Updated Turnover Route - Using the new TurnoverPopup */}
          <Route path="/turnover" element={
            
            <ProtectedRoute>
              <PopupLayout title="TurnoverPage">
              <TurnoverPage />
              </PopupLayout>
            </ProtectedRoute>

          } />
        </Routes>
      )}

      <ProtectedRoute>
        <GameLaunchPopup
          show={gameLaunchState?.show}
          onClose={closeGame}
          gameUrl={gameLaunchState?.gameUrl}
          userName={gameLaunchState?.userName}
        />
      </ProtectedRoute>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppWithNotifications>
          <AppContent />
        </AppWithNotifications>
        <McdPopupPage />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;