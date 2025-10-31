// components/PopupPage.js
import React from 'react';

const PopupOverly = ({ children }) => {
  return (
    <div className="cdk-overlay-container">
      <div class="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing"></div>
      {children}
    </div>
  );
};

export default PopupOverly;