# Project Name Backend

Welcome to the backend documentation of Project Name! This document provides comprehensive information on how to set up, use, and extend the backend functionality.
# Hosted - Link : https://socialmedia-7p99.onrender.com



## Overview

Project Name Backend is a Node.js application that serves as the backend for Project Name. It provides APIs to handle user authentication, user management, post creation, and interaction with posts (like, comment, etc.).

## Installation

To get started with the backend:

1. Clone the repository:

   ```bash
   git clone https://github.com/SachinMondal/SocialMedia-Backend.git
   ```

2. Install dependencies:

   ```bash
   cd projectname-backend
   npm install
   ```

## Configuration

Before running the backend, make sure to configure the environment variables. Copy the `.env.example` file and rename it to `.env`. Modify the variables as per your environment.

## Routers

The backend provides the following routers to handle API requests:

### Authentication Router

The authentication router handles user registration and login.

- **Endpoints**:
  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Login an existing user.

### User Router

The user router handles user-related operations such as fetching user details, updating user information, managing friend requests, etc.

- **Endpoints**:
  - `GET /users/get-user/:id?`: Get user details by ID.
  - `PUT /users/update-user`: Update user information.
  - `POST /users/friend-request`: Send a friend request.
  - `POST /users/accept-request`: Accept a friend request.
  - `POST /users/suggested-friends`: Get suggested friends.
  - (and more)

### Post Router

The post router handles post-related operations such as creating posts, fetching posts, liking posts, commenting on posts, etc.

- **Endpoints**:
  - `POST /posts/create-post`: Create a new post.
  - `POST /posts/`: Get all posts.
  - `POST /posts/:id`: Get a post by ID.
  - `GET /posts/comments/:postId`: Get comments for a post.
  - `POST /posts/like/:id`: Like a post.
  - `POST /posts/like-comment/:id/:rid?`: Like a comment on a post.
  - (and more)

### Parent Router

The parent router combines all sub-routers to create a unified routing system.

- **Usage**:
  ```javascript
  const express = require("express");
  const authRoute = require("./authRoute.js");
  const userRoute = require("./userRoute.js");
  const postRoute = require("./postRoute.js");

  const router = express.Router();

  router.use(`/auth`, authRoute);
  router.use(`/users`, userRoute);
  router.use(`/posts`, postRoute);

  module.exports = router;
  ```

## Authentication

The backend uses JWT (JSON Web Tokens) for authentication. Upon successful login, the backend issues a JWT token that should be included in subsequent requests in the Authorization header.

## Testing

To run tests for the backend, use the following command:

```bash
npm test
```

## Deployment

To deploy the backend to a production environment, ensure that you set up the environment variables correctly and follow deployment best practices for Node.js applications.

## Contributing

We welcome contributions from the community. Feel free to submit bug reports, feature requests, or pull requests to help improve the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
