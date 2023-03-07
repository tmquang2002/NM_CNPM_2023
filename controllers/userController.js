const User = require("../models/user");
const bcrypt = require('bcryptjs');

const userController = {
    addUser: async (req, res) => {
        const { username, password, name, email, role } = req.body;
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({
            username,
            password: hashedPassword,
            name,
            email,
            role
          });
          const savedUser = await user.save();
          res.status(201).json(savedUser);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    }
}

module.exports = userController;