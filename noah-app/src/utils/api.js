import axios from "axios";


// products data is done here   //

const API = "https://6766dc45560fbd14f18c5406.mockapi.io/dashboard";

export const getProductsFromServer = async () => {
  const response = await axios.get(`${API}/products`);
  return response.data;
};

export const saveProductsToServer = async (product) => {
  const response = await axios.post(`${API}/products`, product);
  return response.data;
};

export const updateProductOnServer = async (id, updatedProduct) => {
  const response = await axios.put(`${API}/products/${id}`, updatedProduct);
  return response.data;
};

export const deleteProductOnServer = async (id) => {
  await axios.delete(`${API}/products/${id}`);
};


// Signup data is done here   //


// const SignupAPI = "https://676be3d8bc36a202bb8611d6.mockapi.io/Signup";

// export const saveSignupData = async (SignupData) => {
//       const response = await axios.post(`${SignupAPI}/SignupData`, SignupData);
      
//       return response;
// };


/////////////////////////////////////////////////////////////////////////////////////////////////



const SignupAPI = "https://676be3d8bc36a202bb8611d6.mockapi.io/Signup";

// Save Signup Data
export const saveSignupData = async (SignupData) => {
    const response = await axios.post(`${SignupAPI}/SignupData`, SignupData);
    return response;
};

// Verify Login Data
export const verifyLoginData = async (loginData) => {
    try {
        // Assuming you store user data in 'SignupData' or adjust if necessary
        const response = await axios.get(`${SignupAPI}/SignupData`);
        
        const user = response.data.find(user => user.username === loginData.username && user.password === loginData.password);
        
        if (user) {
            return { status: 200, message: 'Login successful' }; // Found user, login successful
        } else {
            return { status: 400, message: 'Invalid credentials' }; // No user found
        }
    } catch (error) {
        console.error('Error verifying login data:', error);
        return { status: 500, message: 'An error occurred' }; // Server error
    }
};






/////////////////////////////////////////////////////////////////////////////////////////////////

const salesAPI = 'https://6766dc45560fbd14f18c5406.mockapi.io/dashboard';

export const saveSaleDataToServer = async (Add_Sale_Data) => {
  try {
    const response = await axios.post(`${salesAPI}/Add_Sale_Data`, Add_Sale_Data);
    return response.data;
  } catch (error) {
    console.error('Error saving sale data:', error);
    throw error; // Re-throw for error handling in calling code
  }
};


export const saveSaleReturnDataToServer = async (Add_Sale_Return_Data) => {
  try {
    const response = await axios.post(
      "https://676be3d8bc36a202bb8611d6.mockapi.io/Signup/Add_Sale_Return_Data",
      Add_Sale_Return_Data
    );
    return response.data;
  } catch (error) {
    console.error("Error saving sale return data:", error);
    throw error;
  }
};