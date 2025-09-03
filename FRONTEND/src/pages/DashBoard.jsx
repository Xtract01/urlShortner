import React from "react";
import UrlForm from "@/components/Urlform.jsx";
import UserUrl from "../components/Userurl.jsx";
const DashBoard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
        <h2 className="text-center font-bold text-2xl mb-6">URL Shortener</h2>
        <UrlForm />
        <UserUrl />
      </div>
    </div>
  );
};

export default DashBoard;
