const mongoose =require("mongoose");
const botconfig = require("../botsettings.json");
Schema = mongoose.Schema;

module.exports = mongoose.model(
    "Member",
    new Schema({
      userID: { type: String},
      username: { type: String},
      guildID: { type: String },
      xp: { type: Number, default: 1},
      next: { type: Number, default: 100},
      level: { type: Number, default: 0},
      rank: { type: Number, default: 0 }
    })
    );