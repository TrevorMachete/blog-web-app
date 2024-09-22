# SamaSkies Blog Application

SamaSkies is a full-featured blog application developed by Safae Zghari. It allows users to create, edit, and view blog posts, as well as interact with the content social media sharing.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)

## Features
- User authentication (sign up, login, and password reset)
- Create, edit, and delete blog posts
- View detailed blog posts with rich text content
- Upload and display images in blog posts
- Share blog posts on social media platforms
- View popular posts and topics
- Responsive design for mobile and desktop

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/samaskies.git
   cd samaskies
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase configuration to `firebase.js`:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       measurementId: "YOUR_MEASUREMENT_ID"
     };
     ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage
- Navigate to the home page to view recent blog posts.
- Sign up or log in to create and manage your own blog posts.
- Use the editor to write rich text content and upload images.
- Share your favorite posts on social media platforms.
- Explore popular posts and topics in the sidebar.

## Technologies Used
- **React**: Frontend library for building user interfaces
- **Firebase**: Backend services for authentication, Firestore database, and storage
- **CKEditor**: Rich text editor for creating and editing blog content
- **React Router**: Library for routing and navigation
- **React Share**: Library for social media sharing buttons

## Contributors
- **Safae Zghari (MA), Macs Machete (RSA)