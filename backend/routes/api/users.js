const express = require("express");
const router = express.Router();
const UserModel = require("../../database/models/AdminSchema");
router.post("/loadCurrentUser", async (req, res) => {
  try {
    // Retrieve email from request body instead of query parameters
    const { email } = req.body;

    // Query the database to get the user with the specified email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// New route to load a user by ID
router.post("/loadUserById", async (req, res) => {
  try {
    // Retrieve userId from request body
    const { userId } = req.body;

    // Query the database to get the user with the specified ID
    const user = await UserModel.findById(userId, { password: 0, confirmation: 0 });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/loadUsers", async (req, res) => {
  try {
    // Fetch users from the database
    const users = await UserModel.find({}, { password: 0, confirmation: 0 });

    // Exclude password and confirmation fields from the users
    const usersDataWithoutPassword = users.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        department: user.department,
        image: user.image,
        exp: user.exp
      };
    });

    // Respond with the users
    res.status(200).json(usersDataWithoutPassword);
  } catch (error) {
    console.error("Error loading users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete a user
router.delete('/deleteUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Attempt to find and delete the user by ID
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update a user
router.put('/updateUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    // Attempt to find and update the user by ID
    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;