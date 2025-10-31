// components/member/ChangePassword/ChangePassword.js
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';


const ChangePassword = ({ showError, showSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    alphabet: false,
    number: false
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate new password requirements
    if (name === 'newPassword') {
      setPasswordRequirements({
        length: value.length >= 6 && value.length <= 20,
        alphabet: /[a-zA-Z]/.test(value),
        number: /[0-9]/.test(value)
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.currentPassword) {
      showError('Error', 'Please enter your current password');
      return;
    }

    if (!formData.newPassword) {
      showError('Error', 'Please enter a new password');
      return;
    }

    if (!passwordRequirements.length || !passwordRequirements.alphabet || !passwordRequirements.number) {
      showError('Error', 'New password does not meet the requirements');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showError('Error', 'New password and confirm password do not match');
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      showError('Error', 'New password must be different from current password');
      return;
    }

    // Here you would typically make an API call to change the password
    console.log('Changing password:', formData);
    
    // Simulate API call
    setTimeout(() => {
      showSuccess('Success', 'Password changed successfully');
      navigate(-1); // Go back to previous page
    }, 1000);
  };

  const getPasswordMessageClass = (isValid) => 
    `password-message ${isValid ? 'valid' : 'disabled'}`;

  return (
    <div className="change-password-page">
      <form onSubmit={handleSubmit} noValidate>
        <div className="menu-box">
          {/* Current Password */}
          <div className="input-group password">
            <div 
              className={`eyes ${showCurrentPassword ? 'show' : ''}`}
              onClick={() => togglePasswordVisibility('current')}
            ></div>
            <label style={{ display: 'block' }}>Current password</label>
            <input
              className="input"
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Current password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
            />
            <input className="clear" type="button" />
          </div>

          {/* New Password */}
          <div className="input-group password">
            <div 
              className={`eyes ${showNewPassword ? 'show' : ''}`}
              onClick={() => togglePasswordVisibility('new')}
            ></div>
            <label style={{ display: 'block' }}>New password</label>
            <input
              className="input"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            <input className="clear" type="button" />
            
            {/* Password Requirements */}
            <div className="password-message-block">
              <div className={getPasswordMessageClass(passwordRequirements.length)}>
                <span 
                  className="icon" 
                  style={{ 
                    maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type07.svg?v=1760412521693')" 
                  }}
                ></span>
                <span className="message">Between 6~20 characters.</span>
              </div>
              
              <div className={getPasswordMessageClass(passwordRequirements.alphabet)}>
                <span 
                  className="icon" 
                  style={{ 
                    maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type07.svg?v=1760412521693')" 
                  }}
                ></span>
                <span className="message">At least one alphabet.</span>
              </div>
              
              <div className={getPasswordMessageClass(passwordRequirements.number)}>
                <span 
                  className="icon" 
                  style={{ 
                    maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type07.svg?v=1760412521693')" 
                  }}
                ></span>
                <span className="message">At least one number. (Special character, symbols are allowed)</span>
              </div>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="input-group password">
            <div 
              className={`eyes ${showConfirmPassword ? 'show' : ''}`}
              onClick={() => togglePasswordVisibility('confirm')}
            ></div>
            <label style={{ display: 'block' }}>Confirm new password</label>
            <input
              className="input"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <input className="clear" type="button" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="button submit" >
          <Link type="submit">Confirm</Link>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;