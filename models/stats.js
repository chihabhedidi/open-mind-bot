const mongoose =require("mongoose");
const botconfig = require("../botsettings.json");
Schema = mongoose.Schema;

module.exports = mongoose.model(
    "Stats",
    new Schema({
      guildID: { type: String },
      allusers: { type: String },
      membercount: { type: String },
      botcount: { type: String },
      catid: { type: String },
    })
  );
