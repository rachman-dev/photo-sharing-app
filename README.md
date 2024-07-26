# Photo Sharing App

## Description

The Photo Sharing App is a full stack web application built using the MERN stack. It allows users to create accounts, log in, post photos, like photos, comment on photos, and follow other users. Unauthenticated users can view photos but cannot interact with them.

## Features

- User authentication (Sign up, Log in, Log out)
- Post photos
- Like photos
- Comment on photos
- Follow other users
- View photos posted by others

## Prerequisites

- Node.js
- MongoDB
- Cloudinary account

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rachman-dev/photo-sharing-app
   ```

2. **Navigate to the `api` directory and install dependencies**

   ```bash
   cd api
   npm i
   ```

3. **Configure environment variables for the API**
   Create a `.env` file in the `api` directory and add the following:

   ```
   MONGODB_URL=your_mongodb_connection_string
   PORT=your_preferred_port
   ```

4. **Run the API**

   ```bash
   nodemon server.js
   ```

5. **Navigate to the `frontend` directory and install dependencies**

   ```bash
   cd frontend
   npm i
   ```

6. **Set up Cloudinary**

   - Create an account on [Cloudinary](https://cloudinary.com/).
   - Create an upload preset.
   - Get your cloud name.

7. **Configure environment variables for the frontend**
   Create a `.env` file in the `frontend` directory and add the following:
   ```
   REACT_APP_BASE_URL=your_api_base_url
   REACT_APP_UPLOAD_PRESET=your_upload_preset
   REACT_APP_CLOUD_NAME=your_cloud_name
   ```

## Usage

1. **Start the frontend**

   ```bash
   npm start
   ```

2. **Access the application**
   Open your browser and go to `http://localhost:your_frontend_port`.

Make sure to replace placeholders like `your_mongodb_connection_string`, `your_preferred_port`, `your_api_base_url`, `your_upload_preset`, and `your_cloud_name` with your actual values.
