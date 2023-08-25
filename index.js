const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//MODELS
const User = require("./models/user");
const Product = require("./models/product");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db =
  "mongodb+srv://mouse:mouse2505@project1.ft7wvam.mongodb.net/tokyo-bites-db?retryWrites=true&w=majority";
mongoose
  .connect(db)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

// =========================================================================

// const initialData = [
//   {
//     url: "/images/products/913b1040b4b6c971cc5fda13d828661e.jpg",
//     name: "Kani",
//     price: 2,
//     description: "crab meat, sushi rice, cucumber, nori, wasabi",
//     composition:
//       "rice for sushi (polished rice, not steamed, rice vinegar, alcohol vinegar, sugar, water, salt), boiled and frozen crab meat, cucumber, wasabi (horseradish, mustard, corn starch, acidity regulators: citric acid E330, ascorbic acid E300, dyes: blue brilliant E133, tartrazine E102), dried algae of the genus Porphyra.",
//     category: "gunkans",
//     kcal: 42,
//     weight: 30,
//     proteins: 2.8,
//     fats: 0.4,
//     carbohydrates: 6.9,
//     tags: ["crab meat"],
//   },
//   {
//     url: "/images/products/4ac1b1c340eee30587fbc3d6dbea31d8.jpg",
//     name: "Persona grata",
//     price: 5,
//     description:
//       "smoked eel, cheese, avocado, masago, sushi rice, sesame, tempura, spicy sauce. Served with citrus spicy sauce (4 pcs.)",
//     composition:
//       "rice for sushi (polished rice not steamed, rice vinegar, alcohol vinegar, sugar, water, salt), minced meat (curd cheese (cottage cheese (normalized pasteurized cow's milk, bacterial starter, milk-clotting enzyme of microbial origin), modified starch thickener, Vidogum stabilizer ( locust bean gum and guar gum), acidity regulator citric acid, table salt, drinking water), Philadelphia sauce (curd cheese (cottage cheese (normalized pasteurized cow's milk, bacterial starter culture, milk-clotting enzyme of microbial origin)",
//     kcal: 568,
//     weight: 165,
//     proteins: 11.3,
//     fats: 40.7,
//     carbohydrates: 39.0,
//     tags: ["eel", "avocado"],
//   },
// ];

// try {
//   Product.insertMany(initialData);
//   console.log("Initial data added");
// } catch (error) {
//   console.error("Error adding initial data:", error);
// }

app.post("/add-user", async (req, res) => {
  const { name, phone, address } = req.body;

  try {
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      if (existingUser.name === name && existingUser.address === address) {
        return res
          .status(200)
          .json({ message: "User data does not need to be updated" });
      } else {
        (existingUser.name = name),
          (existingUser.address = address),
          await existingUser.save();
        console.log(existingUser);
        res.status(200).json(existingUser);
      }
    } else {
      const user = new User({ name, phone, address });
      await user.save();

      console.log(user);
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save user" });
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
//запуск сервера
app.listen(PORT, () => {
  try {
    console.log(`server has been started ${PORT}...`);
  } catch (error) {
    console.log(error);
  }
});
