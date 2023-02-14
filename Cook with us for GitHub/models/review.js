const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
url: String,
filename: String
});

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    images: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Review", reviewSchema);

