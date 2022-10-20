// const express = require("express");
const { Router } = require("express");
const Houses = require("../models").house;
const Character = require("../models").character;
const router = new Router();
router.get("/", async (req, res, next) => {
  try {
    const allHouses = await Houses.findAll({ raw: true });
    res.send(allHouses);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
// GET a specific house, including all its characters localhost:4000/houses/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getOneHouse = await Houses.findByPk(id, {
      raw: true,
      include: [{ model: Character, attributes: ["name"] }],
    });
    res.send(getOneHouse);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
module.exports = router;
