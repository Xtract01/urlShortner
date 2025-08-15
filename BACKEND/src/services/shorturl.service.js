import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js";
import { saveShortUrl } from "../dao/shorturl.js";
export const createShortUrlWithoutUser = async (url) => {
  try {
    const shortUrl = generateNanoId(7);
    if (!shortUrl) throw new Error("Failed to generate short URL");
    await saveShortUrl(shortUrl, url);
    return shortUrl;
  } catch (error) {
    console.log(error);
  }
};
export const createShortUrlWithUser = async (url, userId) => {
  try {
    const shortUrl = generateNanoId(7);
    if (!shortUrl) throw new Error("Failed to generate short URL");
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
  } catch (error) {
    console.log(error);
  }
};
