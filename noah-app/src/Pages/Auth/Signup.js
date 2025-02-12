import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Auth.css';
import { saveSignupData, verifyLoginData } from '../../utils/api';
import logo from "../Auth/Screenshot_2024-12-25_164147-removebg-preview.png";
import { ImTruck } from "react-icons/im";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaGooglePlusG } from "react-icons/fa";

const Signup = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isSigningUp, setIsSigningUp] = useState(true); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await saveSignupData({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            if (response.status === 201) {

                navigate('/dashboard');
            } else {
                alert('Failed to sign up. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await verifyLoginData({
                username: formData.username,
                password: formData.password
            });

            if (response.status === 200) {

                navigate('/dashboard');
            } else {
                alert('Invalid username or password!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again later.');
        }
    };

    return (
        <div className="container">
            <div className="left">
                <ImTruck />
                <h1>OrderX</h1>
                <p>BOOST YOUR SALES</p>
                <img src={logo} alt="OrderX Logo" />
            </div>

            <div className="right">
                <h2>{isSigningUp ? 'Create an Account' : 'Sign In'}</h2>
                <h2>Welcome</h2>
                <form onSubmit={isSigningUp ? handleSubmit : handleSignIn} className='SignupForm'>
                    <input
                        type="text"
                        name="username"
                        placeholder="Full Name"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {isSigningUp && (
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {isSigningUp && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <button type="submit">
                        {isSigningUp ? 'Create Account' : 'Sign In'}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsSigningUp(!isSigningUp)}
                    >
                        {isSigningUp ? 'Already have an account? Sign In' : 'Create a new account'}
                    </button>

                    <small>Help & Support</small>
                </form>
                <div className="social-links">
                    <a href="https://www.facebook.com/" target='blank'><CiFacebook /></a>
                    <a href="https://www.instagram.com/" target='blank'><FaInstagram /></a>
                    <a href="https://www.twitter.com/" target='blank'><FaXTwitter /></a>
                    <a href="https://www.google.com/" target='blank'><FaGooglePlusG /></a>
                    <a href="https://www.linkedin.com/" target='blank'><FaLinkedinIn /></a>
                </div>
            </div>
        </div>
    );
};

export default Signup;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Auth.css';
// import logo from "../Auth/Screenshot_2024-12-25_164147-removebg-preview.png";
// import { ImTruck } from "react-icons/im";
// import { CiFacebook } from "react-icons/ci";
// import { FaXTwitter } from 'react-icons/fa6';
// import { FaInstagram, FaLinkedinIn, FaGooglePlusG } from "react-icons/fa";

// const Signup = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });

//     const [isSigningUp, setIsSigningUp] = useState(true); // Toggle between login and signup
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate passwords if signing up
//         if (isSigningUp && formData.password !== formData.confirmPassword) {
//             setError('Passwords do not match!');
//             return;
//         }

//         try {
//             const endpoint = 'https://676be3d8bc36a202bb8611d6.mockapi.io/Signup/SignupData';

//             if (!isSigningUp) {
//                 // Login: Check credentials
//                 const response = await axios.get(endpoint);
//                 const user = response.data.find(
//                     (user) => user.username === formData.username && user.password === formData.password
//                 );

//                 if (user) {
//                     // Save auth status to localStorage
//                     localStorage.setItem('isAuthenticated', 'true'); 
//                     localStorage.setItem('username', user.username); // Save user info (optional)
//                     navigate('/dashboard');
//                 } else {
//                     setError('Invalid username or password');
//                 }
//             } else {
//                 // Signup: Create new user
//                 const response = await axios.post(endpoint, formData);

//                 if (response.status === 201 || response.status === 200) {
//                     // Save auth status to localStorage
//                     localStorage.setItem('isAuthenticated', 'true'); 
//                     localStorage.setItem('username', formData.username); // Save user info (optional)
//                     navigate('/dashboard');
//                 } else {
//                     setError('Signup failed. Please try again.');
//                 }
//             }
//         } catch (error) {
//             console.error('Error during authentication:', error);
//             setError('An error occurred. Please try again.');
//         }
//     };

//     return (
//         <div className="container">
//             <div className="left">
//                 <ImTruck />
//                 <h1>OrderX</h1>
//                 <p>BOOST YOUR SALES</p>
//                 <img src={logo} alt="OrderX Logo" />
//             </div>

//             <div className="right">
//                 <h2>{isSigningUp ? 'Create an Account' : 'Sign In'}</h2>
//                 <h2>Welcome</h2>
//                 {error && <div className="error-message">{error}</div>}
//                 <form onSubmit={handleSubmit} className="SignupForm">
//                     <input
//                         type="text"
//                         name="username"
//                         placeholder="Full Name"
//                         value={formData.username}
//                         onChange={handleChange}
//                         required
//                     />
//                     {isSigningUp && (
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Your Email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     )}
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                     {isSigningUp && (
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             placeholder="Confirm Password"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                         />
//                     )}
//                     <button type="submit">
//                         {isSigningUp ? 'Create Account' : 'Sign In'}
//                     </button>

//                     <button
//                         type="button"
//                         onClick={() => {
//                             setIsSigningUp(!isSigningUp);
//                             setError(''); // Clear error on mode switch
//                         }}
//                     >
//                         {isSigningUp ? 'Already have an account? Sign In' : 'Create a new account'}
//                     </button>
//                 </form>
//                 <div className="social-links">
//                     <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><CiFacebook /></a>
//                     <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><FaInstagram /></a>
//                     <a href="https://www.twitter.com/" target="_blank" rel="noreferrer"><FaXTwitter /></a>
//                     <a href="https://www.google.com/" target="_blank" rel="noreferrer"><FaGooglePlusG /></a>
//                     <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;









// // Third atempt 

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import './Auth.css';
// import axios from 'axios';
// import logo from "../Auth/Screenshot_2024-12-25_164147-removebg-preview.png";
// import { ImTruck } from "react-icons/im";
// import { CiFacebook } from "react-icons/ci";
// import { FaXTwitter } from "react-icons/fa6";
// import { FaInstagram, FaLinkedinIn, FaGooglePlusG } from "react-icons/fa";

// const Signup = () => {
//     const navigate = useNavigate(); 
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });

