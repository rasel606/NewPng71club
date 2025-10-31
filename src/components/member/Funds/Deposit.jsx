// components/member/Funds/Deposite.jsx
import React, { useState } from 'react';

const Deposit = ({ 
  showError, 
  showSuccess, 
  showWarning, 
  showInfo 
}) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [promotion, setPromotion] = useState('0');

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: '/assets/images/payment/bkash.png', bonus: '+4%' },
    { id: 'nagad', name: 'Nagad', icon: '/assets/images/payment/nagad.png', bonus: '+4%' },
    { id: 'rocket', name: 'Rocket', icon: '/assets/images/payment/rocket.png', bonus: '+4%' },
    { id: 'upay', name: 'UPay', icon: '/assets/images/payment/upay.png', bonus: '+4%' },
    { id: 'usdt_trc20', name: 'USDT TRC20', icon: '/assets/images/icon-set/player/crypto/trc20.svg' },
    { id: 'usdt_erc20', name: 'USDT ERC20', icon: '/assets/images/icon-set/player/crypto/erc20.svg' }
  ];

  const promotions = [
    { id: '0', name: '৪% সীমাহীন বোনাস+ফ্রি স্পিন' },
    { id: '1', name: '৳৫০০ সব গেমে ওয়েলকাম বোনাস' },
    { id: '2', name: '৩১৫% দৈনিক ICC রিলোড বোনাস' },
    { id: '3', name: '১০৮০% স্লটস সাপ্তাহিক বোনাস' },
    { id: '4', name: '২০০ ফ্রি স্পিন FC Super Elements' },
    { id: '5', name: '১০০% বোনাস Oracle of Gold-এ' },
    { id: '6', name: 'নরমাল ডিপোজিট' }
  ];

  const quickAmounts = [100, 1000, 2000, 5000, 10000, 15000, 20000, 30000];

  const depositChannels = [
    { id: '3367', name: 'EP-ক্যাশ আউট' },
    { id: '3371', name: 'AP-ক্যাশ আউট' },
    { id: '3705', name: 'SP-ক্যাশ আউট' },
    { id: '3508', name: 'EP-সেন্ড মানি' }
  ];

  const [depositChannel, setDepositChannel] = useState('');
  const [paymentType, setPaymentType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !paymentMethod) {
      showError('Error', 'Please select payment method and amount');
      return;
    }
    showSuccess('Success', 'Deposit request submitted successfully');
  };

  return (
    <div className="deposit-content">
      <div className="player-deposit-wrap">
        <div className="player-deposit-step1">
          
          {/* Promotion Selection */}
          <div className="option-group select-bar">
            <label>
              <span className="item-icon" style={{backgroundImage: 'url("/assets/images/icon-set/icon-selectpromotion.svg")'}}></span>
              <div>Select Promotion</div>
            </label>
            <div className="option-wrap">
              <select 
                value={promotion} 
                onChange={(e) => setPromotion(e.target.value)}
              >
                {promotions.map(promo => (
                  <option key={promo.id} value={promo.id}>
                    {promo.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div className="menu-box">
            <div className="title">
              <h2><span>Payment Method</span></h2>
            </div>
            <div className="select-group checkbox-style">
              <ul className="col3">
                {paymentMethods.map(method => (
                  <li key={method.id} className="payment-method-item">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      id={`paymentMethod_${method.id}`}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                    />
                    <label htmlFor={`paymentMethod_${method.id}`}>
                      <div className="bank">
                        <img 
                          alt={method.name} 
                          src={method.icon} 
                          loading="lazy" 
                        />
                      </div>
                      <span>{method.name}</span>
                      {method.bonus && (
                        <div className="tag-rebate-money">
                          <p><span>+</span>4 <span>%</span></p>
                        </div>
                      )}
                      <span className="item-icon"></span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment Type */}
          <div className="select-group">
            <ul className="col2">
              <li className="payment-type-item">
                <input 
                  type="radio" 
                  name="paymentType" 
                  id="paymentType_0"
                  checked={paymentType === 'bkash_payment'}
                  onChange={() => setPaymentType('bkash_payment')}
                />
                <label htmlFor="paymentType_0">
                  <span>bKash Payment</span>
                  <span className="item-icon"></span>
                </label>
              </li>
            </ul>
          </div>

          {/* Deposit Channel */}
          <div className="deposit-normal">
            <div className="menu-box">
              <div className="title">
                <h2><span>Deposit Channel</span></h2>
              </div>
              <div className="select-group checkbox-style checkbox-height-set">
                <ul className="col2">
                  {depositChannels.map(channel => (
                    <li key={channel.id}>
                      <input 
                        type="radio" 
                        name="depositSetting" 
                        id={`depositSetting_${channel.id}`}
                        checked={depositChannel === channel.id}
                        onChange={() => setDepositChannel(channel.id)}
                      />
                      <label htmlFor={`depositSetting_${channel.id}`}>
                        <span>{channel.name}</span>
                        <span className="item-icon"></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="menu-box active">
            <div className="title">
              <h2>
                <span>Amount</span>
                <i>৳ 100.00 - ৳ 30,000.00</i>
              </h2>
            </div>
            
            <div className="select-group style-add-amount">
              <ul className="col4">
                {quickAmounts.map((amt, index) => (
                  <li key={index}>
                    <input 
                      type="radio" 
                      name="depositAmount" 
                      id={`depositAmount_${index}`}
                      checked={amount === amt.toString()}
                      onChange={() => setAmount(amt.toString())}
                    />
                    <label htmlFor={`depositAmount_${index}`}>
                      <span> {amt.toLocaleString()} </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="input-group money">
              <label htmlFor="amount">৳</label>
              <div className="input-wrap">
                <input 
                  type="text" 
                  id="amount"
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
                  ১.ক্যাশ আউট বা সেন্ডমানি করার আগে 'ব্যক্তিগত তথ্য' অংশে সর্বোচ্চ ৩টি মোবাইল নম্বর যোগ করে ভেরিফাই করুন।
                  ২.আপনার ডিপোজিট প্রক্রিয়াটি আরও দ্রুত সফল করতে সঠিক ক্যাশ আউট নাম্বার,এমাউন্ট এবং ট্রানজেকশন আইডি সহ সাবমিট করুন।
                  ৩.যেকোনো ডিপোজিট করার আগে সবসময় আমাদের ডিপোজিট পেইজে নাম্বার চেক করুন ।
                  ৪.ডিপোজিট পেন্ডিং থাকা অবস্থায় আপনি সর্বোচ্চ ২টি ডিপোজিট ট্রাই করতে পারবেন। কোনো সমস্যা হলে অনুগ্রহ করে লাইভচ্যাটের মাধ্যমে সহায়তা নিন।
                  ৫.বাজির ODDs অবশ্যই ১.৩০-এর ওপরে হতে হবে। এর নিচের অডসে -এ রাখা বাজি উইথড্র টার্নওভারের জন্য গণনা করা হবে না।
                </span>
              </h5>
            </div>
          </div>

          {/* Submit Button */}
          <div className="member-content">
            <div className="button">
              <a className="submit-btn" onClick={handleSubmit}>
                Submit
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Deposit;