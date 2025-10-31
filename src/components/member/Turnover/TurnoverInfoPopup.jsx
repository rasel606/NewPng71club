// components/popups/CurrencyLanguagePopup.jsx
import React, { useState } from "react";
import McdPopupPage from "../../layouts/McdPopupPage";
import { useApp } from "../../../contexts/AppContext";

const TurnoverInfoPopup = ({
  show = false,
  onClose,
  title = "Currency and Language",
  //   currencies = defaultCurrencies,
  onCurrencyChange,
  onLanguageChange,
  initialCurrency = "BDT",
  initialLanguage = "English",
  showFlags = true,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(initialCurrency);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const { updateSettings } = useApp();

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    onCurrencyChange(currency);
  };





  return (
    <McdPopupPage
      show={show}
      onClose={onClose}
      position="center"
      size="medium"
      popupClass="pop-language"
    >
      <div className="pop-wrap pop-check ng-trigger ng-trigger-popWrapTriggerAni show ani">
        <button className="btn-close" onClick={onClose}>
          <span
            className="item-icon"
            style={{
              backgroundImage:
                'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1761636564965")',
            }}
          ></span>
        </button>

        <div className="pop-title">
          <h3>{turnover.title}</h3>
        </div>

        <div className="pop-inner content-style">
          <div className="form-wrap">
            <div className="arrow" style={{ opacity: 0.8 }}>
              <span
                className="item-icon"
                style={{
                  backgroundImage:
                    'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type01.svg?v=1761636564965")',
                }}
              ></span>
            </div>

            <div className="form-wrap-col">
              <div>Transaction Amount</div>
              <div>{turnover.transactionAmount}</div>
            </div>

            <div className="form-wrap-col">
              <div>Bonus</div>
              <div>{turnover.bonus}</div>
            </div>

            <div className="form-wrap-col">
              <div>Turnover Requirement</div>
              <div>{turnover.turnoverRequirement}</div>
            </div>

            <div className="form-wrap-col">
              <div>Turnover Completed</div>
              <div>{turnover.turnoverCompleted}</div>
            </div>

            <div className="form-wrap-col">
              <div>Completed Ratio</div>
              <div>{turnover.completedRatio}</div>
            </div>

            <div className="form-wrap-col">
              <div>Turnover Create Time</div>
              <div>{turnover.createTime}</div>
            </div>
          </div>
        </div>

        <div
          className="pop-bg ng-trigger ng-trigger-popBgTriggerAni"
          style={{ display: "block" }}
        ></div>
      </div>
    </McdPopupPage>
  );
};

export default TurnoverInfoPopup;
