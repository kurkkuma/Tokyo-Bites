const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/add-user", async (req, res) => {
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
module.exports = router;
