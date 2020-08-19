const mongoose =require("mongoose");
const botconfig = require("../botsettings.json");
Schema = mongoose.Schema;

module.exports = mongoose.model(
    "Guild",
    new Schema({
      guildID: { type: String },
      guildName: { type: String},
      prefix: { type: String, default: `${botconfig.default_prefix}`},
      Autorole: { type: String, default: `${botconfig.default_Autorole}`},
      antiswear: { type: String, default: `${botconfig.default_antiswear}`},
      welcome_channel: { type: String, default: `${botconfig.default_welcome_channel}`},
      welcome_message: { type: String, default: `${botconfig.default_welcome_message}`},
      leave_channel: { type: String, default: `${botconfig.default_leave_channel}`},
      leveling_channel: { type: String, default: `${botconfig.default_leveling_channel}`},
      leveling_status: { type: String, default: `off`}
      
    })
  );