import axios from 'axios';

export const Signup = async (email, username, password) => {

    return await axios.post(`${process.env.REACT_APP_BASE_URL || "https://photo-sharing-app-rho.vercel.app"}/users/register`, {
        email,
        username,
        password
    });
};

export const Login = async (email, password) => {

    return await axios.post(`${process.env.REACT_APP_BASE_URL || "https://photo-sharing-app-rho.vercel.app"}/users/login`, {
        email,
        password
    });

};