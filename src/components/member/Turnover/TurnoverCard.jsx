// components/member/Turnover/TurnoverCard.jsx
import React from 'react';

const TurnoverCard = ({ turnover, type = 'active', onShowDetails }) => {
  const {
    id,
    title,
    endDate,
    amount,
    currentAmount,
    targetAmount,
    status
  } = turnover;

  const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const isCompleted = type === 'completed';

  return (
    <li className={`ticket ${type} ng-star-inserted`} idx={id}>
      <div className="ticket-inner">
        <div className="ticket-inner-left">
          <div className="title">{title}</div>
          <div className="detail">
            <div className="date ng-star-inserted">
              Event ends in : {endDate}
            </div>
            <div className="detail-btn">
              <a onClick={() => onShowDetails(turnover)}>Detail</a>
            </div>
          </div>
          <div className="discount">
            <div className="amount">
              <i style={{ display: 'initial' }}>৳ {amount}</i>
            </div>
          </div>
          <div className="progress-bar">
            <div className="bar">
              <div 
                className="bar-inner" 
                style={{ width: `${isCompleted ? 100 : progressPercentage}%` }}
              ></div>
            </div>
            <div className="number">
              <span>{currentAmount}</span>
              <span>{targetAmount}</span>
            </div>
          </div>
        </div>
        <div className="ticket-inner-right">
          {isCompleted ? (
            <div className="text ng-star-inserted">
              <span 
                className="item-icon"
                style={{ 
                  backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type01.svg?v=1761636564965")'
                }}
              ></span>
              Completed
            </div>
          ) : (
            <div className="text ng-star-inserted">
              In Progress
            </div>
          )}
        </div>
      </div>
      <div className="ticket-deco open-pop">
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </li>
  );
};

export default TurnoverCard;