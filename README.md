
# Smart Subscription Management System (Backend)

This is the backend of the **Smart Subscription Management System**, designed to help users manage and track their subscriptions efficiently. It includes features like user authentication, role-based access control, subscription creation, updating, deletion, and more.

## 🚀 Features

- User Registration & Login (with hashed passwords)
- JWT-based Authentication (Access + Refresh Tokens)
- Role-Based Access Control (Admin & User)
- Create, Read, Update, and Delete (CRUD) Subscriptions
- Email Notification for Subscription Creation/Deletion (optional)
- RESTful API structure
- MongoDB Database Integration

## 🛠️ Tech Stack

- **Backend Framework**: Node.js + Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (Access and Refresh tokens)
- **Security**: bcrypt, CORS
- **Other Tools**: dotenv, nodemon, morgan

## 📁 Project Structure

```
smart-subscription-backend/
│
├── config/            # DB connection and config files
├── controllers/       # Route logic
├── middleware/        # Auth and role protection
├── models/            # Mongoose schemas
├── routes/            # API route files
├── utils/             # Helper functions (e.g. token generation)
├── .env               # Environment variables
├── server.js          # Entry point
└── package.json
```

## 🔐 API Authentication

- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Refresh Token: `POST /api/auth/refresh-token`
- Logout: `POST /api/auth/logout`

Tokens must be sent in the `Authorization` header as:  
```
Bearer <token>
```

## 📦 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/ayushkandari25/smart-subscription-backend.git
cd smart-subscription-backend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Create `.env` File**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
```

4. **Run the Server**

```bash
npm run dev
```

## 📬 API Endpoints

| Method | Endpoint                    | Description                    | Protected |
|--------|-----------------------------|--------------------------------|-----------|
| POST   | /api/auth/register          | Register a new user           | No        |
| POST   | /api/auth/login             | Login user                    | No        |
| POST   | /api/auth/refresh-token     | Refresh access token          | No        |
| GET    | /api/subscriptions/         | Get all subscriptions         | Yes       |
| POST   | /api/subscriptions/         | Create new subscription       | Yes       |
| PUT    | /api/subscriptions/:id      | Update subscription           | Yes       |
| DELETE | /api/subscriptions/:id      | Delete subscription           | Yes       |

## 🧪 Testing

Use **Postman** or **Thunder Client** to test your routes manually, or add automated tests later with Jest or Supertest.

## 📌 Future Enhancements

- Payment gateway integration (Stripe, Razorpay)
- Subscription reminders (via email/cron jobs)
- Frontend with React.js
- Fullstack deployment on Vercel + Render


## 👨‍💻 Author

**Ayush Kandari**  
[LinkedIn](https://www.linkedin.com/in/ayushkandari) • ayush25.kandari@gmail.com
