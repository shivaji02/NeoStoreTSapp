import axios from 'axios';
import { Alert } from 'react-native'; // Import the 'Alert' object from the 'react-native' library

const API_URL = 'http://staging.php-dev.in:8844/trainingapp/api';


// const loginUser = async (email, password) => {
//     try {
//         const response = await axios.post('http://staging.php-dev.in:8844/trainingapp/api/users/login', {
//             email,
//             password
//         });
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

const loginUser = async (data) => {
  try {
      console.log('Form Data being sent: ', JSON.stringify(formData)); // Log the data being sent
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      
      const response = await axios.post(
          'http://staging.php-dev.in:8844/trainingapp/api/users/login',
          formData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          }
      );
      console.log('API Response: ', response.data); // Log the API response
      return response.data;
  } catch (error) {
      console.error('Error Response: ', error.response ? error.response.data : error.message);
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
    // const registerUser = async (userData: Omit<FormValues, 'termsAccepted'>) => {
  //   try {
  //     console.log(userData);
  //     const response = await axios.post('http://staging.php-dev.in:8844/trainingapp/api/users/register', userData);
  //     return response.data;
  //   } catch (error: any) {
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


  const forgotPassword = async (email) => {
    try {
        console.log('Form Data being sent: ', JSON.stringify(formData)); // Log the data being sent
        const formData = new FormData();
        formData.append('email', email);
        
        const response = await axios.post(
            'http://staging.php-dev.in:8844/trainingapp/api/users/forgot',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log('API Response: ', response.data); // Log the API response
        return response.data;
    } catch (error) {
        console.error('Error Response: ', error.response ? error.response.data : error.message);
        throw error;
    }
  };
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://staging.php-dev.in:8844/trainingapp/api/products/getList');
      return response.data;
    } catch (error) {
      throw error;
    }
  };




export {   forgotPassword,loginUser,fetchProducts };
