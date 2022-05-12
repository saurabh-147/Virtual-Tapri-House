const express = require("express");
const router = express.Router();
const Question = require("../models/question");

const axios = require("axios");

const callmyfunction = (questions, inputQues) => {
  let result = [];
  questions.forEach((ques) => {
    let url = "http://13.127.95.145/" + ques.question + "/" + inputQues;
    axios
      .get(url)
      .then((data) => {
        result.push({
          dbQues: ques.question,
          percentage: data.data.val,
          ans: ques.answer,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return result;
};

router.get("/askQuestion/:inputQues", (req, res) => {
  const inputQues = req.params.inputQues;
  console.log(inputQues);
  Question.find({})
    .then((questions) => {
      let result = callmyfunction(questions, inputQues);

      setTimeout(() => {
        let max_index = -1;
        for (let i = 0; i < result.length; i++) {
          if (result[i].percentage > 50) {
            if (max_index == -1) {
              max_index = i;
            } else if (result[max_index].percentage < result[i].percentage) {
              max_index = i;
            }
          }
        }

        if (max_index == -1) {
          return res.status(200).json({ success: false, msg: "No answer found" });
        } else {
          return res.status(200).json({ success: true, response: result[max_index].ans });
        }
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
