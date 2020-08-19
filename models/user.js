const mongoose =require("mongoose");
const botconfig = require("../botsettings.json");
Schema = mongoose.Schema;

module.exports = mongoose.model(
    "User",
    new Schema({
      userID: { type: String},
      username: { type: String},
      balance: { type: Number, default: 0},
      daily: { type: Date, default: 0}
   })
  );