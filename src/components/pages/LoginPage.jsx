// import React, { useState } from 'react';
// import LoginForm from '../Auth/Login/LoginForm';
// import { useNavigate, useLocation, Link } from 'react-router-dom'; // Import useLocation

// const LoginPage = () => {
//   const [isActive, setIsActive] = useState(true);
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation(); // Fixed: using useLocation hook
//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     // Clear errors when user starts typing
//     if (formErrors[field]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//     if (loginError) {
//       setLoginError('');
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     // Username validation
//     if (!formData.username || formData.username.length < 4 || formData.username.length > 15) {
//       errors.username = 'Username must be 4-15 characters';
//     }
    
//     // Password validation
//     if (!formData.password || formData.password.length < 6) {
//       errors.password = 'Password must be at least 6 characters';
//     }
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   if (!validateForm()) {
//     return;
//   }
  
//   setIsSubmitting(true);
//   setLoginError('');
  
//   try {
//     const response = await login(formData.username, formData.password);
    
//     // Handle successful login
//     console.log('Login successful:', response);
    
//     // Navigate to intended page or dashboard
//     const from = location.state?.from?.pathname || '/dashboard';
//     navigate(from, { replace: true });
    
//   } catch (error) {
//     setLoginError(error.message || 'Login failed. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };



//   const handleForgotPassword = () => {
//     // Navigate to forgot password page
//     console.log('Navigate to forgot password');
//   };

//   const handleSignupClick = () => {
//     navigate('/registar', { 
//       state: { background: location.state?.background } // Fixed: using location from useLocation
//     });
//   };

//   const isFormValid = formData.username && formData.password && validateForm();



//   return (



//           <div className="popup-page-main__container">
//             <div className="content mcd-style member-content third-party-login new-login">
//               <div className="quick-login-wrapper">
//                 <div className="logo-box" 
//                   style={{ 
//                     backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/member-logo.png?v=1760412521693")' 
//                   }}>
//                 </div>
                
//                 <LoginForm 
//                   formData={formData}
//                   formErrors={formErrors}
//                   loginError={loginError}
//                   onInputChange={handleInputChange}
//                   onSubmit={handleSubmit}
//                   isFormValid={isFormValid}
//                   isSubmitting={isSubmitting}
//                   onForgotPassword={handleForgotPassword}
//                 />

//                 <p className="button-tips">
//                   <span>Do not have an account? </span>
//                   <a href="#" onClick={handleSignupClick}>Sign Up</a>
//                 </p>
//               </div>
//             </div>
//           </div>

//   );
// };

// export default LoginPage;

// components/pages/LoginPage.js (updated)

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust the path as needed
import LoginForm from '../Auth/Login/LoginForm';
const LoginPage = () => {
  const [isActive, setIsActive] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Get the login function from AuthContext

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Username validation
    if (!formData.username || formData.username.length < 4 || formData.username.length > 15) {
      errors.username = 'Username must be 4-15 characters';
    }
    
    // Password validation
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      // Use the login function from AuthContext
      await login(formData.username, formData.password, 'en');
      
      // If login is successful, redirect to the home page or the page they were trying to access
      navigate('/', { replace: true });
      
    } catch (error) {
      setLoginError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    console.log('Navigate to forgot password');
  };

  const handleSignupClick = () => {
    navigate('/register', { 
      state: { background: location.state?.background }
    });
  };

  const isFormValid = formData.username && formData.password && !formErrors.username && !formErrors.password;

  return (
    <div className="popup-page-main__container">
      <div className="content mcd-style member-content third-party-login new-login">
        <div className="quick-login-wrapper">
          <div className="logo-box" 
            style={{ 
              backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/member-logo.png?v=1760412521693")' 
            }}>
          </div>
          
          <LoginForm 
            formData={formData}
            formErrors={formErrors}
            loginError={loginError}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            isSubmitting={isSubmitting}
            onForgotPassword={handleForgotPassword}
          />

          <p className="button-tips">
            <span>Do not have an account? </span>
            <a href="#" onClick={handleSignupClick}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;