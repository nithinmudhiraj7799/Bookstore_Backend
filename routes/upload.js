
// routes/upload.js
const express = require("express");
const multer = require("multer");
const storage = require("../config/storage");

const upload = multer({ storage });
const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: req.file.path }); // this is Cloudinary image URL
});

module.exports = router;

















// const express = require("express");
// const multer = require("multer");
// const cloudinary = require("../config/cloudinary");
// const booksdata = require("../models/book");

// const router = express.Router();

// const storage = multer.memoryStorage(); // Use memory to manually upload to cloudinary
// const upload = multer({ storage });

// router.post("/addbook", upload.single("image"), async (req, res) => {
//   try {
//     const { bookname, description, author } = req.body;

//     // Upload image to cloudinary
//     const result = await cloudinary.uploader.upload_stream({ folder: "uploads" }, async (error, result) => {
//       if (error) return res.status(500).json({ message: "Cloudinary upload failed", error });

//       const newBook = new booksdata({
//         bookname,
//         description,
//         author,
//         image: result.secure_url, // ✅ Cloudinary image URL
//       });

//       await newBook.save();

//       res.status(200).json({
//         message: "New book created",
//         newBook,
//       });
//     });

//     // Pipe image buffer to Cloudinary
//     result.end(req.file.buffer);
//   } catch (error) {
//     console.error("Add Book Error:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// });

// module.exports = router;



// const express = require("express");
// const multer = require("multer");
// const cloudinary = require("../config/cloudinary");
// const booksdata = require("../models/book");

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/addbook", upload.single("image"), async (req, res) => {
//   try {
//     const { bookname, description, author } = req.body;

//     cloudinary.uploader.upload_stream({ folder: "uploads" }, async (error, result) => {
//       if (error) {
//         return res.status(500).json({ message: "Image upload failed", error });
//       }

//       const newBook = new booksdata({
//         bookname,
//         description,
//         author,
//         image: result.secure_url,
//       });

//       try {
//         await newBook.save();
//         res.status(200).json({ message: "Book created", newBook });
//       } catch (err) {
//         if (err.code === 11000) {
//           res.status(400).json({ message: "Bookname already exists" });
//         } else {
//           res.status(500).json({ message: "Database error", error: err });
//         }
//       }
//     }).end(req.file.buffer);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// });

// module.exports = router;


