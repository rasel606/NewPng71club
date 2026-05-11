import React from 'react';


const Logo = ({ 
  tabIndex = 0, 
  onClick, 
  logoUrl = "https://img.s628b.com/sb/h5/assets/images/logo.png?v=1761636564965",
  className = "",
  size = "auto"
}) => {
  const logoStyle = {
    backgroundImage: `url("${logoUrl}")`,
    width: size,
    height: size
  };

  return (
    <div 
      className={`logo ${className}`}
      tabIndex={tabIndex}
      style={logoStyle}
      onClick={onClick}
      role={onClick ? "button" : "img"}
      onKeyPress={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          onClick();
        }
      }}
      aria-label="Company Logo"
    />
  );
};

export default Logo;