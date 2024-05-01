# Crypto Dashboard Web Application

A single-page application (SPA) built with React that displays information about cryptocurrencies. The application fetches data from the CoinGecko API and displays it in a user-friendly interface.

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Setup](#setup) 
    - [Firebase Setup](#firebase-setup)
    - [Local Setup](#local-setup)
5. [Usage](#usage)

## Introduction

The objective of this was to build a single-page application that displays a list of cryptocurrencies and their details, including features such as user authentication, responsive design, error handling, and loading states.

## Tech Stack

The project utilizes the following technologies:

**client-side:**

- React.js (JavaScript Library)
- React Router (Client-side Routing)
- CSS (Styling)
- Axios (HTTP Client)
- Firebase (Authentication)

**server-side:**

- CoinGecko API

## Features

- Homepage: Displays a list of cryptocurrencies with their logo, name, symbol, current price, market cap, and 24-hour percentage change.
- Details Page: Clicking on a cryptocurrency navigates to a details page showing more information about the selected cryptocurrency.
- Sign Up and Sign In: Users can sign up and sign in to the application using Firebase Authentication.
- Responsive Design: The application is responsive and works well on both desktop and mobile devices.
- Error Handling: Appropriate error messages are displayed to the user if an error occurs during API requests.
- Loading State: A loading spinner or message is displayed while fetching data from the API.
- Pagination: The list of cryptocurrencies is paginated for better performance and user experience.

## Setup

### Firebase Setup

1. Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable the Authentication for your project.
3. In the Authentication section, enable the "Email/Password" sign-in method.
4. Create a new Web App in your project and copy the Firebase configuration details.

### Local Setup

1. Clone the repository:
   `git clone https://github.com/MercyKorir/crypto-dashboard.git`

2. Install dependencies:
   `cd crypto-dashboard` then `npm install`

3. Create a `.env` file in the root directory and add your Firebase configuration details:

```
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

4. Start the development server:
    `npm start`

The application should now be running at `http://localhost:3000`.

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. If you don't have an account, click the "Sign Up" link and create a new account.
3. After signing up or signing in, you will be redirected to the homepage.
4. The homepage displays a list of cryptocurrencies with their details.
5. Click on a cryptocurrency to navigate to the details page and view more information.
6. Use the pagination controls to navigate through the list of cryptocurrencies.
