const Chat = require("../models/chat");
const User = require("../models/user");

const getAllMessage = (chatId) => {
  return Chat.findById(chatId)
    .then((chat) => {
      return {
        status: true,
        messages: chat.messages,
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

const postMessage = (chatId, userId, message) => {
  var obj = {
    userId,
    content: message,
  };
  return Chat.findByIdAndUpdate(chatId, { $push: { messages: obj } }, { new: true })
    .then((chat) => {
      console.log(chat);
      let messages = chat.messages;

      let lastMessage = messages[messages.length - 1];

      return { success: true, lastMessage: lastMessage };
    })
    .catch((err) => console.log(err));
};

const getUserName = (userId) => {
  return User.findById(userId)
    .then((data) => {
      return {
        name: data.name,
        status: true,
      };
    })
    .catch((err) => console.log(err));
};

module.exports = { getAllMessage, postMessage, getUserName };
