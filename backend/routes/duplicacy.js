const express = require("express");
const router = express.Router();
const Question = require("../models/question");

const axios = require("axios");

router.get("/askQuestion/:inputQues", (req, res) => {
  const inputQues = req.params.inputQues;

  let url = "http://13.232.43.89/" + inputQues;
  axios
    .get(url)
    .then((data) => {
      return res.status(200).json(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
