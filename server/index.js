require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//MODELS
const User = require("./models/user");
const Product = require("./models/product");
const Review = require("./models/review");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = process.env.DB_URL;
mongoose
  .connect(db)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

// =========================================================================

app.post("/add-user", async (req, res) => {
  const { name, phone, address, favorites } = req.body;

  try {
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      if (existingUser.name === name && existingUser.address === address) {
        return res.status(200).json({ user: existingUser });
      } else {
        (existingUser.name = name),
          (existingUser.address = address),
          (existingUser.favorites = favorites),
          await existingUser.save();
        return res.status(200).json({ user: existingUser });
      }
    } else {
      const user = new User({ name, phone, address });
      await user.save();

      res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.put("/update-favorite", async (req, res) => {
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

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
});

app.post("/add-review", async (req, res) => {
  const { userName, date, stars, text } = req.body;
  try {
    const newReview = new Review({ userName, date, stars, text });
    await newReview.save();

    res.status(200).json(newReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

//запуск сервера
app.listen(PORT, () => {
  try {
    console.log(`server has been started ${PORT}...`);
  } catch (error) {
    console.log(error);
  }
});
