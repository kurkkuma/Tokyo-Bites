const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//MODELS
const User = require("./models/user");

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

//запуск сервера
app.listen(PORT, () => {
  try {
    console.log(`server has been started ${PORT}...`);
  } catch (error) {
    console.log(error);
  }
});
