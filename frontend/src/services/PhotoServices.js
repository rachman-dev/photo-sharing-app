import axios from "axios";

export const getAllPhotos = async () => {
  const { data } = await axios.get(
    `${
      process.env.REACT_APP_BASE_URL ||
      "https://photo-sharing-app-rho.vercel.app"
    }/photos`
  );
  return data;
};

export const getPhotosByUserId = async (userId) => {
  const { data } = await axios.get(
    `${
      process.env.REACT_APP_BASE_URL ||
      "https://photo-sharing-app-rho.vercel.app"
    }/photos/publisher/${userId}`
  );
  return data;
};

export const getPhotosByCategoryId = async (categoryId) => {
  const { data } = await axios.get(
    `${
      process.env.REACT_APP_BASE_URL ||
      "https://photo-sharing-app-rho.vercel.app"
    }/photos/category/${categoryId}`
  );
  return data;
};

export const getPhotoById = async (photoId) => {
  const { data } = await axios.get(
    `${
      process.env.REACT_APP_BASE_URL ||
      "https://photo-sharing-app-rho.vercel.app"
    }/photos/${photoId}`
  );
  return data;
};

export const addPhoto = async (
  imageUrl,
  title,
  description,
  category,
  publisher,
  publisherName
) => {
  const { data } = await axios.post(
    `${
      process.env.REACT_APP_BASE_URL ||
      "https://photo-sharing-app-rho.vercel.app"
    }/photos/`,
    {
      imageUrl,
      title,
      description,
      category,
      publisher,
      publisherName,
    }
  );
  return data;
};

export const uploadPhotoToCloudinary = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "photo_sharing_app");
  data.append("cloud_name", "dw4jafagr");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dw4jafagr/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Cloudinary upload failed with status: ${response.status}`
      );
    }

    const result = await response.json();

    console.log("Cloudinary response:", result);

    return result;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

export const updatePhoto = async (photoId, title, description, category) => {
  const { data } = await axios.put(
    `${
      process.env.REACT_APP_BASE_URL ||
      "https://photo-sharing-app-rho.vercel.app"
    }/photos/${photoId}`,
    {
      title,
      description,
      category,
    }
  );
  return data;
};

export const deletePhoto = async (photoId) => {
  const { data } = await axios.delete(
    `${
      process.env.REACT_APP_BASE_URL ||
      "https://photo-sharing-app-rho.vercel.app"
    }/photos/${photoId}`
  );
  return data;
};

// LIKE SYSTEM

export const addLike = (photoId, likerId) => {
  axios.put(
    `${
      process.env.REACT_APP_BASE_URL ||
      "https://photo-sharing-app-rho.vercel.app"
    }/photos/${photoId}/likes/${likerId}`,
    {
      liker: likerId,
    }
  );
};

export const removeLike = (photoId, likerId) => {
  const id = likerId;
  axios.delete(
    `${
      process.env.REACT_APP_BASE_URL ||
      "https://photo-sharing-app-rho.vercel.app"
    }/photos/${photoId}/likes/${likerId}`,
    {
      liker: id,
    }
  );
};

// COMMENT SYSTEM

export const addComment = async (photoId, comment) => {
  try {
    const { data } = await axios.post(
      `${
        process.env.REACT_APP_BASE_URL ||
        "https://photo-sharing-app-rho.vercel.app"
      }/photos/${photoId}/comments`,
      comment
    );
    return data;
  } catch (error) {
    console.error(
      "Error adding comment:",
      error.response ? error.response.data : error.message
    );
    throw error; // rethrow the error so it can be handled by the caller if needed
  }
};

export const getComments = async (photoId) => {
  try {
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_BASE_URL ||
        "https://photo-sharing-app-rho.vercel.app"
      }/photos/${photoId}/comments`
    );
    return data;
  } catch (error) {
    console.error(
      "Error fetching comments:",
      error.response ? error.response.data : error.message
    );
    throw error; // rethrow the error so it can be handled by the caller if needed
  }
};
