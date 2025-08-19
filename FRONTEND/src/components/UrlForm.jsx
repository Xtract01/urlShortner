import React from "react";
import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async () => {
    const shortUrl = await createShortUrl(url);
    setShortUrl(shortUrl);
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
      <button
        type="submit"
        onClick={handleSubmit}
        className="p-2 text-base rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
      >
        Submit
      </button>
      {/* {error && <div className="text-red-600 mt-3">{error}</div>} */}

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
