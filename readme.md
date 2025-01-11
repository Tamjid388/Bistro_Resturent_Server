Here’s the full content formatted for your `README.md` file:

---

```markdown
# BistroDB Server

This is the back-end server for the BistroDB application, built using Node.js, Express.js, MongoDB, and JWT for authentication. It provides APIs to manage menus, reviews, carts, and users.

---

## Features

- **Authentication**: User authentication using JWT.
- **Menu Management**: Fetch all menu items from the database.
- **Reviews Management**: Fetch all reviews from the database.
- **Cart Management**: Add, delete, and retrieve cart items for a specific user.
- **User Management**: Manage users and their roles (e.g., admin).

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-url.git
   ```

2. Navigate to the project directory:

   ```bash
   cd BistroDB-Server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=5000
   DB_USER=your_mongodb_user
   DB_PASS=your_mongodb_password
   Access_Token_Secret=your_jwt_secret
   ```

5. Start the server:

   ```bash
   npm start
   ```

---

## API Endpoints

### Public Endpoints

- **GET** `/menu`  
  Fetch all menu items.

- **GET** `/reviews`  
  Fetch all reviews.

---

### Cart Endpoints

- **GET** `/cart?email=user@example.com`  
  Retrieve cart items for a specific user.

- **POST** `/cart`  
  Add an item to the cart.  
  **Request Body Example**:
  ```json
  {
    "email": "user@example.com",
    "itemId": "123",
    "quantity": 2
  }
  ```

- **DELETE** `/cart/:id`  
  Remove an item from the cart using its ID.

---

### User Endpoints

- **POST** `/users`  
  Add a new user to the database.  
  **Request Body Example**:
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe"
  }
  ```

- **GET** `/users` (Protected)  
  Fetch all users. Requires a valid JWT token in the `Authorization` header.

- **DELETE** `/users/:id`  
  Delete a user by ID.

- **PATCH** `/users/admin/:id`  
  Grant admin privileges to a user by ID.

- **GET** `/users/admin/:email` (Protected)  
  Check if a user is an admin. Requires a valid JWT token in the `Authorization` header.

---

### Authentication Endpoints

- **POST** `/jwt`  
  Generate a JWT token for authentication.  
  **Request Body Example**:
  ```json
  {
    "email": "user@example.com"
  }
  ```

---

## Middleware

### `verifyToken`
Middleware to verify the validity of JWT tokens. Protects routes from unauthorized access.

---

## Database

- **Collections**:
  - `Menu`: Stores menu items.
  - `Reviews`: Stores customer reviews.
  - `Cart`: Stores user cart items.
  - `Users`: Stores user information and roles.

---


