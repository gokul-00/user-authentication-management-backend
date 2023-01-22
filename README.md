# User Authentication and Management Backend Application

This is a Node.js backend application that provides user authentication and management functionality, such as user signup, login, reset password and update user details.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Bcrypt
- Crypto
- Express Validator
- CORS

## Features

- User signup with email, mobile number, full name and password
- User login with email and password
- Reset password with old and new password
- Update user details
- Encryption of PII (Personally identifiable information) data
- Hashing of passwords
- JSON Web Token (JWT) authentication

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installing

1. Clone the repository

```
git clone https://github.com/gokul-00/user-authentication-management-backend.git
```


2. Install the dependencies

```
npm install
```


3. Create .env file in the root of the project and set the following environment variables

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-authentication
JWT_SECRET=secret
PUBLIC_KEY=-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----
PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
```


4. Start the server

```
npm start
```

