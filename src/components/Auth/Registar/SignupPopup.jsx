// components/Auth/Registar/SignupPopup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Import useLocation

import SignupForm from './SignupForm';
import Carousel from '../../common/Carousel';


const SignupPopup = ({ onRegisterSuccess, onRegisterError, showSuccess, showError }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phoneNumber: '',
    countryCode: '+880'
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
    const carouselItems = [
    {
      id: 1,
      messageId: '181278',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_296289.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 2,
      messageId: '131120',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_290581.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 3,
      messageId: '176066',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_290965.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 4,
      messageId: '175525',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_287665.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 5,
      messageId: '172273',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_282301.jpg',
      onClick: (item) => console.log('Clicked:', item)
    }
  ];
  // Use useLocation hook instead of global location
  const navigate = useNavigate();
  const location = useLocation(); // Fixed: using useLocation hook

  const validateForm = () => {
    const errors = {};
    
    // Username validation
    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 4 || formData.username.length > 15) {
      errors.username = 'Username must be 4-15 characters';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters and numbers';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6 || formData.password.length > 20) {
      errors.password = 'Password must be 6-20 characters';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one letter and one number';
    }

    // Phone validation
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must contain only digits';
    } else if (formData.phoneNumber.length < 10) {
      errors.phoneNumber = 'Phone number must be at least 10 digits';
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      const response = await mockRegisterAPI(formData);
      
      if (response.success) {
        showSuccess('Registration successful! Welcome to our platform.');
        onRegisterSuccess?.(response.user);
        
        // Redirect to login or home page after successful registration
        setTimeout(() => {
          navigate('/login', { 
            state: { background: location.state?.background } // Fixed: using location from useLocation
          });
        }, 1500);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      showError(error.message);
      onRegisterError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock API function - replace with actual API call
  const mockRegisterAPI = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        const isSuccess = Math.random() > 0.2;
        
        if (isSuccess) {
          resolve({
            success: true,
            user: {
              id: Math.random().toString(36).substr(2, 9),
              username: userData.username,
              phone: userData.phoneNumber
            },
            message: 'User registered successfully'
          });
        } else {
          reject(new Error('Username already exists or server error'));
        }
      }, 1500);
    });
  };

  const handleLoginRedirect = () => {
    navigate('/login', { 
      state: { background: location.state?.background } // Fixed: using location from useLocation
    });
  };

  return (
<div className="content mcd-style member-content third-party-login">
              <div className="register-entry">
                <div className="logo-box" 
                  style={{ 
                    backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/member-logo.png?v=1760412521693")' 
                  }}>
                </div>
      
      <Carousel
           items={carouselItems}
        autoPlay={true}
        delay={5000}
        />
      
      <div className="menu-box"></div>
      
      <div className="entry-outlet">
        <SignupForm 
          formData={formData}
          formErrors={formErrors}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          isSubmitting={isSubmitting}
        />
      </div>
      
      <p className="button-tips">
        <span>Already a member? </span>
        <Link to="/login">Log in</Link>
      </p>
      
      <p className="footer-tips">
        <span>Registering means you are over 18 years old, have read and agree to the </span>
        <a href="/terms/conditions">Terms & Conditions</a>
        <span> . </span>
      </p>
    </div>
    </div>
  );
};

export default SignupPopup;