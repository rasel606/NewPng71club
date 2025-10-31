

// components/layouts/OverlayContainer.jsx
import React, { useEffect } from 'react';


const McdPopupPage = ({
  children,
  show = false,
  onClose,
  position ,
  size ,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showBackdrop = true,
  backdropClass = "dialog-backdrop",
  overlayClass = "",
  popupClass = "",
  animation = true
}) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (closeOnEscape && event.keyCode === 27 && onClose) {
        onClose();
      }
    };

    if (show) {
      document.body.style.overflow = 'hidden';
      if (closeOnEscape) {
        document.addEventListener('keydown', handleEscapeKey);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (closeOnEscape) {
        document.removeEventListener('keydown', handleEscapeKey);
      }
    };
  }, [show, closeOnEscape, onClose]);

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const getSizeClass = () => {
    const sizes = {
      small: 'popup-small',
      medium: 'popup-medium',
      large: 'popup-large',
      fullscreen: 'popup-fullscreen',
      auto: 'popup-auto'
    };
    return sizes[size] || 'popup-large';
  };

  const getPositionStyle = () => {
    const positions = {
      center: { justifyContent: "center", alignItems: "center" },
      top: { justifyContent: "center", alignItems: "flex-start", paddingTop: "20px" },
      bottom: { justifyContent: "center", alignItems: "flex-end", paddingBottom: "20px" },
      left: { justifyContent: "flex-start", alignItems: "center", paddingLeft: "20px" },
      right: { justifyContent: "flex-end", alignItems: "center", paddingRight: "20px" }
    };
    return positions[position] || positions.center;
  };

  if (!show) return null;

  return (
    <div className={`cdk-overlay-container ${overlayClass}`} onClick={handleBackdropClick}>
      {showBackdrop && (
        <div 
          className={`cdk-overlay-backdrop ${backdropClass} cdk-overlay-backdrop-showing`}
          onClick={closeOnBackdrop ? onClose : undefined}
        ></div>
      )}
      
      <div 
        className="cdk-global-overlay-wrapper" 
        dir="ltr" 
        style={getPositionStyle()}
      >
        <div className={`cdk-overlay-pane dialog-panel `} style={{ position: "static" ,justifyContent: "center", alignItems: "center" }}>
          <div className={`popup ${popupClass}`}>
            <div className="popup__content">
              <div className={`pop-wrap ${animation ? 'show ani' : ''}`}>
                {children}
              </div>
              <div className="pop-bg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McdPopupPage;