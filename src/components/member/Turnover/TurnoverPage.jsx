// components/member/Turnover/TurnoverPage.jsx
import React, { useState } from "react";
import TabButtonNav from "./TabButtonNav";
import ActiveTurnover from "./ActiveTurnover";
import CompletedTurnover from "./CompletedTurnover";
import TurnoverInfoPopup from "./TurnoverInfoPopup";
import { useNavigate } from "react-router-dom";

export default ({ showError, showSuccess, showWarning, showInfo }) => {
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();
  const [showTurnoverInfoPopup, setTurnoverInfoPopup] = useState(false);
  const [selectedTurnover, setSelectedTurnover] = useState(null);

  const tabs = [
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  const handleShowDetails = (turnover) => {
    setSelectedTurnover(turnover);
    setTurnoverInfoPopup(true);
    showSuccess("Turnover details loaded successfully");
  };

  const handleCloseMainPopup = () => {
    navigate(-1);
  };

  const handleCloseDetails = () => {
    setTurnoverInfoPopup(false);
    setSelectedTurnover(null);
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "active":
        return <ActiveTurnover onShowDetails={handleShowDetails} />;
      case "completed":
        return <CompletedTurnover onShowDetails={handleShowDetails} />;
      default:
        return <ActiveTurnover onShowDetails={handleShowDetails} />;
    }
  };

  return (
    <>
      {/* Main Turnover Popup */}
      <div className="content mcd-style fixed-tab player-content">
        <div className="tab-btn-section">
          <TabButtonNav
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        <div className="tab-content ng-trigger ng-trigger-tabPageTriggerAni">
          {renderContent()}
        </div>
      </div>

      {/* Turnover Details Popup */}
      <TurnoverInfoPopup
        show={showTurnoverInfoPopup}
        turnover={selectedTurnover}
        onClose={handleCloseDetails}
      />
    </>
  );
};