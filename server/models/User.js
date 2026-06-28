import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  icon: String,
  label: String,
  earned: Boolean
});

const userSchema = new mongoose.Schema({
  name: { type: String, default: "Aisha Khan" },
  xp: { type: Number, default: 3980 },
  xpToday: { type: Number, default: 340 },
  streak: { type: Number, default: 12 },
  bestStreak: { type: Number, default: 28 },
  classRank: { type: String, default: "#4" },
  totalClassRank: { type: Number, default: 184 },
  mastery: { type: Number, default: 71 },
  focusTime: { type: String, default: "8h 24m" },
  badges: [badgeSchema]
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
