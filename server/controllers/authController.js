const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    console.log("DATA:", req.body); // ✅ DEBUG

    const user = new User(req.body);
    await user.save();

    res.json({ message: "Registered Successfully" });
  } catch (err) {
    console.log("ERROR:", err); // ✅ SEE ERROR HERE
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user
  });
};
const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.message === "Login successful") {
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/home");
    } else {
      alert("Invalid login");
    }
  } catch (err) {
    console.log(err);
  }
};