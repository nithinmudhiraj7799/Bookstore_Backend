// // const mongoose = require("mongoose");

// // const dbConnection = async () => {
// //   try {
// //     await mongoose.connect(process.env.MONGO_URI);
// //     console.log("Database connected successfully");
// //   } catch (error) {
// //     console.log("Database connection error:", error.message);
// //     process.exit(1);
// //   }
// // };

// // module.exports = dbConnection;


// const mongoose=require("mongoose")
// const dotenv = require('dotenv');

// dotenv.config();

// const dbConnection=()=>{

//     return mongoose.connect(process.env.MONGO_URI)
//    .then(()=>{
//     console.log("db connected successfully")
//    })
// .catch((error)=>{
//     console.log("db not connected",error)
// })
// }


// module.exports=dbConnection;

const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ DB connected successfully"))
    .catch((error) => console.log("❌ DB connection error:", error));
};

module.exports = dbConnection;
