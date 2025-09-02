import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { createShortUrl } from "../api/shortUrl.api";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const payload = { url };
      if (isAuthenticated && slug) {
        payload.slug = slug;
      }

      const shortUrl = await createShortUrl(payload);
      setShortUrl(shortUrl);
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  const handleLoginRedirect = () => {
    navigate({ to: "/auth" });
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="url"
        placeholder="Enter your long URL"
        value={url}
        onInput={(event) => setUrl(event.target.value)}
        required
        className="p-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {isAuthenticated && (
        <input
          type="text"
          placeholder="Custom slug (optional)"
          value={slug}
          onInput={(event) => setSlug(event.target.value)}
          className="p-2 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 p-2 text-base rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
        >
          Create Short URL
        </button>

        {!isAuthenticated && (
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="flex-1 p-2 text-base rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            Login
          </button>
        )}
      </div>

      {shortUrl && (
        <div className="mt-4 break-all">
          <strong>Short URL:</strong>{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
