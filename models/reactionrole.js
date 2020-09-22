const mongoose =require("mongoose");
const botconfig = require("../botsettings.json");
Schema = mongoose.Schema;

module.exports = mongoose.model(
    "Reactionrole",
    new Schema({
      guildID: { type: String },
      MessageID: { type: String },
      emoji: { type: String },
      Role: { type: String },
    })
    );