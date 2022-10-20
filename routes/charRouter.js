const { Router } = require("express");
// const Houses = require("../models").house;
const Character = require("../models").character;
const router = new Router();
// POST create a new character localhost:4000/characters
// Creating a new character (POST - /characters) shouldn't be possible if the client does not provide name, age,alive, and houseId, we also want to check if a house with the houseId provided exists. The endpoint should respond with an appropriate message and status code
router.post("/", async (req, res, next) => {
  try {
    const { name, age, alive, houseId } = req.body;
    if (!name || !age || !alive || !houseId) {
      return res.status(402).send("missing credentials");
    }
    const newChar = await Character.create({ name, age, alive, houseId });
    console.log(newChar);
    res.send(newChar);
  } catch (e) {
    next(e);
  }
});
// PUT update a character age localhost:4000/characters/:id

router.put("/:id", async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const { id } = req.params;
    const charToUpdate = await Character.findByPk(id);
    const updatedUser = await charToUpdate.update({ name, age, raw: true });
    res.send(updatedUser);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
// Bonus 2 - Get all characters that are alive from the house name given
// Going to localhost:4000/characters/alive/:houseName returns an array characters that are alive and belong to the house specified
router.get("/alive/:houseName", async (req, res, next) => {
  const { houseName } = req.params;
  const reqChar = await Character.findAll({
    houseName,
    where: { alive: true },
  });
  res.send(reqChar);
});

module.exports = router;
