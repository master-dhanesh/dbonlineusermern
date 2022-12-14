var express = require("express");
var router = express.Router();

const User = require("../model/userModel");

router.get("/", function (req, res, next) {
    res.render("signup", { title: "Sign Up" });
});

router.post("/signup", function (req, res, next) {
    User.create(req.body)
        .then((createdUser) => {
            res.redirect("/signin");
        })
        .catch((err) => res.send(err));
});

router.get("/signin", function (req, res, next) {
    res.render("signin", { title: "Sign In" });
});

router.post("/signin", function (req, res, next) {
    const { username, password } = req.body;

    User.findOne({ username })
        .then((founduser) => {
            res.redirect("/profile/" + founduser._id);
        })
        .catch((err) => res.send(err));
});

router.get("/profile/:id", function (req, res, next) {
    User.findById(req.params.id)
        .then((founduser) => {
            res.render("profile", {
                title: founduser.username,
                user: founduser,
            });
        })
        .catch((err) => res.send(err));
});

router.get("/delete/:id", function (req, res, next) {
    User.findByIdAndDelete(req.params.id)
        .then((founduser) => {
            res.redirect("/signin");
        })
        .catch((err) => res.send(err));
});

router.get("/update/:id", function (req, res, next) {
    User.findById(req.params.id)
        .then((founduser) => {
            res.render("update", {
                title: founduser.username,
                user: founduser,
            });
        })
        .catch((err) => res.send(err));
});

router.post("/update/:id", function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then((founduser) => {
            res.redirect("/profile/" + founduser._id);
        })
        .catch((err) => res.send(err));
});

router.get("/logout", function (req, res, next) {
    res.redirect("/signin");
});

module.exports = router;
