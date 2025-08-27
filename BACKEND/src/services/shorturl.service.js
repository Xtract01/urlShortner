import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js";
import { saveShortUrl } from "../dao/shorturl.js";
import { getCustomShortUrl } from "../dao/shorturl.js";
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
export const createShortUrlWithUser = async (url, userId, slug = null) => {
  try {
    const shortUrl = slug || generateNanoId(7);
    if (!shortUrl) throw new Error("Failed to generate short URL");
    const exists = await getCustomShortUrl(slug);
    if (exists) throw new Error("Custom short URL already exists");
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
  } catch (error) {
    console.log(error);
  }
};
