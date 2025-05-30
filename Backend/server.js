const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const subscriptionRoutes = require("./routes/subscription.routes");


const PORT = process.env.PORT || 8000;
const userRoutes = require("./routes/user.routes");
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err));


app.get("/", (req, res) => {
  res.send("Smart Subscription API is running This Backend is created by Ayush Kandari");
});

  

