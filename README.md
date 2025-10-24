# 📝 Blog API Backend

A RESTful **Blog API** built with **Node.js**, **Express**, **Mongoose**, and **MongoDB**.  
It supports blog management with **authentication**, **authorization**, **comments**, **likes**, **file uploads**, and **email notifications** using **Multer** and **Cloudinary**.

---

## 🚀 Features

- Full CRUD operations for blogs
- Comment and like system with nested routes
- User authentication and authorization (JWT-based)
- Email verification, forgot password, and reset password flows
- File uploads using **Multer** and **Cloudinary**
- Global error handling and validation
- Environment variable configuration via `.env`
- Scalable and organized project structure (MVC)
- Role-based access control (Admin, User)
- Subscription management

---

## 🧱 Tech Stack

| Category  | Technology |
| --------- | ---------- |
| Runtime   | Node.js    |
| Framework | Express.js |
| Database  | MongoDB    |
| ODM       | Mongoose   |
| File Uploads | Multer + Cloudinary |
| Auth | JWT |
| Config | dotenv |

---

## 📂 Project Structure

```
project-root/
├── controllers/
│   ├── authController.js
│   ├── blogControllers.js
│   ├── commentControllers.js
│   ├── likeController.js
│   └── subscriberControllers.js
│
├── middleware/
│   ├── globalErrorHandler.js
│   └── protect.js
│
├── models/
│   ├── blogModel.js
│   ├── commentModel.js
│   ├── likeModel.js
│   ├── subscriberModel.js
│   └── userModel.js
│
├── routes/
│   ├── blogRoutes.js
│   ├── commentRoutes.js
│   ├── likeRoutes.js
│   ├── subscriberRoutes.js
│   └── userRoutes.js
│
├── utils/
│   ├── appError.js
│   └── email.js
│
├── app.js
├── server.js
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Fabrice-Dush/BlogBackend/
   cd BlogBackend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** — create a `.env` file in the root directory:

   ```env
   NODE_ENV=production
   PORT=8000
   DATABASE_USERNAME=your_database_username
   DATABASE_PASSWORD=your_database_password
   DATABASE=your_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   EMAIL_USERNAME=your_email
   EMAIL_PASSWORD=your_email_app_password
   RESULTS_PER_PAGE=10
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run the server**

   ```bash
   npm start
   ```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/v1/blogs` | Get all blogs |
| `POST` | `/api/v1/blogs` | Create a new blog (Admin only) |
| `GET` | `/api/v1/blogs/:id` | Get a single blog by ID |
| `PUT` | `/api/v1/blogs/:id` | Update a blog (Admin only) |
| `DELETE` | `/api/v1/blogs/:id` | Delete a blog (Admin only) |
| `GET` | `/api/v1/blogs/:blogId/comments` | Get all comments for a blog |
| `POST` | `/api/v1/blogs/:blogId/comments` | Add a comment to a blog |
| `GET` | `/api/v1/blogs/:blogId/comments/:id` | Get a specific comment |
| `PATCH` | `/api/v1/blogs/:blogId/comments/:id` | Update a comment |
| `DELETE` | `/api/v1/blogs/:blogId/comments/:id` | Delete a comment |
| `GET` | `/api/v1/blogs/:blogId/likes` | Get all likes (Admin only) |
| `PATCH` | `/api/v1/blogs/:blogId/likes` | Like or unlike a blog |
| `POST` | `/api/v1/users/signup` | Register a new user |
| `POST` | `/api/v1/users/login` | Login a user |
| `GET` | `/api/v1/users/verifyEmail/:token` | Verify user email |
| `POST` | `/api/v1/users/forgotPassword` | Send password reset email |
| `PATCH` | `/api/v1/users/resetPassword/:token` | Reset user password |
| `PATCH` | `/api/v1/users/updateMyPassword` | Update user password (logged-in user) |
| `PATCH` | `/api/v1/users/updateMe` | Update user data (logged-in user) |
| `DELETE` | `/api/v1/users/deleteMe` | Delete current user |
| `GET` | `/api/v1/users` | Get all users (Admin only) |
| `POST` | `/api/v1/subscribers` | Subscribe to newsletter |
| `GET` | `/api/v1/subscribers` | Get all subscribers (Admin only) |
| `DELETE` | `/api/v1/subscribers/:id` | Delete a subscriber |

---

## ⚠️ Error Handling

This project uses a **global error handler** to catch and manage all operational and programming errors such as:

- Invalid MongoDB Object IDs
- Validation and casting errors
- Duplicate fields
- Token errors
- Unauthorized actions

Example response:

```json
{
  "status": "fail",
  "message": "Invalid ID provided"
}
```

---

## ☁️ File Uploads

Images are uploaded using **Multer** for handling multipart form data and stored on **Cloudinary**.  
Each blog post can include an uploaded image URL stored in MongoDB.

---

## 📧 Email Functionality

Emails are sent using **NodeMailer**, enabling:

- Email verification after signup
- Forgot password and reset password flows

---

## 🧪 Testing

Use **Postman**, **Thunder Client**, or **cURL** to test API endpoints.

Example:

```bash
curl -X GET http://localhost:8000/api/v1/blogs
```

---

## ✍️ Author

**Dushimimana Fabrice**  
📧 dushimimanafabricerwanda@gmail.com  
🌍 [GitHub Profile](https://github.com/Fabrice-Dush)
