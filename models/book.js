// // const mongoose = require("mongoose");

// // const bookSchema = new mongoose.Schema({
// //   bookname: String,
// //   author: String,
// //   description: String,
// //   image: String,
// //   createdBy: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "User"
// //   }
// // });

// // module.exports = mongoose.model("Book", bookSchema);



// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   bookname: {
//     type: String
//   },
//   author: {
//     type: String
//   },
//   description: {
//     type: String
//   },
//   image: {
//     type: String
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
// });

// module.exports = mongoose.model('Book', bookSchema);

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookname: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Book", bookSchema);
