import axios from 'axios';

export const Signup = async (email, username, password) => {

    return await axios.post(`https://photo-sharing-app-sigma.vercel.app/users/register`, {
        email,
        username,
        password
    });
};

export const Login = async (email, password) => {

    return await axios.post(`https://photo-sharing-app-sigma.vercel.app/users/login`, {
        email,
        password
    });

};