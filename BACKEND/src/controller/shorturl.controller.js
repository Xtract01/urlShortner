import { generateNanoId } from "../utils/helper.js";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/shorturl.service.js";
import { getShortUrl } from "../dao/shorturl.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const data = req.body;
    let shortUrl;

    if (req.user) {
      const userId = req.user.id;
      shortUrl = await createShortUrlWithUser(data.url, userId, data.slug);
    } else {
      shortUrl = await createShortUrlWithoutUser(data.url);
    }

    if (!shortUrl) {
      return res.status(400).json({
        success: false,
        message: "URL already created",
      });
    }

    return res.json({
      success: true,
      shortUrl: `${process.env.APP_URL}/${shortUrl}`,
    });
  } catch (error) {
    next(error);
  }
};

export const redirectFromShortUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await getShortUrl(id);

    if (url) {
      res.redirect(url.full_url);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error redirecting from short URL:", error);
    res.status(500).send("Internal Server Error");
  }
};
export const createCustomShortUrl = async (req, res, next) => {
  try {
    const { url, customId } = req.body;
    const shortUrl = await createShortUrlWithoutUser(url, customId);
    res.send(`${process.env.APP_URL}/${shortUrl}`);
  } catch (error) {
    next(error);
  }
};
