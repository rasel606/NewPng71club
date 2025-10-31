import React from 'react';

const TabButtonNav = ({ tabs, activeTab, onTabChange }) => {
  const activeIndex = tabs.findIndex(tab => tab.key === activeTab);
  const lineWidth = 100 / tabs.length;
  const lineTransform = `translate(${activeIndex * 100}%, 0px)`;

  return (
    <div className="tab-btn tab-btn-page ng-star-inserted">
      <div 
        className="line" 
        style={{ 
          width: `calc(${lineWidth}%)`, 
          transform: lineTransform 
        }}
      ></div>
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className={`btn ${activeTab === tab.key ? 'active' : ''} ng-star-inserted`}
          onClick={() => onTabChange(tab.key)}
          data-tab-current=""
        >
          <div className="text">
            {tab.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabButtonNav;