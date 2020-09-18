const mongoose =require("mongoose");
const botconfig = require("../botsettings.json");
Schema = mongoose.Schema;

module.exports = mongoose.model(
    "Warning",
    new Schema({
      guildID: { type: String },
      userID: { type: String},
      warnings: { type: Number, default: 0},
      
    })
  );
