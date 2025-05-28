// // const express = require("express");
// // const router = express.Router();
// // const {
// //   getBooks,
// //   getBook,
// //   addBook,
// //   updateBook,
// //   deleteBook
// // } = require("../controllers/bookController");
// // const { verifyToken } = require("../middlewares/middleware");

// // router.get("/getbooks", getBooks);
// // router.get("/getbook/:id", getBook);
// // router.post("/addbook", verifyToken, addBook);
// // router.put("/updatebook/:id", updateBook);
// // router.delete("/deletebook/:id", deleteBook);

// // module.exports = router;






// const express = require("express");
// const multer = require("multer"); 

// const router = express.Router();
// const bookController = require("../controllers/bookController.js");
// const { verifyToken } = require("../middlewares/middleware.js");


// const upload = multer({ storage: multer.memoryStorage() });


// router.get("/getbooks", bookController.getAllBooks);
// router.get("/getbook/:id", bookController.getSingleBook);
// router.post("/addbook", verifyToken, upload.single("image"), bookController.addBook);
// router.put("/updatebook/:id", verifyToken, bookController.updateBook);
// router.delete("/deletebook/:id", verifyToken, bookController.deleteBook);

// module.exports = router;


const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../middlewares/middleware");
const bookController = require("../controllers/bookController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/getbooks", bookController.getAllBooks);
router.get("/getbook/:id", bookController.getSingleBook);
router.post("/addbook", verifyToken, upload.single("image"), bookController.addBook);
router.put("/updatebook/:id", verifyToken,  upload.single("image"),bookController.updateBook);
router.delete("/deletebook/:id", verifyToken, bookController.deleteBook);

module.exports = router;
