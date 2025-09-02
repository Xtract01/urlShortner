import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (payload) => {
  const { data } = await axiosInstance.post("/api/create", payload);
  return data.shortUrl;
};
