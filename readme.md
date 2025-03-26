# MERN Task

This project is a MERN (MongoDB, Express, React, Node.js) stack application that includes user registration, login, and user listing functionalities. The backend is built with Node.js and Express, and the frontend is built with React.

## Backend Setup

### Prerequisites

-   Node.js
-   MongoDB


### Installation

1. Navigate to the `backend` directory:

```sh
cd backend && npm install
```

3. Create a .env file in the backend directory and add the following environment variables:

```js
PORT = 3030;
MONGO_URI = "your_mongo_uri_here";
LISTING_PAGE_LIMIT = 10;
JWT_SECRET = "your_jwt_secret_here";
```

4. Start the backend server:

```sh
npm run dev
```

The backend server will start on http://localhost:3030.

<hr>

Frontend Setup

# Prerequisites

-   Node.js

# Installation

1.  Navigate to the frontend directory:

```sh
cd frontend
```

2. Install the dependencies:

```sh
npm install
```

3. Create a `.env` file in the frontend directory and add the following environment variables:

```js
REACT_APP_API_URL = "http://localhost:3030";
REACT_APP_BASE_URL = "http://localhost:3000";
REACT_APP_COOKIE_NAME = "auth_token";
```

4. Start the frontend development server:

```sh
npm start
```

The frontend application will start on http://localhost:3000.

# Usage

### Registration

1.  Navigate to http://localhost:3000/register.
2.  Fill in the registration form and submit.

### Login

1.  Navigate to http://localhost:3000/login.
2.  Fill in the login form and submit.

### User List

1.  After logging in, navigate to http://localhost:3000/users to view the list of users (if logged in as admin).

## Additional Considerations

-   Use environment variables for sensitive data.
-   Passwords are hashed before storing them.
-   Proper validation and error handling are implemented.
