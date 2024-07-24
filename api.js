import axios from 'axios';

const regUser = 'http://staging.php-dev.in:8844/trainingapp/api/users/register';

const registerUser = async (userData) => {
    try {
        const response = await axios.post(regUser, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

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

export { regUser, registerUser, loginUser };
