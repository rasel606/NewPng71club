// components/member/Turnover/TurnoverPopup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import McdPopupPage from '../../layouts/McdPopupPage';
import TabButtonNav from './TabButtonNav';
import ActiveTurnover from './ActiveTurnover';
import CompletedTurnover from './CompletedTurnover';
import TurnoverInfoPopup from './TurnoverInfoPopup';

const TurnoverPopup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [selectedTurnover, setSelectedTurnover] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const tabs = [
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const handleShowDetails = (turnover) => {
    setSelectedTurnover(turnover);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedTurnover(null);
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'active':
        return <ActiveTurnover onShowDetails={handleShowDetails} />;
      case 'completed':
        return <CompletedTurnover onShowDetails={handleShowDetails} />;
      default:
        return <ActiveTurnover onShowDetails={handleShowDetails} />;
    }
  };

  return (
    <>
      <McdPopupPage
        show={true}
        onClose={handleClose}
        position="center"
        size="popup-large"
        closeOnBackdrop={true}
        closeOnEscape={true}
        showToolbar={true}
        title="Turnover"
      >
        <TurnoverInfoPopup
        show={showDetails}
        turnover={selectedTurnover}
        onClose={handleCloseDetails}
      />
      </McdPopupPage>

      
    </>
  );
};

export default TurnoverPopup;