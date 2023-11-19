const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../models/product");
const User = require("../models/user");

router.put("/update-favorite", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);
    const isProductInFavorites = user.favorites.some((item) =>
      item._id.equals(productObjectId)
    );

    if (isProductInFavorites) {
      await user.updateOne({ $pull: { favorites: { _id: productObjectId } } });
      res.status(200).json({ message: "delete", data: productId });
    } else {
      const product = await Product.findById(productId);
      const newProduct = {
        _id: product._id,
        url: product.url,
        name: product.name,
        tags: product.tags,
        price: product.price,
      };
      await user.updateOne({ $push: { favorites: newProduct } });
      res.status(200).json({ message: "add", data: newProduct });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user's favorites" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

module.exports = router;
