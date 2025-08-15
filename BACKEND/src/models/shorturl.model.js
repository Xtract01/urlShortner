import mongoose from "mongoose";
const shorturlSchema = new mongoose.Schema({
  full_url: { type: String, required: true },
  short_url: { type: String, required: true, index: true },
  clicks: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const ShortUrl = mongoose.model("ShortUrl", shorturlSchema);
export default ShortUrl;
