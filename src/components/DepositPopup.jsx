import React, { useState } from 'react';
import { depositPromotions, paymentMethods, depositAmounts } from '../data/promotions';

const DepositPopup = ({ isOpen, onClose, onSubmit }) => {
  const [selectedPromotion, setSelectedPromotion] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedPaymentType, setSelectedPaymentType] = useState('0');
  const [selectedDepositChannel, setSelectedDepositChannel] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const handleSubmit = () => {
    const depositData = {
      promotion: selectedPromotion,
      paymentMethod: selectedPayment,
      paymentType: selectedPaymentType,
      depositChannel: selectedDepositChannel,
      amount: customAmount || selectedAmount
    };
    onSubmit(depositData);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={onClose}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          
          {/* Header */}
          <div className="popup-page-main__header wallet-header">
            <div className="popup-page-main__title">à¦«à¦¾à¦¨à§à¦¡à¦¸</div>
            <div className="popup-page-main__close" onClick={onClose}></div>
          </div>

          {/* Content */}
          <div className="popup-page-main__container">
            <div className="content fixed-tab player-content">
              
              {/* Tab Navigation */}
              <div className="tab-btn-section tab-btn-wrap">
                <div className="tab-btn tab-btn-bar">
                  <div className="line"></div>
                  <div className="btn active">
                    <div className="text">à¦¡à¦¿à¦ªà§‹à¦œà¦¿à¦Ÿ</div>
                  </div>
                  <div className="btn">
                    <div className="text">à¦‰à¦‡à¦¥à¦¡à§à¦°</div>
                  </div>
                </div>
              </div>

              {/* Deposit Form */}
              <div className="tab-content tab-content-page">
                <div className="inner-wrap">
                  <div className="inner-box deposit-wallet">
                    
                    {/* Promotion Selection */}
                    <div className="option-group select-bar">
                      <label>
                        <span className="item-icon promotion-icon"></span>
                        <div>à¦ªà§à¦°à¦šà¦¾à¦° à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à§à¦¨</div>
                      </label>
                      <div className="option-wrap">
                        <select 
                          value={selectedPromotion}
                          onChange={(e) => setSelectedPromotion(e.target.value)}
                        >
                          {depositPromotions.map((promo, index) => (
                            <option key={index} value={index}>{promo}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="menu-box">
                      <div className="title">
                        <h2><span>à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦ªà¦¦à§à¦§à¦¤à¦¿</span></h2>
                      </div>
                      
                      <div className="select-group checkbox-style">
                        <ul className="col3">
                          {paymentMethods.map((method) => (
                            <li key={method.id} className="payment-method">
                              <input
                                type="radio"
                                name="paymentMethod"
                                id={`paymentMethod_${method.id}`}
                                checked={selectedPayment === method.id}
                                onChange={() => setSelectedPayment(method.id)}
                              />
                              <label htmlFor={`paymentMethod_${method.id}`}>
                                <div className="bank">
                                  <img alt={method.name} src={method.image} loading="lazy" />
                                </div>
                                <span>{method.name}</span>
                                {method.rebate && (
                                  <div className="tag-rebate-money">
                                    <p><span>+</span>{method.rebate}<span>%</span></p>
                                  </div>
                                )}
                                <span className="item-icon check-icon"></span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Payment Type */}
                      <div className="select-group">
                        <ul className="col2">
                          <li className="payment-type">
                            <input
                              type="radio"
                              name="paymentType"
                              id="paymentType_0"
                              checked={selectedPaymentType === '0'}
                              onChange={() => setSelectedPaymentType('0')}
                            />
                            <label htmlFor="paymentType_0">
                              <span>à¦¬à¦¿à¦•à¦¾à¦¶ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ</span>
                              <span className="item-icon check-icon"></span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Deposit Channel */}
                    <div className="deposit-normal">
                      <div className="menu-box">
                        <div className="title">
                          <h2><span>à¦¡à¦¿à¦ªà§‹à¦œà¦¿à¦Ÿ à¦šà§à¦¯à¦¾à¦¨à§‡à¦²</span></h2>
                        </div>
                        <div className="select-group checkbox-style checkbox-height-set">
                          <ul className="col2">
                            <li className="deposit-channel">
                              <input
                                type="radio"
                                name="depositSetting"
                                id="depositSetting_3705"
                                checked={selectedDepositChannel === '3705'}
                                onChange={() => setSelectedDepositChannel('3705')}
                              />
                              <label htmlFor="depositSetting_3705">
                                <span>SP-à¦•à§à¦¯à¦¾à¦¶ à¦†à¦‰à¦Ÿ</span>
                                <span className="item-icon check-icon"></span>
                              </label>
                            </li>
                            <li className="deposit-channel">
                              <input
                                type="radio"
                                name="depositSetting"
                                id="depositSetting_3508"
                                checked={selectedDepositChannel === '3508'}
                                onChange={() => setSelectedDepositChannel('3508')}
                              />
                              <label htmlFor="depositSetting_3508">
                                <span>à¦¸à§‡à¦¨à§à¦¡ à¦®à¦¾à¦¨à¦¿</span>
                                <span className="item-icon check-icon"></span>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Amount Selection */}
                    <div className="menu-box active">
                      <div className="title">
                        <h2>
                          <span>à¦à¦®à¦¾à¦‰à¦¨à§à¦Ÿ</span>
                          <i>à§³ à§§à§¦à§¦.à§¦à§¦ - à§³ à§©à§¦,à§¦à§¦à§¦.à§¦à§¦</i>
                        </h2>
                      </div>
                      
                      {/* Quick Amount Buttons */}
                      <div className="select-group style-add-amount">
                        <ul className="col4">
                          {depositAmounts.map((amount, index) => (
                            <li key={index} className="amount-option">
                              <input
                                type="radio"
                                name="depositAmount"
                                id={`depositAmount_${index}`}
                                checked={selectedAmount === amount.toString()}
                                onChange={() => {
                                  setSelectedAmount(amount.toString());
                                  setCustomAmount('');
                                }}
                              />
                              <label htmlFor={`depositAmount_${index}`}>
                                <span>{amount.toLocaleString()}</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Custom Amount Input */}
                      <div className="input-group money">
                        <label htmlFor="amount">à§³</label>
                        <div className="input-wrap">
                          <input
                            type="text"
                            placeholder="0.00"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              setSelectedAmount('');
                            }}
                            inputMode="numeric"
                          />
                          <a 
                            className="delete-btn" 
                            onClick={() => setCustomAmount('')}
                            style={{ opacity: customAmount ? 1 : 0 }}
                          ></a>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="tips-info note">
                        <h5>
                          <i className="tips-icon"></i>
                          <span>
                            à§§.à¦•à§à¦¯à¦¾à¦¶ à¦†à¦‰à¦Ÿ à¦¬à¦¾ à¦¸à§‡à¦¨à§à¦¡à¦®à¦¾à¦¨à¦¿ à¦•à¦°à¦¾à¦° à¦†à¦—à§‡ 'à¦¬à§à¦¯à¦•à§à¦¤à¦¿à¦—à¦¤ à¦¤à¦¥à§à¦¯' à¦…à¦‚à¦¶à§‡ à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à§©à¦Ÿà¦¿ à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° à¦¯à§‹à¦— à¦•à¦°à§‡ à¦­à§‡à¦°à¦¿à¦«à¦¾à¦‡ à¦•à¦°à§à¦¨à¥¤
                            <br /><br />
                            à§¨.à¦†à¦ªà¦¨à¦¾à¦° à¦¡à¦¿à¦ªà§‹à¦œà¦¿à¦Ÿ à¦ªà§à¦°à¦•à§à¦°à¦¿à§Ÿà¦¾à¦Ÿà¦¿ à¦†à¦°à¦“ à¦¦à§à¦°à§à¦¤ à¦¸à¦«à¦² à¦•à¦°à¦¤à§‡ à¦¸à¦ à¦¿à¦• à¦•à§à¦¯à¦¾à¦¶ à¦†à¦‰à¦Ÿ à¦¨à¦¾à¦®à§à¦¬à¦¾à¦°,à¦à¦®à¦¾à¦‰à¦¨à§à¦Ÿ à¦à¦¬à¦‚ à¦Ÿà§à¦°à¦¾à¦¨à¦œà§‡à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ à¦¸à¦¹ à¦¸à¦¾à¦¬à¦®à¦¿à¦Ÿ à¦•à¦°à§à¦¨à¥¤
                            <br /><br />
                            à§©.à¦¯à§‡à¦•à§‹à¦¨à§‹ à¦¡à¦¿à¦ªà§‹à¦œà¦¿à¦Ÿ à¦•à¦°à¦¾à¦° à¦†à¦—à§‡ à¦¸à¦¬à¦¸à¦®à§Ÿ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¡à¦¿à¦ªà§‹à¦œà¦¿à¦Ÿ à¦ªà§‡à¦‡à¦œà§‡ à¦¨à¦¾à¦®à§à¦¬à¦¾à¦° à¦šà§‡à¦• à¦•à¦°à§à¦¨ à¥¤
                            <br /><br />
                            à§ª.à¦¡à¦¿à¦ªà§‹à¦œà¦¿à¦Ÿ à¦ªà§‡à¦¨à§à¦¡à¦¿à¦‚ à¦¥à¦¾à¦•à¦¾ à¦…à¦¬à¦¸à§à¦¥à¦¾à§Ÿ à¦†à¦ªà¦¨à¦¿ à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à§¨à¦Ÿà¦¿ à¦¡à¦¿à¦ªà§‹à¦œà¦¿à¦Ÿ à¦Ÿà§à¦°à¦¾à¦‡ à¦•à¦°à¦¤à§‡ à¦ªà¦¾à¦°à¦¬à§‡à¦¨à¥¤ à¦•à§‹à¦¨à§‹ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à¦²à§‡ à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦²à¦¾à¦‡à¦­à¦šà§à¦¯à¦¾à¦Ÿà§‡à¦° à¦®à¦¾à¦§à§à¦¯à¦®à§‡ à¦¸à¦¹à¦¾à§Ÿà¦¤à¦¾ à¦¨à¦¿à¦¨à¥¤
                            <br /><br />
                            à§«.à¦¬à¦¾à¦œà¦¿à¦° ODDs à¦…à¦¬à¦¶à§à¦¯à¦‡ à§§.à§©à§¦-à¦à¦° à¦“à¦ªà¦°à§‡ à¦¹à¦¤à§‡ à¦¹à¦¬à§‡à¥¤ à¦à¦° à¦¨à¦¿à¦šà§‡à¦° à¦…à¦¡à¦¸à§‡ -à¦ à¦°à¦¾à¦–à¦¾ à¦¬à¦¾à¦œà¦¿ à¦‰à¦‡à¦¥à¦¡à§à¦° à¦Ÿà¦¾à¦°à§à¦¨à¦“à¦­à¦¾à¦°à§‡à¦° à¦œà¦¨à§à¦¯ à¦—à¦£à¦¨à¦¾ à¦•à¦°à¦¾ à¦¹à¦¬à§‡ à¦¨à¦¾ã€‚
                          </span>
                        </h5>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="member-content">
                      <div className="button" onClick={handleSubmit}>
                        <a>à¦¸à¦¾à¦¬à¦®à¦¿à¦Ÿ</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPopup;



