import axios from 'axios';

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
const regUser = 'http://staging.php-dev.in:8844/trainingapp/api/users/register';
const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      return response.json();
    } catch (error) {
      console.error('Error:', error);
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



export {  registerUser, loginUser,forgotPassword,fetchProducts };
