const mongoose =require("mongoose");
const botconfig = require("../botsettings.json");
Schema = mongoose.Schema;

module.exports = mongoose.model(
    "Leveling",
    new Schema({
      guildID: { type: String },
      guildName: { type: String},
      roletoad: { type: String, default: "null"},
      roletoremove: { type: String, default: "null"},
      rolelevel: { type: Number, default: 0},
      
    })
  );
