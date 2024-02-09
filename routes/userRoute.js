const express = require("express");
const path = require("path");
const userController = require("../Controller/userController.js");
const userAuth = require("../middlewares/authMiddlewares.js");

const router = express.Router();
const __dirname__ = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", userController.verifyEmail);
// PASSWORD RESET
router.post("/request-passwordreset", userController.requestPasswordReset);
router.get("/reset-password/:userId/:token", userController.resetPassword);
router.post("/reset-password", userController.changePassword);

// user routes
router.post("/get-user/:id?", userAuth, userController.getUser);
router.put("/update-user", userAuth, userController.updateUser);

// friend request
router.post("/friend-request", userAuth, userController.friendRequest);
router.post("/get-friend-request", userAuth, userController.getFriendRequest);

// accept / deny friend request
router.post("/accept-request", userAuth, userController.acceptRequest);

// view profile
router.post("/profile-view", userAuth, userController.profileViews);

//suggested friends
router.post("/suggested-friends", userAuth, userController.suggestedFriends);

router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname__, "./views/build", "index.html"));
});

router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(__dirname__, "./views/build", "index.html"));
});

module.exports = router;
