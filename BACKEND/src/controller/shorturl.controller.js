import { generateNanoId } from "../utils/helper.js";
import { createShortUrlWithoutUser } from "../services/shorturl.service.js";
import { getShortUrl } from "../dao/shorturl.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const shortUrl = await createShortUrlWithoutUser(url);
    res.send(`${process.env.APP_URL}/${shortUrl}`);
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
