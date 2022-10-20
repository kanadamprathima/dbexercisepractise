const express = require("express");
const { useResolvedPath } = require("react-router-dom");

const User = require("./models").user;
const charRouter = require("./routes/charRouter");
const houseRouter = require("./routes/houseRouter");
const app = express();
const PORT = 4000;
app.use(express.json());

// GET all houses localhost:4000/houses

app.use("/houses", houseRouter);
app.use("/characters", charRouter);

// Bonus 3 - Create User
// POST the user info (name, email, password) to localhost:4000/users/signup to create a new user. Creating a user is only possible if name,email, and password is provided, and password is at least 6 characters long.
app.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(402).send("provide credentials required");
    }
    const newUser = await User.create({ name, email, password });
    res.send(newUser);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

app.listen(PORT, () => console.log(`listening on server ${PORT}`));
