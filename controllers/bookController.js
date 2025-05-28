const cloudinary = require("../config/cloudinary");
const Book = require("../models/book");
const User = require("../models/user");

// Add a Book (Admin Only + Image Upload)
const addBook = async (req, res) => {
  try {
    const { bookname, author, description  } = req.body;
    const userId = req.user.id;

    if (!bookname || !author || !description ) {
      return res.status(400).json({ message: "All fields (bookname, author, description, price) are required" });
    }

    const adminUser = await User.findById(userId);
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "Only admin can add books" });
    }

    const existingBook = await Book.findOne({ bookname });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    cloudinary.uploader.upload_stream({ folder: "books" }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Image upload failed", error });
      }

      const newBook = new Book({
        bookname,
        author,
        description,
      
        image: result.secure_url,
        createdBy: userId
      });

      await newBook.save();
      res.status(201).json({ message: "Book created", newBook });
    }).end(req.file.buffer);

  } catch (error) {
    console.error("Add Book Error:", error);
    res.status(500).json({ message: "Server error while adding book" });
  }
};

// Get All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("createdBy", "name");
    res.status(200).json({ message: "Books fetched successfully", books });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error });
  }
};

// Get Single Book by ID
const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("createdBy", "name");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book found", book });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};

// // Update Book by ID
// const updateBook = async (req, res) => {
//   try {
//     const { bookname, author, description, price } = req.body;
//     const image = req.file ? req.file.path : null;

//     if (!bookname || !author || !description || !price) {
//       return res.status(400).json({ message: "bookname, author, description, and price are required" });
//     }

//     const updateData = { bookname, author, description };
//     if (image) updateData.image = image;

//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     if (!updatedBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     return res.status(200).json({ message: "Book updated successfully!", book: updatedBook });
//   } catch (error) {
//     console.error("Update Book Error:", error.message);
//     return res.status(500).json({ message: "Error updating book", error: error.message });
//   }
// };

const updateBook = async (req, res) => {
  try {
    const { bookname, author, description } = req.body;
    const bookId = req.params.id;

    if (!bookname || !author || !description) {
      return res.status(400).json({ message: "bookname, author, and description are required" });
    }

    let updatedData = { bookname, author, description };

    // If a new image is uploaded
    if (req.file) {
      await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "books" }, async (error, result) => {
          if (error) {
            reject(error);
          } else {
            updatedData.image = result.secure_url;
            resolve();
          }
        }).end(req.file.buffer);
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book updated successfully!", book: updatedBook });
  } catch (error) {
    console.error("Update Book Error:", error.message);
    return res.status(500).json({ message: "Error updating book", error: error.message });
  }
};



// Delete Book by ID
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Error deleting book", error });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook
};
