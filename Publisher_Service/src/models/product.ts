const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
      title: {
        type: String,
      },
      image: {
        type: String,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

const Product = mongoose.model('Product', productSchema);

export default Product;
