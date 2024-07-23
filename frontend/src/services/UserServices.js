import axios from 'axios';

export const getUser = async (userId) => {
    const { data } = await axios.get(`https://photo-sharing-app-rho.vercel.app/users/${userId}`);
    return data;
};

export const followUser = (followerId, followedId) => {
    axios.post(`https://photo-sharing-app-rho.vercel.app/users/${followedId}/followers/${followerId}`);
};

export const unfollowUser = (followerId, followedId) => {
    axios.delete(`https://photo-sharing-app-rho.vercel.app/users/${followedId}/followers/${followerId}`);
};

export const setProfilePhoto = async (userId, image) => {
    const { data } = await axios.put(`https://photo-sharing-app-rho.vercel.app/users/${userId}/photo`, {
        imageUrl: image
    });
    return data;
};