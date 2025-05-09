"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto border border-gray-300 p-5 rounded shadow-md">
        <h1 className="text-3xl font-semibold mb-8 text-center">Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </div>
  );
}
