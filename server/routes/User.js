const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/add-user", async (req, res) => {
  const { name, phone, address, favorites } = req.body;

  try {
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      if (existingUser.name === name && existingUser.address === address) {
        return res.status(200).json({ message: "verification was successful" });
      } else {
        (existingUser.name = name),
          (existingUser.address = address),
          await existingUser.save();
        return res.status(200).json({
          message:
            "The data associated with this phone number has been updated.",
          user: existingUser,
        });
      }
    } else {
      const user = new User({ name, phone, address });
      await user.save();

      res.status(200).json({
        message:
          "Account created! The name and address are associated with the phone number you provided.",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save user" });
  }
});
module.exports = router;