//     const [isSigningUp, setIsSigningUp] = useState(true); 
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         // Validate passwords if signing up
//         if (isSigningUp && formData.password !== formData.confirmPassword) {
//             setError('Passwords do not match!');
//             return;
//         }
    
//         try {
//             const endpoint = 'https://676be3d8bc36a202bb8611d6.mockapi.io/Signup/SignupData';
    
//             if (!isSigningUp) {
//                 // For login, validate user credentials
//                 const response = await axios.get(endpoint, { withCredentials: true });
//                 const user = response.data.find(
//                     (user) => user.username === formData.username && user.password === formData.password
//                 );
    
//                 if (user) {
//                     navigate('/dashboard'); // Redirect to dashboard
//                 } else {
//                     setError('Invalid username or password');
//                 }
//             } else {
//                 // For signup, create a new user
//                 const response = await axios.post(endpoint, formData, { withCredentials: true });
    
//                 if (response.status === 201 || response.status === 200) {
//                     navigate('/dashboard'); // Navigate to dashboard on successful signup
//                 } else {
//                     setError('Signup failed. Please try again.');
//                 }
//             }
//         } catch (error) {
//             console.error('Error during authentication:', error);
//             setError('An error occurred. Please try again.');
//         }
//     };
    
    

//     return (
//         <div className="container">
//             <div className="left">
//                 <ImTruck />
//                 <h1>OrderX</h1>
//                 <p>BOOST YOUR SALES</p>
//                 <img src={logo} alt="OrderX Logo" />
//             </div>

//             <div className="right">
//                 <h2>{isSigningUp ? 'Create an Account' : 'Sign In'}</h2>
//                 <h2>Welcome</h2>
//                 {error && <div className="error-message">{error}</div>} {/* Error display */}
//                 <form onSubmit={handleSubmit} className='SignupForm'>
//                     <input
//                         type="text"
//                         name="username"
//                         placeholder="Full Name"
//                         value={formData.username}
//                         onChange={handleChange}
//                         required
//                     />
//                     {isSigningUp && (
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Your Email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     )}
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                     {isSigningUp && (
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             placeholder="Confirm Password"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                         />
//                     )}
//                     <button type="submit">
//                         {isSigningUp ? 'Create Account' : 'Sign In'}
//                     </button>

//                     <button
//                         type="button"
//                         onClick={() => {
//                             setIsSigningUp(!isSigningUp);
//                             setError(''); // Clear error when switching modes
//                         }}
//                     >
//                         {isSigningUp ? 'Already have an account? Sign In' : 'Create a new account'}
//                     </button>

//                     <small>Help & Support</small>
//                 </form>
//                 <div className="social-links">
//                     <a href="https://www.facebook.com/" target='blank'><CiFacebook /></a>
//                     <a href="https://www.instagram.com/" target='blank'><FaInstagram /></a>
//                     <a href="https://www.twitter.com/" target='blank'><FaXTwitter /></a>
//                     <a href="https://www.google.com/" target='blank'><FaGooglePlusG /></a>
//                     <a href="https://www.linkedin.com/" target='blank'><FaLinkedinIn /></a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;
