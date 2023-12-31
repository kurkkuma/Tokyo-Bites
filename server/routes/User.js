const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { encrypt, decrypt } = require("../encryption");

router.post("/add-user", async (req, res) => {
  const { name, phone, address } = req.body;

  try {
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      if (existingUser.name === name && existingUser.address === address) {
        return res.status(200).json({ message: "verification was successful" });
      } else {
        (existingUser.name = name),
          (existingUser.address = encrypt(address)),
          await existingUser.save();
        return res.status(200).json({
          message:
            "The data associated with this phone number has been updated.",
          user: {
            ...existingUser.toObject(),
            address: decrypt(existingUser.address),
          },
        });
      }
    } else {
      const user = new User({
        name,
        phone,
        address: encrypt(address),
      });
      const savedUser = await user.save();

      res.status(200).json({
        message:
          "Account created! The name and address are associated with the phone number you provided.",
        user: savedUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

router.put("/add-favorite", async (req, res) => {
  try {
    const { userId, newFavorite } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.updateOne({ $push: { favorites: newFavorite } });
    res.status(200).json({ message: "added new favorite product" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add new favorite product" });
  }
});

router.delete("/delete-favorite", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);
    const isProductInFavorites = user.favorites.some(
      (item) => String(item._id) === String(productObjectId)
    );

    if (isProductInFavorites) {
      await user.updateOne({
        $pull: { favorites: { _id: productId } },
      });
      res.status(200).json({ message: "deleted favorite product" });
    } else {
      res
        .status(404)
        .json({ message: "Favorite product could not be found with this id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add new favorite product" });
  }
});

router.put("/add-basket", async (req, res) => {
  const { userId, newBasketItem } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingBasketItem = user.basket.find(
      (item) => item._id === newBasketItem._id
    );

    if (!existingBasketItem) {
      await user.updateOne({ $push: { basket: newBasketItem } });

      return res
        .status(200)
        .json({ message: "Added a new product to the basket" });
    }

    await User.updateOne(
      { _id: userId, "basket._id": newBasketItem._id },
      { $inc: { "basket.$.count": 1 } }
    );

    res
      .status(200)
      .json({ message: "Updated the count of the product in the basket" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update product in the basket" });
  }
});

module.exports = router;
