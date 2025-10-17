# 📝 Blog API Backend

A RESTful Blog API built with **Node.js**, **Express**, **Mongoose**, and **MongoDB**.  
It allows you to **create**, **read**, **update**, and **delete** blog posts with proper **validation** and **global error handling**.  
The project also uses **dotenv** for environment variable management.

---

## 🚀 Features

- Create new blog posts
- Retrieve all blogs or a single blog by ID
- Update existing blogs
- Delete blogs
- Mongoose data validation
- Centralized global error handling
- Environment variable configuration via `.env`
- Scalable and organized project structure(MVC)

---

## 🧱 Tech Stack

| Category  | Technology |
| --------- | ---------- |
| Runtime   | Node.js    |
| Framework | Express.js |
| Database  | MongoDB    |
| ODM       | Mongoose   |
| Config    | dotenv     |

---

## 📂 Project Structure

```
project-root/
├── controllers/
│   └── blogController.js
├── models/
│   └── blogModel.js
├── routes/
│   └── blogRoutes.js
├── utils/
│   ├── appError.js
│
├── middlewares/
│   └── globalErrorHandler.js
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

3. **Create a `.env` file** in the project root and add the following:

   ```env
   PORT=8000
   DATABASE=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/blogDB
   DATABASE_LOCAL=mongodb://127.0.0.1:27017/blogDB
   NODE_ENV=development
   ```

4. **Run the server**
   ```bash
   npm start
   ```

---

## 📡 API Endpoints

### Base URL

```
/api/v1/blogs
```

| Method   | Endpoint            | Description             |
| -------- | ------------------- | ----------------------- |
| `GET`    | `/api/v1/blogs`     | Get all blogs           |
| `POST`   | `/api/v1/blogs`     | Create a new blog       |
| `GET`    | `/api/v1/blogs/:id` | Get a single blog by ID |
| `PUT`    | `/api/v1/blogs/:id` | Update a blog           |
| `DELETE` | `/api/v1/blogs/:id` | Delete a blog           |

---

## ⚠️ Error Handling

This project implements **global error handling middleware** to catch:

- Invalid MongoDB Object IDs
- Validation and casting errors
- Duplicate field errors
- Unexpected runtime errors

Example error response:

```json
{
  "status": "fail",
  "message": "Invalid ID provided"
}
```

---

## 🧪 Testing

Use **Postman**, **Thunder Client**, or **cURL** to test the endpoints.

Example:

```bash
curl -X GET http://localhost:8000/api/v1/blogs
```

---

## ✍️ Author

**Dushimimana Fabrice**  
📧 dushimimanafabricerwanda@gmail.com  
🌍 [GitHub Profile](https://github.com/Fabrice-Dush)
