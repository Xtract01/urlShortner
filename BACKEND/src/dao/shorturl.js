import urlSchema from "../models/shorturl.model.js";
export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,
    });
    if (userId) newUrl.userId = userId;
    await newUrl.save();
  } catch (error) {
    if (error.code == 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw new Error(error);
  }
};
export const getShortUrl = async (shortUrl) => {
  return await urlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
};
