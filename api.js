import axios from 'axios';
import { Alert } from 'react-native'; // Import the 'Alert' object from the 'react-native' library

const API_URL = 'http://staging.php-dev.in:8844/trainingapp/api';


const loginUser = async (email, password) => {
    try {
        const response = await axios.post('http://staging.php-dev.in:8844/trainingapp/api/users/login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/users/forgot`, {
      email
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// const registerUser = async (userData) => {
//   try {
//     console.log(userData);
//     const response = await axios.post(`http://staging.php-dev.in:8844/trainingapp/api/users/register`, userData);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error('Error response data:', error.response.data);
//       console.error('Error response status:', error.response.status);
//       Alert.alert('Error', error.response.data.message || 'An error occurred');
//     } else if (error.request) {
//       console.error('Error request:', error.request);
//       Alert.alert('Error', 'No response received from server');
//     } else {
//       console.error('Error message:', error.message);
//       Alert.alert('Error', error.message);
//     }
//     throw error;
//   }
// };

    //   catch (error) {
    //     throw error;
    //   }
    // };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://staging.php-dev.in:8844/trainingapp/api/products/getList');
      return response.data;
    } catch (error) {
      throw error;
    }
  };



export {  registerUser, loginUser,forgotPassword,fetchProducts };
