const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.virtual("id").get(function () {
  return this._id;
});

productSchema.methods.toJSON = function () {
  const { _id, ...product } = this.toObject();
  const id = _id;
  return { id, ...product };
};

module.exports = model("Product", productSchema);
