// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// const dbConnection = require("./config/db");
// const authRoutes = require("./routes/authroutes");
// const bookRoutes = require("./routes/bookroutes");

// dotenv.config();
// dbConnection();

// const app = express();

// // CORS setup
// app.use(cors({ 
//   origin: "http://localhost:5173", // Frontend URL
//   credentials: true, // Allow cookies to be sent
// }));

// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/auth", authRoutes);
// app.use("/books", bookRoutes);

// // Server port
// const PORT = process.env.PORT || 4005; // Ensure your frontend is expecting 4005 or 5000
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authroutes");
const bookRoutes = require("./routes/bookroutes");
// const uploadRoute = require("./routes/upload");
const dbConnection = require("./config/db");

dotenv.config();
const app = express();
const port = process.env.PORT || 4006;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

// Start Server
app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});

// Connect to DB
dbConnection();
