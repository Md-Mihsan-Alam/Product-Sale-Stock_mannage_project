// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading state

//     useEffect(() => {
//         const checkAuth = () => {
//             // Check if user is authenticated via localStorage
//             const authStatus = localStorage.getItem('isAuthenticated') === 'true';
//             setIsAuthenticated(authStatus);
//         };

//         checkAuth();
//     }, []);

//     // Show a loading state until authentication is determined
//     if (isAuthenticated === null) {
//         return <div>Loading...</div>;
//     }

//     // Redirect to the login/signup page if not authenticated
//     return isAuthenticated ? children : <Navigate to="/" />;
// };

// export default ProtectedRoute;



// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';

// const ProtectedRoute = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading state

//     useEffect(() => {
//         const validateAuth = async () => {
//             try {
//                 const response = await axios.get('https://676be3d8bc36a202bb8611d6.mockapi.io/Signup/SignupData', {
//                     withCredentials: true, // Ensure cookies are sent
//                 });

//                 // Check if the response contains valid data
//                 if (response.status === 200 && response.data.length > 0) {
//                     setIsAuthenticated(true);
//                 } else {
//                     setIsAuthenticated(false);
//                 }
//             } catch (error) {
//                 console.error('Error during authentication:', error);
//                 setIsAuthenticated(false);
//             }
//         };

//         validateAuth();
//     }, []);

//     // Show a loading state while authentication is being validated
//     if (isAuthenticated === null) {
//         return <div>Loading...</div>;
//     }

//     // Redirect to the login page if not authenticated
//     if (!isAuthenticated) {
//         return <Navigate to="/" />;
//     }

//     // Render protected content if authenticated
//     return children;
// };

// export default ProtectedRoute;
