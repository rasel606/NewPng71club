
import React from 'react';


const PromotionInfo = ({ 
  promotion,
  showSuccess,
  onClose 
}) => {
  const {
    bannerImage,
    title,
    description,
    howToJoin,
    bonusDetails,
    termsAndConditions
  } = promotion;

  const handleClaimBonus = () => {
    // showSuccess(`বোনাসের জন্য আবেদন করা হয়েছে: ${title}`);
  };

  return (
    <div className="promotion-info-popup">
      {/* Close Button */}
      <a className="btn-close" onClick={onClose}>
        <span 
          className="item-icon"
          style={{ 
            backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1761636564965")' 
          }}
        ></span>
      </a>

      {/* Banner Image */}
      {bannerImage && (
        <div className="detail-banner ng-star-inserted">
          <img 
            alt={title}
            src={bannerImage}
            loading="lazy"
            width="811"
            height="343"
            style={{ aspectRatio: '811 / 343' }}
          />
        </div>
      )}

      {/* Title */}
      <div className="pop-title ng-star-inserted">
        <h3>{title}</h3>
      </div>

      {/* Content */}
      <div className="pop-inner content-style ng-star-inserted">
        <div>
          {/* Description */}
          {description && (
            <PromotionSection 
              content={description}
              type="description"
            />
          )}

          {/* How to Join */}
          {howToJoin && (
            <PromotionSection 
              title="কীভাবে যোগদান করবেন:"
              content={howToJoin}
              type="howToJoin"
              titleColor="#e74c3c"
            />
          )}

          {/* Bonus Details Table */}
          {bonusDetails && (
            <PromotionSection 
              title="বোনাসের বিবরণ:"
              content={bonusDetails}
              type="bonusDetails"
              titleColor="#e74c3c"
            />
          )}

          {/* Terms and Conditions */}
          {termsAndConditions && (
            <PromotionSection 
              title="নিয়ম ও শর্তাবলী:"
              content={termsAndConditions}
              type="termsAndConditions"
              titleColor="#e74c3c"
            />
          )}

          {/* Action Button */}
          <div className="promotion-actions">
            <button 
              className="btn-claim-bonus"
              onClick={handleClaimBonus}
            >
              বোনাস দাবি করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Promotion Section Component
const PromotionSection = ({ 
  title, 
  content, 
  type, 
  titleColor = "#3498db" 
}) => {
  const renderContent = () => {
    switch (type) {
      case 'description':
        return (
          <h2>
            <span style={{ color: titleColor, fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif' }}>
              <strong>{content}</strong>
            </span>
          </h2>
        );

      case 'howToJoin':
        return (
          <div>
            <h2>
              <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif', color: titleColor }}>
                <strong>{title}</strong>
              </span>
            </h2>
            <ul>
              {content.map((item, index) => (
                <li key={index}>
                  <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'bonusDetails':
        return (
          <div>
            <h2>
              <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif', color: titleColor }}>
                <strong>{title}</strong>
              </span>
            </h2>
            <BonusDetailsTable details={content} />
          </div>
        );

      case 'termsAndConditions':
        return (
          <div>
            <h2>
              <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif', color: titleColor }}>
                <strong>{title}</strong>
              </span>
            </h2>
            <ul>
              {content.map((term, index) => (
                <li key={index}>
                  <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif' }}>
                    {term}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return <div>{content}</div>;
    }
  };

  return renderContent();
};

// Bonus Details Table Component
const BonusDetailsTable = ({ details }) => {
  return (
    <table className="bonus-details-table">
      <tbody>
        {details.map((detail, index) => (
          <tr key={index}>
            <th scope="row">
              <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif' }}>
                {detail.label}
              </span>
            </th>
            <td>
              <span style={{ fontSize: '14px', fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif' }}>
                {detail.value}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PromotionInfo;