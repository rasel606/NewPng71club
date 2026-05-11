import React, { useState, useEffect } from "react";
import { usePopup } from "../../layouts/PopupManager";

import TurnoverCard from "./TurnoverCard";
import TurnoverDetailPopup from "./TurnoverDetailPopup";
import TabNavigation from "./TabNavigation";
import { useApp } from "../../../contexts/AppContext";

const TurnoverPage = ({ showError, showSuccess, showWarning, showInfo }) => {
  const { openPopup, closePopup } = usePopup();
  const { 
    turnoverData, 
    fetchActiveTurnover, 
    fetchCompletedTurnover,
    fetchAllTurnoverData 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  // Fetch data based on active tab
  const fetchTabData = async (tabKey) => {
    try {
      setLoading(true);
      setError(null);
      
      if (tabKey === "active") {
        await fetchActiveTurnover();
      } else if (tabKey === "completed") {
        await fetchCompletedTurnover();
      }
    } catch (err) {
      console.error(`Error fetching ${tabKey} turnover:`, err);
      setError(`Failed to load ${tabKey} turnover data`);
      showError(`Failed to load ${tabKey} turnover data`);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchAllTurnoverData().finally(() => {
      setLoading(false);
    });
  }, [fetchAllTurnoverData]);

  const handleTabChange = async (tabKey) => {
    setActiveTab(tabKey);
    
    // Fetch data for the new tab if not already loaded
    if ((tabKey === "active" && turnoverData.active.length === 0) || 
        (tabKey === "completed" && turnoverData.completed.length === 0)) {
      await fetchTabData(tabKey);
    }
  };

  const handleDetailClick = (turnover) => {
    openPopup(
      <TurnoverDetailPopup turnover={turnover} onClose={closePopup} />,
      {
        title: "Turnover Details",
        size: "medium",
        position: "center",
        closeOnBackdrop: true,
        closeOnEscape: true,
      }
    );
  };

  const handleRetry = () => {
    fetchTabData(activeTab);
  };

  // Get filtered data based on active tab
  const filteredData = activeTab === "completed" 
    ? turnoverData.completed 
    : turnoverData.active;

  if (loading && turnoverData.active.length === 0 && turnoverData.completed.length === 0) {
    return (
      <div className="turnover-loading">
        <div className="loading-spinner"></div>
        <p>লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="turnover-error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={handleRetry} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="turnover-page">
      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Loading state for tab switch */}
      {loading && (turnoverData.active.length > 0 || turnoverData.completed.length > 0) && (
        <div className="tab-loading">
          <div className="loading-spinner small"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Turnover List */}
      <div className="turnover-content">
        <ul className="ticket-wrap">
          {filteredData.length > 0 ? (
            filteredData.map((turnover) => (
              <TurnoverCard
                key={turnover.id}
                turnover={turnover}
                onDetailClick={handleDetailClick}
              />
            ))
          ) : (
            <div className="no-data">
              <p>No {activeTab} turnover records found</p>
            </div>
          )}
        </ul>

        {filteredData.length > 0 && (
          <div className="prompt">－end of page－</div>
        )}
      </div>
    </div>
  );
};

export default TurnoverPage;