import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const Header = ({ type = 'normal', title, onBack, onMenu }) => {
  const { user, isAuthenticated } = useAuth();
  const { walletBalance } = useApp();

  if (type === 'promotion') {
    return (
      <header className="header-inner-promotion">
        <div className="header-left-btn-group promotion">
          <div className="page-main-close" onClick={onBack}></div>
          <div className="header-title">
            <p>{title}</p>
          </div>
        </div>
        
        {isAuthenticated && (
          <div className="header-wallet-info">
            <span>ব্যালেন্স: ৳{walletBalance.main.toFixed(2)}</span>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="header normal">
      <div className="header-left-btn-group">
        <div className="back-btn" onClick={onBack}></div>
        <div className="menu-btn" onClick={onMenu}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      
      <div className="logo" tabIndex="0">
        {isAuthenticated && user && (
          <div className="user-welcome">
            <span>স্বাগতম, {user.fullName}</span>
          </div>
        )}
      </div>
      
      <div className="header-right-btn-group">
        <a className="app-download" href="/bd/bn/app-download" target="_blank" rel="noopener noreferrer">
          <span className="item-icon app-download-icon"></span>
          <p>App</p>
        </a>
        
        <a className="service-btn" name="liveChatBtn">
          <span className="item-icon customer-icon"></span>
          <p>লাইভ চ্যাট</p>
        </a>
        
        {isAuthenticated && (
          <div className="wallet-balance">
            <span>৳{walletBalance.main.toFixed(2)}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;