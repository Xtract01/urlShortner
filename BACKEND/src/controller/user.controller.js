import { wrapAsync } from "../utils/wrapAsync.js";
import { getAllUrls } from "../dao/user.dao.js";
export const getAllUserUrls = wrapAsync(async (req, res) => {
  const userId = req.user.id;
  const urls = await getAllUrls(userId);
  res.status(200).json({ message: "success", urls });
});
