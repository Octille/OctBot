const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  coins: { type: Number, default: 1000 },
  bank: { type: Number },
  Company: 
    {
    miners: { type: Number, require: true  },
    workers: { type: Number },
  },
  Items:
  {
    Shirt: { type: Number, },
    Pants: { type: Number },
    Cookies: { type: Number },
    FishingRod: { type: Number },
    CommonFish: { type: Number },
    RareFish: { type: Number },
    MythicFish: { type: Number },
  
  },
  cooldowns: 
  {

  }

 
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;
