const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    category: String,
    ingredients:
        {
        quantity: [String],
        unit: [String],
        product: [String]
    },
    description: String,
    likes: {
        type: Array,
        default: []
    },
    image: String,    
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

module.exports = mongoose.model("Recipe", RecipeSchema);