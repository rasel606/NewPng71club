// components/member/Funds/Withdrawal.jsx
import React, { useState } from 'react';

const Withdrawal = ({ 
  showError, 
  showSuccess, 
  showWarning, 
  showInfo 
}) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: '/assets/images/payment/bkash.png' },
    { id: 'nagad', name: 'Nagad', icon: '/assets/images/payment/nagad.png' },
    { id: 'rocket', name: 'Rocket', icon: '/assets/images/payment/rocket.png' },
    { id: 'upay', name: 'UPay', icon: '/assets/images/payment/upay.png' }
  ];

  const quickAmounts = [500, 1000, 2000, 5000, 10000, 20000];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !paymentMethod) {
      showError('Error', 'Please fill all fields');
      return;
    }
    showSuccess('Success', 'Withdrawal request submitted successfully');
  };

  return (
    <div className="withdrawal-content">
      <div className="player-withdrawal-wrap">
        <div className="player-withdrawal-step1">
          
          {/* Payment Method Selection */}
          <div className="menu-box">
            <div className="title">
              <h2><span>Withdrawal Method</span></h2>
            </div>
            <div className="select-group checkbox-style">
              <ul className="col3">
                {paymentMethods.map(method => (
                  <li key={method.id} className="payment-method-item">
                    <input 
                      type="radio" 
                      name="withdrawalMethod" 
                      id={`withdrawal_${method.id}`}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                    />
                    <label htmlFor={`withdrawal_${method.id}`}>
                      <div className="bank">
                        <img 
                          alt={method.name} 
                          src={method.icon} 
                          loading="lazy" 
                        />
                      </div>
                      <span>{method.name}</span>
                      <span className="item-icon"></span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="menu-box active">
            <div className="title">
              <h2>
                <span>Amount</span>
                <i>৳ 500.00 - ৳ 50,000.00</i>
              </h2>
            </div>
            
            <div className="select-group style-add-amount">
              <ul className="col4">
                {quickAmounts.map((amt, index) => (
                  <li key={index}>
                    <input 
                      type="radio" 
                      name="withdrawalAmount" 
                      id={`withdrawalAmount_${index}`}
                      checked={amount === amt.toString()}
                      onChange={() => setAmount(amt.toString())}
                    />
                    <label htmlFor={`withdrawalAmount_${index}`}>
                      <span> {amt.toLocaleString()} </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="input-group money">
              <label htmlFor="withdrawalAmount">৳</label>
              <div className="input-wrap">
                <input 
                  type="text" 
                  id="withdrawalAmount"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  inputMode="numeric"
                />
                <a className="delete-btn" onClick={() => setAmount('')}></a>
              </div>
            </div>

            {/* Instructions */}
            <div className="tips-info note">
              <h5>
                <i className="tips-icon"></i>
                <span>
                  ১. উইথড্র করার আগে আপনার অ্যাকাউন্ট ভেরিফাইড আছে কিনা নিশ্চিত হন।
                  ২. সর্বনিম্ন উইথড্র Amount: ৳ ৫০০
                  ৩. ডেইলি সর্বোচ্চ উইথড্র Limit: ৳ ৫০,০০০
                  ৪. প্রসেসিং টাইম: ৩০ মিনিট থেকে ২৪ ঘন্টা
                  ৫. কোনো সমস্যা হলে লাইভ চ্যাটে যোগাযোগ করুন।
                </span>
              </h5>
            </div>
          </div>

          {/* Submit Button */}
          <div className="member-content">
            <div className="button">
              <a className="submit-btn" onClick={handleSubmit}>
                Submit Withdrawal
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Withdrawal;