import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  console.log("Register:", req.body);

  res.json({
    message: "Registered Successfully",
    user: req.body
  });
});

router.post("/login", (req, res) => {
  console.log("Login:", req.body);

  res.json({
    message: "Login successful",
    user: req.body
  });
});

export default router;