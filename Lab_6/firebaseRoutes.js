const express = require("express");
const { signUp, signIn, verifyToken } = require("../controllers/firebaseController");

const router = express.Router();

// Route for sign-up (create user)
router.post("/signup", signUp);

// Route for sign-in (get Firebase custom token)
router.post("/signin", signIn);
router.get("/protected", verifyToken, (req, res) => {
    res.json({ 
        message: "User has been able to access the protected routes if user has valid authentication token",
        user: req.user 
    });
});

module.exports = router; // Export the router
