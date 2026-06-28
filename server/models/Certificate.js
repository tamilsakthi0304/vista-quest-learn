import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, default: "Neuron Academy" },
  date: { type: String, required: true },
  hash: { type: String, required: true },
  grade: { type: String, required: true },
  minted: { type: Boolean, default: true }
}, { timestamps: true });

export const Certificate = mongoose.model("Certificate", certificateSchema);
